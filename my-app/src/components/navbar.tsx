import { useEffect, useState, MouseEvent, ChangeEvent, FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  CircularProgress,
  ListItemText,
  IconButton,
  InputBase,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/PersonAdd';
import apiConfig from '../ApiTmdb/apiConfig';
import { useAuth } from '../Hooks/AuthProvider';
import toast from 'react-hot-toast';

interface Genre {
  id: number;
  name: string;
}
const drawerWidth = 240;
const headerNav = [
  { display: 'Home', path: `/home` },
  { display: 'Movies', path: `/home/movie` },
  { display: 'TV Shows', path: `/home/tv` },
  { display: 'Bookmarks', path: '/bookmarks' },
];

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loadingGenres, setLoadingGenres] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { userLoggedIn, setUser } = useAuth(); 

  const open = Boolean(anchorEl);
  const currentCategory = pathname.includes('/tv') ? 'tv' : 'movie';

  const isActive = (path: string): boolean =>
    path === `/home` ? pathname === path : pathname.startsWith(path);

  useEffect(() => {
    const controller = new AbortController();

    const fetchGenres = async () => {
      setLoadingGenres(true);
      setError(null);
      try {
        const res = await fetch(
          `${apiConfig.baseUrl}/genre/${currentCategory}/list?api_key=${apiConfig.apiKey}&language=en-US`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error('Failed to fetch genres');
        const data = await res.json();
        setGenres(data.genres || []);
      } catch (err: any) {
        if (err.name !== 'AbortError') setError(err.message || 'Error');
      } finally {
        setLoadingGenres(false);
      }
    };

    fetchGenres();
    return () => controller.abort();
  }, [currentCategory]);

  const handleSelectGenre = (genre: Genre) => {
    setAnchorEl(null);
    navigate(`/home/${currentCategory}/genre/${genre.id}`);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/home/${currentCategory}/search/${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

 const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'GET',
        credentials: 'include',
      });

      const res = await fetch('/api/user', {
        credentials: 'include',
      });
      const data = await res.json();
      if (!data.success) {
        setUser(null);
        toast.success('You have been logged out.');
        navigate('/home');
      }
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#276b77ff',
        height: { xs: '45px', sm: '55px', md: '65px' },
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={Link}
            to={`/home`}
            sx={{
              textDecoration: 'none',
              color: '#fff',
              fontWeight: 'bold',
              letterSpacing: 1,
            }}
          >
            MovieHub
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {headerNav.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                color="inherit"
                sx={{
                  textTransform: 'none',
                  fontWeight: isActive(item.path) ? 'bold' : 'normal',
                  borderBottom: isActive(item.path) ? '2px solid #fff' : 'none',
                  borderRadius: 0,
                }}
              >
                {item.display}
              </Button>
            ))}

            {/* Genre Dropdown */}
            <Box>
              <Button
                color="inherit"
                onClick={(e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)}
                sx={{ textTransform: 'none' }}
              >
                Categories
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                slotProps={{
                  paper: {
                    sx: { 
                      maxHeight: 360, 
                      minWidth: 200,
                      scrollbarWidth: 'none',
                     },
                  },
                }}
              >
                {loadingGenres && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                    <CircularProgress size={24} />
                  </Box>
                )}
                {error && (
                  <MenuItem disabled>
                    <ListItemText primary="Failed to load" secondary={error} />
                  </MenuItem>
                )}
                {!loadingGenres && !error && genres.length === 0 && (
                  <MenuItem disabled>
                    <ListItemText primary="No categories" />
                  </MenuItem>
                )}
                {genres.map((g) => (
                  <MenuItem
                    key={g.id}
                    onClick={() => handleSelectGenre(g)}
                    sx={{ textTransform: 'none' }}
                  >
                    {g.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Search */}
            <Box
              component="form"
              onSubmit={handleSearchSubmit}
              sx={{ display: 'flex', alignItems: 'center', ml: 1 }}
            >
              {searchOpen && (
                <InputBase
                  placeholder={`Search ${currentCategory === 'tv' ? 'TV shows' : 'movies'}...`}
                  value={searchQuery}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  sx={{
                    ml: 1,
                    color: '#fff',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    px: 1,
                    borderRadius: 1,
                    width: 160,
                  }}
                />
              )}
              <IconButton aria-label="Search" onClick={() => setSearchOpen((prev) => !prev)} sx={{ color: '#fff' }}>
                <SearchIcon />
              </IconButton>
            </Box>

            {/* Auth Status */}
            <Box sx={{ ml: 2, display: { xs: 'none', md: 'block', lg: 'block' }}} >
              <Button
                variant={userLoggedIn ? 'outlined' : 'contained'}
                onClick={userLoggedIn ? handleLogout : () => navigate('/login')}
                sx={{
                  borderColor: 'white',
                  textTransform: 'none',
                  backgroundColor: userLoggedIn ? 'transparent' : '#fff',
                  color: userLoggedIn ? '#fff' : '#276b77ff',
                  '&:hover': {
                    backgroundColor: userLoggedIn ? 'rgba(255,255,255,0.1)' : '#e0f7fa',
                  },
                }}
              >
                <PersonIcon fontSize="small" />
                {userLoggedIn ? 'Log Out' : 'Log In'}
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
