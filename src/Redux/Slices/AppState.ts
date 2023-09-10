import { configureStore } from "@reduxjs/toolkit";
import ShiftTypeModel from "../../Models/ShiftTypeModel";
import WeekModel from "../../Models/WeekModel";
import { shiftTypeReducer } from "./ShiftTypeSlice";
import { weekReducer } from "./WeekSlice";

export type AppState = {
  weeks: WeekModel[];
  shiftTypes: ShiftTypeModel[];
};

export const appStore = configureStore<AppState>({
  reducer: {
    weeks: weekReducer,
    shiftTypes: shiftTypeReducer,
  },
});
