import { createSlice } from "@reduxjs/toolkit";


// 1. Define the initial state using that type
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 2. Use the PayloadAction type to declare the contents of `action.payload`
    addUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    removeUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
});

export const { addUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
