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
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import SummaryApi from '../common/SummaryAPI';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const valideValue = Object.values(formData).every(el => el)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(formData.password !== formData.confirmPassword){
      toast.error(
        "password and confirm password must be same"
      )
      return
    }

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data : formData,
      })
            
      if(response.data.error){
        toast.error(response.data.message)
      }

      if(response.data.success){
        toast.success(response.data.message)
        setFormData({
          fullName : "",
          email : "",
          password : "",
          confirmPassword : ""
        })
        navigate("/login")
      }

    } 
    catch (error) {
      AxiosToastError(error)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });

      const result = await signInWithPopup(auth, provider);
      console.log('Google user:', result.user);

      toast.success('Google login successful!');
      navigate('/home');
    } catch (error: any) {
      console.error('Google login error:', error);
      toast.error(error.message || 'Google login failed');
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
        <Typography variant="h5" fontWeight="bold" gutterBottom color="#276b77ff">
          Register
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 2 }}>
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              name="fullName"
              required
              fullWidth
              value={formData.fullName}
              onChange={handleChange}
            />
            <TextField
              label="Email Address"
              name="email"
              type="email"
              required
              fullWidth
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              required
              fullWidth
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              required
              fullWidth
              value={formData.confirmPassword}
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
              Register
            </Button>
            <Button
              
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
              <Link component={RouterLink} to="/login" variant="body2" underline="hover" color="#276b77ff">
                Already have an account? Log In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default Register;