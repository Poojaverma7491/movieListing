import { useState, useEffect, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, IconButton, Box, } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import { Rating } from '@mui/material';
import LoginDialog from '../AuthPages/LoginDialog';
import { MovieCardProps } from '../../Utils/Interfaces';
import { checkBookmarkStatus, handleShare, toggleBookmarkRequest } from '../../HelperFunctions/MovieCardFunctions';
import { useAuth } from '../../Context/AuthProvider';
import apiConfig from '../../ApiTmdb/ApiConfig';

const MovieCard: React.FC<MovieCardProps> = ({ item, category, bookmarkedOverride = null, }) => {
  const link = `/home/${category}/${item.id}`;
  const { userLoggedIn } = useAuth();
  const [bookmarked, setbookmarked] = useState<boolean>(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
  
  useEffect(() => {
    if (!userLoggedIn) return;

    if (bookmarkedOverride !== null) {
      setbookmarked(bookmarkedOverride);
      return;
    }
    const fetchBookmark = async () => {
      const isBookmarked = await checkBookmarkStatus(item.id.toString());
      setbookmarked(isBookmarked);
    };

    fetchBookmark();
  }, [item.id, bookmarkedOverride, userLoggedIn]);



  const toggleBookmark = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userLoggedIn) {
      setLoginDialogOpen(true);
      return;
    }
    const newState = await toggleBookmarkRequest(item.id, bookmarked);
    setbookmarked(newState);
  };

  return (
    <>
      <Card
        sx={{
          p: 1,
          height: { xs: 300, sm: 340, md: 350},
          width: { xs: 140, sm: 160, md: 185 }, 
          textDecoration: "none",
          borderRadius: 2,
          backgroundColor: "#276b77ff",
          overflow: "hidden",
          position: "relative",
          "&:hover .play-button": {
            opacity: 1,
          },
        }}>
        <Box component={Link} to={link} sx={{ display: "block" }}>
          <CardMedia
            component="div"
            sx={{
              height: { xs: 220, sm: 250, md: 250 },
              backgroundImage: `url(${apiConfig.w500Image(item.poster_path || item.backdrop_path || '')})`,
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
              <PlayArrowIcon fontSize="large" sx={{ color: "#fff",  fontSize: { xs: "2rem", sm: "2.5rem" } }} />
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
            onClick={toggleBookmark}
            sx={{   
              color: "white", 
              backgroundColor: "rgba(0, 0, 0, 0.6)", 
              boxShadow: 2,
              backdropFilter: "blur(4px)",
              "& svg": { fontSize: { xs: "1rem", sm: "1.2rem" } },
            }}
            aria-label="Favorite">
            {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
          <IconButton
          onClick={() => handleShare(item)}
          sx={{ 
            color: "white", 
            backgroundColor: "rgba(0, 0, 0, 0.6)", 
            boxShadow: 2,
            backdropFilter: "blur(4px)",
            "& svg": { fontSize: { xs: "1rem", sm: "1.2rem" } },
          }}
          aria-label="Share">
          <ShareIcon />
        </IconButton>
        </Box>

        <CardContent
          sx={{
            backgroundColor: "#276b77ff",
            px: { xs: 0.5, sm: 1 },
            py: { xs: 0.5, sm: 1 },
            minHeight: { xs: 40, sm: 50 },
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
              fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" },
            }}>
            {item.title || item.name}
          </Typography>

          <Typography 
            variant="caption" 
            color="text.secondary" sx={{ mt: 1, fontSize: { xs: "0.7rem", sm: "0.75rem" }}}>
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
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}/>
          <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" } }}>
            Rating: {item.vote_average?.toFixed(1) ?? 'N/A'}
          </Typography>
        </CardContent>
      </Card>

      <LoginDialog
      open={loginDialogOpen}
      onClose={() => setLoginDialogOpen(false)}/>
    </>
  );
};

export default MovieCard;
