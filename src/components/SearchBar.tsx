"use client";

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import BrandChips from '@/components/BrandChips';

export type SearchBarProps = {
	search: string;
	onSearchChange: (q: string) => void;
	brands: string[];
	brand: string;
	onBrandChange: (b: string) => void;
	onOpenFilters: () => void;
	onOpenSort: () => void;
};

export default function SearchBar({ search, onSearchChange, brands, brand, onBrandChange, onOpenFilters, onOpenSort }: SearchBarProps) {
	const [local, setLocal] = useState(search);

	useEffect(() => setLocal(search), [search]);

	useEffect(() => {
		const id = setTimeout(() => {
			if (local !== search) onSearchChange(local);
		}, 250);
		return () => clearTimeout(id);
	}, [local, search, onSearchChange]);

	return (
		<div className="space-y-2">
			<div className="flex items-center gap-2">
				<div className="flex-1"><Input placeholder="Поиск" value={local} onChange={(e) => setLocal(e.target.value)} /></div>
				<Button onClick={() => onSearchChange(local)} aria-label="Поиск">Поиск</Button>
			</div>
			<div className="flex items-center gap-2">
				<Button variant="outline" onClick={onOpenFilters}>Фильтры</Button>
				<Button variant="outline" onClick={onOpenSort}>Сортировка</Button>
			</div>
			<BrandChips brands={brands} value={brand} onChange={onBrandChange} />
		</div>
	);
}