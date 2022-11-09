import {isObject} from '@vue/shared'
import {mutableHandlers} from './baseHandles'

// 缓存响应对象，避免再次被代理
const reactiveMap = new WeakMap()


export const enum ReactiveFlags {
    IS_REACTIVE = '__v_isReactive'
}

export function reactive(target: object) {
    // 不是对象直接返回
    if (!isObject(target)) {
        return
    }

    // 在创建响应式对象时先进行取值，看是否已经代理过
    // 没被代理前是不会触发get，不会进入
    if (target[ReactiveFlags.IS_REACTIVE]) {
        return target
    }

    // 如果已经被代理后，直接返回代理后对象
    const exisitingProxy = reactiveMap.get(target)
    if (exisitingProxy) {
        return exisitingProxy
    }

    const proxy = new Proxy(target, mutableHandlers)
    reactiveMap.set(target, proxy)
    return proxy
}