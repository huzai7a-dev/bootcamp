import {
    Card,
    CardContent,
    Typography,
    useTheme,
  } from "@mui/material";

import MovieIcon from '@mui/icons-material/Movie';
import { Movie } from "../reducers/moviesSlice";

const HighestGrossingCard = ({ movie }: { movie: Movie }) => {
    const theme = useTheme();
    return (
      <Card sx={{
        minWidth: 275,
        margin: 2,
        background: `linear-gradient(to right, ${theme.palette.secondary.dark}, ${theme.palette.secondary.light})`,
        color: "#fff",
        boxShadow: '0 8px 16px 0 rgba(0,0,0,.2)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        padding: 2
      }}>
        <MovieIcon sx={{ fontSize: 50 }} />
        <CardContent>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            Highest Grossing Movie
          </Typography>
          <Typography variant="h5" component="div">
            {movie["Movie Title"]}
          </Typography>
          <Typography sx={{ mb: 1.5 }}>
            Release Date: {new Date(movie["Release Date"]).toLocaleDateString()}
          </Typography>
          <Typography variant="body2">
            Worldwide Gross: ${movie["Worldwide Gross"].toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    )
  };

  export default HighestGrossingCard