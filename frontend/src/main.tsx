import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/Index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "./reducers/authSlice.ts";
import moviesReducer from "./reducers/moviesSlice.ts";
import moviesStatsReducer from "./reducers/moviesStatsSlice.ts";

const store = configureStore({
  reducer: { auth: authReducer, movies: moviesReducer,moviesStats:moviesStatsReducer },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Export the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;