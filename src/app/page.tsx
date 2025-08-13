"use client";

import { useEffect, useMemo, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import CatalogGrid from '@/components/CatalogGrid';
import ProductDialog from '@/components/ProductDialog';
import FiltersSheet from '@/components/FiltersSheet';
import { useCatalog } from '@/hooks/useCatalog';
import { CatalogItem, SortOption } from '@/lib/types';

export default function Page() {
	const {
		isLoading,
		items,
		search,
		setSearch,
		brand,
		setBrand,
		filters,
		setFilters,
		resetFilters,
		sort,
		setSort,
		brands,
	} = useCatalog();

	const [dialogOpen, setDialogOpen] = useState(false);
	const [active, setActive] = useState<CatalogItem | null>(null);
	const [filtersOpen, setFiltersOpen] = useState(false);
	const [sortOpen, setSortOpen] = useState(false);

	const contactUrl = process.env.NEXT_PUBLIC_TELEGRAM_CONTACT || '#';

	useEffect(() => {
		const w = typeof window !== 'undefined' ? (window as any) : undefined;
		const tg = w?.Telegram?.WebApp;
		if (tg) {
			tg.ready();
			tg.expand();
		}
	}, []);

	const onOpenItem = (item: CatalogItem) => {
		setActive(item);
		setDialogOpen(true);
	};

	return (
		<div className="space-y-3">
			<SearchBar
				search={search}
				onSearchChange={setSearch}
				brands={brands}
				brand={brand}
				onBrandChange={(b) => setBrand(b as any)}
				onOpenFilters={() => setFiltersOpen(true)}
				onOpenSort={() => setSortOpen((v) => !v)}
			/>

			{/* Sort menu */}
			{sortOpen && (
				<div className="relative">
					<div className="absolute z-40 mt-1 rounded-lg border bg-card shadow p-2 flex gap-2">
						<button className={`px-3 py-1 rounded-md border ${sort === 'newest' ? 'border-brand bg-brand/10' : ''}`} onClick={() => { setSort('newest'); setSortOpen(false); }}>Новизне</button>
						<button className={`px-3 py-1 rounded-md border ${sort === 'priceAsc' ? 'border-brand bg-brand/10' : ''}`} onClick={() => { setSort('priceAsc'); setSortOpen(false); }}>Цена ↑</button>
						<button className={`px-3 py-1 rounded-md border ${sort === 'priceDesc' ? 'border-brand bg-brand/10' : ''}`} onClick={() => { setSort('priceDesc'); setSortOpen(false); }}>Цена ↓</button>
					</div>
				</div>
			)}

			<CatalogGrid items={items} isLoading={isLoading} onOpenItem={onOpenItem} contactUrl={contactUrl} />

			<ProductDialog open={dialogOpen} onClose={() => setDialogOpen(false)} item={active} contactUrl={contactUrl} />

			<FiltersSheet open={filtersOpen} onClose={() => setFiltersOpen(false)} filters={filters} setFilters={setFilters} resetFilters={resetFilters} />
		</div>
	);
}