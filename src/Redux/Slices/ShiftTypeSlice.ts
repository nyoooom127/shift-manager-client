import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ShiftTypeModel from "../../Models/ShiftTypeModel";

function setAll(
  state: ShiftTypeModel[],
  action: PayloadAction<ShiftTypeModel[]>
): ShiftTypeModel[] {
  return [...action.payload];
}

const shiftTypesSlice = createSlice({
  name: "shiftTypes",
  initialState: [],
  reducers: { setAll },
});

export const shiftTypeActions = shiftTypesSlice.actions;

export const shiftTypeReducer = shiftTypesSlice.reducer;
