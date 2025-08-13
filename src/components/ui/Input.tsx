"use client";

import { InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'classnames';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{ className, ...props },
	ref,
) {
	return (
		<input
			ref={ref}
			className={clsx(
				'w-full h-10 rounded-lg border bg-card px-3 text-sm placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-brand',
				className,
			)}
			{...props}
		/>
	);
});