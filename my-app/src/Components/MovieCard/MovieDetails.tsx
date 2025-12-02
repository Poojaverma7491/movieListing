import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Chip } from '@mui/material';
import { MediaDetail, RouteParams } from '../../Utils/Interfaces';
import tmdbApi from '../../ApiTmdb/ApiTmdb';
import DetailSkeleton from '../Skeletons/MovieDetailSkeleton';
import MovieList from '../MovieList/MovieList';
import ApiConfig from '../../ApiTmdb/ApiConfic';

const MovieDetail: React.FC = () => {
  const { category, id } = useParams<RouteParams>();
  const [item, setItem] = useState<MediaDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const safeCategory = category === "movie" || category === "tv" ? category : undefined;

  useEffect(() => {
    const getDetail = async () => {
      if (!safeCategory || !id) return;
      try {
        setLoading(true);
        const response = await tmdbApi.detail(safeCategory, id, { params: {} });
        setItem(response);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Failed to fetch detail:', error);
      }finally {
        setLoading(false); 
      }
    };
    getDetail();
  }, [safeCategory, id]);

  if (loading) {
    return (
      <DetailSkeleton/>
    );
  }
  
  if (!item || !safeCategory) {
    return (
      <Box sx={{ backgroundColor: '#000', color: '#fff', py: 10, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Sorry, we couldn’t find the details for this item.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#000', color: '#fff' }}>
      <Box
        sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, px: 10, py: 15, gap: 4, }}>
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${ApiConfig.originalImage(item.poster_path || item.backdrop_path || '')})`,
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
              ))
            }
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
export default MovieDetail;
