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

function remove(
  state: User[],
  action: PayloadAction<string>
): User[] {
  const newUsers = [...state];
  const userIndex = newUsers.findIndex((c) => c.id === action.payload);

  if (userIndex !== -1) {
    newUsers.splice(userIndex, 1);
  }

  return newUsers;
}

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: { setAll, update, remove },
});

export const userActions = usersSlice.actions;

export const userReducer = usersSlice.reducer;
