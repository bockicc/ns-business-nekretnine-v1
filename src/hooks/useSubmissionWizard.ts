import { useCallback, useState } from 'react';
import type {
  SubmittedListingSummary,
  SubmissionContactPayment,
  SubmissionDraft,
  SubmissionFieldErrors,
  SubmissionPhotosDescription,
  SubmissionBasicInfo,
  SubmissionStepId,
} from '@/domain/submission';
import { validateSubmissionStep } from '@/lib/validateSubmission';
import { siteConfig } from '@/data/site';
import type { SubmitStatus } from '@/domain/lead';

export const SUBMISSION_STEPS: readonly {
  id: SubmissionStepId;
  title: string;
  description: string;
}[] = [
  {
    id: 'basic-info',
    title: 'Osnovni podaci',
    description: 'Vrsta nekretnine, kvadratura, cena i lokacija.',
  },
  {
    id: 'photos-description',
    title: 'Fotografije i opis',
    description: 'Do 12 fotografija i tekst oglasa.',
  },
  {
    id: 'contact-payment',
    title: 'Kontakt i objava',
    description: 'Podaci za kontakt i potvrda objave od 5.000 RSD.',
  },
];

export function createEmptySubmissionDraft(): SubmissionDraft {
  return {
    basicInfo: {
      category: '',
      intent: '',
      title: '',
      areaSqm: null,
      landAreaSqm: null,
      rooms: null,
      bedrooms: null,
      bathrooms: null,
      floor: null,
      yearBuilt: null,
      heating: '',
      location: '',
      addressLine: '',
      priceAmount: null,
      priceCurrency: 'EUR',
    },
    photosDescription: { photos: [], description: '' },
    contactPayment: {
      ownerName: '',
      ownerPhone: '',
      ownerEmail: '',
      preferredChannel: 'phone',
      paymentAcknowledged: false,
      dataConsent: false,
    },
  };
}

export function useSubmissionWizard() {
  const [draft, setDraft] = useState<SubmissionDraft>(createEmptySubmissionDraft);
  const [stepIndex, setStepIndex] = useState(0);
  const [stepErrors, setStepErrors] = useState<Partial<Record<SubmissionStepId, SubmissionFieldErrors>>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [result, setResult] = useState<SubmittedListingSummary | null>(null);

  const patchBasicInfo = useCallback((patch: Partial<SubmissionBasicInfo>): void => {
    setDraft((previous) => ({ ...previous, basicInfo: { ...previous.basicInfo, ...patch } }));
  }, []);

  const patchPhotosDescription = useCallback(
    (patch: Partial<SubmissionPhotosDescription>): void => {
      setDraft((previous) => ({
        ...previous,
        photosDescription: { ...previous.photosDescription, ...patch },
      }));
    },
    [],
  );

  const patchContactPayment = useCallback(
    (patch: Partial<SubmissionContactPayment>): void => {
      setDraft((previous) => ({
        ...previous,
        contactPayment: { ...previous.contactPayment, ...patch },
      }));
    },
    [],
  );

  const runValidation = useCallback(
    (index: number): boolean => {
      const step = SUBMISSION_STEPS[index];
      if (!step) return true;
      const errors = validateSubmissionStep(step.id, draft);
      setStepErrors((previous) => ({ ...previous, [step.id]: errors }));
      return Object.keys(errors).length === 0;
    },
    [draft],
  );

  const goToStep = useCallback(
    (index: number): void => {
      const clamped = Math.min(Math.max(0, index), SUBMISSION_STEPS.length - 1);
      if (clamped > stepIndex && !runValidation(stepIndex)) return;
      setStepIndex(clamped);
    },
    [runValidation, stepIndex],
  );

  const next = useCallback((): void => {
    if (!runValidation(stepIndex)) return;
    setStepIndex((previous) => Math.min(previous + 1, SUBMISSION_STEPS.length - 1));
  }, [runValidation, stepIndex]);

  const back = useCallback((): void => {
    setStepIndex((previous) => Math.max(previous - 1, 0));
  }, []);

  const submit = useCallback(async (): Promise<boolean> => {
    if (!runValidation(SUBMISSION_STEPS.length - 1)) return false;
    setStatus('submitting');
    await new Promise((resolve) => setTimeout(resolve, 900));
    setResult({
      referenceCode: `NS-2026-${String(Math.floor(1000 + Math.random() * 9000))}`,
      reviewWindowHours: siteConfig.reviewWindowHours,
      fee: { ...siteConfig.listingFee },
    });
    setStatus('success');
    return true;
  }, [runValidation]);

  const reset = useCallback((): void => {
    setDraft(createEmptySubmissionDraft());
    setStepIndex(0);
    setStepErrors({});
    setStatus('idle');
    setResult(null);
  }, []);

  return {
    draft,
    stepIndex,
    currentStep: SUBMISSION_STEPS[stepIndex],
    stepErrors,
    status,
    result,
    isFirstStep: stepIndex === 0,
    isLastStep: stepIndex === SUBMISSION_STEPS.length - 1,
    patchBasicInfo,
    patchPhotosDescription,
    patchContactPayment,
    goToStep,
    next,
    back,
    submit,
    reset,
  };
}
