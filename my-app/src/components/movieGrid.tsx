import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid'; 
import MovieCard from '../components/movieCard';
import { MediaItem } from '../types/media'; 
import tmdbApi from '../api/tmdbApi';
import MovieSearch from './movieSearch';
import {
  Box,
  Container,
  Button,
} from '@mui/material';
import PageHeader from './pageHeader';
import { useAuth } from '../hooks/AuthProvider';

type MovieType = 'popular' | 'top_rated' | 'upcoming';
type TvType = 'popular' | 'top_rated' | 'upcoming';

interface MovieGridProps {
  category?: 'movie' | 'tv';
  type?: string;
  keyword?: string;
  genreId?: string;
}

interface RouteParams {
  keyword?: string;
  genreId?: string;
  [key: string]: string | undefined;
}
 
const MovieGrid: React.FC<MovieGridProps> = ({ category: cat, type: incomingType }) => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const { keyword, genreId } = useParams<RouteParams>();
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [sortBy, setSortBy] = useState<string>('');
  const { userLoggedIn } = useAuth();

  const isMovieType = (val: string | undefined): val is MovieType =>
    ['popular', 'top_rated', 'upcoming'].includes(val || '');

  const isTvType = (val: string | undefined): val is TvType =>
    ['popular', 'top_rated', 'upcoming'].includes(val || '');

  const normalizedCat: 'movie' | 'tv' = cat === 'tv' ? 'tv' : 'movie';

  const defaultMovieType: MovieType = 'popular';
  const defaultTvType: TvType = 'popular';

  const finalMovieType: MovieType = isMovieType(incomingType) ? incomingType : defaultMovieType;
  const finalTvType: TvType = isTvType(incomingType) ? incomingType : defaultTvType;

  useEffect(() => {
    setPage(1);
  }, [keyword, genreId, filters, sortBy, normalizedCat, finalTvType, finalMovieType]);

  useEffect(() => {
    const fetchList = async () => {
      const pageToFetch = 1;
      const hasFilters = Object.keys(filters).length > 0 || !!genreId;

      const params: Record<string, any> = {
        ...filters,
        page: pageToFetch,
        ...(genreId && { with_genres: genreId }),
      };
      if (sortBy === 'latest') params.sort_by = 'release_date.desc';
      if (sortBy === 'rating') params.sort_by = 'vote_average.desc';

      try {
        let response: any = null;

        if (keyword?.trim()) {
          response = await tmdbApi.search(normalizedCat, {
            params: { query: keyword, page: pageToFetch },
          });
        } else if (hasFilters || sortBy) {
          response = normalizedCat === 'movie'
            ? await tmdbApi.discoverMovie({ params })
            : await tmdbApi.discoverTv({ params });
        } else {
          response = normalizedCat === 'movie'
            ? await tmdbApi.getMoviesList(finalMovieType, { params }) 
            : await tmdbApi.getTvList(finalTvType, { params });     
        }

        setItems(response?.results || []);
        setTotalPage(response?.total_pages || 0);
      } catch (error) {
        console.error('fetchList error', error);
        setItems([]);
        setTotalPage(0);
      }
    };

    fetchList();
  }, [keyword, genreId, normalizedCat, filters, sortBy, finalMovieType, finalTvType]);

  const loadMore = async () => {
    const nextPage = page + 1;
    const hasFilters = Object.keys(filters).length > 0 || !!genreId;

    const params: Record<string, any> = {
      ...filters,
      page: nextPage,
      ...(genreId && { with_genres: genreId }),
    };
    if (sortBy === 'latest') params.sort_by = 'release_date.desc';
    if (sortBy === 'rating') params.sort_by = 'vote_average.desc';

    try {
      let response: any = null;

      if (keyword?.trim()) {
        response = await tmdbApi.search(normalizedCat, {
          params: { query: keyword, page: nextPage },
        });
      } else if (hasFilters || sortBy) {
        response = normalizedCat === 'movie'
          ? await tmdbApi.discoverMovie({ params })
          : await tmdbApi.discoverTv({ params });
      } else {
        response = normalizedCat === 'movie'
          ? await tmdbApi.getMoviesList(finalMovieType, { params })
          : await tmdbApi.getTvList(finalTvType, { params });    
      }

      setItems((prev) => [...prev, ...(response?.results || [])]);
      setPage(nextPage);
    } catch (error) {
      console.error('loadMore error', error);
    }
  };

  const getHeading = (): string => {
    if (keyword) return `Search: ${decodeURIComponent(keyword)}`;
    if (genreId) return `Genre: ${genreId}`;

    const isMovie = normalizedCat === 'movie';
    const isTV = normalizedCat === 'tv';

    if (incomingType === 'popular') {
      return isMovie ? 'Popular Movies' : isTV ? 'Popular TV Shows' : 'Popular';
    }

    if (incomingType === 'top_rated') {
      return isMovie ? 'Top Rated Movies' : isTV ? 'Top Rated TV Shows' : 'Top Rated';
    }

    if (incomingType === 'upcoming') {
      return isMovie ? 'Upcoming Movies' : isTV ? 'Upcoming TV Shows' : 'Upcoming';
    }

    return isMovie ? 'Movies' : isTV ? 'TV Shows' : 'Browse';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <PageHeader>{getHeading()}</PageHeader>
      <MovieSearch onFilterChange={(f) => setFilters(f)} onSortChange={(s) => setSortBy(s)} currentSort={sortBy} />
      <Grid container spacing={4} sx={{ justifyContent: 'center', alignItems: 'center' }}>
        {items.map((item) => (
          <Grid key={item.id}>
            <MovieCard category={normalizedCat} item={item} userLoggedIn={userLoggedIn} />
          </Grid>
        ))}
      </Grid>

      {page < totalPage && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
          variant="contained" 
          onClick={loadMore} 
          sx={{
            backgroundColor: '#276b77ff',
            color: '#fff',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#074061ff' },
          }}>
            Load More
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default MovieGrid;
