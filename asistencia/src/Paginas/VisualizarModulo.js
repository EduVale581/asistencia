import React, { useEffect, useState } from 'react'
import ListaCursos from '../Componentes/ListaCursos'
import NavbarInicio from '../Componentes/NavbarInicio';
import {
    Button,
    Typography,
    Box,
    Grid,
    IconButton,
    Tabs,
    Tab,
    Skeleton,
} from '@mui/material';
import { useAuth } from '../Context/AuthContext';
import { useNavigate, useParams } from "react-router-dom";
import { db } from '../Utils/firebase';
import { doc, getDoc } from "firebase/firestore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ModalNuevoEstudiantes from '../Componentes/ModalNuevoEstudiantes';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListaAsistencia from '../Componentes/ListaAsistencia';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



export default function VisualizarModulo() {
    const { id } = useParams();
    const { currentUser } = useAuth();


    const navigate = useNavigate();

    const [moduloObtenido, setModuloObtenido] = useState(null)
    const [moduloCargado, setModuloCargado] = useState(false);
    const [valueTabs, setValueTabs] = useState(0);

    const [mostrarModalNuevoEstudiante, setMostrarNuevoEstudiante] = useState(false);
    
    const [estudiantes, setEstudiantes] = useState([]);

   
    
    const handleChangeTabs = (event, newValue) => {
        setValueTabs(newValue);
    };

    useEffect(() => {
        if (currentUser.tipoUsuario !== "Profesor") {
            navigate("/")

        }
    }, [currentUser.tipoUsuario]);


    const validarFecha = () =>{
        return false;        
    }

    useEffect(() => {
        async function obtenerDocumento() {
            const docRef = doc(db, "modulos", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {

                if (docSnap.data().estudiantes) {
                    setEstudiantes(docSnap.data().estudiantes);
                }
                else {
                    setEstudiantes([]);

                }
                setModuloCargado(true)
                setModuloObtenido(docSnap.data())

            } else {
            }

        }
        obtenerDocumento();


    }, [id])

    return (
        <div>
            <NavbarInicio navBarActivo="Inicio" />
            {
                moduloCargado ? (
                    <div>

                        <Box sx={{ marginLeft: "20%", borderBottom: "1px solid", width: "60%", marginTop: "3%" }}>
                            <Grid container>
                                <Grid item xs={2} md={2}>
                                    <IconButton
                                        onClick={() => {
                                            navigate("/");
                                        }}
                                    >
                                        <ArrowBackIcon />
                                    </IconButton>

                                </Grid>
                                <Grid item xs={10} md={10}>
                                    <Typography component="div" gutterBottom style={{ color: "#A61F38", fontSize: "30px" }}>
                                        {moduloObtenido && moduloObtenido.nombre}
                                    </Typography>

                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ marginLeft: "20%", width: '60%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={valueTabs} onChange={handleChangeTabs}>
                                    <Tab label="Lista Estudiantes" {...a11yProps(0)} />
                                    <Tab label="Asistencias" {...a11yProps(1)} />
                                </Tabs>
                            </Box>

                            <TabPanel value={valueTabs} index={0}>
                                <Grid container>
                                    <Grid item xs={12} md={12}>
                                        <Button
                                            variant='contained'
                                            onClick={() => {
                                                setMostrarNuevoEstudiante(true)
                                            }}
                                        >
                                            Agregar Estudiantes
                                        </Button>

                                    </Grid>

                                    <Grid item xs={12} md={12} style={{ marginTop: "10px" }}>
                                        <ListaCursos estudiantes={estudiantes} />

                                    </Grid>



                                </Grid>

                            </TabPanel>

                            <TabPanel value={valueTabs} index={1}>
                                <Grid container>                          
                                    <ListaAsistencia estudiantes={estudiantes} modulo={moduloObtenido} id={id}/>
                                </Grid>
                            </TabPanel>
                        </Box>
                    </div>

                ) : (
                    <Skeleton variant="rectangular" width="100%" height={500} />
                )
            }


            {mostrarModalNuevoEstudiante && (
                <ModalNuevoEstudiantes
                    open={mostrarModalNuevoEstudiante}
                    setOpen={setMostrarNuevoEstudiante}
                    documento={moduloObtenido}
                    id={id}
                    setModuloObtenido={setModuloObtenido}
                    setEstudiantes={setEstudiantes}
                />
            )}

        </div >
    )
}