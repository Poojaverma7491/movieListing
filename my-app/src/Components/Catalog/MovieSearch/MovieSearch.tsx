import { useState } from "react";
import { Box } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import FilterDialog from "./FilterDialog";
import SortDialog from "./SortDialog";
import { MovieSearchProps } from "../../../Utils/Interfaces";
import AppButton from "../../Common/AppButton";

const MovieSearch: React.FC<MovieSearchProps> = ({ onFilterChange, onSortChange, currentSort, safeCategory }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <Box sx={{ px: 5, display: "flex", gap: { xs: 1.5, sm: 2 }, m: { xs: 1, sm: 2 }, justifyContent: { xs: "center", sm: "flex-start" } }}>
      <AppButton onClick={() => setFilterOpen(true)} startIcon={<FilterAltIcon />} theme="outlined">
        Filter
      </AppButton>
      <AppButton onClick={() => setSortOpen(true)} startIcon={<SortIcon />} theme="outlined">
        Sort
      </AppButton>

      <FilterDialog
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={onFilterChange}
        category={safeCategory}
      />

      <SortDialog
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        onApply={onSortChange}
        currentSort={currentSort}
      />
    </Box>
  );
};

export default MovieSearch;
