"use client";

import ProductCard from '@/components/ProductCard';
import { CatalogItem } from '@/lib/types';

export type CatalogGridProps = {
	items: CatalogItem[];
	isLoading: boolean;
	onOpenItem: (item: CatalogItem) => void;
	contactUrl: string;
};

function SkeletonCard() {
	return (
		<div className="card-surface overflow-hidden animate-pulse">
			<div className="aspect-[1/1] bg-panel" />
			<div className="p-3 space-y-2">
				<div className="h-4 bg-panel rounded w-3/4" />
				<div className="h-3 bg-panel rounded w-1/2" />
				<div className="h-5 bg-panel rounded w-1/3 mt-4" />
			</div>
		</div>
	);
}

export default function CatalogGrid({ items, isLoading, onOpenItem, contactUrl }: CatalogGridProps) {
	if (isLoading) {
		return (
			<div className="grid [grid-template-columns:repeat(auto-fill,minmax(160px,1fr))] gap-3">
				{Array.from({ length: 8 }, (_, i) => (
					<SkeletonCard key={i} />
				))}
			</div>
		);
	}

	if (items.length === 0) {
		return <div className="text-center text-muted py-16">Пока нет товаров по фильтрам</div>;
	}

	return (
		<div className="grid [grid-template-columns:repeat(auto-fill,minmax(160px,1fr))] gap-3">
			{items.map((item) => (
				<ProductCard key={item.id} item={item} onOpen={() => onOpenItem(item)} contactUrl={contactUrl} />
			))}
		</div>
	);
}