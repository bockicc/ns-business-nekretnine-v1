import type { SubmissionContactPayment } from '@/domain/submission';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField } from '@/components/lead/FormField';
import { PricingCallout } from './PricingCallout';

interface FieldErrors {
  ownerName?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  paymentAcknowledged?: string;
  dataConsent?: string;
}

const CHANNEL_OPTIONS = [
  { value: 'phone', label: 'Telefon' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'viber', label: 'Viber' },
  { value: 'email', label: 'Email' },
] as const;

export function StepContactPayment({
  contactPayment,
  errors,
  onPatch,
}: {
  contactPayment: SubmissionContactPayment;
  errors: FieldErrors;
  onPatch: (patch: Partial<SubmissionContactPayment>) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="vlasnik-ime"
          label="Ime i prezime"
          required
          autoComplete="name"
          value={contactPayment.ownerName}
          onChange={(value) => onPatch({ ownerName: value })}
          error={errors.ownerName}
        />
        <FormField
          id="vlasnik-telefon"
          label="Telefon"
          type="tel"
          required
          autoComplete="tel"
          placeholder="066/272-410"
          value={contactPayment.ownerPhone}
          onChange={(value) => onPatch({ ownerPhone: value })}
          error={errors.ownerPhone}
        />
      </div>
      <FormField
        id="vlasnik-email"
        label="Email (opciono)"
        type="email"
        autoComplete="email"
        value={contactPayment.ownerEmail}
        onChange={(value) => onPatch({ ownerEmail: value })}
        error={errors.ownerEmail}
      />

      <div className="max-w-xs">
        <label htmlFor="kanal-kontakta" className="mb-1.5 block text-sm font-semibold text-neutral-900">
          Preferirani kanal kontakta
        </label>
        <select
          id="kanal-kontakta"
          value={contactPayment.preferredChannel}
          onChange={(event) =>
            onPatch({ preferredChannel: event.target.value as SubmissionContactPayment['preferredChannel'] })
          }
          className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          {CHANNEL_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3.5 border-t border-neutral-100 pt-5">
        <Checkbox
          name="potvrda-cene"
          checked={contactPayment.paymentAcknowledged}
          onCheckedChange={(checked) => onPatch({ paymentAcknowledged: checked === true })}
          invalid={Boolean(errors.paymentAcknowledged)}
          aria-describedby={errors.paymentAcknowledged ? 'potvrda-cene-greska' : undefined}
          label={
            <>
              Prihvatam cenu objave od 5.000 RSD na 30 dana i uplatu nakon odobrenja oglasa.{' '}
              <span aria-hidden="true" className="text-gold-600">*</span>
            </>
          }
        />
        {errors.paymentAcknowledged ? (
          <p id="potvrda-cene-greska" role="alert" className="text-xs font-medium text-danger-600">
            {errors.paymentAcknowledged}
          </p>
        ) : null}

        <Checkbox
          name="saglasnost-podaci"
          checked={contactPayment.dataConsent}
          onCheckedChange={(checked) => onPatch({ dataConsent: checked === true })}
          invalid={Boolean(errors.dataConsent)}
          aria-describedby={errors.dataConsent ? 'saglasnost-greska' : undefined}
          label={
            <>
              Saglasan/na sam da NS Business Consulting obradi podatke iz oglasa u svrhu objave i
              kontakta potencijalnih kupaca.{' '}
              <span aria-hidden="true" className="text-gold-600">*</span>
            </>
          }
        />
        {errors.dataConsent ? (
          <p id="saglasnost-greska" role="alert" className="text-xs font-medium text-danger-600">
            {errors.dataConsent}
          </p>
        ) : null}
      </div>

      <PricingCallout />
    </div>
  );
}
