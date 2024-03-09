import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import ProductionBudgetChart from '../components/ProductionBudgetChart';
import ReleasesPerYearChart from '../components/ReleasePerYearChart';

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={3}>
        {/* Production Budget Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Average Production Budget per Year (in Millions)
              </Typography>
              <ProductionBudgetChart />
            </CardContent>
          </Card>
        </Grid>

        {/* Releases Per Year Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Number of Releases Per Year
              </Typography>
              <ReleasesPerYearChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
