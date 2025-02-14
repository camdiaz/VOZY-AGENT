import { createTheme } from '@mui/material/styles';

export const VOZY_COLORS = {
  primary: '#cbfc00',    // verde limón
  secondary: '#821cff',  // morado
  hover: '#6c17d4',      // morado hover
  background: '#1c1c1c', // negro principal
  paper: '#242424',      // negro secundario
  text: '#f3f3f3',      // blanco texto
  grey: '#818181',       // gris
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: VOZY_COLORS.primary,
      contrastText: VOZY_COLORS.background,
    },
    secondary: {
      main: VOZY_COLORS.secondary,
      dark: VOZY_COLORS.hover,
    },
    background: {
      default: VOZY_COLORS.background,
      paper: VOZY_COLORS.paper,
    },
    text: {
      primary: VOZY_COLORS.text,
      secondary: VOZY_COLORS.grey,
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600
    },
    h2: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600
    },
    h3: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600
    },
    h4: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600
    },
    h5: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600
    },
    h6: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600
    },
    body1: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    body2: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    button: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      textTransform: 'none',
      fontWeight: 500
    },
    caption: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: VOZY_COLORS.hover,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: VOZY_COLORS.paper,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: `${VOZY_COLORS.paper}80`,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: VOZY_COLORS.background,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: "Poppins", "Roboto", "Helvetica", "Arial", sans-serif;
        }
      `
    },
  },
});
