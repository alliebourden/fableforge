import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c2ab38',
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: "#FFFFFF"
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px', 
          '&:hover': {
            backgroundColor: '#132730',
          },
          '&.MuiButton-secondary:hover': {
            backgroundColor: '#F0DFC8',
          },
        },
      },
    },
  },
  typography: {
    button: {
      fontWeight: 'bold',
      fontPalette: '#FFFFFF',
    }
  }
});

export default theme;