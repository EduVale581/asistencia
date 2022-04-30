import Login from './Paginas/Login';
import Inicio from './Paginas/Inicio';
import { AuthProvider } from './Context/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PrivateRoute } from './Utils/PrivateRoute';

const theme = createTheme({
  palette: {
    primary: {
      light: "#F22E52",
      main: "#A61F38",
      dark: "#B3223C",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffffff",
      main: "#ff802e",
      dark: "#cccccc",
      contrastText: "#ff802e",
    },
    default: {
      light: "#ffffff",
      main: "#ffffff",
      dark: "#cccccc",
      contrastText: "#ff802e",

    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Inicio />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
