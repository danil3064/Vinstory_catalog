"use client";

import { ReactNode } from 'react';

export type SheetProps = {
	open: boolean;
	onClose: () => void;
	children: ReactNode;
	title?: string;
};

export function Sheet({ open, onClose, children, title }: SheetProps) {
	if (!open) return null;
	return (
		<div className="fixed inset-0 z-50">
			<div className="absolute inset-0 bg-black/40" onClick={onClose} />
			<div className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-card border shadow-xl p-4 space-y-4">
				<div className="h-1 w-10 rounded-full bg-muted/40 mx-auto" />
				{title ? <div className="text-center text-sm font-medium text-muted">{title}</div> : null}
				{children}
			</div>
		</div>
	);
}