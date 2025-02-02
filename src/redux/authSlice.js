import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null, // Här lagras token
  },
  reducers: {
    login(state, action) {
      state.token = action.payload; // Uppdaterar token vid inloggning
    },
    logout(state) {
      state.token = null; // Rensar token vid utloggning
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
