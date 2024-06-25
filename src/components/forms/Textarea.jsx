import { forwardRef } from 'react';
import clsx from 'clsx';

export const Textarea = forwardRef(function Textarea(
  { labelText, className, errorMessage = '', ...props },
  ref
) {
  const id = `${props.name}_${Math.random()}`;

  return (
    <>
      <label htmlFor={id} className="text-right self-center">
        {labelText}
      </label>
      <textarea
        id={id}
        ref={ref}
        {...props}
        className={clsx(
          className,
          'border-2 border-stone-900 rounded-sm px-2 py-1'
        )}
      ></textarea>
      {errorMessage && (
        <p className="col-span-full text-red-700 col-start-2">{errorMessage}</p>
      )}
    </>
  );
});
