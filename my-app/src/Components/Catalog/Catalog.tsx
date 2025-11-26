import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import MovieGrid from "./MovieGrid";
import { RouteParams } from "../../Utils/Interfaces";
import { Category } from "../../Utils/utils";
import FilterDialog from "./MovieSearch/FilterDialog";

const Catalog: React.FC = () => {
  const { category, keyword, genreId, type } = useParams<RouteParams>();
  const safeCategory: Category = category?.toLowerCase() === "tv" ? "tv" : "movie";
  return (
    <Box>
      <MovieGrid
        category={safeCategory}
        keyword={keyword}
        genreId={genreId}
        type={type}
      />
    </Box>
  );
};

export default Catalog;
