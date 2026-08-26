import { useCallback, useMemo, useState } from 'react';
import { Calculator, Info } from 'lucide-react';
import type { Property } from '@/domain/property';
import { toEur } from '@/lib/formatPrice';

const numberFmt = new Intl.NumberFormat('sr-RS', { maximumFractionDigits: 0 });
const currencyFmt = (eur: number) => `${numberFmt.format(Math.round(eur))} €`;

function monthlyPayment(principal: number, annualRate: number, years: number): number {
  if (annualRate === 0) return principal / (years * 12);
  const r = annualRate / 100 / 12;
  const n = years * 12;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function MortgageCalculator({ property }: { property: Property }) {
  const priceEur = toEur(property.price.amount, property.price.currency);

  const [downPayment, setDownPayment] = useState(0);
  const [termYears, setTermYears] = useState(20);
  const [rate, setRate] = useState(5.5);

  const maxDown = Math.floor(priceEur);

  const principal = useMemo(
    () => Math.max(0, priceEur - Math.min(downPayment, priceEur)),
    [priceEur, downPayment],
  );

  const monthly = useMemo(() => monthlyPayment(principal, rate, termYears), [principal, rate, termYears]);
  const totalRepayment = useMemo(() => monthly * termYears * 12, [monthly, termYears]);

  const handleDownPaymentChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number.parseInt(e.target.value, 10);
      setDownPayment(Number.isFinite(val) ? Math.max(0, Math.min(val, maxDown)) : 0);
    },
    [maxDown],
  );

  const handleTermChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number.parseInt(e.target.value, 10);
    setTermYears(Number.isFinite(val) ? Math.max(5, Math.min(30, val)) : 5);
  }, []);

  const handleRateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number.parseFloat(e.target.value);
    setRate(Number.isFinite(val) ? Math.max(0, Math.min(15, val)) : 0);
  }, []);

  if (property.intent === 'rent') return null;

  return (
    <section aria-labelledby="kalkulator-kredita" className="rounded-lg border border-neutral-200 bg-white p-5 shadow-card md:p-6">
      <div className="flex items-center gap-2">
        <Calculator className="size-5 text-gold-600" aria-hidden="true" />
        <h2 id="kalkulator-kredita" className="font-display text-xl font-medium text-primary-900">
          Kalkulator kredita
        </h2>
      </div>
      <p className="mt-1 text-sm text-neutral-600">
        Simulacija mesečne rate za ovu nekretninu.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="down-payment" className="block text-sm font-medium text-primary-900">
            Učešće (EUR)
          </label>
          <input
            id="down-payment"
            type="number"
            min={0}
            max={maxDown}
            step={1000}
            value={downPayment}
            onChange={handleDownPaymentChange}
            className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-sm text-primary-900 shadow-sm transition-colors placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          <input
            type="range"
            min={0}
            max={maxDown}
            step={500}
            value={Math.min(downPayment, maxDown)}
            onChange={handleDownPaymentChange}
            aria-label="Klizač za učešće"
            className="mt-2 w-full accent-primary-900"
          />
          <p className="mt-0.5 text-xs text-neutral-500">Max: {currencyFmt(maxDown)}</p>
        </div>

        <div>
          <label htmlFor="loan-term" className="block text-sm font-medium text-primary-900">
            Rok otplate (godina)
          </label>
          <input
            id="loan-term"
            type="number"
            min={5}
            max={30}
            step={1}
            value={termYears}
            onChange={handleTermChange}
            className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-sm text-primary-900 shadow-sm transition-colors placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          <input
            type="range"
            min={5}
            max={30}
            step={1}
            value={termYears}
            onChange={handleTermChange}
            aria-label="Klizač za rok otplate"
            className="mt-2 w-full accent-primary-900"
          />
          <p className="mt-0.5 text-xs text-neutral-500">Od 5 do 30 godina</p>
        </div>

        <div>
          <label htmlFor="interest-rate" className="block text-sm font-medium text-primary-900">
            Kamatna stopa (% godišnje)
          </label>
          <input
            id="interest-rate"
            type="number"
            min={0}
            max={15}
            step={0.1}
            value={rate}
            onChange={handleRateChange}
            className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-sm text-primary-900 shadow-sm transition-colors placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          <input
            type="range"
            min={0}
            max={15}
            step={0.1}
            value={rate}
            onChange={handleRateChange}
            aria-label="Klizač za kamatnu stopu"
            className="mt-2 w-full accent-primary-900"
          />
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-gold-200 bg-gold-50/50 p-4">
        <dl className="space-y-3">
          <div className="flex items-center justify-between">
            <dt className="text-sm text-neutral-700">Mesečna rata</dt>
            <dd className="font-display text-xl font-semibold text-primary-900">
              {currencyFmt(monthly)}
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-gold-200 pt-3">
            <dt className="text-sm text-neutral-700">Iznos kredita</dt>
            <dd className="text-sm font-semibold text-primary-900">{currencyFmt(principal)}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-gold-200 pt-3">
            <dt className="text-sm text-neutral-700">Ukupna vraćena suma</dt>
            <dd className="text-sm font-semibold text-primary-900">{currencyFmt(totalRepayment)}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-md bg-neutral-50 p-3">
        <Info className="mt-0.5 size-4 shrink-0 text-neutral-500" aria-hidden="true" />
        <p className="text-xs leading-relaxed text-neutral-600">
          Ovo je informativna simulacija, ne ponuda banke niti odobrenje kredita. Stvarni uslovi
          zavise od vaše kreditne sposobnosti, dokumentacije i odluke banke. Kamatna stopa i uslovi
          podložni su promeni. Kontaktirajte banku ili našeg agenta za preciznu procenu.
        </p>
      </div>
    </section>
  );
}
