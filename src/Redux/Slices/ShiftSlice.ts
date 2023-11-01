import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Shift from "../../Models/Shift";

function setAll(
  state: Shift[],
  action: PayloadAction<Shift[]>
): Shift[] {
  return [...action.payload];
}

function update(
  state: Shift[],
  action: PayloadAction<Shift>
): Shift[] {
  const newState = [...state];

  const shiftIndex = newState.findIndex((c) => c.id === action.payload.id);

  if (shiftIndex === -1) {
    newState.push(action.payload);
  } else {
    newState[shiftIndex] = action.payload;
  }

  return newState;
}

function remove(
  state: Shift[],
  action: PayloadAction<string>
): Shift[] {
  const newShifts = [...state];
  const shiftIndex = newShifts.findIndex((c) => c.id === action.payload);

  if (shiftIndex !== -1) {
    newShifts.splice(shiftIndex, 1);
  }

  return newShifts;
}

const shiftsSlice = createSlice({
  name: "shifts",
  initialState: [],
  reducers: { setAll, update, remove },
});

export const shiftActions = shiftsSlice.actions;

export const shiftReducer = shiftsSlice.reducer;
