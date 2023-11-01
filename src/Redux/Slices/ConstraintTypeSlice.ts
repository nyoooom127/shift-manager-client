import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ConstraintType from "../../Models/ConstraintType";

function setAll(
  state: ConstraintType[],
  action: PayloadAction<ConstraintType[]>
): ConstraintType[] {
  return [...action.payload];
}

function update(
  state: ConstraintType[],
  action: PayloadAction<ConstraintType>
): ConstraintType[] {
  const newState = [...state];

  const constraintTypeIndex = newState.findIndex((c) => c.id === action.payload.id);

  if (constraintTypeIndex === -1) {
    newState.push(action.payload);
  } else {
    newState[constraintTypeIndex] = action.payload;
  }

  return newState;
}

function remove(
  state: ConstraintType[],
  action: PayloadAction<string>
): ConstraintType[] {
  const newConstraintTypes = [...state];
  const constraintTypeIndex = newConstraintTypes.findIndex((c) => c.id === action.payload);

  if (constraintTypeIndex !== -1) {
    newConstraintTypes.splice(constraintTypeIndex, 1);
  }

  return newConstraintTypes;
}

const constraintTypesSlice = createSlice({
  name: "constraintTypes",
  initialState: [],
  reducers: { setAll, update, remove },
});

export const constraintTypeActions = constraintTypesSlice.actions;

export const constraintTypeReducer = constraintTypesSlice.reducer;
