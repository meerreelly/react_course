import { Box, Typography, Button } from '@mui/material';
import { Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <Typography variant="h1" className="text-8xl font-bold text-gray-300 mb-4">
        404
      </Typography>
      <Typography variant="h4" className="mb-2">
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" className="mb-6">
        The page you are looking for doesn't exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Home />}
        onClick={() => navigate('/')}
        size="large"
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFound;
