import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PCraftEssence } from "../../types";
import { FiltersState } from "./filtersReducer";
import { filterByRarity, filterByHasEvent, sortByOption } from "../listHelpers";

// Define a type for the slice state
interface CraftEssencesState {
  allItems: PCraftEssence[];
  displayedItems: PCraftEssence[];
}

// Define the initial state using that type
const initialState: CraftEssencesState = {
  allItems: [],
  displayedItems: [],
};

export const craftEssencesSlice = createSlice({
  name: "craftEssences",
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<PCraftEssence[]>) => {
      state.allItems = action.payload;
      state.displayedItems = action.payload;
    },
    setDisplayedItems: (
      state,
      action: PayloadAction<
        Pick<FiltersState, "sorting" | "includeNonEvent" | "rarities">
      >
    ) => {
      const { sorting, includeNonEvent, rarities } = action.payload;

      let newDisplayedItems = [...state.allItems];
      newDisplayedItems = filterByRarity(newDisplayedItems, rarities);
      newDisplayedItems = filterByHasEvent(newDisplayedItems, includeNonEvent);
      newDisplayedItems = sortByOption(newDisplayedItems, sorting);

      state.displayedItems = newDisplayedItems;
    },
  },
});

export const { initialize, setDisplayedItems } = craftEssencesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const craftEssencesDisplayedItems = (state: RootState) =>
  state.craftEssences.displayedItems;
export const craftEssencesAllItems = (state: RootState) =>
  state.craftEssences.allItems;

export const craftEssencesReducer = craftEssencesSlice.reducer;
