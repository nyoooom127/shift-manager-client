import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Shift from "../../Models/Shift";

function setAll(
  state: Shift[],
  action: PayloadAction<Shift[]>
): Shift[] {
  return [...action.payload];
}

const shiftsSlice = createSlice({
  name: "shifts",
  initialState: [],
  reducers: { setAll },
});

export const shiftActions = shiftsSlice.actions;

export const shiftReducer = shiftsSlice.reducer;
