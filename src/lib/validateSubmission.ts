import type {
  SubmissionDraft,
  SubmissionFieldErrors,
  SubmissionStepId,
} from '@/domain/submission';
import { validateOptionalEmail, validateName, validatePhone } from './validateLeadForm';

const MIN_DESCRIPTION_LENGTH = 60;
const MIN_PHOTOS = 1;

export function validateBasicInfo(draft: SubmissionDraft): SubmissionFieldErrors {
  const errors: SubmissionFieldErrors = {};
  const basic = draft.basicInfo;

  if (!basic.category) errors.category = 'Izaberite vrstu nekretnine.';
  if (!basic.intent) errors.intent = 'Izaberite da li se prodaje ili izdaje.';
  if (basic.title.trim().length < 5) {
    errors.title = 'Naslov mora imati najmanje 5 znakova.';
  }
  if (basic.areaSqm == null || basic.areaSqm <= 0) {
    errors.areaSqm = 'Unesite kvadraturu veću od nule.';
  }
  if (basic.priceAmount == null || basic.priceAmount <= 0) {
    errors.priceAmount = 'Unesite cenu veću od nule.';
  }
  if (basic.location.trim().length < 2) {
    errors.location = 'Unesite grad ili naselje.';
  }

  return errors;
}

export function validatePhotosDescription(draft: SubmissionDraft): SubmissionFieldErrors {
  const errors: SubmissionFieldErrors = {};

  if (draft.photosDescription.photos.length < MIN_PHOTOS) {
    errors.photos = 'Dodajte najmanje jednu fotografiju nekretnine.';
  }
  if (draft.photosDescription.description.trim().length < MIN_DESCRIPTION_LENGTH) {
    errors.description = `Opis mora imati najmanje ${MIN_DESCRIPTION_LENGTH} znakova.`;
  }

  return errors;
}

export function validateContactPayment(draft: SubmissionDraft): SubmissionFieldErrors {
  const errors: SubmissionFieldErrors = {};
  const contact = draft.contactPayment;

  const nameError = validateName(contact.ownerName);
  if (nameError) errors.ownerName = nameError;

  const phoneError = validatePhone(contact.ownerPhone);
  if (phoneError) errors.ownerPhone = phoneError;

  const emailError = validateOptionalEmail(contact.ownerEmail);
  if (emailError) errors.ownerEmail = emailError;

  if (!contact.paymentAcknowledged) {
    errors.paymentAcknowledged =
      'Potvrdite da prihvatate objavu od 5.000 RSD na 30 dana nakon odobrenja oglasa.';
  }
  if (!contact.dataConsent) {
    errors.dataConsent = 'Potrebna je saglasnost za obradu podataka vlasnika nekretnine.';
  }

  return errors;
}

export function validateSubmissionStep(
  step: SubmissionStepId,
  draft: SubmissionDraft,
): SubmissionFieldErrors {
  switch (step) {
    case 'basic-info':
      return validateBasicInfo(draft);
    case 'photos-description':
      return validatePhotosDescription(draft);
    case 'contact-payment':
      return validateContactPayment(draft);
  }
}

export function validateSubmissionDraft(
  draft: SubmissionDraft,
): { errors: SubmissionFieldErrors; isValid: boolean } {
  const errors: SubmissionFieldErrors = {
    ...validateBasicInfo(draft),
    ...validatePhotosDescription(draft),
    ...validateContactPayment(draft),
  };
  return { errors, isValid: Object.keys(errors).length === 0 };
}
