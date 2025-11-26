import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/PersonAdd";
import { useAuthActions } from "../../HelperFunctions/Logout";
import { useAuth } from "../../Context/AuthProvider";
import { useState, useEffect } from "react";
import LoginDialog from "../AuthPages/LoginDialog";

export const AuthButton = () => {
  const { userLoggedIn } = useAuth();
  const { logout } = useAuthActions();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  useEffect(() => {
    if (userLoggedIn && loginDialogOpen) {
      setLoginDialogOpen(false);
    }
  }, [userLoggedIn, loginDialogOpen]);

  return (
    <>
      <Button
        variant={userLoggedIn ? "outlined" : "contained"}
        onClick={userLoggedIn ? logout : () => setLoginDialogOpen(true)}
        sx={{
          borderColor: "white",
          textTransform: "none",
          backgroundColor: userLoggedIn ? "transparent" : "#fff",
          color: userLoggedIn ? "#fff" : "#276b77ff",
        }}
      >
        <PersonIcon fontSize="small" />
        {userLoggedIn ? "Log Out" : "Log In"}
      </Button>
      
      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
      />
    </>
  );
};

export default AuthButton;
