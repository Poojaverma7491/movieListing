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
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import { Rating } from '@mui/material';
import { category } from '../ApiTmdb/tmdbApi';
import apiConfig from '../ApiTmdb/apiConfig';
import { MediaItem } from '../Interfaces/media';
import toast from 'react-hot-toast';
import { useAuth } from '../Hooks/AuthProvider';

interface MovieCardProps {
  item: MediaItem;
  category: keyof typeof category;
  bookmarkedOverride?: boolean | null;
  disableLike?: boolean;
  userLoggedIn?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  item,
  category: cat,
  bookmarkedOverride = null,
}) => {
  const [bookmarked, setbookmarked] = useState<boolean>(false);
  const link = `/home/${cat}/${item.id}`;
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path || '');
  const { userLoggedIn } = useAuth();


  useEffect(() => {
    if (!userLoggedIn) return;
    if (bookmarkedOverride !== null) {
      setbookmarked(bookmarkedOverride);
    } else {
      const checkBookmark = async () => {
        try {
          const res = await fetch('/api/bookmarks', { credentials: 'include' });
          const data = await res.json();
          const isbookmarked = data.data?.includes(item.id);
          setbookmarked(isbookmarked);
        } catch (err) {
          console.error("Failed to check bookmarks");
        }
      };
      checkBookmark();
    }
  }, [item.id, bookmarkedOverride, userLoggedIn]);

  const toggleLike = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userLoggedIn) {
      toast('Please log in to bookmark movies.', {
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    try {
      const endpoint = bookmarked ? '/api/bookmarks/remove' : '/api/bookmarks/add';
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ movieId: item.id }),
      });
      setbookmarked((prev) => !prev);
    } catch (err) {
      console.error("Bookmark error:", err);
    }
  };
   const handleShare = () => {
    const title = item.title || item.name || 'Movie';
    const description = item.overview || 'No description available.';
    const releaseDate = item.release_date || item.first_air_date || 'Unknown release date';

    const shareText = `${title}\n Release Date: ${releaseDate}\n Description: ${description}`;
    navigator.clipboard.writeText(shareText);
    if (navigator.share) {
      navigator.share({
        title,
        text: shareText,
      }).catch((err) => {
        console.error('Share failed:', err);
      });
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
        width: 185,
        "&:hover .play-button": {
          opacity: 1,
        },
      }}>
      <Box component={Link} to={link} sx={{ display: "block" }}>
        <CardMedia
          component="div"
          sx={{
            height: 300,
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}>
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
            }}>
            <PlayArrowIcon fontSize="large" sx={{ color: "#fff" }} />
          </Box>
        </CardMedia>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          borderRadius: 2,
          padding: 0.5,
          zIndex: 1,
        }}>
        <IconButton
          onClick={toggleLike}
          sx={{   
            color: "white", 
            backgroundColor: "rgba(0, 0, 0, 0.6)", 
            boxShadow: 2,
            backdropFilter: "blur(4px)"
          }}
          aria-label="Favorite">
          {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
        <IconButton
        onClick={ handleShare }
        sx={{ 
          color: "white", 
          backgroundColor: "rgba(0, 0, 0, 0.6)", 
          boxShadow: 2,
          backdropFilter: "blur(4px)"
        }}
        aria-label="Share">
        <ShareIcon />
      </IconButton>

      </Box>

      <CardContent
        sx={{
          backgroundColor: "#276b77ff",
          px: 1,
          py: 1,
          minHeight: 50,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          noWrap
          title={item.title || item.name}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            cursor: 'default',
          }}>
          {item.title || item.name}
        </Typography>

        <Typography 
          variant="caption" 
          color="text.secondary" sx={{ mt: 1 }}>
            Release: {item.release_date || item.first_air_date || "N/A"}
        </Typography>

        <Rating
          name="read-only-rating"
          value={(item.vote_average ?? 0) / 2}
          precision={0.5}
          size="small"
          readOnly
          sx={{
            "& .MuiRating-iconFilled": {
              color: "#000000ff",
            },
          }}/>
        <Typography variant="body2">
          Rating: {item.vote_average?.toFixed(1) ?? 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
