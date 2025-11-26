import { Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import FetchGenres from "../../../HelperFunctions/FetchGenre";
import FetchLanguages from "../../../HelperFunctions/FetchLanguages";
import AppButton from "../../Common/AppButton";
import { FilterDialogProps } from "../../../Utils/Interfaces";

const FilterDialog: React.FC<FilterDialogProps> = ({ open, onClose, onApply, category }) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [minRating, setMinRating] = useState("");

  const { genres, loading, error } = FetchGenres(category);
  const { languages, loading: langLoading, error: langError } = FetchLanguages();

  const applyFilters = () => {
    const f: Record<string, string> = {};
    if (selectedGenre) f.with_genres = selectedGenre;
    if (selectedLanguage) f.with_original_language = selectedLanguage;
    if (minRating) f["vote_average.gte"] = minRating;
    onApply(f);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ color: "#276b77ff" }}>Filter</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, scrollbarWidth: "thin",}}>
        {/* Genre */}
        <FormControl sx={{ mt: 2 }}>
          <InputLabel id="genre-label" sx={{ color: "#276b77ff", backgroundColor: "white", px: 0.5, "&.Mui-focused": { color: "#276b77ff", }, }}>
            Genre
          </InputLabel>
          <Select
            labelId="genre-label"
            value={selectedGenre}
            onChange={(e: SelectChangeEvent<string>) => setSelectedGenre(e.target.value)}
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
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#276b77ff", },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#276b77ff", },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#276b77ff", },
                "& .MuiSelect-icon": { color: "#276b77ff", },
            }}>
            {loading && <MenuItem disabled>Loading...</MenuItem>}
            {error && <MenuItem disabled>Error loading genres</MenuItem>}
            {genres.slice().sort((a, b) => a.name.localeCompare(b.name)).map((g) => (
              <MenuItem key={g.id} value={g.id.toString()}>
                {g.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Languages */}
        <FormControl>
          <InputLabel sx={{ color: "#276b77ff", backgroundColor: "white", px: 0.5, "&.Mui-focused": { color: "#276b77ff", }, }}>Language</InputLabel>
          <Select
            value={selectedLanguage}
            onChange={(e: SelectChangeEvent<string>) => setSelectedLanguage(e.target.value)}
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
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#276b77ff", },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#276b77ff", },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#276b77ff", },
                "& .MuiSelect-icon": { color: "#276b77ff", },
            }}>
            {langLoading && <MenuItem disabled>Loading...</MenuItem>}
            {langError && <MenuItem disabled>Error loading languages</MenuItem>}
            {languages.slice().sort((a, b) => a.english_name.localeCompare(b.english_name)).map((l) => (
              <MenuItem key={l.iso_639_1} value={l.iso_639_1}>
                {l.english_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Rating */}
        <FormControl>
          <InputLabel sx={{ color: "#276b77ff", backgroundColor: "white", px: 0.5, "&.Mui-focused": { color: "#276b77ff", }, }}>Minimum Rating</InputLabel>
          <Select
            value={minRating}
            onChange={(e: SelectChangeEvent<string>) => setMinRating(e.target.value)}
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
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#276b77ff", },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#276b77ff", },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#276b77ff", },
                "& .MuiSelect-icon": { color: "#276b77ff", },
            }}>
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
        <AppButton onClick={onClose}>Cancel</AppButton>
        <AppButton onClick={applyFilters}>Apply</AppButton>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;
