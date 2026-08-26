import type { HeatingType, PropertyFeatureFlags, PropertyStatus } from '@/domain/property';

export type AmenityKey = keyof PropertyFeatureFlags;

export interface AmenityMeta {
  key: AmenityKey;
  label: string;
}

export const AMENITIES: readonly AmenityMeta[] = [
  { key: 'parking', label: 'Parking' },
  { key: 'elevator', label: 'Lift' },
  { key: 'balcony', label: 'Balkon/Terasa' },
  { key: 'furnished', label: 'Namešteno' },
  { key: 'petFriendly', label: 'Kućni ljubimci' },
  { key: 'newConstruction', label: 'Novogradnja' },
  { key: 'registered', label: 'Uknjiženo' },
];

export const HEATING_LABEL: Record<HeatingType, string> = {
  central: 'Centralno',
  gas: 'Gas',
  electric: 'Struja',
  'heat-pump': 'Toplotna pumpa',
  wood: 'Drva/Pelet',
  none: 'Bez grejanja',
};

export const STATUS_LABEL: Record<PropertyStatus, string> = {
  new: 'Novo',
  'for-sale': 'Na prodaju',
  'for-rent': 'Za izdavanje',
  pending: 'Rezervisano',
  sold: 'Prodato',
  rented: 'Izdato',
};
