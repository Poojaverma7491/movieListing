import { Button, ButtonProps } from '@mui/material';
import { Link, LinkProps } from 'react-router-dom';

type AppButtonProps = ButtonProps & Partial<LinkProps>;

const AppButton: React.FC<AppButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      variant="contained"
      {...props}
      sx={{
        backgroundColor: '#276b77ff',
        color: '#fff',
        textTransform: 'none',
        whiteSpace: 'nowrap',
        px: { xs: 2, sm: 3 },    
        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }, 
        minWidth: 'auto',  
        borderRadius: { xs: 1, sm: 1.5 },
        '&:hover': { backgroundColor: '#708488ff' },
        ...(props.sx || {}),
      }}
    >
      {children}
    </Button>
  );
};

export default AppButton;
