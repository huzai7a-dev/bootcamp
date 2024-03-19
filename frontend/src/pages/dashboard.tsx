import { useEffect } from "react";
import {
  Grid,
  Box,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";

import ProductionBudgetChart from "../components/ProductionBudgetChart";
import ReleasesPerYearChart from "../components/ReleasePerYearChart";

import { useDispatch } from "react-redux";
import { useAppSelector } from "../services/hooks";
import { AppDispatch, RootState } from "../main";
import { fetchMovieMetrics, fetchRecentMovies } from "../reducers/dashboardMetricsSlice";

import StatCard from "../components/StatCard";
import RecentMoviesTable from "../components/RecentMoviesTable";
import HighestGrossingCard from "../components/HighestGrossingCard";

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const { metrics, recentMovies } = useAppSelector((state: RootState) => state.dashboardMetrics);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));


  useEffect(() => {
    dispatch(fetchMovieMetrics());
    dispatch(fetchRecentMovies());
  }, [dispatch]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection={"row"} justifyContent="center" alignItems="center" gap={2}>
            {metrics?.totalMovies && <StatCard trend="up" title="Total Movies" value={metrics?.totalMovies} />}
            {metrics?.averageBudget && <StatCard trend="down" title="Average Budget" value={Math.round(metrics.averageBudget)} />}
          </Box>
          <Box mt={2}>
            {metrics?.highestGrossingMovie && <HighestGrossingCard movie={metrics.highestGrossingMovie} />}
          </Box>
          <Box
          boxShadow={2} padding={2}
            sx={{ height: isSmallScreen ? "300px" : "auto", width: "100%" }}
          >
            <ReleasesPerYearChart />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box boxShadow={2} padding={2} sx={{ height: { xs: "300px", md: "auto" }, width: "100%" }}>
            <ProductionBudgetChart />
          </Box>
            <Typography fontSize={16} textAlign={"center"} marginTop={2} variant="h5" >Recent Movies</Typography>
          <Box boxShadow={2} marginTop={2}>
            <RecentMoviesTable movies={recentMovies || []} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;