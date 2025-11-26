import {Box} from '@mui/material';
import Carousel from './CarouselSlide';
import MovieList from '../MovieList/MovieList';
import Wrapper from './WrapperSection';
import GenreList from '../GenreCard/GenreList';

const Home: React.FC = () => (
  <Box
    sx={{
       width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: { xs: 4, sm: 5, md: 6 },
      color: '#fff',
    }}>
    <Carousel />
    <GenreList/>
    <Wrapper title="Trending Movies" linkTo={`/home/movie/search/popular`}>
      <MovieList category="movie" type="popular" />
    </Wrapper>

    <Wrapper title="Top Rated Movies" linkTo={`/home/movie/search/top_rated`}>
      <MovieList category="movie" type="top_rated" />
    </Wrapper>

    <Wrapper title="Trending TV" linkTo={`/home/tv/search/popular`}>
      <MovieList category="tv" type="popular" />
    </Wrapper>

    <Wrapper title="Top Rated TV" linkTo={`/home/tv/search/top_rated`}>
      <MovieList category="tv" type="top_rated" />
    </Wrapper>
  </Box>
);

export default Home;
