import React, { useState } from 'react'
import {
    Button,
    Grid,
} from '@mui/material';
import { db } from '../Utils/firebase'
import { collection, doc, addDoc, updateDoc, query, where, getDocs } from "firebase/firestore";
import TablaAsistenciaModulo from './TablaAsistenciaModulo';



function fechaHoy() {
    var hoy = new Date();
    let diaSemana = '';

    if (hoy.getDay() === 1) {
        diaSemana = 'Lunes'
    }
    if (hoy.getDay() === 2) {
        diaSemana = 'Martes'
    }
    if (hoy.getDay() === 3) {
        diaSemana = 'Miércoles'
    }
    if (hoy.getDay() === 4) {
        diaSemana = 'Jueves'
    }
    if (hoy.getDay() === 5) {
        diaSemana = 'Viernes'
    }
    if (hoy.getDay() === 6) {
        diaSemana = 'Sábado'
    }
    if (hoy.getDay() === 0) {
        diaSemana = 'Domingo'
    }
    return {
        dia: hoy.getDate(),
        mes: hoy.getMonth() + 1,
        anio: hoy.getFullYear(),
        diaSemana: diaSemana,
        hora: hoy.getHours(),
        minutos: hoy.getMinutes(),
        segundos: hoy.getSeconds(),
    }
}



