import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../Models/User";

function setAll(
  state: User[],
  action: PayloadAction<User[]>
): User[] {
  return [...action.payload];
}

function update(state: User[], action: PayloadAction<User>): User[] {
  const newState = [...state];
  const userIndex = newState.findIndex((w) => w.id === action.payload.id);

  if(userIndex !== -1){
    newState[userIndex] = action.payload;
  }else{
    newState.push(action.payload);
  }

  return newState;
}

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: { setAll, update },
});

export const userActions = usersSlice.actions;

export const userReducer = usersSlice.reducer;
