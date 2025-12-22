import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { Header, ActiveOrderBar } from '../components/layout';

const MainLayout = () => {
  return (
    <Box className="min-h-screen flex flex-col">
      <Header />
      <ActiveOrderBar />
      <Container component="main" className="flex-1 py-6 m-6" maxWidth="lg">
        <Outlet />
      </Container>
    </Box>
  );
};

export default MainLayout;
