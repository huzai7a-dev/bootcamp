// Import statements for React, hooks, and Redux actions
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../services/hooks";
import { fetchMovies, setPage, setSearch, sortMovies } from "../reducers/moviesSlice";

// Import statements for Material UI components

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Modal, Select, SelectChangeEvent } from "@mui/material";
import { AppDispatch } from "../main";
import MovieForm from "../components/MovieForm";
import MoviesFilter from "../components/MoviesFilter";

// Profile component definition
const Profile = () => {
  // State and Redux hooks for dispatching actions and selecting state
  const dispatch: AppDispatch = useAppDispatch();
  const { movies, totalPages, currentPage } = useAppSelector(
    (state) => state.movies
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [openAddMovie, setOpenAddMovie] = useState(false);
  // Effect hook to fetch movies whenever the page or search term changes
  useEffect(() => {
    dispatch(fetchMovies({ page: currentPage, search: searchTerm }));
  }, [dispatch, currentPage, searchTerm]);

  // Handler for page change in pagination
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setPage(value));
  };

  // Handler for changes in the search input field
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    dispatch(setPage(1)); // Reset to the first page when search changes
    dispatch(setSearch(event.target.value)); // Updates the Redux state with the new search term
  };

  const handleSortChange = (e: SelectChangeEvent<string>) => {
    setSortOption(e.target.value);
    dispatch(sortMovies(e.target.value))
  }

  const toggleMovieModal = (state: boolean) => {
    setOpenAddMovie(!state);
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, overflowX: 'auto' }}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        {/* Search Field */}
        <TextField
          id="search"
          label="Search Movies"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for movies, actors, directors..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1, mr: 2 }} // Adjust spacing between elements
        />
        {/* Sort Select */}
        <FormControl sx={{ minWidth: 150, mr: 2 }}>
          <InputLabel id="sort-select-label">Sort By</InputLabel>
          <Select
            labelId="sort-select-label"
            id="sort-select"
            value={sortOption}
            label="Sort By"
            onChange={handleSortChange}
          >
            <MenuItem value="All"><em>All</em></MenuItem>
            <MenuItem value="Release Date">Release Date</MenuItem>
            <MenuItem value="Production Budget">Production Budget</MenuItem>
            <MenuItem value="Domestic Gross">Domestic Gross</MenuItem>
            <MenuItem value="Worldwide Gross">Worldwide Gross</MenuItem>
          </Select>
        </FormControl>

        <Button
          sx={{width:160}}
          onClick={() => toggleMovieModal(false)}
          variant="outlined"
        >
          Add Movie
        </Button>
      </Box>
     <MoviesFilter/>
      {/* Enhanced Table displaying movies */}
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="movies table">
          <TableHead>
            <TableRow>
              {/* Table Headers */}
              <TableCell sx={{ fontWeight: 'bold' }}>Movie Title</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Release Date</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Production Budget</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Domestic Gross</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Worldwide Gross</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: 'action.hover' },
                  '&:hover': { backgroundColor: 'primary.light', cursor: 'pointer' },
                }}
              // Implement onClick for row details or navigation
              >
                {/* Table Cells */}
                <TableCell component="th" scope="row">{movie["Movie Title"]}</TableCell>
                <TableCell align="right">{new Date(movie["Release Date"]).toLocaleDateString()}</TableCell>
                <TableCell align="right">{movie["Production Budget"].toLocaleString()}</TableCell>
                <TableCell align="right">{movie["Domestic Gross"].toLocaleString()}</TableCell>
                <TableCell align="right">{movie["Worldwide Gross"].toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Enhanced Pagination component */}
      <Stack spacing={2} direction="row" sx={{ mt: 2, justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Stack>
      <Modal
        open={openAddMovie}
        onClose={() => toggleMovieModal(true)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          sx={{ background: "#fff", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <MovieForm />
        </Paper>
      </Modal>
    </Box>
  )
}
export default Profile;