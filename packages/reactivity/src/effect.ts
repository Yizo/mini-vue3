
class ReactiveEffect {
    public active = true
    public deps = []
    constructor(public fn) {
    }
    run(){
        if(!this.active) {
            return this.fn()
        }
    }
}

export function effect(fn){
    const _effect = new ReactiveEffect(fn)
    // 默认执行一次
    _effect.run()
}