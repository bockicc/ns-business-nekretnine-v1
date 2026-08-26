import { useEffect, useReducer, useRef } from 'react';
import type { ActiveFilterPill, FilterState } from '@/domain/filters';
import { DEFAULT_FILTER_STATE } from '@/domain/filters';
import type { AmenityKey } from '@/data/amenities';
import type { HeatingType, ListingIntent, PropertyCategory } from '@/domain/property';
import { buildFilterPills } from '@/lib/buildFilterPills';

export type FilterAction =
  | { type: 'SET_INTENT'; intent: ListingIntent | 'all' }
  | { type: 'TOGGLE_CATEGORY'; category: PropertyCategory }
  | { type: 'SET_PRICE'; min: number | null; max: number | null }
  | { type: 'SET_AREA'; min: number | null; max: number | null }
  | { type: 'SET_ROOMS'; rooms: number | null }
  | { type: 'SET_LOCATION'; location: string | null }
  | { type: 'TOGGLE_HEATING'; heating: HeatingType }
  | { type: 'TOGGLE_FEATURE'; feature: AmenityKey }
  | { type: 'SET_SORT'; sort: FilterState['sort'] }
  | { type: 'SET_VIEW'; view: FilterState['view'] }
  | { type: 'SET_PAGE'; page: number }
  | { type: 'REMOVE_PILL'; key: string }
  | { type: 'RESET' };

export function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_INTENT':
      if (state.intent === action.intent) return state;
      return { ...state, intent: action.intent, page: 1 };
    case 'TOGGLE_CATEGORY': {
      const exists = state.categories.includes(action.category);
      return {
        ...state,
        categories: exists
          ? state.categories.filter((c) => c !== action.category)
          : [...state.categories, action.category],
        page: 1,
      };
    }
    case 'SET_PRICE':
      return { ...state, price: { min: action.min, max: action.max }, page: 1 };
    case 'SET_AREA':
      return { ...state, area: { min: action.min, max: action.max }, page: 1 };
    case 'SET_ROOMS':
      return { ...state, rooms: action.rooms, page: 1 };
    case 'SET_LOCATION':
      return { ...state, location: action.location?.trim() || null, page: 1 };
    case 'TOGGLE_HEATING': {
      const exists = state.heating.includes(action.heating);
      return {
        ...state,
        heating: exists
          ? state.heating.filter((h) => h !== action.heating)
          : [...state.heating, action.heating],
        page: 1,
      };
    }
    case 'TOGGLE_FEATURE': {
      const currentlyEnabled = Boolean(state.features[action.feature]);
      const features = { ...state.features };
      if (currentlyEnabled) delete features[action.feature];
      else features[action.feature] = true;
      return { ...state, features, page: 1 };
    }
    case 'SET_SORT':
      if (state.sort === action.sort) return state;
      return { ...state, sort: action.sort, page: 1 };
    case 'SET_VIEW':
      return { ...state, view: action.view };
    case 'SET_PAGE':
      return { ...state, page: Math.max(1, action.page) };
    case 'REMOVE_PILL':
      return removePill(state, action.key);
    case 'RESET':
      return { ...DEFAULT_FILTER_STATE };
    default:
      return state;
  }
}

function removePill(state: FilterState, key: string): FilterState {
  if (key === 'intent') return { ...state, intent: 'all', page: 1 };
  if (key === 'location') return { ...state, location: null, page: 1 };
  if (key === 'rooms') return { ...state, rooms: null, page: 1 };
  if (key === 'price.min') return { ...state, price: { ...state.price, min: null }, page: 1 };
  if (key === 'price.max') return { ...state, price: { ...state.price, max: null }, page: 1 };
  if (key === 'area.min') return { ...state, area: { ...state.area, min: null }, page: 1 };
  if (key === 'area.max') return { ...state, area: { ...state.area, max: null }, page: 1 };
  if (key.startsWith('category.')) {
    const category = key.slice('category.'.length) as PropertyCategory;
    return {
      ...state,
      categories: state.categories.filter((c) => c !== category),
      page: 1,
    };
  }
  if (key.startsWith('heating.')) {
    const heating = key.slice('heating.'.length) as HeatingType;
    return { ...state, heating: state.heating.filter((h) => h !== heating), page: 1 };
  }
  if (key.startsWith('features.')) {
    const feature = key.slice('features.'.length) as AmenityKey;
    const features = { ...state.features };
    delete features[feature];
    return { ...state, features, page: 1 };
  }
  return state;
}

interface UseFilterStateOptions {
  onSync?: (state: FilterState) => void;
}

export function useFilterState(
  initial: FilterState,
  { onSync }: UseFilterStateOptions = {},
): {
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
  pills: ActiveFilterPill[];
} {
  const [state, dispatch] = useReducer(filterReducer, initial);
  const syncRef = useRef(onSync);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    syncRef.current = onSync;
  });

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    syncRef.current?.(state);
  }, [state]);

  return { state, dispatch, pills: buildFilterPills(state) };
}
