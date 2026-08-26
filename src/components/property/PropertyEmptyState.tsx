import { RotateCcw } from 'lucide-react';
import emptyHouse from '@/assets/empty-state-house.svg';
import { Button } from '@/components/ui/button';

export function PropertyEmptyState({ onReset }: { onReset?: () => void }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-neutral-300 bg-white px-6 py-14 text-center">
      <img src={emptyHouse} alt="" width={160} height={120} />
      <h2 className="mt-6 font-display text-xl font-medium text-primary-900">
        Nema nekretnina za izabrane filtere
      </h2>
      <p className="mt-2 max-w-md text-sm text-neutral-700">
        Probajte da proširite kriterijume pretrage ili uklonite pojedine filtere. Novi oglasi se
        objavljuju svakodnevno.
      </p>
      {onReset ? (
        <Button variant="outline" onClick={onReset} className="mt-6">
          <RotateCcw className="size-4" aria-hidden="true" />
          Resetujte filtere
        </Button>
      ) : null}
    </div>
  );
}
