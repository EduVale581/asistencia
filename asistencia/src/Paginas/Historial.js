import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext';
import {
  Button,
  Typography,
  Box,
  Grid,
  Stack,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogActions
}
  from '@mui/material';
import NavbarInicio from '../Componentes/NavbarInicio';
import { db } from '../Utils/firebase';
import { collection, query, getDocs } from "firebase/firestore";
import ModalAsistenciaModulo from '../Componentes/ModalAsistenciaModulo';
import TablaAsistenciaModulo from '../Componentes/TablaAsistenciaModulo';



export default function Historial() {
  const [asisAlumno, setAsis] = useState(false);
  const { currentUser } = useAuth();

  const [modulos, setModulos] = useState([])
  const [idModulo, seIdModulo] = useState('');
  const [esAlumno, setEsAlumno] = useState(false);
  const [estudiantesModulo, setEstudiantesModulo] = useState([]);
  const handleClose = () => setAsis(false);


  useEffect(() => {
    async function obtenerModulos() {

      const q = query(collection(db, "modulos"));
      const querySnapshot = await getDocs(q);
      const modulosAux = [];
      let esAlumnoAux = false;
      querySnapshot.forEach((doc) => {
        if (currentUser.tipoUsuario === 'Profesor') {
          esAlumnoAux = false;
          if (currentUser.uid === doc.data().idProfesor) {
            /* modulosAux.push(doc.data()); */
            modulosAux.push({ id: doc.id, ...doc.data() })
          }
        }
        if (currentUser.tipoUsuario === 'Estudiante') {
          esAlumnoAux = true;
          doc.data().estudiantes.map((estudiante) => {
            if (estudiante.correo === currentUser.email) {
              modulosAux.push({ id: doc.id, ...doc.data() })
            } else {
            }

          })
        }

      });
      setEsAlumno(esAlumnoAux);
      setModulos(modulosAux);
    }
    obtenerModulos()

  }, [currentUser])

  return (
    <div>
      <NavbarInicio navBarActivo="Modulos" />

      <Stack spacing={2} style={{ marginTop: "50px", marginRight: "50px" }}>

        <Typography component="div" gutterBottom style={{ textAlign: 'center', color: "#A61F38", fontSize: "30px" }}>
          Historial de módulos
        </Typography>


        <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} marginTop="5%" justifyContent="center" >
          {modulos.map((modulo, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Card sx={{ height: 300 }}>
                <CardContent>
                  <Box sx={{ height: 250 }}>
                    <Typography style={{ textAlign: 'center', color: "#A61F38" }} >
                      {modulo.nombre}
                    </Typography>
                  </Box>


                  <Box sx={{ height: 50 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      style={{ display: 'center' }}
                      onClick={() => {
                        setAsis(true)
                        seIdModulo(modulo.id);
                        setEstudiantesModulo(modulo.estudiantes);
                      }}>
                      Ver historial
                    </Button>
                  </Box>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Stack>
      {asisAlumno && esAlumno && (
        <Dialog
          open={asisAlumno}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="md"
        >
          <DialogContent>
            <ModalAsistenciaModulo id={idModulo} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {asisAlumno && !esAlumno && (
        <Dialog
          open={asisAlumno}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="md"
        >
          <DialogContent>
            <TablaAsistenciaModulo idModulo={idModulo} iniciarAsitencia={false} estudiantesModulo={estudiantesModulo} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}
