import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type userProps = {
  name: string,
  email: string,
  phone: string,
  bio: string,
  photo: string,
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
  photo: "",
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
    set_login: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn= action.payload;
    },
    set_name: (state, action: PayloadAction<string>) => {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    set_user: (state, action: PayloadAction<userProps>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { set_login, set_name, set_user } = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectName = (state: RootState) => state.auth.name;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;