import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Grid } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Container } from '@mui/system';
import { AppDispatch, RootState } from '../main';
import { useDispatch, useSelector } from 'react-redux';
import { createMovie } from '../reducers/createMovieSlice';

interface MovieFormValues {
  releaseDate: Date | null;
  movieTitle: string;
  productionBudget: number | '';
  domesticGross: number | '';
  worldwideGross: number | '';
}

const defaultValues: MovieFormValues = {
  releaseDate: null,
  movieTitle: '',
  productionBudget: '',
  domesticGross: '',
  worldwideGross: '',
};

interface FormErrors {
  releaseDate?: string;
  movieTitle?: string;
  productionBudget?: string;
  domesticGross?: string;
  worldwideGross?: string;
}
export default function MovieForm({closeForm}:{closeForm:()=> void}) {
  const [formValues, setFormValues] = useState<MovieFormValues>(defaultValues);
  const [formErrors, setFormErrors] = useState<Partial<FormErrors>>({});
  const dispatch:AppDispatch = useDispatch();
  const {loading} = useSelector((state:RootState)=>  state.createMovie);

  const validate = (values: MovieFormValues):FormErrors => {
    const errors:FormErrors = {};
    if (!values.releaseDate) {
      errors.releaseDate = 'Release date is required.';
    }
    if (!values.movieTitle) {
      errors.movieTitle = 'Movie title is required.';
    }
    if (!values.productionBudget) {
      errors.productionBudget = 'Production budget is required.';
    } else if (isNaN(Number(values.productionBudget))) {
      errors.productionBudget = 'Production budget must be a number.';
    }
    if (!values.domesticGross) {
      errors.domesticGross = 'Domestic gross is required.';
    } else if (isNaN(Number(values.domesticGross))) {
      errors.domesticGross = 'Domestic gross must be a number.';
    }
    if (!values.worldwideGross) {
      errors.worldwideGross = 'Worldwide gross is required.';
    } else if (isNaN(Number(values.worldwideGross))) {
      errors.worldwideGross = 'Worldwide gross must be a number.';
    }
    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formValues);
    const errors = validate(formValues);
    if (Object.keys(errors).length === 0) {
      await dispatch(createMovie(formValues));
      closeForm()
    } else {
      setFormErrors(errors);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    setFormValues({ ...formValues, releaseDate: date });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>
        Create New Movie
      </Typography>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DatePicker
              label="Release Date"
              value={formValues.releaseDate}
              onChange={handleDateChange}
              slotProps={{
                textField:{
                  error:!!formErrors.releaseDate,
                  helperText:formErrors.releaseDate
                }
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
            <Button disabled={loading} type="submit" fullWidth variant="contained" sx={{ py: 1.5 }}>
              {loading ? "Processing" : "Create Movie"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  </LocalizationProvider>
  );
}
