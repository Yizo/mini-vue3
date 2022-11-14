import {ReactiveFlags} from "./reactive";
import {activeEffect, track, trigger} from "./effect";

export const mutableHandlers = {
    get(target, key, receiver) {
        if (ReactiveFlags.IS_REACTIVE === key) {
            console.log(activeEffect, key)
            return true
        }
        track(target, key)
        return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
        const oldValue = target[key]
        const r = Reflect.set(target, key, value, receiver)
        // 如果旧值和新值不同，需要触发effect
        if(oldValue !== value) {
            trigger(target, key, value, oldValue)
        }
        return r
    }
}