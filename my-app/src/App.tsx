import { Toaster } from 'react-hot-toast';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Footer from './Components/Footer/Footer';
import Header from './Components/Navbar/Navbar';
import { AuthProvider } from './Context/AuthProvider';

const App: React.FC = () => {
  const location = useLocation();
  const hideHeader = ['/login'].includes(location.pathname);
   
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
