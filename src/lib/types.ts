export type DatabaseItem = {
	id: number;
	created_at: string;
	brand: string;
	model: string;
	gender: string | null;
	size_eu: number | null;
	price: number | null;
	cover: string | null;
	photos: string | null;
	description: string | null;
};

export type CatalogItem = {
	id: number;
	createdAt: Date;
	brand: string;
	model: string;
	genderRaw: string | null;
	genderLabel: string;
	sizeEu: number | null;
	price: number | null;
	coverUrl: string | null;
	photoUrls: string[];
	description: string | null;
};

export type GenderFilter = 'm' | 'w' | 'unisex' | null;

export type SortOption = 'priceAsc' | 'priceDesc' | 'newest';

export type FiltersState = {
	gender: GenderFilter;
	sizeBucket: number | null;
	priceMin: number | null;
	priceMax: number | null;
};