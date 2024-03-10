import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useState } from "react";
import { AppDispatch } from "../main";
import { useDispatch } from "react-redux";
import { filterMovies } from "../reducers/moviesSlice";

const MoviesFilter = () => {
  const [filterBudget, setFilterBudget] = useState({ min: '', max: '' });
  const [filterReleaseDate, setFilterReleaseDate] = useState({ start: null, end: null });
  const dispatch: AppDispatch = useDispatch();
  return (
    <Box sx={{ mb: 2, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
      <TextField
        label="Min Budget"
        variant="outlined"
        value={filterBudget.min}
        onChange={(e) => setFilterBudget(prev => ({ ...prev, min: e.target.value }))}
        type="number"
        sx={{ mr: 1 }}
      />
      <TextField
        label="Max Budget"
        variant="outlined"
        value={filterBudget.max}
        onChange={(e) => setFilterBudget(prev => ({ ...prev, max: e.target.value }))}
        type="number"
        sx={{ mx: 1 }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start Date"
          value={filterReleaseDate.start}
          onChange={(newValue) => {
            setFilterReleaseDate(prev => ({ ...prev, start: newValue }));
          }}
          slotProps={{
            textField: {
              sx: { mx: 1 }
            }
          }}
        />
        <DatePicker
          label="End Date"
          value={filterReleaseDate.end}
          onChange={(newValue) => {
            setFilterReleaseDate(prev => ({ ...prev, end: newValue }));
          }}
          slotProps={{
            textField: {
              sx: { mx: 1 }
            }
          }}
        />
      </LocalizationProvider>
      <Button onClick={() => dispatch(filterMovies({ budgetFilter: filterBudget, dateFilter: filterReleaseDate }))} variant="contained" sx={{ width: 180 }}>Apply Filter</Button>
    </Box>
  )
}

export default MoviesFilter