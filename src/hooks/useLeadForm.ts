import { useCallback, useState } from 'react';
import type {
  ContactLeadPayload,
  FormFieldState,
  LeadFormState,
  LeadChannel,
  SubmitStatus,
} from '@/domain/lead';
import { validateLeadForm, validateLeadField } from '@/lib/validateLeadForm';
import type { LeadFieldErrors } from '@/lib/validateLeadForm';

type ValidatableLeadField = Extract<keyof ContactLeadPayload, keyof LeadFieldErrors>;

function isValidatableField(field: keyof ContactLeadPayload): field is ValidatableLeadField {
  return (
    field === 'name' ||
    field === 'phone' ||
    field === 'email' ||
    field === 'message' ||
    field === 'consent'
  );
}

function emptyField<T>(value: T): FormFieldState<T> {
  return { value, touched: false, error: null };
}

export function initialLeadFields(
  initial?: Partial<Pick<ContactLeadPayload, 'message' | 'propertyId'>>,
): LeadFormState {
  return {
    name: emptyField(''),
    phone: emptyField(''),
    email: emptyField(''),
    message: emptyField(initial?.message ?? ''),
    propertyId: emptyField(initial?.propertyId),
    consent: emptyField(false),
    channelPreference: emptyField<LeadChannel>('phone'),
  };
}

async function simulateSubmit(_payload: ContactLeadPayload): Promise<{ receivedAt: string }> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { receivedAt: new Date().toISOString() };
}

interface UseLeadFormOptions {
  initial?: Partial<Pick<ContactLeadPayload, 'message' | 'propertyId'>>;
  onSubmitSuccess?: () => void;
}

export function useLeadForm({ initial, onSubmitSuccess }: UseLeadFormOptions = {}) {
  const [fields, setFields] = useState<LeadFormState>(() => initialLeadFields(initial));
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleChange = useCallback(
    <K extends keyof ContactLeadPayload>(field: K, value: ContactLeadPayload[K]): void => {
      setFields((previous) => {
        const current = previous[field];
        const shouldValidate = current.touched;
        const error =
          shouldValidate && isValidatableField(field) ? validateLeadField(field, value) : null;
        return { ...previous, [field]: { ...current, value, error } };
      });
      if (status === 'success') setStatus('idle');
    },
    [status],
  );

  const handleBlur = useCallback(
    <K extends keyof ContactLeadPayload>(field: K): void => {
      setFields((previous) => {
        const current = previous[field];
        const error = isValidatableField(field)
          ? validateLeadField(field, current.value)
          : null;
        return { ...previous, [field]: { ...current, touched: true, error } };
      });
    },
    [],
  );

  const handleSubmit = useCallback(async (): Promise<boolean> => {
    setStatus('validating');
    const { errors, isValid } = validateLeadForm(fields);

    if (!isValid) {
      setFields((previous) => ({
        ...previous,
        name:
          errors.name !== undefined
            ? { ...previous.name, touched: true, error: errors.name }
            : previous.name,
        phone:
          errors.phone !== undefined
            ? { ...previous.phone, touched: true, error: errors.phone }
            : previous.phone,
        email:
          errors.email !== undefined
            ? { ...previous.email, touched: true, error: errors.email }
            : previous.email,
        message:
          errors.message !== undefined
            ? { ...previous.message, touched: true, error: errors.message }
            : previous.message,
        consent:
          errors.consent !== undefined
            ? { ...previous.consent, touched: true, error: errors.consent }
            : previous.consent,
      }));
      setStatus('idle');
      return false;
    }

    setStatus('submitting');
    try {
      await simulateSubmit(buildPayload(fields));
      setStatus('success');
      onSubmitSuccess?.();
      return true;
    } catch {
      setStatus('error');
      return false;
    }
  }, [fields, onSubmitSuccess]);

  const resetForm = useCallback((): void => {
    setFields(initialLeadFields(initial));
    setStatus('idle');
  }, [initial]);

  return { fields, status, handleChange, handleBlur, handleSubmit, resetForm };
}

function buildPayload(fields: LeadFormState): ContactLeadPayload {
  return {
    name: fields.name.value.trim(),
    phone: fields.phone.value.trim(),
    email: fields.email.value?.trim() || undefined,
    message: fields.message.value.trim(),
    propertyId: fields.propertyId.value?.trim() || undefined,
    consent: fields.consent.value,
    channelPreference: fields.channelPreference.value,
  };
}
