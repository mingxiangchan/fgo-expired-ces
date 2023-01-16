import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SortOptions } from "../../types";
import { RootState } from "../store";

// Define a type for the slice state
interface FiltersState {
  sorting: SortOptions;
  includeNonEvent: boolean;
  rarity: Set<number>;
}

// Define the initial state using that type
const initialState: FiltersState = {
  sorting: SortOptions.atkAsc,
  includeNonEvent: false,
  rarity: new Set([1, 2, 3, 4, 5]),
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
    },
    includeRarity: (state, action: PayloadAction<number>) => {
      state.rarity = state.rarity.add(action.payload);
    },
    excludeRarity: (state, action: PayloadAction<number>) => {
      state.rarity.delete(action.payload);
    },
  },
});

export const { setSorting, setIncludeNonEvent, includeRarity, excludeRarity } =
  filtersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const sorting = (state: RootState) => state.filters.sorting;
export const includeNonEvent = (state: RootState) =>
  state.filters.includeNonEvent;
export const rarity = (state: RootState) => state.filters.rarity;

export const filtersReducer = filtersSlice.reducer;
