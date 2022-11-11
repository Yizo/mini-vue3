export let activeEffect = undefined

class ReactiveEffect {
    public active = true
    public deps = []
    public parent = undefined
    constructor(public fn) {}
    run(){
        if(!this.active) {
            return this.fn()
        }
        // 构建tree树父子关系
        try{
            this.parent = activeEffect
            activeEffect = this
            return this.fn()
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
    let shouldTrack = dep.has(activeEffect)
    if(shouldTrack) {
        dep.add(activeEffect)
        activeEffect.deps.push(dep)
    }
}