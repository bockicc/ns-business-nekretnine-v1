import type { ListingIntent, PropertyCategory } from './property';

export type SubmissionStepId = 'basic-info' | 'photos-description' | 'contact-payment';

export interface SubmissionPhotoDraft {
  id: string;
  name: string;
  previewUrl: string;
  sizeBytes: number;
}

export interface SubmissionBasicInfo {
  category: PropertyCategory | '';
  intent: ListingIntent | '';
  title: string;
  areaSqm: number | null;
  landAreaSqm: number | null;
  rooms: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  floor: number | null;
  yearBuilt: number | null;
  heating: string;
  location: string;
  addressLine: string;
  priceAmount: number | null;
  priceCurrency: 'RSD' | 'EUR';
}

export interface SubmissionPhotosDescription {
  photos: SubmissionPhotoDraft[];
  description: string;
}

export interface SubmissionContactPayment {
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  preferredChannel: 'phone' | 'whatsapp' | 'viber' | 'email';
  paymentAcknowledged: boolean;
  dataConsent: boolean;
}

export interface SubmissionDraft {
  basicInfo: SubmissionBasicInfo;
  photosDescription: SubmissionPhotosDescription;
  contactPayment: SubmissionContactPayment;
}

export type SubmissionFieldErrors = Partial<
  Record<
    | 'category'
    | 'intent'
    | 'title'
    | 'areaSqm'
    | 'priceAmount'
    | 'location'
    | 'photos'
    | 'description'
    | 'ownerName'
    | 'ownerPhone'
    | 'ownerEmail'
    | 'paymentAcknowledged'
    | 'dataConsent',
    string
  >
>;

export interface SubmissionValidationResult {
  errors: SubmissionFieldErrors;
  isValid: boolean;
}

export interface SubmittedListingSummary {
  referenceCode: string;
  reviewWindowHours: string;
  fee: { amount: number; currency: 'RSD'; periodDays: number };
}
