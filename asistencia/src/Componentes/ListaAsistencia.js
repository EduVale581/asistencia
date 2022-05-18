import React, { useState, useEffect } from 'react'
import {
    Button,
    Grid,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { db } from '../Utils/firebase'
import { collection, doc, addDoc, updateDoc,query , where, getDocs } from "firebase/firestore";


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


const ListaAsistencia = ({estudiantes, modulo, id}) => {

    const [iniciarAsistencia, setIniciarAsistencia] = useState(false);
    const [fechaActual, setFechaActual] = useState(fechaHoy());
    const [estado, setEstado] = useState(false); 
    const [bloqueActual, setBloqueActual]= useState("");
    const [idNueva,setIDNueva] = useState("");
    const [asisNueva, setAsisNueva] = useState(null);

    const tomarAsistencia = () =>{
        const hoy = fechaActual.diaSemana;
        const hora = fechaActual.hora;
        const minutos = fechaActual.minutos;
       
        const horaActual = hora+':'+minutos;
        console.log({horaActual});
        console.log(modulo.horario);
        modulo.horario.map((horario) =>{
            /* console.log({hoy})
            console.log(bloque.diaSemana); */
            if(horario.diaSemana === hoy && estado!= true){
                if(horario.bloque === 'Bloque 1'){
                    if(horaActual>= '8:30' && horaActual <= '9:30'){
                        setBloqueActual("Bloque 1")
                        setEstado(true);
                    }
                }
                if(horario.bloque === 'Bloque 2'){
                    if(horaActual>= '9:40' && horaActual <= '10:40'){
                        setBloqueActual("Bloque 2")
                        setEstado(true);
                    }
                }
                if(horario.bloque === 'Bloque 3'){
                    console.log('Bloque 3')
                    if(horaActual>= '10:50' && horaActual <= '11:50'){
                        setBloqueActual("Bloque 3")
                        setEstado(true);
                    }
                    
                }
                if(horario.bloque === 'Bloque 4'){
                    console.log('Bloque 4')
                    if(horaActual>= '12:00' && horaActual <= '13:00'){
                        setBloqueActual("Bloque 4")
                        setEstado(true);
                    }
                }
                if(horario.bloque === 'Bloque 5'){
                    console.log('Bloque 5')
                    if(horaActual>= '13:10' && horaActual <= '14:10'){
                        setBloqueActual("Bloque 5")
                        setEstado(true);
                    }  
                }
                if(horario.bloque === 'Bloque 6'){
                    console.log('Bloque 6')
                    if(horaActual>= '14:20' && horaActual <= '15:20'){
                        setBloqueActual("Bloque 6")
                        setEstado(true);
                    }
                }
                if(horario.bloque === 'Bloque 7'){
                    console.log('bloque 7')
                    if(horaActual>= '15:30' && horaActual <= '16:30'){
                        setBloqueActual("Bloque 7")
                        setEstado(true);
                    }
                }
                if(horario.bloque === 'Bloque 8'){
                    if(horaActual>= '16:40' && horaActual <= '17:40'){
                        setBloqueActual("Bloque 8")
                        setEstado(true);
                    }
                }
                if(horario.bloque === 'Bloque 9'){
                    console.log('Bloque 9')
                    if(horaActual>= '17:50' && horaActual <= '18:50'){
                        setBloqueActual("Bloque 9")
                        setEstado(true);
                    }
                }
                if(horario.bloque === 'Bloque 10'){
                    console.log('bloque 10')
                    if(horaActual>= '19:00' && horaActual <= '20:00'){
                        setBloqueActual("Bloque 10")
                        setEstado(true);
                    }
                }
                if(horario.bloque === 'Bloque 11'){
                    console.log('bloque 11');
                    if(horaActual>= '20:10' && horaActual <= '21:10'){
                        setBloqueActual("Bloque 11")
                        setEstado(true);
                    }
                }
            }
        })
    }

    const ActivarAsistencia =  () => {
        setIniciarAsistencia(!iniciarAsistencia);
        let moduloNuevo = modulo;
        
        modulo.horario.map((horario ,index) => {
            if(horario.bloque === bloqueActual){
                if(moduloNuevo.horario[index].activo){
                    moduloNuevo.horario[index].activo = false;
                    getDatos();                    
                }else{
                    moduloNuevo.horario[index].activo = true;
                    crearSubcoleccionAsistentes();                                    
                }
            }
        })  
        updateDoc(doc(db, "modulos", id), moduloNuevo).then(() => {

        }).catch(() => {

        });
    }

    const getDatos = () => {
        let idNueva2 = 0;
        let asisNueva2 ={
            Activo:false,
            asistentes:[],
            fecha:"23/05/2022"
        } ;
        const q = query(collection(db, "modulos/"+id+"/asistencias"), where("Activo", "==", true));
        getDocs(q).then((querySnapshot) => {

            let idNueva2 = 0;
            let asisNueva2 ={
                Activo:false,
                asistentes:[],
                fecha:"23/05/2022"
            } ;
            querySnapshot.forEach((doc) => {
                idNueva2 = doc.id;
                asisNueva2 = doc.data();
                
                /*asisNueva2.Activo = false;
                console.log(asisNueva2);

                updateDoc(doc(db, "modulos/kCs8O8wtNblwz4KMhEkn/asistencias/"+"m5M8Oj3vFfD3Xt6ObPqz"), asisNueva2).then(() =>{
            
                }).catch(() => {
        
                });   */ 
            });
            asisNueva2.Activo = false;

            updateDoc(doc(db, "modulos/"+id+"/asistencias/"+idNueva2), asisNueva2).then(() =>{
                
            }).catch(() => {

            });  
        });
        
         //terminarAsistencia(idNueva2,asisNueva2);
            
    }

    const terminarAsistencia = (idNuevo, asisNueva2) => {
        let asisAux = asisNueva2;
        asisAux.Activo = false;
         
    }

    const crearSubcoleccionAsistentes = async() => {
        const fechaHoy = fechaActual.diaSemana + " " +fechaActual.mes + " " + fechaActual.anio;
        const alumnosPresentes = [];
        await addDoc(collection(db, "modulos/"+id+"/asistencias"), {
            Fecha : fechaHoy,
            Asistentes : alumnosPresentes,
            Activo : true
        });
        
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
                            onClick={ ActivarAsistencia}
                        >
                            Finalizar asistencia
                        </Button>)
                        :
                        (<Button
                            variant='contained'
                            onClick={ ActivarAsistencia}
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