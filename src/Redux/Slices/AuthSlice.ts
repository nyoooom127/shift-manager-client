import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import User from "../../Models/User";

function set(currentState: User, action: PayloadAction<User>): User {
  const newState = action.payload;

  return newState;
}

function register(currentState: User, action: PayloadAction<User>): User {
  const newState = action.payload;

  return newState;
}

function login(currentState: User, action: PayloadAction<User>): User {
  const newState = action.payload;

  return newState;
}

function logout(currentState: User, action: PayloadAction<void>): User {
  return null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: { set, register, login, logout },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
