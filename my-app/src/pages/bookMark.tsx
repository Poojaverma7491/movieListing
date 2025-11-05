import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import MovieCard from "../components/movieCard";
import tmdbApi, { category } from "../api/tmdbApi";
import { MediaItem } from "../types/media";
import SummaryApi from "../common/SummaryAPI";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { useAuth } from "../hooks/AuthProvider";

const BookMark: React.FC = () => {
  const [bookmarked, setBookmarked] = useState<MediaItem[]>([]);
  const { user, loading: authLoading, userLoggedIn } = useAuth();

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const bookmarkRes = await Axios({
          ...SummaryApi.bookmarks,
          withCredentials: true,
        });

        const data = bookmarkRes.data;
        if (!data.success || !Array.isArray(data.data)) {
          setBookmarked([]);
          return;
        }

        const movieIds: number[] = data.data.map((id: string | number) =>
          Number(id)
        );

        const moviePromises = movieIds.map(async (id) => {
          try {
            const movie = await tmdbApi.detail(category.movie, id, { params: {} });
            return movie;
          } catch {
            return null;
          }
        });

        const responses = await Promise.all(moviePromises);
        const movieDetails: MediaItem[] = responses.filter(
          (item): item is MediaItem => !!item && !!item.id
        );

        setBookmarked(movieDetails);
      } catch (err) {
        AxiosToastError(err);
      }
    };

    if (userLoggedIn) {
      fetchBookmarks();
    }
  }, [userLoggedIn]);

  const renderContent = () => {
    if (authLoading) {
      return (
        <Typography sx={{ textAlign: "center", mt: 4, color: "#aaa" }}>
          Loading...
        </Typography>
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
          You haven’t bookmarked any movies yet.
        </Typography>
      );
    }

    return (
      <Grid
        container
        spacing={3}
        sx={{
          mt: 2,
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {bookmarked.map((item) => (
          <Grid key={item.id}>
            <MovieCard item={item} category={category.movie} bookmarkedOverride={true} userLoggedIn={!!user}/>
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
          gutterBottom
          sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
        >
          Your bookmarked Movies
        </Typography>
        {renderContent()}
      </Container>
    </Box>
  );
};

export default BookMark;
