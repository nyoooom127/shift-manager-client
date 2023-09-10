import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import WeekModel from "../../Models/WeekModel";

function setAll(
  state: WeekModel[],
  action: PayloadAction<WeekModel[]>
): WeekModel[] {
  return [...action.payload];
}

const weeksSlice = createSlice({
  name: "weeks",
  initialState: [],
  reducers: { setAll },
});

export const weekActions = weeksSlice.actions;

export const weekReducer = weeksSlice.reducer;
