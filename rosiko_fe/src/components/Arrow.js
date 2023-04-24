import * as React from "react"

const Arrow = (props) => (
  <svg viewBox="0 0 100 50" {...props}>
    <path style={{ fill: props.color}} d="M50 50 0 0h100z"/>
  </svg>
)

export default Arrow