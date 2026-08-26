import { SlidersHorizontal } from 'lucide-react';
import type { FilterAction } from '@/hooks/useFilterState';
import type { FilterState } from '@/domain/filters';
import type { HeatingType } from '@/domain/property';
import { HEATING_LABEL } from '@/data/amenities';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { AmenityChips } from './AmenityChips';
import { CategoryMultiSelect } from './CategoryMultiSelect';
import { LocationField } from './LocationField';
import { RoomsStepper } from './RoomsStepper';
import { AreaRangeField, PriceRangeField } from './PriceRangeField';

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
}

const HEATING_VALUES = Object.keys(HEATING_LABEL) as HeatingType[];

export function FilterModal({ open, onOpenChange, state, dispatch }: FilterModalProps) {
  const toggleHeating = (heating: HeatingType): void => {
    dispatch({ type: 'TOGGLE_HEATING', heating });
  };

  const resetAll = (): void => {
    dispatch({ type: 'RESET' });
    onOpenChange(false);
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Filteri pretrage"
      description="Sužite izbor prema vrsti nekretnine, ceni i karakteristikama."
      footer={
        <div className="flex items-center justify-between gap-3">
          <Button variant="ghost" onClick={resetAll}>
            Resetujte
          </Button>
          <Button onClick={() => onOpenChange(false)}>Prikaži rezultate</Button>
        </div>
      }
      className="max-w-xl"
    >
      <div className="space-y-6">
        <CategoryMultiSelect
          selected={state.categories}
          onToggle={(category) => dispatch({ type: 'TOGGLE_CATEGORY', category })}
        />
        <LocationField
          value={state.location}
          onChange={(location) => dispatch({ type: 'SET_LOCATION', location })}
        />
        <PriceRangeField price={state.price} onChange={({ min, max }) => dispatch({ type: 'SET_PRICE', min, max })} />
        <AreaRangeField area={state.area} onChange={({ min, max }) => dispatch({ type: 'SET_AREA', min, max })} />
        <RoomsStepper rooms={state.rooms} onChange={(rooms) => dispatch({ type: 'SET_ROOMS', rooms })} />

        <fieldset>
          <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
            Grejanje
          </legend>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Grejanje">
            {HEATING_VALUES.map((heating) => (
              <button
                key={heating}
                type="button"
                onClick={() => toggleHeating(heating)}
                aria-pressed={state.heating.includes(heating)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                  state.heating.includes(heating)
                    ? 'border-primary-900 bg-primary-900 text-white'
                    : 'border-neutral-300 bg-white text-neutral-700 hover:border-primary-400 hover:text-primary-900'
                }`}
              >
                {HEATING_LABEL[heating]}
              </button>
            ))}
          </div>
        </fieldset>

        <AmenityChips
          selected={state.features}
          onToggle={(feature) => dispatch({ type: 'TOGGLE_FEATURE', feature })}
        />
      </div>
    </Modal>
  );
}

export function OpenFiltersButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="outline" onClick={onClick}>
      <SlidersHorizontal className="size-4" aria-hidden="true" />
      Još filtera
    </Button>
  );
}
