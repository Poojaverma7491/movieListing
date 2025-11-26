import { Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, } from "@mui/material";
import { useState } from "react";
import AppButton from "../../Common/AppButton";
import { SortDialogProps } from "../../../Utils/Interfaces";

const SortDialog: React.FC<SortDialogProps> = ({ open, onClose, onApply, currentSort, }) => {
  const [sortByLocal, setSortByLocal] = useState(currentSort);
  const applySort = () => { onApply(sortByLocal); onClose(); };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ color: "#276b77ff" }}>Sort By</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel
            sx={{
              color: "#276b77ff",
              backgroundColor: "white",
              px: 0.5,
              "&.Mui-focused": { color: "#276b77ff", },
            }}>
            Sort
          </InputLabel>
          <Select
            value={sortByLocal}
            onChange={(e: SelectChangeEvent<string>) =>
              setSortByLocal(e.target.value)
            }
            label="Sort"
            sx={{
              color: "#276b77ff",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "##276b77ff", },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#276b77ff", },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#276b77ff", },
              "& .MuiSelect-icon": { color: "#276b77ff" },
            }}>
            <MenuItem value="latest">Latest</MenuItem>
            <MenuItem value="rating">Highest Rated</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <AppButton onClick={onClose}>Cancel</AppButton>
        <AppButton onClick={applySort}>Apply</AppButton>
      </DialogActions>
    </Dialog>
  );
};

export default SortDialog;
