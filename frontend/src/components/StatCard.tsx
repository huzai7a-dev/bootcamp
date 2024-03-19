import { Card, CardContent, Typography, Box } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; // Example icon
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'; // Example icon

const StatCard = ({ title, value, trend }: { title: string, value: string | number, trend: 'up' | 'down' }) => (
    <Card sx={{
        width: '100%',
        maxWidth: 220,
        background: 'linear-gradient(145deg, #2196f3, #21cbf3)',
        margin: 2,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        color: '#fff'
    }}>
        <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {title}
                </Typography>
                {trend === 'up' ? <ArrowUpwardIcon sx={{ color: 'green' }} /> : <ArrowDownwardIcon sx={{ color: 'red' }} />}
            </Box>
            <Typography variant="h5" component="div">
                {value.toLocaleString()}
            </Typography>
        </CardContent>
    </Card>
  
);

export default StatCard;
