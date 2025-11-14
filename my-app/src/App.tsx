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
        display: 'flex',          
        flexDirection: 'column',  
        minHeight: '100vh',    
        backgroundColor: '#000',
        width: '100%',
      }}
    >
      <AuthProvider>
        {!hideHeader && <Header />} 
        <Box 
        sx={{ 
          flexGrow: 1, 
          width: '100%',
          px: { xs: 2, sm: 3, md: 5 },
          my: 'auto',  
          boxSizing: 'border-box', 
          }}>
          <Outlet />
        </Box>
        <Toaster />
        {!hideHeader && <Footer/>}
      </AuthProvider>
    </Box>
  );
};

export default App;
