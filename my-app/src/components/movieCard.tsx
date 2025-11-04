import { useState, useEffect, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Rating } from '@mui/material';
import { category } from '../api/tmdbApi';
import apiConfig from '../api/apiConfig';
import { MediaItem } from '../types/media';

interface MovieCardProps {
  item: MediaItem;
  category: keyof typeof category;
  likedOverride?: boolean | null;
  disableLike?: boolean;
  userLoggedIn?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  item,
  category: cat,
  likedOverride = null,
  disableLike = false,
  userLoggedIn = false,
}) => {
  const [liked, setLiked] = useState<boolean>(false);
  const link = `/home/${cat}/${item.id}`;
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path || '');

  useEffect(() => {
    if (!userLoggedIn) return;

    if (likedOverride !== null) {
      setLiked(likedOverride);
    } else {
      const checkBookmark = async () => {
        try {
          const res = await fetch('/api/bookmarks', { credentials: 'include' });
          const data = await res.json();
          const isLiked = data.data?.includes(item.id);
          setLiked(isLiked);
        } catch (err) {
          console.error("Failed to check bookmarks");
        }
      };
      checkBookmark();
    }
  }, [item.id, likedOverride, userLoggedIn]);

  const toggleLike = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userLoggedIn) return;

    try {
      const endpoint = liked ? '/api/bookmarks/remove' : '/api/bookmarks/add';
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ movieId: item.id }),
      });

      setLiked((prev) => !prev);
    } catch (err) {
      console.error("Bookmark error:", err);
    }
  };

  return (
    <Card
      sx={{
        p: 1,
        height: 400,
        textDecoration: "none",
        borderRadius: 2,
        backgroundColor: "#276b77ff",
        overflow: "hidden",
        position: "relative",
        width: 200,
        "&:hover .play-button": {
          opacity: 1,
        },
      }}
    >
      <Box component={Link} to={link} sx={{ display: "block" }}>
        <CardMedia
          component="div"
          sx={{
            height: 300,
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <Box
            className="play-button"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 0,
              transition: "opacity 0.3s ease",
              backgroundColor: "#276b77ff",
              borderRadius: "50%",
              padding: 1,
            }}
          >
            <PlayArrowIcon fontSize="large" sx={{ color: "#fff" }} />
          </Box>
        </CardMedia>
      </Box>

      {userLoggedIn && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: "50%",
            zIndex: 1,
          }}
        >
          <IconButton
            onClick={toggleLike}
            sx={{ color: "white" }}
            disabled={disableLike}
          >
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
      )}

      <CardContent
        sx={{
          backgroundColor: "#276b77ff",
          px: 1,
          py: 1,
          minHeight: 50,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="subtitle2" fontWeight="bold" noWrap>
          {item.title || item.name}
        </Typography>

        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          Release: {item.release_date || item.first_air_date || "N/A"}
        </Typography>

        <Rating
          name="read-only-rating"
          precision={0.5}
          size="small"
          sx={{
            "& .MuiRating-iconFilled": {
              color: "#000000ff",
            },
          }}
        />
        <Typography variant="body2">
          Rating: {item.vote_average?.toFixed(1) ?? 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
