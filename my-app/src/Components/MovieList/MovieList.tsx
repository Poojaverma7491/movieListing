import { useEffect, useState, useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Box } from '@mui/material';
import { MediaItem, MovieListProps } from '../../Utils/Interfaces'; 
import MovieCardSkeleton from '../Skeletons/MovieCardSkeleton';
import MovieCard from '../MovieCard/MovieCard';
import { FetchMovieList } from '../../HelperFunctions/FetchMovieListr';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';

const MovieList: React.FC<MovieListProps> = ({ category, type, id, genreId, userLoggedIn = false }) => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const swiperRef = useRef<SwiperType>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await FetchMovieList(category, type, id?.toString(), genreId);
      setItems(data);
      setLoading(false);
    };
    load();
  }, [category, id, type, genreId]);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          onClick={() => swiperRef.current?.slidePrev()}
          sx={{
            color: 'white',
            height: { xs: 95, sm: 100, md: 150 },      
            width: { xs: 22, sm: 24, md: 26 },      
            borderRadius: 2, 
            backgroundColor: 'rgba(65, 64, 64, 0.5)',
            "&:hover": { backgroundColor: 'rgba(102, 102, 102, 0.7)' },
            mr: 1,
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
          grabCursor
          slidesPerView="auto"
          spaceBetween={20}
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <SwiperSlide key={`skeleton-${i}`} style={{ width: 220 }}>
                <MovieCardSkeleton />
              </SwiperSlide>
            ))
          ) : items.length > 0 ? (
            items.map((item) => (
              <SwiperSlide key={item.id} style={{ width: "auto" }}>
                <MovieCard item={item} category={category} userLoggedIn={userLoggedIn} />
              </SwiperSlide>
            ))
          ) : (
            <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
              No data found.
            </Box>
          )}
        </Swiper>

        <IconButton
          onClick={() => swiperRef.current?.slideNext()}
          sx={{
            color: 'white',
            height: { xs: 95, sm: 100, md: 150 },   
            width: { xs: 22, sm: 24, md: 26 },      
            borderRadius: 2, 
            backgroundColor: 'rgba(65, 64, 64, 0.5)',
            "&:hover": { backgroundColor: 'rgba(102, 102, 102, 0.7)' },
            ml: 1,
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MovieList;
