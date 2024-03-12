// Import statements for React, hooks, and Redux actions
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../services/hooks";
import { fetchMovies, setPage, setSearch } from "../reducers/moviesSlice";

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

// Profile component definition
const Profile = () => {
  // State and Redux hooks for dispatching actions and selecting state
  const dispatch = useAppDispatch();
  const { movies, totalPages, currentPage } = useAppSelector(
    (state) => state.movies
  );
  const [searchTerm, setSearchTerm] = useState("");

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

  // JSX markup for the component's UI
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
        overflowX: "auto",
      }}
    >
      {/* Search input field */}
      <TextField
        id="search"
        label="Search Movies"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        sx={{ mb: 2 }}
      />

      {/* Table displaying movies */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Movie Title</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Release Date
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Production Budget
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Domestic Gross
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Worldwide Gross
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {movie["Movie Title"]}
                </TableCell>
                <TableCell align="right">
                  {new Date(movie["Release Date"]).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  {movie["Production Budget"].toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {movie["Domestic Gross"].toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {movie["Worldwide Gross"].toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination component */}
      <Stack spacing={2} sx={{ mt: 2, justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </Box>
  );
};

// Exporting the Profile component
export default Profile;