"use client";

import { useMemo } from 'react';
import { Sheet } from '@/components/ui/Sheet';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FiltersState, GenderFilter } from '@/lib/types';

export type FiltersSheetProps = {
	open: boolean;
	onClose: () => void;
	filters: FiltersState;
	setFilters: (next: Partial<FiltersState>) => void;
	resetFilters: () => void;
};

const sizeBuckets = Array.from({ length: 15 }, (_, i) => 35 + i); // 35..49

export default function FiltersSheet({ open, onClose, filters, setFilters, resetFilters }: FiltersSheetProps) {
	const genderOptions: { key: GenderFilter; label: string }[] = useMemo(
		() => [
			{ key: null, label: 'Любой' },
			{ key: 'm', label: 'Мужские' },
			{ key: 'w', label: 'Женские' },
			{ key: 'unisex', label: 'Унисекс' },
		],
		[],
	);

	return (
		<Sheet open={open} onClose={onClose} title="Фильтры">
			<div className="space-y-4">
				<section className="space-y-2">
					<div className="text-sm font-medium">Пол</div>
					<div className="flex gap-2 flex-wrap">
						{genderOptions.map((g) => (
							<button key={String(g.key)} onClick={() => setFilters({ gender: g.key })} className={
								`px-3 py-1 rounded-full border text-sm ${filters.gender === g.key ? 'border-brand bg-brand/10' : 'bg-card'}`
							}>
								{g.label}
							</button>
						))}
					</div>
				</section>

				<section className="space-y-2">
					<div className="text-sm font-medium">Размер (EU)</div>
					<div className="grid grid-cols-8 gap-2">
						{sizeBuckets.map((n) => (
							<button key={n} onClick={() => setFilters({ sizeBucket: filters.sizeBucket === n ? null : n })} className={
								`rounded-md border px-2 py-1 text-sm ${filters.sizeBucket === n ? 'border-brand bg-brand/10' : 'bg-card'}`
							}>
								{n}
							</button>
						))}
					</div>
					<div className="text-xs text-muted">Выбранное целое включает N±0.5</div>
				</section>

				<section className="space-y-2">
					<div className="text-sm font-medium">Цена</div>
					<div className="grid grid-cols-2 gap-2">
						<Input type="number" placeholder="от" value={filters.priceMin ?? ''} onChange={(e) => setFilters({ priceMin: e.target.value ? Number(e.target.value) : null })} />
						<Input type="number" placeholder="до" value={filters.priceMax ?? ''} onChange={(e) => setFilters({ priceMax: e.target.value ? Number(e.target.value) : null })} />
					</div>
				</section>

				<div className="flex items-center justify-between gap-3 pt-2">
					<Button variant="ghost" onClick={resetFilters}>Сброс</Button>
					<Button onClick={onClose}>Готово</Button>
				</div>
			</div>
		</Sheet>
	);
}