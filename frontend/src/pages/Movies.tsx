// React imports for component and state management
import React, { useEffect, useState } from "react";

// Redux hooks for dispatching actions and selecting state
import { useAppDispatch, useAppSelector } from "../services/hooks";
import {
  fetchMovies,
  setOrderBy,
  setPage,
  setSearch,
} from "../reducers/moviesSlice";
import { setMovieSuccess } from "../reducers/createMovieSlice";

// Components for UI layout and interaction
import MovieForm from "../components/MovieForm";
import MoviesFilter from "../components/MoviesFilter";

// MUI components for data display and layout
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";

// MUI icons for user interface elements
import SearchIcon from "@mui/icons-material/Search";

// Main movie page. Handles displaying and adding form data
const Profile: React.FC = () => {
  // Redux hooks for dispatching actions and accessing state.
  const dispatch: AppDispatch = useAppDispatch();

  // Theme and responsiveness hooks from MUI for styling and layout adjustments.
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Determine if the device is mobile based on screen size.

  // State selectors for retrieving movies data and UI state from Redux store.
  const { movies, totalPages, currentPage, orderBy, filter } = useAppSelector(
    (state: RootState) => state.movies
  );
  const { success } = useAppSelector((state: RootState) => state.createMovie);

  // Local state management for UI controls and modals.
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for handling search term input.
  const [sortOption, setSortOption] = useState<string>(""); // State for handling sorting options.
  const [openAddMovie, setOpenAddMovie] = useState<boolean>(false); // State to control visibility of the Add Movie modal.

  // useEffect hook to fetch movies when component mounts or when dependent variables change.
  useEffect(() => {
    // Dispatch fetchMovies action with current page, search term, filter, and orderBy options.
    dispatch(
      fetchMovies({ page: currentPage, search: searchTerm, filter, orderBy })
    );
  }, [dispatch, currentPage, searchTerm, filter, orderBy]);

  // Handler function for pagination component to change the current page.
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    // Dispatch setPage action to update the current page.
    dispatch(setPage(value));
  };

  // Handler function for search input field to update search term and trigger search.
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    // Update local state with new search term.
    setSearchTerm(event.target.value);
    // Reset current page to 1 and dispatch setSearch action to trigger search.
    dispatch(setPage(1));
    dispatch(setSearch(event.target.value));
  };

  // Handler function for sorting options to update selected sorting option.
  const handleSortChange = (e: SelectChangeEvent): void => {
    // Update local state with selected sorting option.
    setSortOption(e.target.value as string);
    // Dispatch setOrderBy action to update sorting option in Redux state.
    dispatch(setOrderBy(e.target.value));
  };

  // Handler function to toggle visibility of Add Movie modal.
  const toggleMovieModal = (): void => {
    // Invert the value of openAddMovie state to toggle modal visibility.
    setOpenAddMovie(!openAddMovie);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
        overflowX: "auto",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch" },
          mb: 2,
        }}
      >
        <TextField
          id="search"
          label="Search Movies"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for movies"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1, mb: { xs: 2, sm: 0 }, mr: { sm: 2 } }}
        />
        <FormControl
          sx={{
            minWidth: { xs: "100%", sm: 150 },
            mb: { xs: 2, sm: 0 },
            mr: { sm: 2 },
          }}
        >
          <InputLabel id="sort-select-label">Sort By</InputLabel>
          <Select
            labelId="sort-select-label"
            id="sort-select"
            value={sortOption}
            label="Sort By"
            onChange={handleSortChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Release Date">Release Date</MenuItem>
            <MenuItem value="Production Budget">Production Budget</MenuItem>
            <MenuItem value="Domestic Gross">Domestic Gross</MenuItem>
            <MenuItem value="Worldwide Gross">Worldwide Gross</MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={toggleMovieModal}
          variant="outlined"
          sx={{ width: { xs: "100%", sm: 160 } }}
        >
          Add Movie
        </Button>
      </Box>
      <MoviesFilter />
      <TableContainer component={Paper}>
        <Table aria-label="movies table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Movie Title</TableCell>
              {!isMobile && (
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Release Date
                </TableCell>
              )}
              {!isMobile && (
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Production Budget
                </TableCell>
              )}
              {!isMobile && (
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Domestic Gross
                </TableCell>
              )}
              {!isMobile && (
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Worldwide Gross
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow
                key={movie._id}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "action.hover" },
                }}
              >
                <TableCell component="th" scope="row">
                  {movie["Movie Title"]}
                </TableCell>
                {!isMobile && (
                  <TableCell align="right">
                    {new Date(movie["Release Date"]).toLocaleDateString()}
                  </TableCell>
                )}
                {!isMobile && (
                  <TableCell align="right">
                    {movie["Production Budget"].toLocaleString()}
                  </TableCell>
                )}
                {!isMobile && (
                  <TableCell align="right">
                    {movie["Domestic Gross"].toLocaleString()}
                  </TableCell>
                )}
                {!isMobile && (
                  <TableCell align="right">
                    {movie["Worldwide Gross"].toLocaleString()}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        spacing={2}
        direction="row"
        sx={{ mt: 2, justifyContent: "center", flexWrap: "wrap" }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
      <Modal
        open={openAddMovie}
        onClose={toggleMovieModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "95vh",
            width: { xs: "90%", sm: "600px" },
            p: 4,
          }}
        >
          <MovieForm closeForm={toggleMovieModal} />
        </Paper>
      </Modal>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => dispatch(setMovieSuccess(false))}
        message="Movie Added Successfully"
      />
    </Box>
  );
};

export default Profile;
