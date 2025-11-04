import { Toaster } from 'react-hot-toast';
import { Outlet, useLocation } from 'react-router-dom'; // ✅ added useLocation
import Header from './components/navbar';
import { Box } from '@mui/material';

const App: React.FC = () => {
  const location = useLocation();
  const hideHeader = ['/login', '/register'].includes(location.pathname);

  return (
    <Box
      sx={{
        maxWidth: '100%',
        minHeight: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      {!hideHeader && <Header />} 
      <Outlet />
      <Toaster />
    </Box>
  );
};

export default App;
