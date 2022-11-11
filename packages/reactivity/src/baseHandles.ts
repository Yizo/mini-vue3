import {ReactiveFlags} from "./reactive";
import {activeEffect} from "./effect";

export const mutableHandlers = {
    get(target, key, receiver) {
        if (ReactiveFlags.IS_REACTIVE === key) {
            console.log(activeEffect, key)
            return true
        }
        return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
        console.log('set', activeEffect, key)
        return Reflect.set(target, key, value, receiver)
    }
}