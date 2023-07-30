import { forwardRef } from "react"

const Input = forwardRef(({className = '', ...restProps}, ref) => {
  return (
    <input ref={ref} className={`input ${className}`} {...restProps} />
  )
})

export default Input;