import { createSlice } from "@reduxjs/toolkit";

export const { actions, reducer } = createSlice({
  name: "userAuth",
  initialState: {
    userAuth: false,
  },
  reducers: {
    userLogOn: (state) => {
      return { userAuth: true };
    },
    userLogOut: (state) => {
      return { userAuth: false };
    },
  },
});
