import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { MediaItem } from "../../Utils/Interfaces";
import { Category } from "../../Utils/utils";
import fetchBookmarks from "../../HelperFunctions/FetchBookmark";
import MovieCardSkeleton from "../Skeletons/MovieCardSkeleton";
import AppButton from "../Common/AppButton";
import MovieCard from "../MovieCard/MovieCard";
import { useAuth } from "../../Context/AuthProvider";


const BookMark: React.FC = () => {
  const [bookmarked, setBookmarked] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeType, setActiveType] = useState<Category>("movie");
  const { user, loading: authLoading, userLoggedIn } = useAuth();

  const loadBookmarks = async (category: Category) => {
    setLoading(true);
    const media = await fetchBookmarks(category);
    setBookmarked(media);
    setActiveType(category);
    setLoading(false);
  };

  useEffect(() => {
    if (userLoggedIn) loadBookmarks("movie");
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
          <Typography
            variant="body1"
            sx={{ color: "#aaa", fontSize: { xs: "0.9rem", sm: "1rem" } }}
          >
            Please log in to view your bookmarks.
          </Typography>
          <AppButton component={RouterLink} to="/login?redirect=/bookmarks">
            Log In
          </AppButton>
        </Box>
      );
    }

    if (bookmarked.length === 0) {
      return (
        <Typography
          variant="body1"
          sx={{ color: "#aaa", textAlign: "center", mt: { xs: 2, sm: 3 } }}
        >
          You haven’t bookmarked any items yet.
        </Typography>
      );
    }

    return (
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mt: 2 }}>
        {bookmarked.map((item) => (
          <Grid key={item.id}>
            <MovieCard
              item={item}
              category={activeType}
              bookmarkedOverride={true}
              userLoggedIn={!!user}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
      <Box sx={{ px: 3, }}>
        <Typography
          color="white"
          variant="h4"
          padding={4}
          sx={{ fontWeight: "bold", textAlign: "center" }}>
          Your Bookmarked Media
        </Typography>
        <Box 
        sx={{ 
          display: "flex", 
          gap: { xs: 1.5, sm: 2 },                  
          m: { xs: 1, sm: 2 },  
          justifyContent: { xs: "center", sm: "flex-start" }
        }}>
          <AppButton onClick={() => loadBookmarks("movie")} disabled={bookmarked.length === 0} theme={activeType === "movie" ? "contained" : "outlined"} >
              Movies
          </AppButton>

          <AppButton onClick={() => loadBookmarks("tv")} disabled={bookmarked.length === 0} theme={activeType === "tv" ? "contained" : "outlined"} >
              TV Shows
          </AppButton>
        </Box>
        {renderContent()}
      </Box>
  );
};

export default BookMark;
