import { useState } from 'react';
import { Send } from 'lucide-react';
import type { LeadChannel } from '@/domain/lead';
import { useLeadForm } from '@/hooks/useLeadForm';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { ConsentCheckbox } from './ConsentCheckbox';
import { FormErrorBanner } from './FormErrorBanner';
import { FormField, FormTextareaField } from './FormField';
import { FormSuccessPanel } from './FormSuccessPanel';

const CHANNEL_OPTIONS: { value: LeadChannel; label: string }[] = [
  { value: 'phone', label: 'Poziv na telefon' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'viber', label: 'Viber' },
  { value: 'email', label: 'Email' },
];

export function LeadForm({
  propertyId,
  propertyTitle,
}: {
  propertyId?: string;
  propertyTitle?: string;
}) {
  const { fields, status, handleChange, handleBlur, handleSubmit, resetForm } = useLeadForm({
    initial: { message: propertyTitle ? `Zainteresovan sam za „${propertyTitle}".` : '', propertyId },
  });
  const [showErrors, setShowErrors] = useState(false);

  if (status === 'success') {
    return (
      <FormSuccessPanel
        title="Upit je poslat"
        description="Hvala na javljanju! Naš agent će vas kontaktirati u najkraćem mogućem roku radnim danom."
        onReset={resetForm}
      />
    );
  }

  const hasBlockingErrors =
    Boolean(fields.name.error) ||
    Boolean(fields.phone.error) ||
    Boolean(fields.email.error) ||
    Boolean(fields.message.error) ||
    Boolean(fields.consent.error);

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setShowErrors(true);
        void handleSubmit();
      }}
      className="space-y-5"
    >
      <h2 className="font-display text-xl font-medium text-primary-900">
        {propertyId ? 'Upit za ovu nekretninu' : 'Pošaljite upit'}
      </h2>

      {showErrors && status === 'idle' && hasBlockingErrors ? (
        <FormErrorBanner message="Proverite označena polja i pokušajte ponovo." />
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="ime"
          label="Ime i prezime"
          required
          autoComplete="name"
          placeholder="npr. Ana Anić"
          value={fields.name.value}
          onChange={(value) => handleChange('name', value)}
          onBlur={() => handleBlur('name')}
          error={fields.name.touched ? fields.name.error : null}
        />
        <FormField
          id="telefon"
          label="Telefon"
          type="tel"
          required
          autoComplete="tel"
          placeholder="066/272-410"
          value={fields.phone.value}
          onChange={(value) => handleChange('phone', value)}
          onBlur={() => handleBlur('phone')}
          error={fields.phone.touched ? fields.phone.error : null}
        />
      </div>
      <FormField
        id="email-upit"
        label="Email (opciono)"
        type="email"
        autoComplete="email"
        placeholder="vas@email.com"
        value={fields.email.value ?? ''}
        onChange={(value) => handleChange('email', value)}
        onBlur={() => handleBlur('email')}
        error={fields.email.touched ? fields.email.error : null}
      />
      <FormTextareaField
        id="poruka"
        label={propertyId ? 'Poruka agentu' : 'Poruka'}
        required
        rows={propertyId ? 4 : 6}
        value={fields.message.value}
        onChange={(value) => handleChange('message', value)}
        onBlur={() => handleBlur('message')}
        error={fields.message.touched ? fields.message.error : null}
      />

      {!propertyId ? (
        <div className="max-w-xs">
          <label
            htmlFor="kanal"
            className="mb-1.5 block text-sm font-semibold text-neutral-900"
          >
            Preferirani kanal kontakta
          </label>
          <Select
            id="kanal"
            ariaLabel="Preferirani kanal kontakta"
            options={CHANNEL_OPTIONS}
            value={fields.channelPreference.value}
            onValueChange={(value) => handleChange('channelPreference', value as LeadChannel)}
          />
        </div>
      ) : null}

      <ConsentCheckbox
        name="saglasnost"
        checked={fields.consent.value}
        onChange={(checked) => handleChange('consent', checked)}
        onBlur={() => handleBlur('consent')}
        error={fields.consent.touched ? fields.consent.error : null}
      />

      <Button type="submit" size="lg" disabled={status === 'submitting' || status === 'validating'} className="w-full sm:w-auto">
        {status === 'submitting' || status === 'validating' ? (
          <>
            <Spinner className="size-4 animate-spin text-white" />
            Šaljemo…
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" />
            Pošaljite upit
          </>
        )}
      </Button>

      <p aria-live="polite" className="sr-only">
        {status === 'submitting' ? 'Slanje u toku.' : ''}
        {status === 'error' ? 'Došlo je do greške pri slanju. Pokušajte ponovo ili nas pozovite telefonom.' : ''}
      </p>
    </form>
  );
}
