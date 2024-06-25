import clsx from "clsx";

export function Form({children, className, ...props}) {
  return (
    <form noValidate {...props} className={clsx(className, 'grid grid-cols-[150px,_1fr] gap-1')}>
      {children}
    </form>
  )
}
