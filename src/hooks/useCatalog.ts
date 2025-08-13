"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase';
import { CatalogItem, DatabaseItem, FiltersState, SortOption } from '@/lib/types';
import { genderLabel, splitPhotos, inSizeBucket } from '@/lib/ui';

const BRANDS = ['All','Adidas','Nike','Puma','Mizuno','Vans','Converse','Saucony','Asics','Reebok'] as const;
export type BrandFilter = typeof BRANDS[number];

function toCatalogItem(row: DatabaseItem): CatalogItem {
	const photos = splitPhotos(row.photos);
	const coverUrl = row.cover && row.cover.trim().length > 0 ? row.cover : (photos[0] ?? null);
	return {
		id: row.id,
		createdAt: new Date(row.created_at),
		brand: row.brand,
		model: row.model,
		genderRaw: row.gender,
		genderLabel: genderLabel(row.gender),
		sizeEu: row.size_eu,
		price: row.price,
		coverUrl,
		photoUrls: photos,
		description: row.description,
	};
}

export function useCatalog() {
	const [isLoading, setIsLoading] = useState(true);
	const [items, setItems] = useState<CatalogItem[]>([]);

	const [search, setSearch] = useState('');
	const [brand, setBrand] = useState<BrandFilter>('All');
	const [filters, setFilters] = useState<FiltersState>({ gender: null, sizeBucket: null, priceMin: null, priceMax: null });
	const [sort, setSort] = useState<SortOption>('newest');

	const searchRef = useRef(search);
	useEffect(() => { searchRef.current = search; }, [search]);

	useEffect(() => {
		let mounted = true;
		setIsLoading(true);
		(async () => {
			try {
				const { data, error } = await getSupabaseClient()
					.from('vinstory')
					.select('*')
					.order('id', { ascending: false });
				if (!mounted) return;
				if (error) {
					console.error(error);
					setItems([]);
				} else {
					setItems((data ?? []).map(toCatalogItem));
				}
			} catch (err) {
				console.error(err);
				if (mounted) setItems([]);
			} finally {
				if (mounted) setIsLoading(false);
			}
		})();
		return () => { mounted = false; };
	}, []);

	const setFiltersPartial = useCallback((next: Partial<FiltersState>) => {
		setFilters((prev) => ({ ...prev, ...next }));
	}, []);

	const resetFilters = useCallback(() => {
		setFilters({ gender: null, sizeBucket: null, priceMin: null, priceMax: null });
	}, []);

	const filtered = useMemo(() => {
		const q = search.trim().toLowerCase();
		let result = items.filter((it) => {
			// Brand chip filter
			if (brand !== 'All' && it.brand.toLowerCase() !== brand.toLowerCase()) return false;
			// Search
			if (q.length > 0) {
				const hay = `${it.brand} ${it.model} ${it.description ?? ''}`.toLowerCase();
				if (!hay.includes(q)) return false;
			}
			// Filters: gender
			if (filters.gender) {
				const g = filters.gender;
				const raw = (it.genderRaw ?? '').toLowerCase();
				if (g === 'm' && !(raw.startsWith('m') || raw.includes('м'))) return false;
				if (g === 'w' && !(raw.startsWith('w') || raw.includes('ж'))) return false;
				if (g === 'unisex' && (raw.startsWith('m') || raw.includes('м') || raw.startsWith('w') || raw.includes('ж'))) return false;
			}
			// Size bucket
			if (!inSizeBucket(it.sizeEu, filters.sizeBucket)) return false;
			// Price range
			if (filters.priceMin != null && (it.price ?? Infinity) < filters.priceMin) return false;
			if (filters.priceMax != null && (it.price ?? -Infinity) > filters.priceMax) return false;
			return true;
		});

		if (sort === 'newest') {
			result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
		} else if (sort === 'priceAsc') {
			result.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
		} else if (sort === 'priceDesc') {
			result.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
		}
		return result;
	}, [items, search, brand, filters, sort]);

	return {
		isLoading,
		items: filtered,
		allItems: items,
		search,
		setSearch,
		brand,
		setBrand,
		filters,
		setFilters: setFiltersPartial,
		resetFilters,
		sort,
		setSort,
		brands: BRANDS,
	};
}