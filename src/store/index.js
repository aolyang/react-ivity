import { effect, reactive, isReactive, isRef, stop } from "@vue/reactivity";
import { useEffect, useState } from "react";

const globalState = reactive({
  count: 0
})

function traverse(value, seen = new Set()) {
  if (!(typeof value === "object") || seen.has(value))
    return value

  seen.add(value) // prevent circular reference
  if (value instanceof Array && value.length > 0) {
    for (let i = 0; i < value.length; i++)
      traverse(value[i], seen)
  } else {
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

  if (deep) {
    let _source = getter()
    getter = () => traverse(_source)
  }

  const runner = effect(getter, {
    lazy,
    scheduler: () => {
      fn()
      stop(runner)
    }
  })
}

export function useCount(num) {
  const [count, setCount] = useState(num)

  const observe = (v) => {
    globalState.count = v
  }

  useEffect(() => {
    watch(globalState, () => {
      setCount(globalState.count)
    })
  })

  return [
    count,
    observe
  ]
}
