import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import MovieCard from "../Components/MovieCard";
import tmdbApi, { category } from "../ApiTmdb/tmdbApi";
import { MediaItem } from "../Interfaces/media";
import SummaryApi from "../ApiBackend/SummaryAPI";
import Axios from "../Utils/Axios";
import AxiosToastError from "../Utils/AxiosToastError";
import { useAuth } from "../Hooks/AuthProvider";
import MovieCardSkeleton from "../Components/MovieCardSkeleton";

const BookMark: React.FC = () => {
  const [bookmarked, setBookmarked] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState<"movie" | "tv">("movie");
  const { user, loading: authLoading, userLoggedIn } = useAuth();

  const fetchMedia = async (type: "movie" | "tv") => {
    try {
      setLoading(true);
      const bookmarkRes = await Axios({
        ...SummaryApi.bookmarks,
        withCredentials: true,
      });

      const data = bookmarkRes.data;
      if (!data.success || !Array.isArray(data.data)) {
        setBookmarked([]);
        return;
      }

      const ids: number[] = data.data.map((id: string | number) => Number(id));

      const mediaPromises = ids.map(async (id) => {
        try {
          const item = await tmdbApi.detail(category[type], id, { params: {} });
          return item;
        } catch {
          return null;
        }
      });

      const responses = await Promise.all(mediaPromises);
      const mediaDetails: MediaItem[] = responses.filter(
        (item): item is MediaItem => !!item && !!item.id
      );

      setBookmarked(mediaDetails);
    } catch (err) {
      AxiosToastError(err);
    } finally {
      setLoading(false);
    }
  };

  const movies = () => {
    setActiveType("movie");
    fetchMedia("movie");
  };

  const tvShows = () => {
    setActiveType("tv");
    fetchMedia("tv");
  };

  useEffect(() => {
    if (userLoggedIn) {
      movies(); 
    }
  }, [userLoggedIn]);

  const renderContent = () => {
    if (authLoading || loading) {
      return (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Grid key={index}>
              <MovieCardSkeleton />
            </Grid>
          ))}
        </Grid>
      );
    }

    if (!user) {
      return (
        <Box textAlign="center" sx={{ py: 6 }}>
          <Typography variant="body1" sx={{ color: "#aaa" }}>
            Please log in to view your bookmarks.
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#276b77ff",
              color: "#fff",
              textTransform: "none",
              "&:hover": { backgroundColor: "#074061ff" },
            }}
            component={RouterLink}
            to="/login?redirect=/bookmarks"
          >
            Log In
          </Button>
        </Box>
      );
    }

    if (bookmarked.length === 0) {
      return (
        <Typography variant="body1" sx={{ color: "#aaa", textAlign: "center" }}>
          You haven’t bookmarked any items yet.
        </Typography>
      );
    }

    return (
      <Grid container maxWidth="lg" spacing={4.5} sx={{ mt: 2 }}>
        {bookmarked.map((item) => (
          <Grid key={item.id} >
            <MovieCard
              item={item}
              category={category[activeType]}
              bookmarkedOverride={true}
              userLoggedIn={!!user}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box
      sx={{
        pt: { xs: 8, sm: 10 },
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          padding={4}
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Your Bookmarked Media
        </Typography>
        <Box sx={{ display: "flex", gap: 2, m: 1 }}>
          <Button
            variant={activeType === "movie" ? "contained" : "outlined"}
            onClick={movies}
            disabled={bookmarked.length === 0}
            sx={{
              borderColor: "#276b77ff",
              color: "#fff",
              backgroundColor: activeType === "movie" ? "#276b77ff" : "transparent",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#727272ff",
              },
            }}
          >
            Movies
          </Button>
          <Button
            variant={activeType === "tv" ? "contained" : "outlined"}
            onClick={tvShows}
            disabled={bookmarked.length === 0}
            sx={{
              borderColor: "#6a8085ff",
              color:"#fff",
              backgroundColor: activeType === "tv" ? "#276b77ff" : "transparent",
              "&:hover": {
                backgroundColor:"#6a8085ff",
              },
              textTransform: "none",
            }}
          >
            TV Shows
          </Button>
        </Box>
        {renderContent()}
      </Container>
    </Box>
  );
};

export default BookMark;
