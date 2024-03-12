//MUI imports for styling
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";

//Chart component import
import ProductionBudgetChart from "../components/ProductionBudgetChart";
import ReleasesPerYearChart from "../components/ReleasePerYearChart";

//This component renders bar chart and scatter chart on the dashboard page
const Dashboard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: isSmallScreen ? 1 : 3, // Adjust padding based on screen size
      }}
    >
      <Grid container spacing={3}>
        {/* Ensure the grid items below don't have fixed widths or margins that could cause overflow */}

        {/* Production Budget Chart */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Average Production Budget per Year (in Millions)
              </Typography>
              <Box
                sx={{ height: isSmallScreen ? "300px" : "auto", width: "100%" }}
              >
                <ProductionBudgetChart />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Releases Per Year Chart */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Number of Releases Per Year
              </Typography>
              <Box
                sx={{ height: isSmallScreen ? "300px" : "auto", width: "100%" }}
              >
                <ReleasesPerYearChart />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;