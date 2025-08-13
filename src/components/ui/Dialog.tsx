"use client";

import { ReactNode, useEffect } from 'react';
import clsx from 'classnames';

export type DialogProps = {
	open: boolean;
	onClose: () => void;
	children: ReactNode;
	className?: string;
};

export function Dialog({ open, onClose, children, className }: DialogProps) {
	useEffect(() => {
		let scrollY = 0;
		if (open) {
			scrollY = window.scrollY;
			document.body.style.position = 'fixed';
			document.body.style.top = `-${scrollY}px`;
			document.body.style.left = '0';
			document.body.style.right = '0';
			document.body.style.width = '100%';
		}
		return () => {
			document.body.style.position = '';
			document.body.style.top = '';
			document.body.style.left = '';
			document.body.style.right = '';
			document.body.style.width = '';
			if (open) window.scrollTo(0, scrollY);
		};
	}, [open]);

	if (!open) return null;
	return (
		<div className="fixed inset-0 z-50">
			<div className="absolute inset-0 bg-black/40" onClick={onClose} />
			<div className={clsx('absolute inset-x-0 bottom-0 top-10 mx-auto max-w-3xl rounded-t-2xl bg-card shadow-xl border flex flex-col', className)}>
				{children}
			</div>
		</div>
	);
}