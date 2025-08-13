"use client";

import { HTMLAttributes } from 'react';
import clsx from 'classnames';

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
	selected?: boolean;
	clickable?: boolean;
};

export function Badge({ className, selected = false, clickable = false, ...props }: BadgeProps) {
	return (
		<span
			className={clsx(
				'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap',
				selected ? 'bg-brand/10 border-brand text-accent' : 'bg-card hover:bg-panel',
				clickable && 'cursor-pointer',
				className,
			)}
			{...props}
		/>
	);
}