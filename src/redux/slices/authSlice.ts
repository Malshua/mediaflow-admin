"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface userProps {
  id: string;
  role: string;
  email: string;
}

export interface AuthState {
  token: string | any;
  user: userProps | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: "",
  user: {
    id: "",
    role: "",
    email: "",
  },
  isAuthenticated: false,
};

export const AuthSlice = createSlice({
  name: "media_flow",
  initialState,
  reducers: {
    login: (state: AuthState, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state: AuthState) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice;
