import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserType from "../../Models/UserType";

function setAll(
  state: UserType[],
  action: PayloadAction<UserType[]>
): UserType[] {
  return [...action.payload];
}

function update(
  state: UserType[],
  action: PayloadAction<UserType>
): UserType[] {
  const newState = [...state];

  const UserTypeIndex = newState.findIndex((c) => c.id === action.payload.id);

  if (UserTypeIndex === -1) {
    newState.push(action.payload);
  } else {
    newState[UserTypeIndex] = action.payload;
  }

  return newState;
}

function remove(
  state: UserType[],
  action: PayloadAction<string>
): UserType[] {
  const newUserTypes = [...state];
  const UserTypeIndex = newUserTypes.findIndex((c) => c.id === action.payload);

  if (UserTypeIndex !== -1) {
    newUserTypes.splice(UserTypeIndex, 1);
  }

  return newUserTypes;
}

const userTypesSlice = createSlice({
  name: "userTypes",
  initialState: [],
  reducers: { setAll, update, remove },
});

export const userTypeActions = userTypesSlice.actions;

export const userTypeReducer = userTypesSlice.reducer;
