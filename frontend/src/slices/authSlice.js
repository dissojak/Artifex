import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  formData: localStorage.getItem("formData")
    ? JSON.parse(localStorage.getItem("formData"))
    : {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    setSignupRedux: (state, action) => {
      state.formData = action.payload;
      localStorage.setItem("formData", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout, setSignupRedux } = authSlice.actions;

export default authSlice.reducer;
