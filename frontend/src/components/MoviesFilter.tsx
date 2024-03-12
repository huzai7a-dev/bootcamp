// React hooks for managing component state and effects
import { useState } from "react";

// Redux hooks for dispatching actions
import { useDispatch } from "react-redux";

// Material UI components for UI layout and inputs
import { Box, TextField, Button } from "@mui/material";

// Date picker components from MUI for handling date inputs
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Adapter for Day.js date library integration with MUI

// Redux action creators for updating state in the Redux store
import { setFilter } from "../reducers/moviesSlice";

// MoviesFilter component for filtering movies based on budget and release date.
const MoviesFilter = () => {
  // State for managing the budget filter range.
  const [filterBudget, setFilterBudget] = useState({ min: "", max: "" });

  // State for managing the date range filter.
  const [filterReleaseDate, setFilterReleaseDate] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  // Hook to dispatch actions to the Redux store.
  const dispatch = useDispatch();

  // Function to apply the filters and dispatch the action to update the store.
  const handleFilterApply = () => {
    // Dispatches the setFilter action with the filter values from the state.
    dispatch(
      setFilter({
        startDate: filterReleaseDate.start,
        endDate: filterReleaseDate.end,
        minBudget: filterBudget.min,
        maxBudget: filterBudget.max,
      })
    );
  };

  return (
    <Box
      sx={{
        mb: 2,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <TextField
        label="Min Budget"
        variant="outlined"
        value={filterBudget.min}
        onChange={(e) =>
          setFilterBudget((prev) => ({ ...prev, min: e.target.value }))
        }
        type="number"
        sx={{ mr: 1 }}
      />
      <TextField
        label="Max Budget"
        variant="outlined"
        value={filterBudget.max}
        onChange={(e) =>
          setFilterBudget((prev) => ({ ...prev, max: e.target.value }))
        }
        type="number"
        sx={{ mx: 1 }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start Date"
          value={filterReleaseDate.start}
          onChange={(newValue) => {
            setFilterReleaseDate((prev) => ({ ...prev, start: newValue }));
          }}
          slotProps={{
            textField: {
              sx: { mx: 1 },
            },
          }}
        />
        <DatePicker
          label="End Date"
          value={filterReleaseDate.end}
          onChange={(newValue) => {
            setFilterReleaseDate((prev) => ({ ...prev, end: newValue }));
          }}
          slotProps={{
            textField: {
              sx: { mx: 1 },
            },
          }}
        />
      </LocalizationProvider>
      <Button
        onClick={handleFilterApply}
        variant="contained"
        sx={{ width: 180 }}
      >
        Apply Filter
      </Button>
    </Box>
  );
};

export default MoviesFilter;