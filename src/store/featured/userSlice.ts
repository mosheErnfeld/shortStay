import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

interface currentUserState {
  userId?: string | null;
  user?: User | null;
}

interface userPayload {
  userId?: string | null;
  user?: User | null;
}


const initialState: currentUserState = {
  userId: null,
  user: null,
};

export const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<userPayload>) => {
      state.user = action.payload.user;
      state.userId = action.payload.userId;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
