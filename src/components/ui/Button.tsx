"use client";

import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'classnames';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'default' | 'outline' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	{ className, variant = 'default', size = 'md', ...props },
	ref,
) {
	const base = 'inline-flex items-center justify-center gap-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-60 disabled:pointer-events-none';
	const sizes = {
		sm: 'h-8 px-3 text-sm',
		md: 'h-10 px-4 text-sm',
		lg: 'h-12 px-5 text-base',
	};
	const variants = {
		default: 'bg-accent text-white hover:bg-accent-soft',
		outline: 'border bg-card hover:bg-panel',
		ghost: 'hover:bg-panel',
	};
	return (
		<button ref={ref} className={clsx(base, sizes[size], variants[variant], className)} {...props} />
	);
});