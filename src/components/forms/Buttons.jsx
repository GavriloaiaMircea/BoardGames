import clsx from "clsx";
import { forwardRef } from "react";

export const Button = forwardRef(({ children, type = 'submit', className, ...props }, ref) => {
  return (
    <button ref={ref} type={type} {...props} className={clsx(className, 'border border-stone-900 rounded px-4 py-2 justify-self-start')}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export const PrimaryButton = forwardRef(({className, ...props}, ref) => {
  return (
    <Button ref={ref} {...props} className={clsx(className, 'bg-teal-800 text-white')} />
  )
});

PrimaryButton.displayName = 'PrimaryButton';

export const DestructiveButton = forwardRef(({className, ...props}, ref) => {
  return (
    <Button ref={ref} {...props} className={clsx(className, 'bg-destructive border-red-900 text-white')} />
  )
});

DestructiveButton.displayName = 'DestructiveButton';
