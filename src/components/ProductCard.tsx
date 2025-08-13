"use client";

import { CatalogItem } from '@/lib/types';
import { genderLabel as genderLabelFn, formatPrice } from '@/lib/ui';
import { Button } from '@/components/ui/Button';

export type ProductCardProps = {
	item: CatalogItem;
	onOpen: () => void;
	contactUrl: string;
};

export default function ProductCard({ item, onOpen, contactUrl }: ProductCardProps) {
	return (
		<div className="card-surface overflow-hidden cursor-pointer flex flex-col" onClick={onOpen}>
			<div className="relative aspect-[1/1] bg-white">
				{item.coverUrl ? (
					<img src={item.coverUrl} alt={`${item.brand} ${item.model}`} className="absolute inset-0 h-full w-full object-cover" />
				) : (
					<div className="absolute inset-0 flex items-center justify-center text-muted text-sm">Нет фото</div>
				)}
			</div>
			<div className="p-3 flex-1 flex flex-col gap-1">
				<div className="font-semibold leading-tight truncate">{item.brand} {item.model}</div>
				<div className="text-xs text-muted">{genderLabelFn(item.genderRaw)} · EU: {item.sizeEu ?? '—'}</div>
				<div className="mt-auto flex items-center justify-between pt-2">
					<div className="text-lg font-semibold">{formatPrice(item.price)}</div>
					<a href={contactUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
						<Button size="sm" variant="outline">Написать</Button>
					</a>
				</div>
			</div>
		</div>
	);
}