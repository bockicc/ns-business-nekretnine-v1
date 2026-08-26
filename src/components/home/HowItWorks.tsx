import { ClipboardCheck, KeyRound, Search } from 'lucide-react';

const STEPS = [
  {
    icon: Search,
    number: '01',
    title: 'Pronađite ili objavite nekretninu',
    description: 'Pretražite našu proverenu bazu ili predajte zahtev za prodaju.',
  },
  {
    icon: ClipboardCheck,
    number: '02',
    title: 'Besplatne konsultacije i obilazak',
    description: 'Zakažite termin sa našim licenciranim agentom.',
  },
  {
    icon: KeyRound,
    number: '03',
    title: 'Sigurna realizacija',
    description: 'Pravna provera i vođenje procesa do primopredaje ključeva.',
  },
] as const;

export function HowItWorks() {
  return (
    <section aria-labelledby="kako-funkcionise" className="bg-primary-900 py-16 text-white md:py-20">
      <div className="container-page">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold-500">Kako funkcioniše?</p>
        <h2 id="kako-funkcionise" className="mt-2 font-display text-3xl font-medium md:text-4xl">
          Tri jednostavna koraka do vaše nekretnine
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number}>
                <div className="flex items-start gap-5">
                  <span className="relative flex size-13 shrink-0 items-center justify-center rounded-full bg-gold-600 text-primary-950">
                    <Icon className="size-6" aria-hidden="true" />
                    <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-primary-800 text-[10px] font-bold text-gold-500 ring-2 ring-primary-900">
                      {step.number}
                    </span>
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-medium">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