const ListaAsistencia = ({ estudiantes, modulo, id }) => {

    const [iniciarAsistencia, setIniciarAsistencia] = useState(false);
    const fechaActual = fechaHoy();
    const [estado, setEstado] = useState(false);
    const [bloqueActual, setBloqueActual] = useState("");

    //Configurado a 15 minutos
    function temporizador (){
        let timer = setTimeout(() => {            
            finalizarClase();
        }, 900000);
        return () => clearTimeout(timer);
    }

const finalizarClase = () => {
    setIniciarAsistencia(false);
    let moduloNuevo = modulo;    
        modulo.horario.forEach((horario, index) => {            
                if (moduloNuevo.horario[index].activo) {
                    moduloNuevo.horario[index].activo = false;
                    getDatos();
                }             
        })
        updateDoc(doc(db, "modulos", id), moduloNuevo).then(() => {

        }).catch(() => {
            console.log("ERROR");
        });
}

    const tomarAsistencia = () => {
        const hoy = fechaActual.diaSemana;
        const hora = fechaActual.hora;
        const minutos = fechaActual.minutos;

        const horaActual = hora + ':' + minutos;
        modulo.horario.map((horario) => {
            if (horario.diaSemana === hoy && estado !== true) {
                if (horario.bloque === 'Bloque 1') {
                    if (horaActual >= '8:30' && horaActual <= '9:30') {
                        setBloqueActual("Bloque 1")
                        setEstado(true);
                    }
                }
                if (horario.bloque === 'Bloque 2') {
                    if (horaActual >= '9:40' && horaActual <= '10:40') {
                        setBloqueActual("Bloque 2")
                        setEstado(true);
                    }
                }
                if (horario.bloque === 'Bloque 3') {
                    if (horaActual >= '10:50' && horaActual <= '11:50') {
                        setBloqueActual("Bloque 3")
                        setEstado(true);
                    }

                }
                if (horario.bloque === 'Bloque 4') {
                    if (horaActual >= '12:00' && horaActual <= '13:00') {
                        setBloqueActual("Bloque 4")
                        setEstado(true);
                    }
                }
                if (horario.bloque === 'Bloque 5') {
                    if (horaActual >= '13:10' && horaActual <= '14:10') {
                        setBloqueActual("Bloque 5")
                        setEstado(true);
                    }
                }
                if (horario.bloque === 'Bloque 6') {
                    if (horaActual >= '14:20' && horaActual <= '15:20') {
                        setBloqueActual("Bloque 6")
                        setEstado(true);
                    }
                }
                if (horario.bloque === 'Bloque 7') {
                    if (horaActual >= '15:30' && horaActual <= '16:30') {
                        setBloqueActual("Bloque 7")
                        setEstado(true);
                    }
                }
                if (horario.bloque === 'Bloque 8') {
                    if (horaActual >= '16:40' && horaActual <= '17:40') {
                        setBloqueActual("Bloque 8")
                        setEstado(true);
                    }
                }
                if (horario.bloque === 'Bloque 9') {
                    if (horaActual >= '17:50' && horaActual <= '18:50') {
                        setBloqueActual("Bloque 9")
                        setEstado(true);
                    }
                }
                if (horario.bloque === 'Bloque 10') {
                    if (horaActual >= '19:00' && horaActual <= '20:00') {
                        setBloqueActual("Bloque 10")
                        setEstado(true);
                    }
                }
                if (horario.bloque === 'Bloque 11') {
                    if (horaActual >= '20:10' && horaActual <= '21:10') {
                        setBloqueActual("Bloque 11")
                        setEstado(true);
                    }
                }else{
                    if(estado){
                        setEstado(false);
                        console.log('aca xd')
                    }
                }
                
            }
        })
    }

    const ActivarAsistencia = () => {
        setIniciarAsistencia(!iniciarAsistencia);
                
        let moduloNuevo = modulo;

        

        modulo.horario.forEach((horario, index) => {
            if (horario.bloque === bloqueActual && horario.diaSemana === fechaHoy().diaSemana) {
                console.log(moduloNuevo.horario[index].activo);
                if (moduloNuevo.horario[index].activo) {
                    moduloNuevo.horario[index].activo = false;
                    getDatos();
                } else {
                    moduloNuevo.horario[index].activo = true;
                    crearSubcoleccionAsistentes();
                    temporizador();
                }
            }
        })
        updateDoc(doc(db, "modulos", id), moduloNuevo).then(() => {
            
        }).catch(() => {

        });
    }




    const getDatos = () => {
        const q = query(collection(db, "modulos/" + id + "/asistencias"), where("Activo", "==", true));
        getDocs(q).then((querySnapshot) => {

            let idNueva2 = 0;
            let asisNueva2 = {
                Activo: false,
                asistentes: [],
                fecha: "23/05/2022"
            };
            querySnapshot.forEach((doc) => {
                idNueva2 = doc.id;
                asisNueva2 = doc.data();
            });
            asisNueva2.Activo = false;

            updateDoc(doc(db, "modulos/" + id + "/asistencias/" + idNueva2), asisNueva2).then(() => {

            }).catch(() => {

            });
        });

    }
    const crearSubcoleccionAsistentes = async () => {
        const fechaActualAux = new Date();
        const fechaHoy = fechaActualAux.getDate() + "/" + (fechaActualAux.getMonth() + 1) + "/" + fechaActualAux.getFullYear();
        const alumnosPresentes = [];
        await addDoc(collection(db, "modulos/" + id + "/asistencias"), {
            Fecha: fechaHoy,
            Asistentes: alumnosPresentes,
            Activo: true,
            Bloque: bloqueActual
        });
    }


    tomarAsistencia();
    return (
        <>
            <Grid item xs={12} md={12}>
                {
                    estado ?
                        (
                            iniciarAsistencia ?
                                (<Button
                                    variant='contained'
                                    onClick={ActivarAsistencia}
                                >
                                    Finalizar asistencia
                                </Button>)
                                :
                                (<Button
                                    variant='contained'
                                    onClick={ActivarAsistencia}
                                >
                                    Tomar asistencia
                                </Button>)
                        )
                        :
                        (
                            <Button
                                disabled
                            >
                                Tomar asistencia
                            </Button>
                        )
                }

            </Grid>

            <Grid item xs={12} md={12} style={{ marginTop: "10px" }}>
                <TablaAsistenciaModulo
                    idModulo={id}
                    iniciarAsistencia={iniciarAsistencia}
                    estudiantesModulo={estudiantes}
                />
            </Grid>
        </>
    )
}



export default ListaAsistencia