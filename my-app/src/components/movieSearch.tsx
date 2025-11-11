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
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';

interface MovieSearchProps {
    onFilterChange: (filters: Record<string, string>) => void;
    onSortChange: (sort: string) => void;
    currentSort: string;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ onFilterChange, onSortChange, currentSort }) => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [minRating, setMinRating] = useState('');
    const [sortByLocal, setSortByLocal] = useState(currentSort);

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
          display: "flex",
          gap: 2,
          m: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => setFilterOpen(true)}
          startIcon={<FilterAltIcon />}
          sx={{
            borderColor: "#276b77ff",
            color: "#fff",
            "&:hover": { backgroundColor: "#575656ff" },
            textTransform: "none",
          }}
        >
          Filter
        </Button>
        
        <Button
          variant="outlined"
          onClick={() => setSortOpen(true)}
          startIcon={<SortIcon />}
          sx={{
            borderColor: "#276b77ff",
            color: "#fff",
            "&:hover": { backgroundColor: "#575656ff" },
            textTransform: "none",
          }}
        >
          Sort
        </Button>

        <Dialog
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{ color: "#276b77ff" }}>Filter</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              scrollbarWidth: "thin",
            }}
          >
            <FormControl
              sx={{
                width: "sm",
                marginTop: 2,
              }}
            >
              <InputLabel
                id="genre-label"
                sx={{
                  color: "#276b77ff",
                  px: 0.5,
                  backgroundColor: "white",
                  "&.Mui-focused": {
                    color: "#276b77ff",
                  },
                }}
              >
                Genre
              </InputLabel>
              <Select
                labelId="genre-label"
                value={selectedGenre}
                onChange={(e: SelectChangeEvent<string>) =>
                  setSelectedGenre(e.target.value)
                }
                variant="outlined"
                displayEmpty
                MenuProps={{
                  PaperProps: {
                    sx: {
                      width: 160,
                      maxHeight: 300,
                    },
                  },
                }}
                sx={{
                  color: "#276b77ff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#276b77ff",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#276b77ff",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#276b77ff",
                  },
                  "& .MuiSelect-icon": {
                    color: "#276b77ff",
                  },
                }}
              >
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

            <FormControl
              sx={{
                width: "sm",
              }}
            >
              <InputLabel
                sx={{
                  color: "#276b77ff",
                  backgroundColor: "white",
                  px: 0.5,
                  '&.Mui-focused': {
                      color: '#276b77ff',
                  },
                }}
              >
                Language
              </InputLabel>
              <Select
                value={selectedLanguage}
                onChange={(e: SelectChangeEvent<string>) =>
                  setSelectedLanguage(e.target.value as string)
                }
                displayEmpty
                MenuProps={{
                  PaperProps: {
                    sx: {
                      width: 160,
                      maxHeight: 300,
                    },
                  },
                }}
                sx={{
                  color: "#276b77ff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "##276b77ff",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#276b77ff",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#276b77ff",
                  },
                  "& .MuiSelect-icon": {
                    color: "#276b77ff",
                  },
                }}
              >
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

            <FormControl
              sx={{
                width: "sm",
              }}
            >
              <InputLabel
                sx={{
                  color: "#276b77ff",
                  backgroundColor: "white",
                  px: 0.5,
                  '&.Mui-focused': {
                      color: '#276b77ff',
                  },
                }}
              >
                Minimum Rating
              </InputLabel>
              <Select
                value={minRating}
                onChange={(e: SelectChangeEvent<string>) =>
                  setMinRating(e.target.value as string)
                }
                displayEmpty
                MenuProps={{
                  PaperProps: {
                    sx: {
                      width: 160,
                      maxHeight: 300,
                    },
                  },
                }}
                sx={{
                  color: "#276b77ff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "##276b77ff",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#276b77ff",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#276b77ff",
                  },
                  "& .MuiSelect-icon": {
                    color: "#276b77ff",
                  },
                }}
              >
                {Array.from({ length: 10 }, (_, i) => {
                  const rating = (i + 1).toFixed(1);
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
            <Button
              variant="contained"
              onClick={() => setFilterOpen(false)}
              sx={{
                textTransform: "none",
                backgroundColor: "#8b8b8bff",
                "&:hover": { backgroundColor: "#276b77ff" },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={applyFilters}
              sx={{
                textTransform: "none",
                backgroundColor: "#8b8b8bff",
                "&:hover": { backgroundColor: "#276b77ff" },
              }}
            >
              Apply
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={sortOpen}
          onClose={() => setSortOpen(false)}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle sx={{ color: "#276b77ff" }}>Sort By</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel
                sx={{
                  color: "#276b77ff",
                  backgroundColor: "white",
                  px: 0.5,
                  "&.Mui-focused": {
                    color: "#276b77ff",
                  },
                }}
              >
                Sort
              </InputLabel>

              <Select
                value={sortByLocal}
                onChange={(e: SelectChangeEvent<string>) =>
                  setSortByLocal(e.target.value as string)
                }
                label="Sort"
                sx={{
                  color: "#276b77ff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "##276b77ff",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#276b77ff",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#276b77ff",
                  },
                  "& .MuiSelect-icon": {
                    color: "#276b77ff",
                  },
                }}
              >
                <MenuItem value="latest">Latest</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => setSortOpen(false)}
              sx={{
                textTransform: "none",
                backgroundColor: "#8b8b8bff",
                "&:hover": { backgroundColor: "#276b77ff" },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={applySort}
              sx={{
                textTransform: "none",
                backgroundColor: "#8b8b8bff",
                "&:hover": { backgroundColor: "#276b77ff" },
              }}
            >
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
};
export default MovieSearch