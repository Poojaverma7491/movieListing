import { Box, IconButton, Typography } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { SectionProps } from "../../Utils/Interfaces";
import AppButton from "../Common/AppButton";
import { Link } from "react-router-dom";

const WrapperSection: React.FC<SectionProps> = ({ title, linkTo, children }) => (
  <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 10 }, mb: { xs: 2, sm: 3, md: 4 } }}>
    <Box sx={{ px: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 1.5, sm: 2 } }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem', lg: '1.8rem' }, 
        }}>
        {title}
      </Typography>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <AppButton component={Link} to={linkTo}>
          View more
        </AppButton>
      </Box>

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <IconButton component={Link} to={linkTo} sx={{ color: "white",  }}>
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
    {children}
  </Box>
);
export default WrapperSection;