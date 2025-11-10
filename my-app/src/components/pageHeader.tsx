import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

interface PageHeaderProps {
  children: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        fontWeight="bold"
        color="white"
        variant="h4"
        padding={4}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default PageHeader;
