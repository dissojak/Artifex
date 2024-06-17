import { createSlice } from "@reduxjs/toolkit";

const clearSessionStorage = () => {
  sessionStorage.removeItem("clientFollowingCache");
  sessionStorage.removeItem("artworksCache");
  sessionStorage.removeItem("museumsCache");
  sessionStorage.removeItem("clientOrdersCache");
  sessionStorage.removeItem("pinnedMuseumsCache");
  sessionStorage.removeItem("savedArtworksCache");
  sessionStorage.removeItem("likedArtworksCache");
  sessionStorage.removeItem("panierCache");
  sessionStorage.removeItem("artistsCache");
  sessionStorage.removeItem("artistArtworksCache");
  sessionStorage.removeItem("artistFollowersCache");
  sessionStorage.removeItem("artistOrdersCache");
};

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
      clearSessionStorage();
    },
  },
});

export const { setCredentials, logout, setSignupRedux } = authSlice.actions;

export default authSlice.reducer;
