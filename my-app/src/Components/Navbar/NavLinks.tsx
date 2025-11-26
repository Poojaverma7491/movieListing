import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { headerNav } from "../../Utils/utils";

const NavLinks = () => {
  const { pathname } = useLocation();
  const isActive = (path: string): boolean =>
    path === `/home` ? pathname === path : pathname.startsWith(path);

  return (
    <>
      {headerNav.map((item) => (
        <Button
          key={item.path}
          component={Link}
          to={item.path}
          color="inherit"
          sx={{
            textTransform: "none",
            fontWeight: isActive(item.path) ? "bold" : "normal",
            borderBottom: isActive(item.path) ? "2px solid #fff" : "none",
            borderRadius: 0,
          }}
        >
          {item.display}
        </Button>
      ))}
    </>
  );
};
export default NavLinks;