"use client";

import { useCallback } from "react";
import { logout, login } from "../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import { RootState } from "../redux/store/types";

export const data = (state: RootState) => state.data;

export const useAuthActions = () => {
  const dispatch = useAppDispatch();

  // Set user State
  return {
    login: useCallback((data: any) => dispatch(login(data)), [dispatch]),

    logout: useCallback(() => dispatch(logout()), [dispatch]),
  };
};

// get auth State
export const useAuth = () => {
  return useAppSelector(data);
};
