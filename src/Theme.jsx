import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c2ab38',
      contrastText: "#FFFFFF"
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px', 
          '&:hover': {
            backgroundColor: '#132730',
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