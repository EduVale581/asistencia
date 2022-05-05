import Login from './Paginas/Login';
import Inicio from './Paginas/Inicio';
import { AuthProvider } from './Context/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PrivateRoute } from './Utils/PrivateRoute';
import CrearModulo from './Paginas/CrearModulo';
import VisualizarModulo from './Paginas/VisualizarModulo';

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
      main: "#B3223C",
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
            <Route
              path="/modulos"
              element={
                <PrivateRoute>
                  <VisualizarModulo />
                </PrivateRoute>
              }
            />
            <Route
              path="/crearModulo"
              element={
                <PrivateRoute>
                  <CrearModulo />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;