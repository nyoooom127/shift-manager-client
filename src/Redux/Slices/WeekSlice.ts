import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Week from "../../Models/Week";
import Shift from "../../Models/Shift";
import { isDateInWeek } from "../../Utils/DateUtils";

function setAll(state: Week[], action: PayloadAction<Week[]>): Week[] {
  return [...action.payload];
}

function addShiftToWeek(state: Week[], action: PayloadAction<Shift>): Week[] {
  const newState = [...state];
  const weekIndex = newState.findIndex((w) =>
    isDateInWeek(action.payload.startDate, w.startDate)
  );
  const newWeek = { ...newState[weekIndex] };
  const newShifts = [...newWeek.shifts];

  const shiftIndex = newShifts.findIndex((s) => s.id === action.payload.id);

  if (shiftIndex === -1) {
    newShifts.push(action.payload);
  } else {
    newShifts[shiftIndex] = action.payload;
  }

  newWeek.shifts = newShifts;
  newState[weekIndex] = newWeek;

  return newState;
}

function removeShiftFromWeek(
  state: Week[],
  action: PayloadAction<Shift>
): Week[] {
  const newState = [...state];
  const weekIndex = newState.findIndex((w) =>
    isDateInWeek(action.payload.startDate, w.startDate)
  );
  const newWeek = { ...newState[weekIndex] };
  const newShifts = [...newWeek.shifts];

  const shiftIndex = newShifts.findIndex((s) => s.id === action.payload.id);

  if (shiftIndex !== -1) {
    newShifts.splice(shiftIndex, 1);
    newWeek.shifts = newShifts;
    newState[weekIndex] = newWeek;
  }

  return newState;
}

function update(state: Week[], action: PayloadAction<Week>): Week[] {
  const newState = [...state];
  const weekIndex = newState.findIndex((w) => w.id === action.payload.id);

  if (weekIndex !== -1) {
    newState[weekIndex] = action.payload;
  } else {
    newState.push(action.payload);
  }

  return newState;
}

function remove(state: Week[], action: PayloadAction<string>): Week[] {
  const newWeeks = [...state];
  const weekIndex = newWeeks.findIndex((c) => c.id === action.payload);

  if (weekIndex !== -1) {
    newWeeks.splice(weekIndex, 1);
  }

  return newWeeks;
}

const weeksSlice = createSlice({
  name: "weeks",
  initialState: [] as Week[],
  reducers: { setAll, addShiftToWeek, removeShiftFromWeek, update, remove },
});

export const weekActions = weeksSlice.actions;

export const weekReducer = weeksSlice.reducer;
