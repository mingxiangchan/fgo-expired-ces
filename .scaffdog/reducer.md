---
name: 'reducer'
root: '.'
output: '.'
ignore: []
questions:
  name: 'Please enter the reducer name.'

---

# `utils/reducers/{{ inputs.name | camel }}Reducer.ts`

```typescript
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface {{ inputs.name | pascal }}State {
}

// Define the initial state using that type
const initialState: {{ inputs.name | pascal }}State = {
};

export const {{ inputs.name | camel }}Slice = createSlice({
  name: "{{ inputs.name | camel }}",
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<T>) => {
      // state.initial = action.payload;
    },
  },
});

export const { initialize } = {{ inputs.name | camel }}Slice.actions;

// Other code such as selectors can use the imported `RootState` type
export const initialize = (state: RootState) => state.{{ inputs.name | camel }}.initial;

export const {{ inputs.name | camel }}Reducer = {{ inputs.name | camel }}Slice.reducer;
```

# `utils/store.ts`
```typescript
{{ read output.abs | before "^import.*TypedUseSelectorHook.*$" 0 }}
import { {{ inputs.name | camel }}Reducer } from "./reducers/{{ inputs.name | camel }}Reducer";
{{ read output.abs | after "^import.*TypedUseSelectorHook.*$" -1 | before "^[ ]+reducer: {[ ]*$" 1 1 }}
    {{ inputs.name | camel  }}: {{ inputs.name | camel }}Reducer,
{{ read output.abs | after "^[ ]+reducer: {[ ]*$" 0 1 }}
```
