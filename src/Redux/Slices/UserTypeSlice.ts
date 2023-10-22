import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserType from "../../Models/UserType";

function setAll(
  state: UserType[],
  action: PayloadAction<UserType[]>
): UserType[] {
  return [...action.payload];
}

const userTypesSlice = createSlice({
  name: "userTypes",
  initialState: [],
  reducers: { setAll },
});

export const userTypeActions = userTypesSlice.actions;

export const userTypeReducer = userTypesSlice.reducer;
