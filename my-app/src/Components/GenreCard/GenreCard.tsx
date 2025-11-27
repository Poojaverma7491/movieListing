import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Props, RequestParams } from '../../Utils/Interfaces';
import tmdbApi from '../../ApiTmdb/ApiTmdb';
import { Link } from 'react-router-dom';

const GenreCard: React.FC<Props> = ({ title, genreId }) => {
  const [thumbnail, setThumbnail] = useState<string>('');

  useEffect(() => {
    const fetchThumbnail = async () => {
      const params: RequestParams = {
        params: {
          with_genres: genreId,
          sort_by: 'popularity.desc',
          page: 1,
        },
      };

      const res = await tmdbApi.discoverMovie(params);
      const posterPath = res.results?.[0]?.poster_path;
      if (posterPath) {
        setThumbnail(`https://image.tmdb.org/t/p/w500${posterPath}`);
      }
    };

    fetchThumbnail();
  }, [genreId]);

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 200, sm: 240, md: 300 },  
        width: { xs: 140, sm: 160, md: 185 },
        borderRadius: 2,
        overflow: 'hidden',
        mr: 2,
        flexShrink: 0,
        backgroundColor: '#111',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.03)',
          transition: 'transform 0.3s ease',
        },
      }}
    >
      <Typography
        variant="h6" 
        fontWeight={800} 
        sx={{
            position: 'absolute',
            top: { xs: 4, sm: 6, md: 8 },    
            left: { xs: 4, sm: 6, md: 8 },
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            fontFamily: '"Bebas Neue", sans-serif',
            zIndex: 2,
            textShadow: '0 0 6px rgba(0,0,0,0.8)',
            fontSize: { xs: '0.9rem', sm: '1.2rem', md: '1.5rem' },
            wordBreak: "break-word",   
            overflow: "hidden",     
            display: "inline-block",
            lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>

      <Box
        component={Link}
        to={`/home/movie/genre/${genreId}`} 
        sx={{
            display: 'block',
            position: 'relative',
            width: '100%',
            height: '100%',
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
        }}
        >
        <Box
            component="img"
            src={thumbnail || '/fallback.jpg'}
            alt={title}
            sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            }}
        />
        </Box>
    </Box>
  );
};

export default GenreCard;
