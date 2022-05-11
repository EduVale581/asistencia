import React, { useState } from 'react'
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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


const ListaAsistencia = ({estudiantes, modulo}) => {

    const [iniciarAsistencia, setIniciarAsistencia] = useState(false);
    const [fechaActual, setFechaActual] = useState(fechaHoy());
    const [estado, setEstado] = useState(false); 

    const tomarAsistencia = () =>{
        const hoy = fechaActual.diaSemana;
        
        modulo.horario.map((bloque) =>{
            /* console.log({hoy})
            console.log(bloque.diaSemana); */
            if(bloque.diaSemana === hoy && estado!= true){
                if(bloque.diaSemana)
                console.log('entre')
                setEstado(true);
            }
        })
    }
    tomarAsistencia();
    return (
        <>
            {/* <Button>{modulo.nombre}</Button>
            {
                estudiantes.map((estudiante, index)=>{
                    return (
                        <Button key={index}>{estudiante.nombre}</Button>
                    )
                })
            } */}
            <Grid item xs={12} md={12}>
                {
                    estado ?
                    (
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
                    )
                    :
                    (
                        <Button 
                            onClick={()=>{console.log(estado)}}
                            disabled
                        >
                            Tomar asistencia
                        </Button>
                    )
                }
                
                {/* {
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
                } */}

                </Grid>

                <Grid item xs={12} md={12} style={{ marginTop: "10px" }}>
                {/* <ListaCursos estudiantes={estudiantes} /> */}
                {
                    estudiantes.map((estudiante, index)=>{
                        return (
                            <ListItem key={"listaEstudiantes_" + index}>
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
        </>
    )
}

export default ListaAsistencia