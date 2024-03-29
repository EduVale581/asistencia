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
    DialogActions,
    Skeleton
} from '@mui/material/';
import "../styles/asis.css"
import { useNavigate } from "react-router-dom"
import VisualizarModuloEstudiante from './VisualizarModuloEstudiante';
import { db } from '../Utils/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { semestreActual } from '../Utils/funciones';

import AddIcon from "@mui/icons-material/Add";
import ModalAsistenciaModulo from '../Componentes/ModalAsistenciaModulo';
import CrearModulo from './CrearModulo';

export default function Inicio() {
    const [asisAlumno, setAsis] = useState(false);


    const semestre = semestreActual();
    const { currentUser } = useAuth();

    const [modulos, setModulos] = useState([]);
    const [cargandoModulos, setCargandoModulos] = useState(false);
    const [idModulo, setIDModulo] = useState(null);
    const [mostrarAsistencia, setMostrar] = useState(false);

    const [agregarModulo, setAgregarModulo] = useState(false);
    const navigate = useNavigate();

    const agregarNuevo = () => {
        setAgregarModulo(true);
    }
    const handleClose = () => { setAsis(false) };
    const cerrar = () => setMostrar(false);

    const horarioActivo = (horario) => {
        let active = "";
        horario.forEach(hora => {
            if (hora.activo) {
                active = "asis";
            }
        })
        return active;
    }


    useEffect(() => {
        async function obtenerModulos() {
            if (currentUser.tipoUsuario === "Profesor") {
                const q = query(collection(db, "modulos"), where("idProfesor", "==", localStorage.getItem("ID")), where("semestre", "==", semestre));
                const querySnapshot = await getDocs(q);
                const modulosAux = [];
                querySnapshot.forEach((doc) => {
                    modulosAux.push({ id: doc.id, ...doc.data() })
                });
                setModulos(modulosAux)
                setCargandoModulos(true);

            }
            else {
                const q = query(collection(db, "modulos"), where("semestre", "==", semestre));
                const querySnapshot = await getDocs(q);
                const modulosAux = [];
                querySnapshot.forEach((doc) => {
                    if (doc.data().estudiantes && Array.isArray(doc.data().estudiantes)) {
                        let arregloEstudiantesModulos = doc.data().estudiantes;

                        let existeEstudiante = arregloEstudiantesModulos.filter((e) => e.correo === currentUser.email)[0];
                        if (existeEstudiante) {
                            modulosAux.push({ id: doc.id, ...doc.data() })

                        }
                    }

                });
                setModulos(modulosAux)
                setCargandoModulos(true);
            }


        }
        obtenerModulos()
    }, [currentUser, semestre])


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
                                onClick={agregarNuevo}
                            >
                                <AddIcon /> Agregar Módulo
                            </Button>
                        </Grid>

                    </Grid>

                )}

                <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {cargandoModulos ?
                        (modulos.map((moduloEleccion, index) => (
                            <Grid item xs={2} sm={4} md={4} key={index}>

                                <Card className={horarioActivo(moduloEleccion.horario)} sx={{ height: 300, cursor: "pointer" }}>

                                    <CardContent>
                                        <CardActions
                                            onClick={() => {
                                                if (currentUser.tipoUsuario && currentUser.tipoUsuario === "Profesor") {
                                                    navigate("/modulos/" + moduloEleccion.id);
                                                } else {
                                                    setIDModulo(moduloEleccion.id);
                                                    setAsis(true);
                                                }
                                            }}
                                        >
                                            <Stack sx={{ height: 230, width: "100%" }} spacing={2}>
                                                {
                                                    currentUser.tipoUsuario !== "Profesor" && (
                                                        <Typography textAlign="center" color="inherit">Haz click aquí para marcar asistencia</Typography>

                                                    )
                                                }

                                                <Typography textAlign="center" color="primary">{moduloEleccion.nombre}</Typography>

                                                {
                                                    moduloEleccion.profesor && currentUser.tipoUsuario !== "Profesor" && (
                                                        <Typography textAlign="center" color="inherit">{moduloEleccion.profesor ? moduloEleccion.profesor : ""}</Typography>

                                                    )
                                                }
                                                {
                                                    moduloEleccion.estado && moduloEleccion.estado === "EN PROCESO" && currentUser.tipoUsuario !== "Profesor" && (
                                                        <Button
                                                            fullWidth
                                                            variant='contained'

                                                        >
                                                            Marcar Asistencia

                                                        </Button>

                                                    )
                                                }

                                            </Stack>

                                        </CardActions>
                                        {currentUser.tipoUsuario !== "Profesor" ? (
                                            <Box sx={{ height: 90 }}>
                                                <Button
                                                    fullWidth
                                                    variant='contained'
                                                    onClick={() => {

                                                        setIDModulo(moduloEleccion.id);
                                                        setMostrar(true);
                                                    }}
                                                >
                                                    Historial de Asistencia

                                                </Button>

                                            </Box>)
                                            : (<div></div>)}


                                    </CardContent>
                                </Card>
                            </Grid>
                        ))) : (
                            <Skeleton variant="rectangular" width="100%" height="100%" />
                        )}
                </Grid>

            </Stack>
            {agregarModulo && (
                <Dialog
                    open={agregarModulo}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                    maxWidth="md"
                >
                    <DialogContent>
                        <CrearModulo setAgregarModulo={setAgregarModulo} />
                    </DialogContent>
                    {/*                     <DialogActions>
                        <Button onClick={()=>{setAgregarModulo(false)}}>
                            Cerrar
                        </Button>
                    </DialogActions> */}

                </Dialog>
            )}

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
                        <VisualizarModuloEstudiante id={idModulo} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Cerrar
                        </Button>
                    </DialogActions>

                </Dialog>
            )}
            <Dialog
                open={mostrarAsistencia}
                onClose={cerrar}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="md"
            >
                <DialogContent>
                    <ModalAsistenciaModulo id={idModulo} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={cerrar}>
                        Cerrar
                    </Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}
