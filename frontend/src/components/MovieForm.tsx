// React imports for building components and managing state
import React, { useState } from "react";

// Material UI imports for UI components and layouts
import {
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  Container,
} from "@mui/material";

// Date picker imports from Material UI lab for selecting dates
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Adapter for the date library

// Redux imports for state management and dispatching actions
import { useDispatch, useSelector } from "react-redux";

// Custom imports from local files for Redux state and actions
import { AppDispatch, RootState } from "../main";
import { createMovie } from "../reducers/createMovieSlice";

// MovieFormValues outlines the structure for storing form data, allowing for partial data input and type validation.
interface MovieFormValues {
  releaseDate: Date | null;
  productionBudget: number | "";
  domesticGross: number | "";
  worldwideGross: number | "";
}

// defaultValues provides initial form states, useful for reset actions or initial renderings.
const defaultValues: MovieFormValues = {
  releaseDate: null,
  productionBudget: "",
  domesticGross: "",
  worldwideGross: "",
};

// FormErrors enables dynamic error messaging, allowing for real-time feedback based on user input and validation rules.
interface FormErrors {
  releaseDate?: string;
  productionBudget?: string;
  domesticGross?: string;
  worldwideGross?: string;
}

// MovieForm component for creating or editing movie details.
export default function MovieForm({ closeForm }: { closeForm: () => void }) {
  // State management for form values and errors.
  const [formValues, setFormValues] = useState<MovieFormValues>(defaultValues);
  const [formErrors, setFormErrors] = useState<Partial<FormErrors>>({});

  // Hooks for dispatching actions and accessing Redux store state.
  const dispatch: AppDispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.createMovie);

  // Validates form values and returns an object with error messages for invalid fields.
  const validate = (values: MovieFormValues): FormErrors => {
    const errors: FormErrors = {};

    // Validation rules for each form field.
    if (!values.releaseDate) {
      errors.releaseDate = "Release date is required.";
    }
    if (!values.movieTitle) {
      errors.movieTitle = "Movie title is required.";
    }
    if (!values.productionBudget) {
      errors.productionBudget = "Production budget is required.";
    } else if (isNaN(Number(values.productionBudget))) {
      errors.productionBudget = "Production budget must be a number.";
    }
    if (!values.domesticGross) {
      errors.domesticGross = "Domestic gross is required.";
    } else if (isNaN(Number(values.domesticGross))) {
      errors.domesticGross = "Domestic gross must be a number.";
    }
    if (!values.worldwideGross) {
      errors.worldwideGross = "Worldwide gross is required.";
    } else if (isNaN(Number(values.worldwideGross))) {
      errors.worldwideGross = "Worldwide gross must be a number.";
    }
    return errors;
  };

  // Handles form submission: validates input, dispatches createMovie action, and closes form if valid.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validate(formValues);
    if (Object.keys(errors).length === 0) {
      await dispatch(createMovie(formValues));
      closeForm();
    } else {
      setFormErrors(errors);
    }
  };

  // Updates formValues state when input fields change.s
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  // Special handler for date change to accommodate for date picker component.
  const handleDateChange = (date: Date | null) => {
    setFormValues({ ...formValues, releaseDate: date });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>
          Create New Movie
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DatePicker
                label="Release Date"
                value={formValues.releaseDate}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    error: !!formErrors.releaseDate,
                    helperText: formErrors.releaseDate,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Movie Title"
                name="movieTitle"
                value={formValues.movieTitle}
                onChange={handleChange}
                fullWidth
                error={!!formErrors.movieTitle}
                helperText={formErrors.movieTitle}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Production Budget"
                name="productionBudget"
                type="number"
                value={formValues.productionBudget}
                onChange={handleChange}
                fullWidth
                error={!!formErrors.productionBudget}
                helperText={formErrors.productionBudget}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Domestic Gross"
                name="domesticGross"
                type="number"
                value={formValues.domesticGross}
                onChange={handleChange}
                fullWidth
                error={!!formErrors.domesticGross}
                helperText={formErrors.domesticGross}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Worldwide Gross"
                name="worldwideGross"
                type="number"
                value={formValues.worldwideGross}
                onChange={handleChange}
                fullWidth
                error={!!formErrors.worldwideGross}
                helperText={formErrors.worldwideGross}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button
                disabled={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ py: 1.5 }}
              >
                {loading ? "Processing" : "Create Movie"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}