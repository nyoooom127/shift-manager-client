import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../Models/User";

function setAll(
  state: User[],
  action: PayloadAction<User[]>
): User[] {
  return [...action.payload];
}

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: { setAll },
});

export const userActions = usersSlice.actions;

export const userReducer = usersSlice.reducer;
