import { Toaster } from 'react-hot-toast';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Components/Navbar';
import { Box } from '@mui/material';
import { AuthProvider } from './Hooks/AuthProvider';
import Footer from './Components/Footer';

const App: React.FC = () => {
  const location = useLocation();
  const hideHeader = ['/login', '/register'].includes(location.pathname);
   
  return (
    <Box
      sx={{
        maxWidth: '100%',
        minHeight: '100vh',
        backgroundColor: '#000',
      }}
    >
      <AuthProvider>
        {!hideHeader && <Header />} 
        <Box >
          <Outlet />
        </Box>
        <Toaster />
        {!hideHeader && <Footer/>}
      </AuthProvider>
    </Box>
  );
};

export default App;
