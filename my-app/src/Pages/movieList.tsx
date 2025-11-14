import { useEffect, useState, useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Box, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MovieCard from '../Components/MovieCard';
import tmdbApi, { category } from '../ApiTmdb/tmdbApi';
import axios from 'axios';
import apiConfig from '../ApiTmdb/apiConfig';
import { MediaItem } from '../Interfaces/media'; 
import MovieCardSkeleton from '../Components/MovieCardSkeleton';

interface MovieListProps {
  category: keyof typeof category;
  type?: string;
  id?: string | number;
  genreId?: string;
  userLoggedIn?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ category: cat, type, id, genreId, userLoggedIn = false }) => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const swiperRef = useRef<SwiperType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const controller = new AbortController();

    const fetchList = async () => {
      try {
        setLoading(true);
        let response: any = null;

        if (genreId) {
          if (typeof (tmdbApi as any).discover === 'function') {
            response = await (tmdbApi as any).discover(cat, { params: { with_genres: genreId } });
          } else {
            const url =
              cat === category.movie
                ? `${apiConfig.baseUrl}/discover/movie`
                : `${apiConfig.baseUrl}/discover/tv`;

            const res = await axios.get(url, {
              params: {
                api_key: apiConfig.apiKey,
                with_genres: genreId,
                language: 'en-US',
                sort_by: 'popularity.desc',
                page: 1,
              },
              signal: controller.signal,
            });

            response = res.data;
          }

          setItems(response?.results || []);
          return;
        }

        if (type === 'similar') {
          response = await tmdbApi.similar(cat as any, id as any);
        } else {
          response =
            cat === category.movie
              ? await tmdbApi.getMoviesList(type as any, { params: {} })
              : await tmdbApi.getTvList(type as any, { params: {} });
        }

        setItems(response?.results || []);
      } catch (error: any) {
        const name = error?.name;
        if (name !== 'CanceledError' && name !== 'AbortError') {
          console.error('MovieList fetch error:', error);
        }
      } finally {
        setLoading(false); 
      }
    };

    fetchList();
    return () => controller.abort();
  }, [cat, id, type, genreId]);

  return (
    <Box
      sx={{
        py: 2,
        position: 'relative',
        '&:hover .swiper-nav': { opacity: 1 },
      }}
    >
      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
        grabCursor
        slidesPerView="auto"
      >
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <SwiperSlide key={`skeleton-${i}`} style={{ width: 220 }}>
              <MovieCardSkeleton />
            </SwiperSlide>
          ))
        ) : items.length > 0 ? (
          items.map((item) => (
            <SwiperSlide key={item.id} style={{ width: 220 }}>
              <MovieCard item={item} category={cat} userLoggedIn={userLoggedIn} />
            </SwiperSlide>
          ))
        ) : (
          <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
            No data found.
          </Box>
        )}
      </Swiper>

      <IconButton
        className="swiper-nav"
        onClick={() => swiperRef.current?.slidePrev()}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          backgroundColor: '#276b77ff',
          color: '#fff',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          zIndex: 10,
        }}
        aria-label="previous"
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      <IconButton
        className="swiper-nav"
        onClick={() => swiperRef.current?.slideNext()}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
          backgroundColor: '#276b77ff',
          color: '#fff',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          zIndex: 10,
        }}
        aria-label="next"
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default MovieList;
