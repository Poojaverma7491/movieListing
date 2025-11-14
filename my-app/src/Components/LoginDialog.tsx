import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppButton from './Button';
import { handleGoogleLogin } from '../HelperFunctions/helpers';
import { auth } from '../firebase';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose }) => {
 
  const navigate = useNavigate();
  const location = useLocation();

    function checkUser(): Promise<void> {
        throw new Error('Function not implemented.');
    }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: '#000',
          color: '#fff',
          borderRadius: 2,
          p: 2,
        },
      }}
    >
      {/* Title with centered text and cross icon */}
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          position: 'relative',
        }}
      >
        Login Required
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#fff',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogActions
        sx={{ flexDirection: 'column', gap: 2, justifyContent: 'center' }}
      >
        <AppButton
      startIcon={<GoogleIcon />}
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        "&:hover": { backgroundColor: "#e0e0e0" },
        width: "100%",
      }}
      onClick={() => {
        onClose();
        handleGoogleLogin(auth, checkUser, navigate, location.search); 
      }}
    >
      Continue with Google
    </AppButton>

        {/* Normal Login Button */}
        <AppButton component={Link} to="/login">
            Go to Login
        </AppButton>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
