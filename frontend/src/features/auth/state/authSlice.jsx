import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("accessToken") || null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    addUser: (state, action) => {
      state.user = action.payload.user;
      state.token =
        action.payload.accessToken ||
        state.token;

      state.isAuthenticated = true;
      state.isLoading = false;
    },

    removeUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;

      localStorage.removeItem("accessToken");
    },

    setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  addUser,
  removeUser,
  setAuthLoading,
} = authSlice.actions;

export default authSlice.reducer;