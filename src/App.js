import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";

import Home from './pages/home';


const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1bffd5',
      contrastText: '#000000',
    },
    secondary: {
      main: '#36bbff',
      contrastText: '#000000',
    },
    background: {
      paper: 'rgba(0,195,195,0.48)',
      default: '#ffffff',
    },
    error: {
      main: '#d60e00',
      contrastText: '#e2e2e2',
    },
    text: {
      secondary: '#f7f5f5',
      hint: '#00e4e4',
      primary: '#000000',
      disabled: 'rgba(148,0,0,0.75)',
    },
  }
});



function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
      <Home />
      </>
    </ThemeProvider>
    
  );
}

export default App;
