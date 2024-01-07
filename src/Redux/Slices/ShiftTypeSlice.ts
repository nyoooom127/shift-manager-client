import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ShiftType from "../../Models/ShiftType";

function setAll(
  state: ShiftType[],
  action: PayloadAction<ShiftType[]>
): ShiftType[] {
  return [...action.payload];
}

function update(
  state: ShiftType[],
  action: PayloadAction<ShiftType>
): ShiftType[] {
  const newState = [...state];

  const ShiftTypeIndex = newState.findIndex((c) => c.id === action.payload.id);

  if (ShiftTypeIndex === -1) {
    newState.push(action.payload);
  } else {
    newState[ShiftTypeIndex] = action.payload;
  }

  return newState;
}

function remove(
  state: ShiftType[],
  action: PayloadAction<string>
): ShiftType[] {
  const newShiftTypes = [...state];
  const ShiftTypeIndex = newShiftTypes.findIndex((c) => c.id === action.payload);

  if (ShiftTypeIndex !== -1) {
    newShiftTypes.splice(ShiftTypeIndex, 1);
  }

  return newShiftTypes;
}

const shiftTypesSlice = createSlice({
  name: "shiftTypes",
  initialState: [],
  reducers: { setAll, update, remove },
});

export const shiftTypeActions = shiftTypesSlice.actions;

export const shiftTypeReducer = shiftTypesSlice.reducer;
