import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,useTheme } from '@mui/material';
import { Movie } from '../reducers/moviesSlice';


const RecentMoviesTable = ({ movies }: { movies: Movie[] }) => {
    const theme = useTheme();
    return (
        <TableContainer
            component={Paper}
            sx={{
                maxWidth: '100%',
                margin: 'auto',
                boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                height: 400,
                overflowY: "scroll",
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
                '-ms-overflow-style': 'none',  /* IE and Edge */
                'scrollbarWidth': 'none',  /* Firefox */
            }}
        >
            <Table aria-label="movie table">
                <TableHead>
                    <TableRow>
                        <TableCell>Movie Title</TableCell>
                        <TableCell align="right">Release Date</TableCell>
                        <TableCell align="right">Worldwide Gross ($)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {movies.map((movie, index) => (
                        <TableRow sx={{
                            backgroundColor: index % 2 ? theme.palette.action.hover : 'transparent',
                        }} key={movie._id}>
                            <TableCell component="th" scope="row">
                                {movie["Movie Title"]}
                            </TableCell>
                            <TableCell align="right" sx={{ color: theme.palette.primary.light }}>
                                {new Date(movie["Release Date"]).toLocaleDateString()}
                            </TableCell>
                            <TableCell align="right" sx={{ color: theme.palette.secondary.light }}>
                                {movie["Worldwide Gross"].toLocaleString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RecentMoviesTable