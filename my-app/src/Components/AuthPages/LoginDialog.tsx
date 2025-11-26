import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, IconButton, Typography, Box, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import { LoginDialogProps } from '../../Utils/Interfaces';
import { useAuth } from '../../Context/AuthProvider';
import toast from 'react-hot-toast';
import { GoogleLogin } from '../../HelperFunctions/GoogleLogin';
import AppButton from '../Common/AppButton';

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose }) => {
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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
            overflow: "hidden",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
            maxWidth: 500, 
            border: "2px solid #3d4041ff",
          },
        },
      }}
    >
      <Box
        sx={{
          flex: 1,
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5)), url("/LoginImage.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 3,
          color: "#fff",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Welcome to MovieHub
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
          Stream trending movies, explore TV shows, and build your personal watchlist.
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          backgroundColor: "#000000ff",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#616161ff",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" gutterBottom sx={{ fontWeight: 1000, color: "#276b77ff" }}>
          Login
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            m: 2,
            color: "#e6e6e6ff",
          }}
        >
          Sign in to discover trending movies, build your watchlist, and explore more...
        </Typography>
        <DialogActions sx={{ width: "100%" }}>
          <AppButton
            startIcon={<GoogleIcon />}
            fullWidth
            theme="outlined"
            onClick={handleGoogleLogin}
            sx={{
              fontWeight: "bold",
              py: 1.5,
              px: 1,
              backgroundColor: "#fff",
              color: "#276b77ff",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
          >
            Continue with Google
          </AppButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default LoginDialog;
