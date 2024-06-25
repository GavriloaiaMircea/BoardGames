import { forwardRef } from 'react';
import clsx from 'clsx';

export const Input = forwardRef(function Input(
  { labelText, className, errorMessage = '', ...props },
  ref
) {
  const id = `${props.name}_${Math.random()}`;

  return (
    <>
      <label htmlFor={id} className="text-right self-center">
        {labelText}
      </label>
      <input
        id={id}
        ref={ref}
        {...props}
        className={clsx(
          className,
          'border-2 border-stone-900 rounded-sm px-2 py-1'
        )}
      />
      {errorMessage && (
        <p className="col-span-full text-red-700 col-start-2">{errorMessage}</p>
      )}
    </>
  );
});
