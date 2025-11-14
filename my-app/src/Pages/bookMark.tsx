import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import MovieCard from "../Components/MovieCard";
import tmdbApi, { category } from "../ApiTmdb/tmdbApi";
import { MediaItem } from "../Interfaces/media";
import SummaryApi from "../ApiBackend/SummaryAPI";
import Axios from "../Utils/Axios";
import AxiosToastError from "../Utils/AxiosToastError";
import { useAuth } from "../Hooks/AuthProvider";
import MovieCardSkeleton from "../Components/MovieCardSkeleton";
import AppButton from "../Components/Button";

const BookMark: React.FC = () => {
  const [bookmarked, setBookmarked] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mt: 2 }}>
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
        <Box textAlign="center" sx={{ py: 4 }}>
          <Typography variant="body1" sx={{ color: "#aaa", fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            Please log in to view your bookmarks.
          </Typography>
          <AppButton              
            component={RouterLink}           
            to="/login?redirect=/bookmarks" 
          >
            Log In
          </AppButton>
        </Box>
      );
    }

    if (bookmarked.length === 0) {
      return (
        <Typography variant="body1" sx={{ color: "#aaa", textAlign: "center",
          mt: { xs: 2, sm: 3 }, }}>
          You haven’t bookmarked any items yet.
        </Typography>
      );
    }

    return (
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mt: 2 }}>
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
      <Box>
        <Typography
          color="white"
          variant="h4"
          padding={4}
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Your Bookmarked Media
        </Typography>
        <Box 
        sx={{ 
          display: "flex", 
          gap: { xs: 1.5, sm: 2 },                  
          m: { xs: 1, sm: 2 },  
          justifyContent: { xs: "center", sm: "flex-start" }
        }}>
          <AppButton 
            onClick={movies}
            disabled={bookmarked.length === 0}
            theme={activeType === "movie" ? "contained" : "outlined"} >
              Movies
          </AppButton>

          <AppButton 
            onClick={tvShows}
            disabled={bookmarked.length === 0}
            theme={activeType === "tv" ? "contained" : "outlined"} >
              TV Shows
          </AppButton>
        </Box>
        {renderContent()}
      </Box>
  );
};

export default BookMark;
