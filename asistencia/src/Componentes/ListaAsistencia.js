import React, { useState } from 'react'
import {
    Button,
    Grid,
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
        const hora = fechaActual.hora;
        const minutos = fechaActual.minutos;

        
        
        modulo.horario.map((horario) =>{
            /* console.log({hoy})
            console.log(bloque.diaSemana); */
            if(horario.diaSemana === hoy && estado!= true){
                console.log('Es el dia correcto: '+hoy)
                console.log({hora, minutos});
                if(horario.bloque === 'Bloque 1'){
                    if((hora >=8 && minutos >= 30) || (hora <=9 && minutos <= 30) ){
                        console.log('Bloque 1')
                        setEstado(true);
                    }
                }
                if(horario.bloque === 'Bloque 2'){
                    if((hora >=9 && minutos >= 40) || (hora <=10 && minutos <= 40) ){
                        console.log('Bloque 2')
                        setEstado(true);
                    }
                }
                if(horario.bloque === 'Bloque 3'){
                    console.log('Bloque 3')
                    if((hora >=10 && minutos >= 50) || (hora <=11 && minutos <= 50)){
                        console.log('Dentro del bloque 3')
                        setEstado(true);
                    }
                    
                }
                if(horario.bloque === 'Bloque 4'){
                    console.log('Bloque 4')
                    if((hora >=12 && minutos) >= 0 || (hora <=13 && minutos <= 0)){
                        console.log('Dentro del bloque 4')
                        setEstado(true);
                    }
                }
                if(horario.bloque === 'Bloque 5'){
                    console.log('Bloque 5')
                    if((hora >=13 && minutos >= 10) || (hora <=14 && minutos <= 10) ){
                        console.log('Entre en bloque 5')
                        setEstado(true);
                    }    
                }
                if(horario.bloque === 'Bloque 6'){
                    console.log('Bloque 6')
                    if( (hora >=14 && minutos >= 20) || (hora <=15 && minutos <= 20) ){
                        console.log('bloque 6 rdy')
                        setEstado(true);
                    }
                }
                if(horario.bloque === 'Bloque 7'){
                    console.log('bloque 7')
                    if((hora >=15 && minutos >= 30) || (hora <=16 && minutos <= 30)){
                        console.log('Dentro del bloque 7')
                        setEstado(true);
                    }
                }
                if(horario.bloque === 'Bloque 8'){
                    console.log('bloque 8');
                    if((hora >=16 && minutos >= 40) || (hora <=17 && minutos <= 40)){
                        console.log('Dentro del bloque 8');
                        setEstado(true);
                    }
                }
                if(horario.bloque === 'Bloque 9'){
                    console.log('Bloque')
                    if( (hora >=17 && minutos >= 50) || (hora <=18 && minutos <= 50)){
                        console.log('bloque 9');
                        setEstado(true);
                    }
                }
                if(horario.bloque === 'Bloque 10'){
                    console.log('bloque 10')
                    if((hora >=19 && minutos >= 0) || (hora <=20 && minutos <= 0)){
                        console.log('Dentro del bloque 10');
                        setEstado(true);
                    }
                }
                if(horario.bloque === 'Bloque 11'){
                    console.log('bloque 11');
                    if((hora >=20 && minutos >= 10) || (hora <=21 && minutos <= 10)){
                        console.log('Dentro del bloque 11');
                        setEstado(true);
                    }
                }
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