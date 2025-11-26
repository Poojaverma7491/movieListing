import { Container, Box, Typography, Avatar } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../Context/AuthProvider';
import AppButton from '../Common/AppButton';
import { GoogleLogin } from '../../HelperFunctions/GoogleLogin';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { checkUser } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const { data } = await GoogleLogin();

      if (!data.success) {
        toast.error(data.message || "Google login failed");
        return;
      }
      toast.success(data.message || "Google login successful");
      await checkUser();
      navigate("/home");
    } catch (error: any) {
      console.error("Google login error:", error);
      toast.error(error.message || "Google login failed");
    }
  };

  return (
    <Container 
    maxWidth="lg"
    sx={{
        minHeight: "100vh",           
        display: "flex",
        justifyContent: "center",     
        alignItems: "center",    
        px: { xs: 2, sm: 3, md: 5 },  
        py: { xs: 2, sm: 3, md: 5 },   
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'centre',
          justifyContent: "center",
          width: "100%",
          maxWidth: { xs: "90%", sm: 500, md: 900 },
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flex: 1,
            minHeight: { xs: 200, md: "auto" },
            backgroundImage: `url("/LoginImage.jpg")`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            p: { xs: 2, md: 4 },
            color: '#fff',
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Welcome to MovieHub
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
            Stream trending movies, explore TV shows, and build your personal watchlist.
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 6,
            backgroundColor: '#f5f5f5',
          }}
        >
          <Avatar sx={{ bgcolor: '#276b77ff', mb: 1 }}>
            <PersonAddIcon />
          </Avatar>
          <Typography variant="h5" fontWeight="bold" color="#276b77ff" gutterBottom>
            Login
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              mt: 1,
              mb: 3,
              fontWeight: 'bold',
              color: '#333',
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            Sign in to discover trending movies, build your watchlist, and explore more...
          </Typography>
          <Box sx={{ width: '100%', mt: 2 }}>
            <AppButton
              fullWidth
              theme="outlined"
              onClick={handleGoogleLogin}
              startIcon={<GoogleIcon />}
              sx={{
                fontWeight: 'bold',
                py: 1.2,
                px: 2,
              }}
            >
              Sign in with Google
            </AppButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
