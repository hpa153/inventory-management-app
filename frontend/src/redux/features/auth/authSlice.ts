import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type userProps = {
  name: string,
  email: string,
  phone: string,
  bio: string,
  avatar: string,
}

export interface authProps {
  isLoggedIn: boolean,
  name: string,
  user: userProps,
};

// Initial state
const name = localStorage.getItem("name") ? JSON.parse(localStorage.getItem("name") || "") : "";
const isLoggedIn = !!localStorage.getItem("name");
const user = {
  name: "",
  email: "",
  phone: "",
  bio: "",
  avatar: "",
};

const initialState: authProps = {
  isLoggedIn,
  name,
  user
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_LOGIN: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn= action.payload;
    },
    SET_NAME: (state, action: PayloadAction<string>) => {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER: (state, action: PayloadAction<userProps>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectName = (state: RootState) => state.auth.name;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;