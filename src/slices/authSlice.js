// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   signupData: null,
//   loading: false,
//   token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState: initialState,
//   reducers: {
//     setSignupData(state, value) {
//       state.signupData = value.payload;
//     },
//     setLoading(state, value) {
//       state.loading = value.payload;
//     },
//     setToken(state, value) {
//       state.token = value.payload;
//     },
//   },
// });

// export const { setSignupData, setLoading, setToken } = authSlice.actions;

// export default authSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

// Get initial token from localStorage
const storedToken = localStorage.getItem("token");

const initialState = {
  signupData: null,
  loading: false,
  token: storedToken ? JSON.parse(storedToken) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;

      if (action.payload) {
        localStorage.setItem("token", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("token");
      }
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;
