import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import MovieGrid from "../components/movieGrid";
import { category as cate } from "../api/tmdbApi";

interface RouteParams {
  category?: string;
  keyword?: string;
  genreId?: string;
  type?: string;
  [key: string]: string | undefined;
}

const Catalog: React.FC = () => {
  const { category: catParamRaw, keyword, genreId, type } = useParams<RouteParams>();
  const catParam = catParamRaw?.toLowerCase();

  const safeCategory: "movie" | "tv" =
    catParam === cate.movie || catParam === cate.tv ? catParam : cate.movie;

  return (
    <Container sx={{ p: 4 }}>
      <MovieGrid
        category={safeCategory}
        keyword={keyword}
        genreId={genreId}
        type={type}
      />
    </Container>
  );
};

export default Catalog;
