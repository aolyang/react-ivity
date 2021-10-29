import { effect, reactive, isReactive, isRef, stop } from "@vue/reactivity";
import { useEffect, useState } from "react";

const globalState = reactive({
    count: 0
})
console.log("isReactive", isReactive(globalState))
function traverse(value, seen = new Set()) {
    if (!isObject(value) || seen.has(value))
        return value

    seen.add(value) // prevent circular reference 
    if (value instanceof Array && value.length > 0) {
        for (let i = 0; i < value.length; i++)
            traverse(value[i], seen)
    }
    else {
        console.log("value", value)
        for (const key of Object.keys(value))
            traverse(value[key], seen)
    }
    return value
}

const watch = (source, fn, { deep = true, lazy } = {}) => {
    let getter = isRef(source)
        ? () => source.value
        : isReactive(source)
            ? () => source
            : source

    if (deep) getter = () => traverse(getter())

    const runner = effect(getter, {
        lazy,
        scheduler: fn
    })
    return () => stop(runner)
}
watch(globalState, () => {
    console.log("globalState.count", globalState.count)
})
export function useCount(num) {
    const [count, setCount] = useState(num)

    const observe = (v) => {
        setCount(v)
        globalState.count = v
        console.log("setCount:", globalState.count, v)
    }

    useEffect(() => {

    })

    return [
        count,
        observe
    ]
}