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

const BookMark: React.FC = () => {
  const [bookmarked, setBookmarked] = useState<MediaItem[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserAndBookmarks = async () => {
      try {
        const userRes = await Axios.get("/api/user", { withCredentials: true });
        if (!userRes.data.success || !userRes.data.data) {
          setUser(null);
          setLoading(false);
          return;
        }

        setUser(userRes.data.data);

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
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndBookmarks();
  }, []);

  const renderContent = () => {
    if (loading) {
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
          You haven’t liked any movies yet.
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
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={item.id}
            {...({} as any)}
          >
            <MovieCard
              item={item}
              category={category.movie}
              likedOverride={true}
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
          gutterBottom
          sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
        >
          Your Liked Movies
        </Typography>
        {renderContent()}
      </Container>
    </Box>
  );
};

export default BookMark;
