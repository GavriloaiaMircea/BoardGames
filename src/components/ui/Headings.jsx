import clsx from "clsx";

export function H1({ children, className, ...props }) {
  return <h1 {...props} className={clsx("text-3xl my-4", className)}>{children}</h1>;
}
