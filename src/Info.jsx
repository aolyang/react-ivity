import React from "react";
import { useCount } from "./store";

export default function TheCount() {
  const [count, setCount] = useCount(2)
  console.log("Info count", count)
  return <p style={{textAlign: "center"}}>
    <button type="button" onClick={() => {
      setCount(count + 1)
    }}>
      count in Info context is: {count}
    </button>
  </p>
}
