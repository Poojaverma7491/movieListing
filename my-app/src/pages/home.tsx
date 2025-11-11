import { Link } from 'react-router-dom';
import {Box, Button, Container, Typography} from '@mui/material';
import HeroSlide from '../Components/HeroSlide';
import MovieList from './movieList';
import { category, movieType, tvType } from '../ApiTmdb/tmdbApi';
import { ReactNode } from 'react';
import AppButton from '../Components/Button';

interface SectionProps {
  title: string;
  linkTo: string;
  children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, linkTo, children }) => (
  <Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          fontSize: { xs: '1rem', sm: '1.5rem', md: '1.7rem', lg: '2rem' }, 
        }}
      >
        {title}
      </Typography>
      <AppButton component={Link}
        to={linkTo}>
        View more
      </AppButton>
    </Box>
    {children}
  </Box>
);

const Home: React.FC = () => (
    <Container sx={{    
      display: 'flex',
      flexDirection: 'column',
      gap: { xs: 4, sm: 5, md: 6 },      
      color: '#fff'     
    }}>
      <HeroSlide />
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
);

export default Home;
