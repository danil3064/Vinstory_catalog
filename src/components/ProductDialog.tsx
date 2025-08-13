"use client";

import { useState } from 'react';
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { CatalogItem } from '@/lib/types';
import { formatPrice, genderLabel } from '@/lib/ui';

export type ProductDialogProps = {
	open: boolean;
	onClose: () => void;
	item: CatalogItem | null;
	contactUrl: string;
};

export default function ProductDialog({ open, onClose, item, contactUrl }: ProductDialogProps) {
	const [active, setActive] = useState(0);
	if (!item) return null;
	const images = item.photoUrls.length > 0 ? item.photoUrls : (item.coverUrl ? [item.coverUrl] : []);
	const activeSrc = images[active] ?? null;

	return (
		<Dialog open={open} onClose={onClose}>
			<div className="flex-1 overflow-y-auto">
				<div className="bg-white">
					<div className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
						{activeSrc ? (
							<img src={activeSrc} alt={item.model} className="absolute inset-0 w-full h-full object-contain bg-white" />
						) : (
							<div className="absolute inset-0 flex items-center justify-center text-muted">Нет фото</div>
						)}
					</div>
					{images.length > 1 && (
						<div className="flex items-center gap-2 overflow-x-auto p-3 border-t bg-panel">
							{images.map((src, idx) => (
								<button key={src + idx} onClick={() => setActive(idx)} className={`shrink-0 rounded-md border ${idx === active ? 'border-brand' : ''}`}>
									<img src={src} className="h-16 w-16 object-cover rounded-md" alt="preview" />
								</button>
							))}
						</div>
					)}
				</div>

				<div className="p-4 space-y-2">
					<div className="text-lg font-semibold leading-tight">{item.brand} {item.model}</div>
					<div className="text-sm text-muted">{genderLabel(item.genderRaw)} · EU: {item.sizeEu ?? '—'}</div>
					{item.description && (
						<p className="text-sm whitespace-pre-line text-accent-soft/90">{item.description}</p>
					)}
					<div>
						<a href={contactUrl} target="_blank" rel="noreferrer">
							<Button className="w-full">Написать в Telegram</Button>
						</a>
					</div>
				</div>
			</div>
			<div className="border-t bg-card p-3 sticky bottom-0 flex items-center justify-between">
				<div className="text-xl font-bold">{formatPrice(item.price)}</div>
				<a href={contactUrl} target="_blank" rel="noreferrer">
					<Button size="lg">Написать в Telegram</Button>
				</a>
			</div>
		</Dialog>
	);
}