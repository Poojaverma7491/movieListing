import { Link } from 'react-router-dom';
import {Box, Button, Container, Typography} from '@mui/material';
import HeroSlide from '../components/heroSlide';
import MovieList from '../pages/movieList';
import { category, movieType, tvType } from '../api/tmdbApi';
import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  linkTo: string;
  children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, linkTo, children }) => (
  <Box sx={{ mb: 6 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="h5" fontWeight="bold">{title}</Typography>
      <Button
        component={Link}
        to={linkTo}
        variant="contained"
        size="small"
        sx={{
          textTransform: 'none',
          backgroundColor: '#276b77ff',
          '&:hover': { backgroundColor: '#fff' },
        }}
      >
        View more
      </Button>
    </Box>
    {children}
  </Box>
);

const Home: React.FC = () => (
  <Box>
    <HeroSlide />

    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Section title="Trending Movies" linkTo={`/home/movie/search/popular`}>
        <MovieList category={category.movie} type={movieType.popular} />
      </Section>

      <Section title="Top Rated Movies" linkTo={`/home/movie/search/top_rated`}>
        <MovieList category={category.movie} type={movieType.top_rated} />
      </Section>

      <Section title="Trending TV" linkTo={`/home/tv/search/popular`}>
        <MovieList category={category.tv} type={tvType.popular} />
      </Section>

      <Section title="Top Rated TV" linkTo={`/home/tv/search/top_rated`}>
        <MovieList category={category.tv} type={tvType.top_rated} />
      </Section>
    </Container>
  </Box>
);

export default Home;
