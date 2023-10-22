import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ConstraintType from "../../Models/ConstraintType";

function setAll(
  state: ConstraintType[],
  action: PayloadAction<ConstraintType[]>
): ConstraintType[] {
  return [...action.payload];
}

const constraintTypesSlice = createSlice({
  name: "constraintTypes",
  initialState: [],
  reducers: { setAll },
});

export const constraintTypeActions = constraintTypesSlice.actions;

export const constraintTypeReducer = constraintTypesSlice.reducer;
