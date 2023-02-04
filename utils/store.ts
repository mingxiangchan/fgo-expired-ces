import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { filtersReducer } from "./reducers/filtersReducer";
import { craftEssencesReducer } from "./reducers/craftEssencesReducer";
import type { TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    craftEssences: craftEssencesReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
