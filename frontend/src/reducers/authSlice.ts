// Importing necessary functions from Redux Toolkit for creating slices and async thunks
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Importing axios for making HTTP requests
import axios from "axios";

// Define a type for the user state that can handle different auth methods
interface User {
  _id: string;
  googleId?: string;
  githubId?: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  image: string;
  email?: string;
  created_at: string;
}

// Define a type for the slice state
interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  pending: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  pending: false,
};

// Import URL constants
import { STATUS_URL } from "../services/config";
import { LOGOUT_URL } from "../services/config";

// Async thunk function to check the authentication status by sending a GET request to the server
export const checkStatus = createAsyncThunk("auth/checkStatus", async () => {
  const response = await axios.get(STATUS_URL, {
    withCredentials: true, // Ensure that cookies are sent with the request
  });
  return response.data; // Return the response data containing authentication status
});

// Async thunk function to logout the user by sending a POST request to the server
export const logout = createAsyncThunk("auth/logout", async () => {
  await axios.post(LOGOUT_URL, {
    withCredentials: true, // Ensure that cookies are sent with the request
  });
  return { isLoggedIn: false, user: null }; // Return an object indicating that user is logged out
});

// Main slice for handling/managing user authentication state
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Here, we might add reducers for other synchronous actions if necessary
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkStatus.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        // We directly set the user object since it can vary based on the auth method
        state.user = action.payload.user;
        state.pending = false;
      })
      .addCase(checkStatus.pending, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.pending = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      });
    // Handle other states like pending or rejected if necessary
  },
});

// Export the reducer function for the create auth slice
export default authSlice.reducer;
