import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ShiftType from "../../Models/ShiftType";

function setAll(
  state: ShiftType[],
  action: PayloadAction<ShiftType[]>
): ShiftType[] {
  return [...action.payload];
}

const shiftTypesSlice = createSlice({
  name: "shiftTypes",
  initialState: [],
  reducers: { setAll },
});

export const shiftTypeActions = shiftTypesSlice.actions;

export const shiftTypeReducer = shiftTypesSlice.reducer;
