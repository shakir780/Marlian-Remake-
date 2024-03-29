import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  openQuickView: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    signInFailure: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signUpStart: (state) => {
      state.loading = true;
    },
    signUpSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signUpFailure: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    setOpenQuickView: (state, action) => {
      state.openQuickView = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signUpSuccess,
  signUpFailure,
  signInFailure,
  setOpenQuickView,
} = userSlice.actions;

export default userSlice.reducer;
