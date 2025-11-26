import { Box, Typography } from "@mui/material";
import { SectionProps } from "../../Utils/Interfaces";
import AppButton from "../Common/AppButton";
import { Link } from "react-router-dom";

const WrapperSection: React.FC<SectionProps> = ({ title, linkTo, children }) => (
  <Box>
    <Box sx={{ px: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem', lg: '1.8rem' }, 
        }}>
        {title}
      </Typography>
      <AppButton component={Link} to={linkTo}>
        View more
      </AppButton>
    </Box>
    {children}
  </Box>
);
export default WrapperSection;