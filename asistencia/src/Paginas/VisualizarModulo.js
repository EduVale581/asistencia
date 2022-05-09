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
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
} from '@mui/material';
import { useAuth } from '../Context/AuthContext';
import { useNavigate, useParams } from "react-router-dom";
import { db } from '../Utils/firebase';
import { doc, getDoc } from "firebase/firestore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ModalNuevoEstudiantes from '../Componentes/ModalNuevoEstudiantes';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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

function fechaHoy(){
    var hoy = new Date();
    let diaSemana = '';

    if(hoy.getDay()===1){
        diaSemana = 'Lunes'
    }
    if(hoy.getDay()===2){
        diaSemana = 'Martes'
    }
    if(hoy.getDay()===3){
        diaSemana = 'Miércoles'
    }
    if(hoy.getDay()===4){
        diaSemana = 'Jueves'
    }
    if(hoy.getDay()===5){
        diaSemana = 'Viernes'
    }
    if(hoy.getDay()===6){
        diaSemana = 'Sábado'
    }
    if(hoy.getDay()===0){
        diaSemana = 'Domingo'
    }
    return{
        dia: hoy.getDate(),
        mes: hoy.getMonth()+1,
        anio: hoy.getFullYear(),
        diaSemana: diaSemana,
        hora: hoy.getHours(),
        minutos: hoy.getMinutes(),
        segundos: hoy.getSeconds(),
    }

    
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

    const [iniciarAsistencia, setIniciarAsistencia] = useState(false);
    const [fechaActual, setFechaActual] = useState(fechaHoy());
    
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
                                    <Grid item xs={12} md={12}>
                                        {/* <Button
                                            variant='contained'
                                            onClick={() => {
                                                setMostrarNuevoEstudiante(true)
                                            }}
                                        >
                                            Agregar Estudiantes
                                        </Button> */}
                                        
                                        <Button onClick={()=>{console.log(fechaActual)}}>fecha actual</Button>

                                        {
                                            iniciarAsistencia ?
                                            (<Button
                                                variant='contained'
                                                onClick={()=>{setIniciarAsistencia(!iniciarAsistencia)}}
                                            >
                                                Finalizar asistencia
                                            </Button>)
                                            :
                                            (<Button
                                                variant='contained'
                                                onClick={()=>{setIniciarAsistencia(!iniciarAsistencia)}}
                                            >
                                                Tomar asistencia
                                            </Button>)
                                        }
                                        
                                        
                                        

                                    </Grid>

                                    <Grid item xs={12} md={12} style={{ marginTop: "10px" }}>
                                        {/* <ListaCursos estudiantes={estudiantes} /> */}
                                        {
                                            estudiantes.map((estudiante, index)=>{
                                                return (
                                                    <ListItem key={"listaEstudiantes_" + index}
                                                        /* secondaryAction={
                                                            <IconButton edge="end" aria-label="delete" >
                                                                <Button>Presente</Button>
                                                            </IconButton>
                                                        } */
                                                    >
                                                        <ListItemIcon >
                                                            <AccountCircleIcon />
                                                        </ListItemIcon>
                                                        <Stack spacing={0} width="100%" marginLeft="5%">
                                                            <ListItemText primary={estudiante.nombre} style={{ color: "#A61F38" }} />
                                                            <ListItemText primary={estudiante.correo} color="GrayText" />
                                                        </Stack>
                                                        {
                                                            iniciarAsistencia ? (
                                                                estudiante.presente ?
                                                                (<Button variant='contained' color="success">Presente</Button>)
                                                                :
                                                                (<Button variant='outlined' color="error">Ausente</Button>)
                                                            ):(null)
                                                        }

                                                    </ListItem>
                                                )
                                            })
                                        }
                                    </Grid>



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