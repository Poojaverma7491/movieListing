import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GenreCard from './GenreCard';
import { useLocation } from 'react-router-dom';
import FetchGenres from '../../HelperFunctions/FetchGenre';
import GenreCardSkeleton from '../Skeletons/GenreCardSkeleton';

const GenreList: React.FC = () => {
  const swiperRef = useRef<SwiperType>(null);
  const { pathname } = useLocation();
  const currentCategory = pathname.includes('/tv') ? 'tv' : 'movie';
  const { genres, loading, error } = FetchGenres(currentCategory);

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
          spaceBetween={18} 
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <SwiperSlide key={`skeleton-${i}`} style={{ width: 220 }}>
                <GenreCardSkeleton />
              </SwiperSlide>
            ))
          ) : error ? (
            <SwiperSlide style={{ width: '100' }}>
              <Typography color="error" textAlign="center">
                Failed to load categories
              </Typography>
            </SwiperSlide>
          ) : genres.length > 0 ? (
            genres.map((g, i) => (
              <SwiperSlide key={g.id} style={{ width: 'auto' }}>
                <GenreCard index={i} title={g.name} genreId={g.id} />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide style={{ width: '100%' }}>
              <Typography textAlign="center">No categories found</Typography>
            </SwiperSlide>
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

export default GenreList;
