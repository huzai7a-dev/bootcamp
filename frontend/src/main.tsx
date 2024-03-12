// Import ReactDOM for rendering React components
import ReactDOM from "react-dom/client";

// Import the root component of the application
import App from "./App.tsx";

// Import global styles
import "./styles/Index.css";

// Import Redux related modules
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// Import reducers
import authReducer from "./reducers/authSlice.ts";
import moviesReducer from "./reducers/moviesSlice.ts";
import moviesStatsReducer from "./reducers/moviesStatsSlice.ts";
import createMovieReducer from './reducers/createMovieSlice.ts';

// Configure Redux store with reducers
const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    moviesStats: moviesStatsReducer,
    createMovie: createMovieReducer
  },
});

// Render the application inside the root element
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Export the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;