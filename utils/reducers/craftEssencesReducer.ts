import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PCraftEssence } from "../../types";

// Define a type for the slice state
interface CraftEssencesState {
  craftEssences: PCraftEssence[];
}

// Define the initial state using that type
const initialState: CraftEssencesState = { craftEssences: [] };

export const craftEssencesSlice = createSlice({
  name: "craftEssences",
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<PCraftEssence[]>) => {
      state.craftEssences = action.payload;
    },
  },
});

// export const { initialize } = craftEssencesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const initialize = (state: RootState) => state.craftEssences.initial;

export const craftEssencesReducer = craftEssencesSlice.reducer;
