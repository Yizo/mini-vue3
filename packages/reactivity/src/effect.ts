export let activeEffect = undefined

function cleanupEffect(effect) {
let { deps } = effect
    for(let i = 0; i<deps.length; i++) {
        deps[i].delete(effect)
    }
    effect.deps.length = 0
}

class ReactiveEffect {
    public active = true
    public deps = []  // effect中的响应式数据
    public parent = undefined  // effect的父级
    constructor(public fn) {}
    run(){
        if(!this.active) {
            return this.fn()
        }
        // 构建tree树父子关系
        try{
            this.parent = activeEffect
            activeEffect = this  // 把自己暴露在全局上
            // 每次执行effect之前，应该先清理effect中所以依赖的属性
            cleanupEffect(this)
            return this.fn() // 触发依赖收集
        } finally {
            activeEffect = this.parent
            this.parent = undefined
        }
    }
}

export function effect(fn){
    const _effect = new ReactiveEffect(fn)
    // 默认执行一次
    _effect.run()
}

/**
 * let mapping = {
 *     target: {
 *         key: [activeEffect]
 *     }
 * }
 * **/
// 记录target对象上key属性的effect
const targetMap = new WeakMap()

/**
 * 依赖收集
 * @param { object } target - 对象
 * @param { object|string } key  - 属性
 * */
export function track(target, key) {
    if(!activeEffect) {
        return
    }
    // { target: { key: [activeEffect] } }
    let depsMap = targetMap.get(target)
    if(!depsMap) {
        targetMap.set(target, depsMap = new Map())
    }
    // { key: [activeEffect] }
    let dep = depsMap.get(key)
    if(!dep) {
        depsMap.set(key, dep = new Set())
    }
    // 属性依赖的effect是否存在
    let shouldTrack = dep.has(activeEffect)
    if(shouldTrack) {
        dep.add(activeEffect)
        activeEffect.deps.push(dep)
    }
}

export function trigger(target, key, newValue, oldValue) {
    const depsMap = targetMap.get(target)
    if(!depsMap) return;
    const dep = depsMap.get(key)
    if(!dep)return;
    const effects = [...dep]
    effects.forEach(effect=>{
        // 避免重复调用，造成栈异常
        if(effect !== activeEffect) {
            effect.run()
        }
    })
}