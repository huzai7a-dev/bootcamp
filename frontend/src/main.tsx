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
import dashboardMetricsReducer from './reducers/dashboardMetricsSlice.ts';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#123456', // Example color
    },
    secondary: {
      main: '#789abc', // Example color
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h5: {
      fontWeight: 600,
    },
  },
  // Add other customizations here
});


// Configure Redux store with reducers
const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    moviesStats: moviesStatsReducer,
    createMovie: createMovieReducer,
    dashboardMetrics:dashboardMetricsReducer
  },
});

// Render the application inside the root element
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);

// Export the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;