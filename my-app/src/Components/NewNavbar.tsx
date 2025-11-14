import { AppBar, Box, Button, Drawer,IconButton,InputBase,List,ListItemButton,ListItemText,Toolbar, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import {Link, useLocation, useNavigate, } from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from "../Hooks/AuthProvider";
import toast from "react-hot-toast";

const headerNav = [
    { display: 'Home', path: `/home` },
    { display: 'Movies', path: `/home/movie` },
    { display: 'TV Shows', path: `/home/tv` },
    { display: 'Bookmarks', path: `/bookmarks` }
];



const Header: React.FC = () =>{

    const {pathname} = useLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState<string>(' ');
    const [searchOpen, setSearchOpen] = useState<boolean>(false);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const { userLoggedIn, setUser} = useAuth();

    const isActive = (path: string) : boolean => path === "/home" ? pathname === path : pathname.startsWith(path);

    const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

    const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(searchQuery.trim()){
            navigate(`/home/movie/search/${encodeURIComponent(searchQuery.trim())}`);
            setSearchOpen(false);
        }
    };

    const handleLogout = async() => {
        try{
            await fetch('/api/logout', {method: 'GET', credentials: 'include'});
            setUser(null);
            toast.success("You have been logged out.");
            navigate('/home');
        } catch{
            toast.error("Logout failed, Please try again later");
        }
    };

    return(
        <>
        <AppBar position="sticky" sx={{ backgroundColor: '#276b77ff' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography 
                variant="h6"
                component={Link}
                to="/home"
                sx={{
                textDecoration: 'none',
                color: '#fff',
                fontWeight: 'bold',
                letterSpacing: 1,
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                }}>
                    MovieHub
                </Typography>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>

                    {headerNav.map((item) => (
                        <Button
                        key = {item.path}
                        component = {Link}
                        to= {item.path}
                        color = "inherit"
                        sx = {{
                            textTransform: 'none',
                            fontWeight: isActive(item.path) ? 'bold' : 'normal',
                            borderBottom: isActive(item.path) ? '2px solid #fff' : 'none',
                        }}>
                            {item.display}                            
                        </Button>
                    ))}

                    <Box component = "form" onSubmit={handleSearchSubmit} sx={{ display: 'flex', alignItems: 'center' }}>
                    {searchOpen && (
                        <InputBase 
                        placeholder="Search..."
                        value = {searchQuery}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        sx={{
                            color: '#fff',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            px: 1,
                            borderRadius: 1,
                            width: { xs: 120, sm: 160 },
                        }}/>
                    )}
                    <IconButton onClick={() => setSearchOpen((prev) => !prev)} sx={{ color: '#fff' }}>
                        <SearchIcon/>
                    </IconButton>
                    </Box>

                    <Box sx={{ ml: 2, display: { xs: 'none', md: 'block' } }}>
                        <Button
                        variant = {userLoggedIn ? "outlined" : "contained"}
                        onClick={userLoggedIn ? handleLogout : () => navigate('/login')}
                        sx={{
                            borderColor: 'white',
                            textTransform: 'none',
                            backgroundColor: userLoggedIn ? 'transparent' : '#fff',
                            color: userLoggedIn ? '#fff' : '#276b77ff',
                        }}>
                            <PersonIcon fontSize="small" />
                            {userLoggedIn ? 'Log Out' : 'Log In'}
                        </Button>
                    </Box>

                </Box>

                <IconButton 
                onClick={toggleDrawer(true)}
                sx={{ 
                    display: { xs: 'flex', md: 'none' }, 
                    color: '#fff' 
                }}>
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>

        <Drawer
        anchor="right" 
        open={drawerOpen} 
        onClose={toggleDrawer(false)}>
            <Box
            role="presentation" 
            onClick={toggleDrawer(false)}
            sx={{ width: 250 }}>
                <List>
                    {headerNav.map((item) => (
                        <ListItemButton 
                        key={item.path} 
                        component={Link} 
                        to={item.path}>
                            <ListItemText primary={item.display} />
                        </ListItemButton>
                    ))}
                    <ListItemButton onClick={userLoggedIn ? handleLogout : () => navigate('/login')}>
                        <ListItemText primary={userLoggedIn ? 'Log Out' : 'Log In'} />
                    </ListItemButton>
                </List>
            </Box>
        </Drawer>

        </>
    )
}
export default Header;