import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';

import '@fontsource/poppins';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import theme from 'theme';
import App from 'App';
import SignUp from 'components/authentication/SignUp';
import FileFrame from 'components/FileFrame';
import Terms from 'components/Terms';
import Privacy from 'components/Privacy';
import ErrorDisplay from 'components/ErrorDisplay';
import reportWebVitals from 'reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path=':fileId' element={<FileFrame />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='get' element={<Navigate replace to='/#products' />} />
          <Route path='contact' element={<Navigate replace to='/#contact' />} />
          <Route path='terms' element={<Terms />} />
          <Route path='privacy' element={<Privacy />} />
          <Route path='oops' element={<ErrorDisplay codeOrText='Oops!' />} />
          <Route path='notfound' element={<ErrorDisplay codeOrText='404' />} />
          <Route path='*' element={<ErrorDisplay codeOrText='404' />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
