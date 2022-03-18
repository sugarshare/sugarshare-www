import { createTheme } from '@mui/material/styles';

// A custom theme for this app
declare module '@mui/material/styles' {
  interface Palette {
    honey: Palette['primary'];
  }
  interface PaletteOptions {
    honey: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
  },
  palette: {
    honey: {
      main: '#eba937',
    },
    secondary: {
      main: '#eba937',
    },
    // background: {
    //   default: '#eba937', // For buttons ##3779eb
    // },
  },
});

export default theme;
