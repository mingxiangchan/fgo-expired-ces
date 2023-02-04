import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SortOptions } from "../../types";
import { RootState } from "../store";

// Define a type for the slice state
export interface FiltersState {
  sorting: SortOptions;
  includeNonEvent: boolean;
  // use number since Set is not serialize and goes against redux best practice
  rarities: number[];
  searchInput: number | null;
}

// Define the initial state using that type
const initialState: FiltersState = {
  sorting: SortOptions.atkAsc,
  includeNonEvent: false,
  rarities: [1, 2, 3, 4, 5],
  searchInput: null,
};

export const filtersSlice = createSlice({
  name: "filters",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSorting: (state, action: PayloadAction<SortOptions>) => {
      state.sorting = action.payload;
    },
    setIncludeNonEvent: (state, action: PayloadAction<boolean>) => {
      state.includeNonEvent = action.payload;
      state.searchInput = null;
    },
    includeRarity: (state, action: PayloadAction<number>) => {
      state.rarities.push(action.payload);
      state.searchInput = null;
    },
    excludeRarity: (state, action: PayloadAction<number>) => {
      state.rarities = state.rarities.filter(
        (rarity) => rarity !== action.payload
      );
      state.searchInput = null;
    },
    setSearchInput: (state, action: PayloadAction<number | null>) => {
      state.searchInput = action.payload;
    },
  },
});

export const {
  setSorting,
  setIncludeNonEvent,
  includeRarity,
  excludeRarity,
  setSearchInput,
} = filtersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const filtersSorting = (state: RootState) => state.filters.sorting;
export const filtersIncludeNonEvent = (state: RootState) =>
  state.filters.includeNonEvent;
export const filtersRarities = (state: RootState) => state.filters.rarities;
export const filtersSearchInput = (state: RootState) =>
  state.filters.searchInput;

export const filtersReducer = filtersSlice.reducer;
