import { SlidersHorizontal } from 'lucide-react';
import type { FilterAction } from '@/hooks/useFilterState';
import type { FilterState } from '@/domain/filters';
import { Button } from '@/components/ui/button';
import { IntentToggle } from './IntentToggle';
import { CategoryMultiSelect } from './CategoryMultiSelect';
import { LocationField } from './LocationField';
import { RoomsStepper } from './RoomsStepper';
import { AreaRangeField, PriceRangeField } from './PriceRangeField';

interface FilterBarProps {
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
  onOpenAdvanced: () => void;
}

export function FilterBar({ state, dispatch, onOpenAdvanced }: FilterBarProps) {
  return (
    <div className="space-y-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <IntentToggle
          value={state.intent}
          onChange={(intent) => dispatch({ type: 'SET_INTENT', intent })}
        />
        <div className="ml-auto hidden md:block lg:hidden">
          <Button variant="outline" onClick={onOpenAdvanced}>
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            Još filtera
          </Button>
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        <LocationField
          value={state.location}
          onChange={(location) => dispatch({ type: 'SET_LOCATION', location })}
        />
        <PriceRangeField
          price={state.price}
          onChange={({ min, max }) => dispatch({ type: 'SET_PRICE', min, max })}
        />
        <AreaRangeField
          area={state.area}
          onChange={({ min, max }) => dispatch({ type: 'SET_AREA', min, max })}
        />
        <RoomsStepper rooms={state.rooms} onChange={(rooms) => dispatch({ type: 'SET_ROOMS', rooms })} />
      </div>

      <div className="hidden md:block">
        <CategoryMultiSelect
          selected={state.categories}
          onToggle={(category) => dispatch({ type: 'TOGGLE_CATEGORY', category })}
        />
      </div>
    </div>
  );
}
