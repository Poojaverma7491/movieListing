import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Chip } from '@mui/material';
import tmdbApi from '../api/tmdbApi';
import apiConfig from '../api/apiConfig';
import MovieList from './movieList';

interface Genre {
  id: number;
  name: string;
}

interface MediaDetail {
  title?: string;
  name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  overview?: string;
  genres?: Genre[];
  [key: string]: any;
}

interface RouteParams extends Record<string, string | undefined> {
  category?: string;
  id?: string;
}

const Detail: React.FC = () => {
  const { category, id } = useParams<RouteParams>();
  const [item, setItem] = useState<MediaDetail | null>(null);

  // Narrow category to "movie" | "tv"
  const isValidCategory = category === 'movie' || category === 'tv';
  const safeCategory = isValidCategory ? category : undefined;

  useEffect(() => {
    const getDetail = async () => {
      if (!safeCategory || !id) return;
      try {
        const response = await tmdbApi.detail(safeCategory, id, { params: {} });
        setItem(response);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Failed to fetch detail:', error);
      }
    };
    getDetail();
    

  }, [safeCategory, id]);

  if (!item || !safeCategory) return null;

  const poster = apiConfig.originalImage(item.poster_path || item.backdrop_path || '');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#000', color: '#fff' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          px: 10,
          py: 15,
          gap: 4,
        }}>
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${poster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 2,
            px: 10,
            py: 15,
          }}/>

        <Box
          sx={{
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {item.title || item.name}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {item.genres?.slice(0, 5).map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                sx={{ backgroundColor: '#333', color: '#fff' }}/>
              ))}
          </Box>

          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            {item.overview}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ px: 6 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Similar
        </Typography>
        <MovieList category={safeCategory} type="similar" id={item.id} />
      </Box>
    </Box>
  );
};

export default Detail;
