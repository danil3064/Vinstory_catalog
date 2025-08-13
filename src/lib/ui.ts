export function splitPhotos(input: string | null | undefined): string[] {
	if (!input) return [];
	return input
		.split(/[;,]\s*/)
		.map((s) => s.trim())
		.filter(Boolean);
}

export function genderLabel(raw: string | null | undefined): string {
	if (!raw) return 'Унисекс';
	const r = raw.toLowerCase();
	if (r.startsWith('m') || r.includes('м')) return 'Мужские';
	if (r.startsWith('w') || r.includes('ж')) return 'Женские';
	return 'Унисекс';
}

export function formatPrice(value: number | null | undefined): string {
	if (value == null) return '';
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		maximumFractionDigits: 0,
	}).format(value);
}

export function inSizeBucket(size: number | null | undefined, bucket: number | null | undefined): boolean {
	if (bucket == null) return true;
	if (size == null) return false;
	return Math.abs(size - bucket) <= 0.5;
}