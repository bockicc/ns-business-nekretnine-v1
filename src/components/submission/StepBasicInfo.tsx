import type { SubmissionBasicInfo } from '@/domain/submission';
import { CATEGORIES } from '@/data/categories';
import { HEATING_LABEL } from '@/data/amenities';
import { ALL_LOCATIONS } from '@/data/locations';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Stepper } from '@/components/ui/stepper';
import { PricingCallout } from './PricingCallout';

interface FieldErrors {
  category?: string;
  intent?: string;
  title?: string;
  areaSqm?: string;
  priceAmount?: string;
  location?: string;
}

export function StepBasicInfo({
  basicInfo,
  errors,
  onPatch,
}: {
  basicInfo: SubmissionBasicInfo;
  errors: FieldErrors;
  onPatch: (patch: Partial<SubmissionBasicInfo>) => void;
}) {
  const heatingOptions = [
    { value: '', label: 'Izaberite grejanje' },
    ...Object.entries(HEATING_LABEL).map(([value, label]) => ({ value, label })),
  ];

  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="mb-1.5 text-sm font-semibold text-neutral-900">
          Vrsta nekretnine <span aria-hidden="true" className="text-gold-600">*</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const selected = basicInfo.category === category.value;
            return (
              <button
                key={category.value}
                type="button"
                onClick={() => onPatch({ category: category.value })}
                aria-pressed={selected}
                className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                  selected
                    ? 'border-primary-900 bg-primary-900 text-white'
                    : 'border-neutral-300 bg-white text-neutral-700 hover:border-primary-400 hover:text-primary-900'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
        {errors.category ? <p role="alert" className="mt-1.5 text-xs font-medium text-danger-600">{errors.category}</p> : null}
      </fieldset>

      <fieldset>
        <legend className="mb-1.5 text-sm font-semibold text-neutral-900">
          Namena <span aria-hidden="true" className="text-gold-600">*</span>
        </legend>
        <div className="flex gap-2">
          {([
            { value: 'sale', label: 'Prodaja' },
            { value: 'rent', label: 'Izdavanje' },
          ] as const).map((option) => {
            const selected = basicInfo.intent === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onPatch({ intent: option.value })}
                aria-pressed={selected}
                className={`flex h-10 items-center rounded-md border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                  selected
                    ? 'border-primary-900 bg-primary-900 text-white'
                    : 'border-neutral-300 bg-white text-neutral-700 hover:border-primary-400 hover:text-primary-900'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        {errors.intent ? <p role="alert" className="mt-1.5 text-xs font-medium text-danger-600">{errors.intent}</p> : null}
      </fieldset>

      <div>
        <label htmlFor="naslov" className="mb-1.5 block text-sm font-semibold text-neutral-900">
          Naslov oglasa <span aria-hidden="true" className="text-gold-600">*</span>
        </label>
        <Input
          id="naslov"
          value={basicInfo.title}
          onChange={(event) => onPatch({ title: event.target.value })}
          placeholder="npr. Trosoban stan, Grbavica"
          invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'naslov-greska' : undefined}
        />
        {errors.title ? (
          <p id="naslov-greska" role="alert" className="mt-1.5 text-xs font-medium text-danger-600">{errors.title}</p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField
          id="kvadratura"
          label="Kvadratura (m²)"
          required
          value={basicInfo.areaSqm}
          onChange={(areaSqm) => onPatch({ areaSqm })}
          error={errors.areaSqm}
          errorId="kvadratura-greska"
        />
        <NumberField
          id="cena"
          label="Cena"
          required
          value={basicInfo.priceAmount}
          onChange={(priceAmount) => onPatch({ priceAmount })}
          error={errors.priceAmount}
          errorId="cena-greska"
        >
          <Select
            ariaLabel="Valuta"
            options={[
              { value: 'EUR', label: '€' },
              { value: 'RSD', label: 'RSD' },
            ]}
            value={basicInfo.priceCurrency}
            onValueChange={(currency) => onPatch({ priceCurrency: currency as 'RSD' | 'EUR' })}
            className="w-24 shrink-0"
          />
        </NumberField>
      </div>

      <div>
        <label htmlFor="lokacija-oglas" className="mb-1.5 block text-sm font-semibold text-neutral-900">
          Grad ili naselje <span aria-hidden="true" className="text-gold-600">*</span>
        </label>
        <Input
          id="lokacija-oglas"
          list="lokacije-lista"
          value={basicInfo.location}
          onChange={(event) => onPatch({ location: event.target.value })}
          placeholder="npr. Novi Sad — Liman"
          invalid={Boolean(errors.location)}
          aria-describedby={errors.location ? 'lokacija-greska' : undefined}
        />
        <datalist id="lokacije-lista">
          {ALL_LOCATIONS.map((location) => (
            <option key={location} value={location} />
          ))}
        </datalist>
        {errors.location ? (
          <p id="lokacija-greska" role="alert" className="mt-1.5 text-xs font-medium text-danger-600">{errors.location}</p>
        ) : null}
      </div>

      <details className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
        <summary className="cursor-pointer text-sm font-semibold text-primary-900">
          Dodatni podaci (opciono)
        </summary>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <NumberField id="plac" label="Površina placa (m²)" value={basicInfo.landAreaSqm} onChange={(landAreaSqm) => onPatch({ landAreaSqm })} />
          <StepperField label="Broj soba" value={basicInfo.rooms} onChange={(rooms) => onPatch({ rooms })} />
          <StepperField label="Spavaće sobe" value={basicInfo.bedrooms} onChange={(bedrooms) => onPatch({ bedrooms })} />
          <StepperField label="Kupatila" value={basicInfo.bathrooms} onChange={(bathrooms) => onPatch({ bathrooms })} />
          <NumberField id="sprat" label="Sprat" value={basicInfo.floor} onChange={(floor) => onPatch({ floor })} />
          <NumberField id="godina" label="Godina izgradnje" value={basicInfo.yearBuilt} onChange={(yearBuilt) => onPatch({ yearBuilt })} />
          <div className="sm:col-span-2">
            <label htmlFor="grejanje" className="mb-1.5 block text-sm font-semibold text-neutral-900">Grejanje</label>
            <Select id="grejanje" ariaLabel="Grejanje" options={heatingOptions} value={basicInfo.heating} onValueChange={(heating) => onPatch({ heating })} />
          </div>
        </div>
      </details>

      <PricingCallout />
    </div>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
  required,
  error,
  errorId,
  children,
}: {
  id: string;
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  required?: boolean;
  error?: string;
  errorId?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-neutral-900">
        {label}
        {required ? <span aria-hidden="true" className="text-gold-600"> *</span> : null}
      </label>
      <div className="flex gap-2">
        <Input
          id={id}
          inputMode="numeric"
          value={value ?? ''}
          onChange={(event) => {
            const cleaned = event.target.value.replace(/[^\d]/g, '');
            if (cleaned.length === 0) return onChange(null);
            const parsed = Number.parseInt(cleaned, 10);
            onChange(Number.isFinite(parsed) ? parsed : null);
          }}
          invalid={Boolean(error)}
          aria-describedby={error && errorId ? errorId : undefined}
        />
        {children}
      </div>
      {error && errorId ? (
        <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-danger-600">{error}</p>
      ) : null}
    </div>
  );
}

function StepperField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
}) {
  return (
    <div>
      <p className="mb-1.5 text-sm font-semibold text-neutral-900">{label}</p>
      <Stepper ariaLabel={label} value={value} onChange={onChange} min={0} max={20} suffix="" />
    </div>
  );
}
