import {useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

interface MovieSearchProps {
    onFilterChange: (filters: Record<string, string>) => void;
    onSortChange: (sort: string) => void;
    currentSort: string;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ onFilterChange, onSortChange, currentSort }) => {
    const [filterOpen, setFilterOpen] = useState<boolean>(false);
    const [sortOpen, setSortOpen] = useState<boolean>(false);
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const [selectedLanguage, setSelectedLanguage] = useState<string>('');
    const [minRating, setMinRating] = useState<string>('');
    const [sortByLocal, setSortByLocal] = useState<string>(currentSort || '');

    const applyFilters = () => {
        const f: Record<string, string> = {};
        if (selectedGenre) f.with_genres = selectedGenre;
        if (selectedLanguage) f.with_original_language = selectedLanguage;
        if (minRating) f['vote_average.gte'] = minRating;
        onFilterChange(f);
        setFilterOpen(false);
    };

    const applySort = () => {
        onSortChange(sortByLocal);
        setSortOpen(false);
    };

    return (
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            mb: 3,
        }}
        >
        <Button
            variant="contained"
            onClick={() => setFilterOpen(true)}
            sx={{
            backgroundColor: '#276b77ff',
            color: '#fff',
            '&:hover': { backgroundColor: '#000000ff' },
            textTransform: 'none',
            }}
        >
            Filter
        </Button>
        <Button
            variant="contained"
            onClick={() => setSortOpen(true)}
            sx={{
            backgroundColor: '#276b77ff',
            color: '#fff',
            '&:hover': { backgroundColor: '#000000ff' },
            textTransform: 'none',
            }}
        >
            Sort
        </Button>

        <Dialog open={filterOpen} onClose={() => setFilterOpen(false)} fullWidth maxWidth="sm">
            <DialogTitle>Filter</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth>
                <InputLabel>Genre</InputLabel>
                <Select
                value={selectedGenre}
                onChange={(e: SelectChangeEvent<string>) => setSelectedGenre(e.target.value as string)}
                label="Genre"
                >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="28">Action</MenuItem>
                <MenuItem value="12">Adventure</MenuItem>
                <MenuItem value="16">Animation</MenuItem>
                <MenuItem value="35">Comedy</MenuItem>
                <MenuItem value="80">Crime</MenuItem>
                <MenuItem value="99">Documentary</MenuItem>
                <MenuItem value="18">Drama</MenuItem>
                <MenuItem value="10751">Family</MenuItem>
                <MenuItem value="14">Fantasy</MenuItem>
                <MenuItem value="36">History</MenuItem>
                <MenuItem value="27">Horror</MenuItem>
                <MenuItem value="10402">Music</MenuItem>
                <MenuItem value="9648">Mystery</MenuItem>
                <MenuItem value="10749">Romance</MenuItem>
                <MenuItem value="878">Science Fiction</MenuItem>
                <MenuItem value="10770">TV Movie</MenuItem>
                <MenuItem value="53">Thriller</MenuItem>
                <MenuItem value="10752">War</MenuItem>
                <MenuItem value="37">Western</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                value={selectedLanguage}
                onChange={(e: SelectChangeEvent<string>) => setSelectedLanguage(e.target.value as string)}
                label="Language"
                >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="hi">Hindi</MenuItem>
                <MenuItem value="fr">French</MenuItem>
                <MenuItem value="es">Spanish</MenuItem>
                <MenuItem value="zh">Chinese</MenuItem>
                <MenuItem value="ja">Japanese</MenuItem>
                <MenuItem value="ko">Korean</MenuItem>
                <MenuItem value="de">German</MenuItem>
                <MenuItem value="it">Italian</MenuItem>
                <MenuItem value="ru">Russian</MenuItem>
                <MenuItem value="bn">Bengali</MenuItem>
                <MenuItem value="ta">Tamil</MenuItem>
                <MenuItem value="te">Telugu</MenuItem>
                <MenuItem value="ml">Malayalam</MenuItem>
                <MenuItem value="tr">Turkish</MenuItem>
                <MenuItem value="fa">Persian</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>Minimum Rating</InputLabel>
                <Select
                value={minRating}
                onChange={(e: SelectChangeEvent<string>) => setMinRating(e.target.value as string)}
                label="Minimum Rating"
                >
                <MenuItem value="">Any</MenuItem>
                {Array.from({ length: 10 }, (_, i) => {
                    const rating = ((i + 1) / 1).toFixed(1);
                    return (
                    <MenuItem key={rating} value={rating}>
                        {rating}
                    </MenuItem>
                    );
                })}
                </Select>
            </FormControl>
            </DialogContent>

            <DialogActions>
            <Button onClick={() => setFilterOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={applyFilters}>
                Apply
            </Button>
            </DialogActions>
        </Dialog>

        <Dialog open={sortOpen} onClose={() => setSortOpen(false)} fullWidth maxWidth="xs">
            <DialogTitle>Sort By</DialogTitle>
            <DialogContent>
            <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Sort</InputLabel>
                <Select
                value={sortByLocal}
                onChange={(e: SelectChangeEvent<string>) => setSortByLocal(e.target.value as string)}
                label="Sort"
                >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="latest">Latest</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
                </Select>
            </FormControl>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setSortOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={applySort}>
                Apply
            </Button>
            </DialogActions>
        </Dialog>
        </Box>
    );
};
export default MovieSearch