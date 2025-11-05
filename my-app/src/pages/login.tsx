import { useState, ChangeEvent, FormEvent } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Link,
  Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GoogleIcon from '@mui/icons-material/Google';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import SummaryApi from '../common/SummaryAPI';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const valideValue = Object.values(formData).every((el) => el);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: formData,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({ email: '', password: '' });
        const redirectTo = new URLSearchParams(location.search).get('redirect') || '/home';
        navigate(redirectTo);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const payload = {
        fullName: user.displayName,
        email: user.email,
        googleId: user.uid,
        avatar: user.photoURL,
      };
      const response = await Axios({
        ...SummaryApi.googleLogin,
        data: payload,
        withCredentials: true,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        const redirectTo =
          new URLSearchParams(location.search).get("redirect") || "/home";
        navigate(redirectTo);
      }
    } catch (error: any) {
      console.error("Google login error:", error);
      AxiosToastError(error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Avatar sx={{ bgcolor: '#276b77ff', mb: 1 }}>
          <PersonAddIcon />
        </Avatar>
        <Typography variant="h5" fontWeight="bold" color="#276b77ff" gutterBottom>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 2 }}>
          <Stack spacing={2}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              autoComplete="username"
              required
              fullWidth
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              fullWidth
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!valideValue}
              fullWidth
              sx={{
                backgroundColor: '#276b77ff',
                color: '#fff',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#074061ff' },
              }}
            >
              Login
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={handleGoogleLogin}
              startIcon={<GoogleIcon />}
              sx={{
                mt: 1,
                textTransform: 'none',
                borderColor: '#276b77ff',
                color: '#276b77ff',
                fontWeight: 'bold',
                fontSize: '16px',
                justifyContent: 'flex-start',
                paddingY: 1.2,
                paddingX: 2,
                '& .MuiButton-startIcon': {
                  marginRight: 1.5,
                },
                '&:hover': {
                  backgroundColor: '#e0f7fa',
                  borderColor: '#074061ff',
                },
              }}
            >
              Sign in with Google
            </Button>
          </Stack>

          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid>
              <Link component={RouterLink} to="/register" variant="body2" underline="hover" color="#276b77ff">
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
