export type LeadChannel = 'phone' | 'whatsapp' | 'viber' | 'email' | 'form';

export interface ContactLeadPayload {
  name: string;
  phone: string;
  email?: string;
  message: string;
  propertyId?: string;
  consent: boolean;
  channelPreference: LeadChannel;
}

export type FormFieldState<T> = {
  value: T;
  touched: boolean;
  error: string | null;
};

export type LeadFormState = {
  [K in keyof ContactLeadPayload]-?: FormFieldState<ContactLeadPayload[K]>;
};

export type SubmitStatus = 'idle' | 'validating' | 'submitting' | 'success' | 'error';
