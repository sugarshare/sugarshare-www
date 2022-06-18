import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// A custom theme for this app
declare module '@mui/material/styles' {
  interface Palette {
    honey?: Palette['primary'];
  }
  interface PaletteOptions {
    honey?: PaletteOptions['primary'];
  }
}

const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: '"Poppins", sans-serif;',
    },
    palette: {
      honey: {
        main: '#eba937',
      },
      secondary: {
        main: '#eba937',
      },
    },
  }),
  {
    factor: 2.5,
  },
);

export default theme;
