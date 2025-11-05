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
} from '@mui/material';

import tmdbApi, { category, movieType } from '../api/tmdbApi';
import apiConfig from '../api/apiConfig';

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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await tmdbApi.getMoviesList(movieType.popular, { params: { page: 1 } }) as any;
        setMovieItems(res.results.slice(0, 10));
      } catch {
        console.error('Failed to fetch hero movies');
      }
    };
    fetchMovies();
  }, []);

  return (
    <Box>
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
        backgroundPosition: 'center',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        p: 15,
      }}
    >
      <Box sx={{maxWidth: 800, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>{item.title}</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>{item.overview}</Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            onClick={handleWatchTrailer}
            sx={{
              backgroundColor: '#276b77ff',
              color: '#fff',
              '&:hover': { backgroundColor: '#074061ff' },
              textTransform: 'none',
            }}
          >
            Watch Trailer
          </Button>
        </Stack>
        <Box sx={{ mt: 4 }}>
          <img
            src={apiConfig.w500Image(item.poster_path || '')}
            alt={item.title}
            style={{ width: '200px', borderRadius: '8px' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSlide;
