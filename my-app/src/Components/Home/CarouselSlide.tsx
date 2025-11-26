import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Box, Typography,  Dialog,  DialogContent, } from '@mui/material';
import { MovieItem } from '../../Utils/Interfaces';
import CarouselSkeleton from '../Skeletons/CarouselSlideSkeleton';
import CarouselItem from './CarouselSlideItems';
import tmdbApi from '../../ApiTmdb/TmdbApi';

const CarouselSlide: React.FC = () => {
  
  const [movieItems, setMovieItems] = useState<MovieItem[]>([]);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await tmdbApi.getMoviesList("popular", { params: { page: 1 } });
        const movies: MovieItem[] = res.results.slice(0, 10); 
        setMovieItems(movies);
        console.log("Carousel response:", res);

      } catch {
        console.error('Failed to fetch hero movies');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <Box
     sx={{
      width: '100%',
      minHeight: { xs: '30vh', sm: '50vh', md: '80vh' },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {loading ? (
        <CarouselSkeleton />
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
              <CarouselItem item={item} onTrailerOpen={setTrailerKey} />
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

export default CarouselSlide;
