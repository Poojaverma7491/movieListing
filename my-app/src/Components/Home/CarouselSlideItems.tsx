import { Box, Stack, Typography } from "@mui/material";
import { CarouselItemProps } from "../../Utils/Interfaces";
import AppButton from "../Common/AppButton";
import fetchTrailerKey from "../../HelperFunctions/FetchTrailerKey";
import ApiConfig from "../../ApiTmdb/ApiConfig";

const CarouselSlideItem: React.FC<CarouselItemProps> = ({ item, onTrailerOpen }) => {

  const handleWatchTrailer = async () => {
    const key = await fetchTrailerKey("movie", item.id);
    onTrailerOpen(key);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${ApiConfig.originalImage(item.backdrop_path || item.poster_path || '')})`,
        backgroundSize: 'cover',
        minheight: { xs: '30vh', sm: '50vh', md: '80vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0,0,0,0.4)", 
        backgroundBlendMode: "darken",  
      }}>
      <Box 
        sx={{
          textAlign: 'center', 
          minheight: { xs: '30vh', sm: '50vh', md: '80vh' },
          p: 5,
          display: 'flex',  
          flexDirection: 'column',  
          alignItems: 'center',    
          justifyContent: 'center', 
        }}>
        <Typography 
        variant="h4" 
        gutterBottom 
        sx={{
          fontWeight: 'bold',
          fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem', lg: '2.5rem' }
        }}>
          {item.title}
        </Typography>
        
        <Typography 
        gutterBottom
        sx={{
          display: { xs: '-webkit-box', sm: 'block' },
          WebkitLineClamp: { xs: 3, sm: 'unset' },
          WebkitBoxOrient: { xs: 'vertical', sm: 'unset' },
          overflow: { xs: 'hidden', sm: 'visible' },
          textOverflow: { xs: 'ellipsis', sm: 'unset' },
        }}>
          {item.overview}
        </Typography>

        <Stack 
          alignItems="center">
          <AppButton onClick={handleWatchTrailer}>
            Watch Trailer
          </AppButton>
        </Stack>
        <Box sx={{ mt: 4, display: { xs: 'none', sm: 'none', md: 'block' } }}>
          <img
            src={ApiConfig.w500Image(item.poster_path || '')}
            alt={item.title}
            style={{ width: '100%',
            maxWidth: '200px', 
            borderRadius: '8px', }}/>
        </Box>
      </Box>
    </Box>
  );
};
export default CarouselSlideItem;


