import type { PropertyCategory } from '@/domain/property';

export interface CategoryMeta {
  value: PropertyCategory;
  label: string;
  singular: string;
  countForm: string;
}

export const CATEGORIES: readonly CategoryMeta[] = [
  { value: 'apartment', label: 'Stanovi', singular: 'Stan', countForm: 'stanova' },
  { value: 'house', label: 'Kuće', singular: 'Kuća', countForm: 'kuća' },
  { value: 'land', label: 'Placevi', singular: 'Plac', countForm: 'placeva' },
  { value: 'commercial', label: 'Lokali', singular: 'Lokal', countForm: 'lokala' },
  { value: 'garage', label: 'Garaže', singular: 'Garaža', countForm: 'garaža' },
];

export const CATEGORY_LABEL: Record<PropertyCategory, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.value, c.label]),
) as Record<PropertyCategory, string>;

export const CATEGORY_SINGULAR: Record<PropertyCategory, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.value, c.singular]),
) as Record<PropertyCategory, string>;
