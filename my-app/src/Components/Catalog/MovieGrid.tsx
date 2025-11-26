import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid'; 
import { MovieGridProps, MovieItem, RouteParams } from '../../Utils/Interfaces'; 
import AppButton from "../Common/AppButton";
import { Box, Typography } from '@mui/material';
import MovieCardSkeleton from '../Skeletons/MovieCardSkeleton';
import PageHeader from './PageHeader';
import MovieCard from '../MovieCard/MovieCard';
import { Category, Filters, isType, ListType } from '../../Utils/utils';
import MovieSearch from './MovieSearch/MovieSearch';
import { useAuth } from '../../Context/AuthProvider';
import { FetchMediaList, GetHeading } from '../../HelperFunctions/FetchMedia';

const MovieGrid: React.FC<MovieGridProps> = ({ category, type: incomingType }) => {
  const [items, setItems] = useState<MovieItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [filters, setFilters] = useState<Filters>({});
  const [sortBy, setSortBy] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const { keyword, genreId } = useParams<RouteParams>();
  const { userLoggedIn } = useAuth();
  
  const finalType: ListType = isType(incomingType) ? incomingType : "popular";
  const safeCategory: Category = category === "tv" ? "tv" : "movie";

  useEffect(() => {
    setPage(1);
    setLoading(true);
  }, [keyword, genreId, filters, sortBy, safeCategory, finalType]);

  useEffect(() => {
    setPage(1);
    setLoading(true);
    (async () => {
      try {
        const response = await FetchMediaList( safeCategory, incomingType, filters, sortBy, genreId, keyword, 1 );
        setItems(response?.results || []);
        setTotalPage(response?.total_pages || 0);
      } catch {
        setItems([]);
        setTotalPage(0);
      } finally {
        setLoading(false);
      }
    })();
  }, [keyword, genreId, filters, sortBy, safeCategory, incomingType]);

  const loadMore = async () => {
    const nextPage = page + 1;
    try {
      const response = await FetchMediaList( safeCategory, incomingType, filters, sortBy, genreId, keyword, nextPage );
      setItems((prev) => [...prev, ...(response?.results || [])]);
      setPage(nextPage);
    } catch (error) {
      console.error("loadMore error", error);
    }
  };
  
  return (
    <Box>
      <PageHeader>{GetHeading(incomingType, safeCategory, keyword, genreId)}</PageHeader>
      {items.length > 0 && (
        <MovieSearch onFilterChange={(f) => setFilters(f)} onSortChange={(s: string) => setSortBy(s)} currentSort={sortBy} safeCategory={safeCategory}/>
      )}
      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 4 }}
        sx={{ justifyContent: "center", alignItems: "center" }}>
        {loading ? (
          Array.from({ length: 20 }).map((_, index) => (
            <Grid key={index}>
              <MovieCardSkeleton />
            </Grid>
          ))
        ) : items.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6" color="white">
              No results found!!!
            </Typography>
          </Box>
        ) : (
          items.map((item) => (
            <Grid key={item.id}>
              <MovieCard category={safeCategory} item={{ ...item, category: safeCategory }} userLoggedIn={userLoggedIn}/>
            </Grid>
          ))
        )}
      </Grid>
      {page < totalPage && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <AppButton onClick={loadMore}>Load More</AppButton>
        </Box>
      )}
    </Box>
  );
};
export default MovieGrid;
