import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../Models/User";

function setUser(
  state: User,
  action: PayloadAction<User>
): User {
  return action.payload;
}

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: null,
  reducers: { setUser },
});

export const currentUserActions = currentUserSlice.actions;

export const currentUserReducer = currentUserSlice.reducer;
