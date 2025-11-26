import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import AuthButton from "./AuthButton";
import MobileDrawer from "./MobileDrawer";

const Navbar: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    return (
        <>
        <AppBar position="sticky" sx={{ backgroundColor: "#276b77ff" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography
                variant="h6"
                component={Link}
                to="/home"
                sx={{ textDecoration: "none", color: "#fff", fontWeight: "bold" }}
            >
                MovieHub
            </Typography>

            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                <NavLinks />
                <SearchBar />
                <AuthButton />
            </Box>

            <IconButton onClick={() => setDrawerOpen(true)} sx={{ display: { xs: "flex", md: "none" }, color: "#fff" }}>
                <MenuIcon />
            </IconButton>
            </Toolbar>
        </AppBar>

        <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
    );
};

export default Navbar;
