let callbacks = new Map()
let reactivities = new Map()

let usedReactivities = []

function effect(callback) {
    usedReactivities = []
    callback()

    for (let reactivity of usedReactivities) {
        if (!callbacks.has(reactivity[0])) {
            callbacks.set(reactivity[0], new Map())
        }
        let reactivityObj = callbacks.get(reactivity[0])
        if (!reactivityObj.has(reactivity[1])) {
            reactivityObj.set(reactivity[1], [])
        }
        reactivityObj.get(reactivity[1]).push(callback)
    }
}

function reactive(object) {
    if (reactivities.has(object)) return reactivities.get(object)

    let proxy = new Proxy(object, {
        set(obj, prop, val) {
            obj[prop] = val

            if (callbacks.get(obj) && callbacks.get(obj).get(prop)) {
                for (let callback of callbacks.get(obj).get(prop)) {
                    callback()
                }
            }

            return obj[prop]
        },
        get(obj, prop) {
            usedReactivities.push([obj, prop])
            if (typeof obj[prop] === 'object') return reactive(obj[prop])
            return obj[prop]
        }
    })
    reactivities.set(object, proxy)
    return proxy
}
