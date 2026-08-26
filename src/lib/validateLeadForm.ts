import type { LeadFormState } from '@/domain/lead';

export interface LeadFieldErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  consent?: string;
}

export const CONSENT_REQUIRED_MESSAGE = 'Potrebno je da potvrdite saglasnost pre slanja.';

const normalizedPhone = (value: string): string => value.replace(/[\s\-()./]/g, '');

export function validateName(value: string): string | null {
  if (value.trim().length < 2) return 'Unesite ime i prezime (najmanje 2 znaka).';
  return null;
}

export function validatePhone(value: string): string | null {
  if (!/^(\+381|00381|0)6\d{7,8}$/.test(normalizedPhone(value))) {
    return 'Unesite ispravan broj telefona (npr. 066/272-410).';
  }
  return null;
}

export function validateOptionalEmail(value: string): string | null {
  if (value.trim().length === 0) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) {
    return 'Unesite ispravnu email adresu.';
  }
  return null;
}

export function validateMessage(value: string): string | null {
  if (value.trim().length < 10) return 'Poruka mora imati najmanje 10 znakova.';
  return null;
}

export function validateConsent(checked: boolean): string | null {
  if (!checked) return CONSENT_REQUIRED_MESSAGE;
  return null;
}

export function validateLeadField(
  field: keyof LeadFieldErrors,
  value: unknown,
): string | null {
  switch (field) {
    case 'name':
      return validateName(value as string);
    case 'phone':
      return validatePhone(value as string);
    case 'email':
      return validateOptionalEmail(value as string);
    case 'message':
      return validateMessage(value as string);
    case 'consent':
      return validateConsent(Boolean(value));
    default:
      return null;
  }
}

export function validateLeadForm(
  fields: LeadFormState,
): { errors: LeadFieldErrors; isValid: boolean } {
  const errors: LeadFieldErrors = {};
  const nameError = validateName(fields.name.value);
  if (nameError) errors.name = nameError;
  const phoneError = validatePhone(fields.phone.value);
  if (phoneError) errors.phone = phoneError;
  const emailError = validateOptionalEmail(fields.email?.value ?? '');
  if (emailError) errors.email = emailError;
  const messageError = validateMessage(fields.message.value);
  if (messageError) errors.message = messageError;
  const consentError = validateConsent(fields.consent.value);
  if (consentError) errors.consent = consentError;

  return { errors, isValid: Object.keys(errors).length === 0 };
}
