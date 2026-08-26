export type ListingIntent = 'sale' | 'rent';

export type PropertyCategory =
  | 'apartment'
  | 'house'
  | 'land'
  | 'commercial'
  | 'garage';

export type PropertyStatus =
  | 'new'
  | 'for-sale'
  | 'for-rent'
  | 'pending'
  | 'sold'
  | 'rented';

export type HeatingType =
  | 'central'
  | 'gas'
  | 'electric'
  | 'heat-pump'
  | 'wood'
  | 'none';

export interface Money {
  amount: number;
  currency: 'RSD' | 'EUR';
}

export interface GeoLocation {
  city: string;
  municipality?: string;
  neighborhood?: string;
  addressLine?: string;
  lat?: number;
  lng?: number;
}

export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  isCover: boolean;
  order: number;
}

export interface PropertyFeatureFlags {
  parking: boolean;
  elevator: boolean;
  balcony: boolean;
  furnished: boolean;
  petFriendly: boolean;
  newConstruction: boolean;
  registered: boolean;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  phone: string;
  whatsapp?: string;
  viber?: string;
  email: string;
  avatarUrl?: string;
  agency: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: PropertyCategory;
  intent: ListingIntent;
  status: PropertyStatus;
  price: Money;
  pricePerSqm?: Money;
  areaSqm: number;
  landAreaSqm?: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  floor?: number;
  totalFloors?: number;
  yearBuilt?: number;
  heating?: HeatingType;
  energyClass?: string;
  features: PropertyFeatureFlags;
  location: GeoLocation;
  images: PropertyImage[];
  floorPlanUrl?: string;
  agent: Agent;
  publishedAt: string;
  updatedAt: string;
  approvedAt?: string;
  viewsCount?: number;
  isFeatured: boolean;
  isBookmarked?: boolean;
}
