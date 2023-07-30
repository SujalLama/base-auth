export default function Button({children, className, ...restProps}) {
  return (
    <button {...restProps} className={`btn ${className}`}>{children}</button>
  )
}
