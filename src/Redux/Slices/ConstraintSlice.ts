import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Constraint from "../../Models/Constraint";

function setAll(
  state: Constraint[],
  action: PayloadAction<Constraint[]>
): Constraint[] {
  return [...action.payload];
}

function update(
  state: Constraint[],
  action: PayloadAction<Constraint>
): Constraint[] {
  const newState = [...state];

  const constraintIndex = newState.findIndex((c) => c.id === action.payload.id);

  if (constraintIndex === -1) {
    newState.push(action.payload);
  } else {
    newState[constraintIndex] = action.payload;
  }

  return newState;
}

function remove(
  state: Constraint[],
  action: PayloadAction<string>
): Constraint[] {
  const newShifts = [...state];
  const constraintIndex = newShifts.findIndex((c) => c.id === action.payload);

  if (constraintIndex !== -1) {
    newShifts.splice(constraintIndex, 1);
  }

  return newShifts;
}

const constraintsSlice = createSlice({
  name: "constraints",
  initialState: [],
  reducers: { setAll, update, remove },
});

export const constraintActions = constraintsSlice.actions;

export const constraintReducer = constraintsSlice.reducer;
