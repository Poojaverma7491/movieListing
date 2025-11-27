import { Drawer, Box, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MobileDrawerProps } from "../../Utils/Interfaces";
import { useAuthActions } from "../../HelperFunctions/Logout";
import { useAuth } from "../../Context/AuthProvider";
import { headerNav } from "../../Utils/utils";

const MobileDrawer: React.FC<MobileDrawerProps> = ({ open, onClose }) => {
  const { userLoggedIn } = useAuth();
  const { logout } = useAuthActions();
  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    navigate(path);
    onClose(); 
  };  

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {headerNav.map((item) => (
            <ListItemButton key={item.path} onClick={() => handleNavClick(item.path)}>
              <ListItemText primary={item.display} />
            </ListItemButton>
          ))}
          
          <ListItemButton onClick={() => {
              if (userLoggedIn) {
                logout();
              } else {
                navigate("/Login");
              }
              onClose();
            }}>
            <ListItemText primary={userLoggedIn ? "Log Out" : "Log In"} />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;