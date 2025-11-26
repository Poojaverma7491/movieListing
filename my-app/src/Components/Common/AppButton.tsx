import { Button } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import { AppButtonProps } from '../../Utils/Interfaces';

const AppButton: React.FC<AppButtonProps> = ({ children, sx, theme = 'contained', ...props }) => {
  
  const baseStyles: SxProps<Theme> = {
    textTransform: 'none',
    whiteSpace: 'nowrap',
    px: { xs: 2, sm: 3 },
    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
    minWidth: 'auto',
    borderRadius: { xs: 1, sm: 1.5 },
  };

  const containedStyles: SxProps<Theme> = {
    backgroundColor: '#276b77ff',
    color: '#fff',
    '&:hover': { backgroundColor: '#708488ff' },
  };

  const outlinedStyles: SxProps<Theme> = {
    borderColor: '#276b77ff',
    color: '#276b77ff',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: '#e0f2f1',
      borderColor: '#708488ff',
    },
  };

  const variant = theme === 'contained' ? 'contained' : 'outlined';
  const themeStyles = theme === 'contained' ? containedStyles : outlinedStyles;

  return (
    <Button variant={variant} {...props} sx={{ ...baseStyles, ...themeStyles, ...(sx || {}), }} >
      {children}
    </Button>
  );
};

export default AppButton;
