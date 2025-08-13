"use client";

import { Badge } from '@/components/ui/Badge';

export type BrandChipsProps = {
	brands: readonly string[];
	value: string;
	onChange: (brand: string) => void;
};

export default function BrandChips({ brands, value, onChange }: BrandChipsProps) {
	return (
		<div className="overflow-x-auto no-scrollbar">
			<div className="flex items-center gap-2 py-2">
				{brands.map((b) => (
					<button key={b} onClick={() => onChange(b)} className="shrink-0">
						<Badge selected={value === b} clickable>{b}</Badge>
					</button>
				))}
			</div>
		</div>
	);
}