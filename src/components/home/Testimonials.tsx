import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Marko Jovanović',
    role: 'Prodaja stana, Liman',
    quote: 'Celokupan proces je bio potpuno transparentan. Agent nas je vodio kroz svaki korak — od prvog razgovora do potpisa.',
    rating: 5,
  },
  {
    name: 'Ana Petrović',
    role: 'Kupovina kuće, Petrovaradin',
    quote: 'Stan je prodat za manje od mesec dana. Brza procena, kvalitetne fotografije i pravi kupac — sve na jednom mestu.',
    rating: 5,
  },
  {
    name: 'Stefan Marković',
    role: 'Kupovina stana, Grbavica',
    quote: 'Dokumentacija je bila spremna na vreme, bez neprijatnih iznenađenja. Preporučujem svima koji žele sigurnu kupovinu.',
    rating: 5,
  },
] as const;

export function Testimonials() {
  return (
    <section aria-labelledby="utisci-klijenata" className="bg-white py-16 md:py-20">
      <div className="container-page">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold-600">Utisci</p>
        <h2 id="utisci-klijenata" className="mt-2 font-display text-3xl font-medium text-primary-900 md:text-4xl">
          Šta kažu naši klijenti
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="flex flex-col rounded-lg border border-neutral-200 bg-neutral-50 p-6 shadow-card"
            >
              <div className="flex gap-0.5 text-gold-500" aria-label={`${t.rating} od 5 zvezdica`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-700">"{t.quote}"</p>
              <footer className="mt-5 border-t border-neutral-200 pt-4">
                <p className="text-sm font-semibold text-primary-900">{t.name}</p>
                <p className="mt-0.5 text-xs text-neutral-500">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
