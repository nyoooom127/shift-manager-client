import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import WeekType from "../../Models/WeekType";

function setAll(
  state: WeekType[],
  action: PayloadAction<WeekType[]>
): WeekType[] {
  return [...action.payload];
}

function update(
  state: WeekType[],
  action: PayloadAction<WeekType>
): WeekType[] {
  const newState = [...state];

  const WeekTypeIndex = newState.findIndex((c) => c.id === action.payload.id);

  if (WeekTypeIndex === -1) {
    newState.push(action.payload);
  } else {
    newState[WeekTypeIndex] = action.payload;
  }

  return newState;
}

function remove(
  state: WeekType[],
  action: PayloadAction<string>
): WeekType[] {
  const newWeekTypes = [...state];
  const WeekTypeIndex = newWeekTypes.findIndex((c) => c.id === action.payload);

  if (WeekTypeIndex !== -1) {
    newWeekTypes.splice(WeekTypeIndex, 1);
  }

  return newWeekTypes;
}

const weekTypesSlice = createSlice({
  name: "weekTypes",
  initialState: [],
  reducers: { setAll, update, remove },
});

export const weekTypeActions = weekTypesSlice.actions;

export const weekTypeReducer = weekTypesSlice.reducer;
