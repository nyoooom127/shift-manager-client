// import { configureStore, CurriedGetDefaultMiddleware } from "@reduxjs/toolkit";
import {
  configureStore,
  createSerializableStateInvariantMiddleware,
} from "@reduxjs/toolkit";
import Constraint from "../Models/Constraint";
import ConstraintType from "../Models/ConstraintType";
import Shift from "../Models/Shift";
import ShiftType from "../Models/ShiftType";
import User from "../Models/User";
import UserType from "../Models/UserType";
import Week from "../Models/Week";
import WeekType from "../Models/WeekType";
import { authReducer } from "./Slices/AuthSlice";
import { constraintReducer } from "./Slices/ConstraintSlice";
import { constraintTypeReducer } from "./Slices/ConstraintTypeSlice";
import { shiftReducer } from "./Slices/ShiftSlice";
import { shiftTypeReducer } from "./Slices/ShiftTypeSlice";
import { userReducer } from "./Slices/UserSlice";
import { userTypeReducer } from "./Slices/UserTypeSlice";
import { weekReducer } from "./Slices/WeekSlice";
import { weekTypeReducer } from "./Slices/WeekTypeSlice";

// Augment middleware to consider Immutable.JS iterables serializable
const isSerializable = (value: any) => true;

// const getEntries = (value: any) =>
//   Iterable.isIterable(value) ? value.entries() : Object.entries(value)

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable,
  // getEntries,
});

export type AppState = {
  weeks: Week[];
  shiftTypes: ShiftType[];
  weekTypes: WeekType[];
  shifts: Shift[];
  users: User[];
  auth: User;
  constraints: Constraint[];
  constraintTypes: ConstraintType[];
  userTypes: UserType[];
};

// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false
// })

export const appStore = configureStore<AppState>({
  reducer: {
    weeks: weekReducer,
    shiftTypes: shiftTypeReducer,
    weekTypes: weekTypeReducer,
    shifts: shiftReducer,
    users: userReducer,
    auth: authReducer,
    constraints: constraintReducer,
    constraintTypes: constraintTypeReducer,
    userTypes: userTypeReducer,
  },
  middleware: [serializableMiddleware],
  // (getDefaultMiddleware: CurriedGetDefaultMiddleware<AppState>) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
