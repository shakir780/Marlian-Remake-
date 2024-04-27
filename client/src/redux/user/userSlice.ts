import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  openQuickView: false,
  searchResult: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      toast.success("Welcome back", {
        position: "bottom-left",
      });
      state.currentUser = action.payload;
      state.loading = false;
    },
    signInFailure: (state, action) => {
      toast.error(action.payload, {
        position: "bottom-left",
      });
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signUpStart: (state) => {
      state.loading = true;
    },
    signUpSuccess: (state, action) => {
      toast.success("Welcome", {
        position: "bottom-left",
      });
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signUpFailure: (state, action) => {
      toast.error(action.payload, {
        position: "bottom-left",
      });
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutSuccess: (state) => {
      toast.success("Logged Out", {
        position: "bottom-left",
      });
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setOpenQuickView: (state, action) => {
      state.openQuickView = action.payload;
    },
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
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
  setSearchResult,
  signOutSuccess,
  signOutFailure,
} = userSlice.actions;

export default userSlice.reducer;
