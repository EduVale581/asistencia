import React, { useEffect, useState } from 'react';
import NavbarInicio from '../Componentes/NavbarInicio';
import { useAuth } from '../Context/AuthContext';
import {
    Grid,
    Card,
    CardContent,
    Box,
    Button,
    Stack,
    Typography,
    Divider,
    CardActions,
    Dialog,
    DialogContent,
    DialogActions
} from '@mui/material/';
import { useNavigate } from "react-router-dom"
import VisualizarModuloEstudiante from './VisualizarModuloEstudiante';
import { db } from '../Utils/firebase';
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";
import { semestreActual } from '../Utils/funciones';

import AddIcon from "@mui/icons-material/Add";


export default function Inicio() {
    const [asisAlumno, setAsis] = useState(false);


    const semestre = semestreActual();
    const { currentUser } = useAuth();

    const [modulos, setModulos] = useState([]);
    const [cargandoModulos, setCargandoModulos] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setAsis(false);



    useEffect(() => {
        async function obtenerModulos() {
            console.log(currentUser)
            const q = query(collection(db, "modulos"), where("idProfesor", "==", localStorage.getItem("ID")), where("semestre", "==", semestre));
            const querySnapshot = await getDocs(q);
            const modulosAux = [];
            querySnapshot.forEach((doc) => {
                modulosAux.push({ id: doc.id, ...doc.data() })
            });

            setModulos(modulosAux)
            setCargandoModulos(true);

        }
        obtenerModulos()







    }, [])


    return (
        <div>
            <NavbarInicio navBarActivo="Inicio" />

            <Stack spacing={2} style={{ marginTop: "50px", marginRight: "50px" }}>
                <Typography
                    style={{ textAlign: "center" }}
                    variant='h4'
                    color="primary"
                >
                    Módulos Semestre Actual
                </Typography>

                <Divider style={{ marginLeft: "10px", backgroundColor: "#A61F38" }} />

                {currentUser.tipoUsuario && currentUser.tipoUsuario === "Profesor" && (
                    <Grid container style={{ marginLeft: "10px" }}>
                        <Grid item>
                            <Button
                                variant="contained"
                                onClick={() => { navigate('/crearModulo') }}
                            >
                                <AddIcon /> Agregar Módulo
                            </Button>
                        </Grid>

                    </Grid>

                )}

                <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {cargandoModulos && modulos.map((moduloEleccion, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <Card sx={{ height: 300 }}>

                                <CardContent>
                                    <CardActions
                                        onClick={() => {
                                            if (currentUser.tipoUsuario && currentUser.tipoUsuario === "Profesor") {
                                                navigate("/modulos/" + moduloEleccion.id);
                                            } else {
                                                setAsis(true);
                                            }
                                        }}
                                    >
                                        <Box sx={{ height: 230 }}>

                                        </Box>

                                    </CardActions>

                                    <Box sx={{ height: 90 }}>
                                        <Button
                                            fullWidth
                                            variant='contained'

                                        >
                                            Historial de Asistencia

                                        </Button>

                                    </Box>

                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

            </Stack>
            {asisAlumno && (
                <Dialog
                    open={asisAlumno}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                    maxWidth="md"
                >
                    <DialogContent>
                        <VisualizarModuloEstudiante />
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