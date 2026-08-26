import { FileCheck2, HandCoins, MapPinned, ShieldCheck } from 'lucide-react';

const VALUE_ITEMS = [
  {
    icon: ShieldCheck,
    title: 'Provereni oglasi',
    description: 'Svaki oglas prolazi administrativnu proveru podataka, fotografija i cene pre objave.',
  },
  {
    icon: MapPinned,
    title: 'Lokalno znanje',
    description: 'Duboko poznajemo naselja Novog Sada — od Centra i Limana do Petrovaradina.',
  },
  {
    icon: HandCoins,
    title: 'Transparentna provizija',
    description: 'Cena objave je fiksna i poznata unapred. Bez skrivenih troškova i iznenađenja.',
  },
  {
    icon: FileCheck2,
    title: 'Pravna sigurnost',
    description: 'Vodimo računa o knjižnom stanju i dokumentaciji da prelaz vlasništva protekne glatko.',
  },
] as const;

export function ValuePropositionBand() {
  return (
    <section aria-labelledby="vrednosti-naslov" className="bg-white py-16 md:py-20">
      <div className="container-page">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold-600">Zašto mi</p>
        <h2 id="vrednosti-naslov" className="mt-2 font-display text-3xl font-medium text-primary-900 md:text-4xl">
          Kupovina bez nepotrebnog rizika
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-lg border border-neutral-200 bg-white p-5 shadow-card">
                <span className="flex size-11 items-center justify-center rounded-md bg-primary-900 text-gold-500">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-medium text-primary-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
