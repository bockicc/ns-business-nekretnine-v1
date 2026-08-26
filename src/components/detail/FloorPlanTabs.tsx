import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Property } from '@/domain/property';

export function FloorPlanTabs({ property }: { property: Property }) {
  const [value, setValue] = useState('plan');

  return (
    <section aria-labelledby="tlocrt-naslov">
      <h2 id="tlocrt-naslov" className="font-display text-xl font-medium text-primary-900">
        Tlocrt i galerija
      </h2>
      <Tabs value={value} onValueChange={setValue} className="mt-4">
        <TabsList aria-label="Tlocrt ili fotografije">
          <TabsTrigger value="plan">Tlocrt</TabsTrigger>
          <TabsTrigger value="slike">Fotografije</TabsTrigger>
        </TabsList>
        <TabsContent value="plan">
          {property.floorPlanUrl ? (
            <img
              src={property.floorPlanUrl}
              alt={`${property.title} — tlocrt`}
              className="w-full rounded-lg border border-neutral-200 bg-white object-contain"
            />
          ) : (
            <p className="rounded-lg border border-dashed border-neutral-300 bg-white px-5 py-8 text-center text-sm text-neutral-700">
              Tlocrt za ovu nekretninu još nije dostupan. Pitajte agenta za dodatne crteže i
              merenja prostorija.
            </p>
          )}
        </TabsContent>
        <TabsContent value="slike">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {property.images.map((image) => (
              <img
                key={image.id}
                src={image.url}
                alt={image.alt}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-lg border border-neutral-200 object-cover"
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
