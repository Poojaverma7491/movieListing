import { Toaster } from 'react-hot-toast';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/navbar';
import { Box } from '@mui/material';
import { AuthProvider } from './hooks/AuthProvider';
import Footer from './components/footer';

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
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AuthProvider>
        {!hideHeader && <Header />} 
        <Box component="main" sx={{ flex: 1 }}>
          <Outlet />
        </Box>
        <Toaster />
        {!hideHeader && <Footer/>}
      </AuthProvider>
    </Box>
  );
};

export default App;
