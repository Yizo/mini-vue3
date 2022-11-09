import {ReactiveFlags} from "./reactive";

export const mutableHandlers = {
    get(target, key, receiver) {
        if (ReactiveFlags.IS_REACTIVE === key) {
            return true
        }
        return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
        return Reflect.set(target, key, value, receiver)
    }
}