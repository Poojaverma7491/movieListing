import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  Stack,
  Skeleton,
} from '@mui/material';

import tmdbApi, { category, movieType } from '../ApiTmdb/tmdbApi';
import apiConfig from '../ApiTmdb/apiConfig';
import AppButton from './Button';

interface MovieItem {
  id: number;
  title: string;
  overview: string;
  backdrop_path?: string;
  poster_path?: string;
}

interface HeroSlideItemProps {
  item: MovieItem;
  onTrailerOpen: (key: string | null) => void;
}

const HeroSlide: React.FC = () => {
  const [movieItems, setMovieItems] = useState<MovieItem[]>([]);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await tmdbApi.getMoviesList(movieType.popular, { params: { page: 1 } }) as any;
        setMovieItems(res.results.slice(0, 10));
      } catch {
        console.error('Failed to fetch hero movies');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <Box>
      {loading ? (
        <Box sx={{ maxWidth: '90%', textAlign: 'center', mx: 'auto', py: 10,  bgcolor: 'grey.800' }}>
          <Skeleton variant="text" width="60%" height={60} sx={{ mx: 'auto', mb: 2, bgcolor: 'grey.700' }} />
          <Skeleton variant="text" width="80%" height={120} sx={{ mx: 'auto', mb: 2, bgcolor: 'grey.700' }} />
          <Box sx={{ mt: 4 }}>
            <Skeleton variant="rectangular" width={200} height={300} sx={{ mx: 'auto', borderRadius: 2, bgcolor: 'grey.700' }} />
          </Box>
        </Box>
      ) : (
        <Swiper
          modules={[Autoplay]}
          grabCursor
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
        >
          {movieItems.map((item) => (
            <SwiperSlide key={item.id}>
              <HeroSlideItem item={item} onTrailerOpen={setTrailerKey} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <Dialog open={Boolean(trailerKey)} onClose={() => setTrailerKey(null)} maxWidth="md" fullWidth>
        <DialogContent sx={{ p: 0 }}>
          {trailerKey ? (
            <iframe
              width="100%"
              height="500px"
              title="Trailer"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              allowFullScreen
            />
          ) : (
            <Box sx={{ p: 4 }}>
              <Typography>No trailer available</Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const HeroSlideItem: React.FC<HeroSlideItemProps> = ({ item, onTrailerOpen }) => {
  const background = apiConfig.originalImage(item.backdrop_path || item.poster_path || '');

  const handleWatchTrailer = async () => {
    try {
      const videos = await tmdbApi.getVideos(category.movie, item.id) as any;
      const trailer = videos.results.find((v: { type: string }) => v.type === 'Trailer' || v.type === 'Teaser');
      onTrailerOpen(trailer ? trailer.key : null);
    } catch {
      onTrailerOpen(null);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        height: { xs: '30vh', sm: '50vh', md: '80vh' },
        p: { xs: '45px', sm: '55px', md: '65px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Box 
        sx={{
          textAlign: 'center', 
          height: { xs: '30vh', sm: '50vh', md: '80vh' },
          display: 'flex',  
          flexDirection: 'column',  
          alignItems: 'center',    
          justifyContent: 'center', 
        }}>
        <Typography 
        variant="h4" 
        gutterBottom 
        sx={{
          fontWeight: 'bold',
          fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem', lg: '2.5rem' }
        }}>
          {item.title}
        </Typography>
        
        <Typography 
        gutterBottom
        sx={{
          display: { xs: '-webkit-box', sm: 'block' },
          WebkitLineClamp: { xs: 3, sm: 'unset' },
          WebkitBoxOrient: { xs: 'vertical', sm: 'unset' },
          overflow: { xs: 'hidden', sm: 'visible' },
          textOverflow: { xs: 'ellipsis', sm: 'unset' },
        }}>
          {item.overview}
        </Typography>

        <Stack 
          alignItems="center">
          <AppButton onClick={handleWatchTrailer}>
            Watch Trailer
          </AppButton>
        </Stack>
        <Box sx={{ mt: 4, display: { xs: 'none', sm: 'none', md: 'block' } }}>
          <img
            src={apiConfig.w500Image(item.poster_path || '')}
            alt={item.title}
            style={{ width: '100%',
            maxWidth: '200px', 
            borderRadius: '8px', }}/>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSlide;
