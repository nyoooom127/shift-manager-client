import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import WeekType from "../../Models/WeekType";

function setAll(
  state: WeekType[],
  action: PayloadAction<WeekType[]>
): WeekType[] {
  return [...action.payload];
}

const weekTypesSlice = createSlice({
  name: "weekTypes",
  initialState: [],
  reducers: { setAll },
});

export const weekTypeActions = weekTypesSlice.actions;

export const weekTypeReducer = weekTypesSlice.reducer;
