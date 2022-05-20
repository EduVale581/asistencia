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
    console.log("Bloque actual: " + bloqueActual);

    const tomarAsistencia = () => {
        const hoy = fechaActual.diaSemana;
        const hora = fechaActual.hora;
        const minutos = fechaActual.minutos;



        modulo.horario.forEach((horario) => {
            /* console.log({hoy})
            console.log(bloque.diaSemana); */
            if (horario.diaSemana === hoy && estado !== true) {
                console.log('Es el dia correcto: ' + hoy)
                console.log({ hora, minutos });
                if (horario.bloque === 'Bloque 1') {
                    if ((hora >= 8 && minutos >= 30) || (hora <= 9 && minutos <= 30)) {
                        console.log('Bloque 1')
                        setBloqueActual("Bloque 1")
                        setEstado(true);
                    }
                }
                if (horario.bloque === 'Bloque 2') {
                    if ((hora >= 9 && minutos >= 40) || (hora <= 10 && minutos <= 40)) {
                        console.log('Bloque 2')
                        setBloqueActual("Bloque 2")
                        setEstado(true);
                    }
                }
                if (horario.bloque === 'Bloque 3') {
                    console.log('Bloque 3')
                    if ((hora >= 10 && minutos >= 50) || (hora <= 11 && minutos <= 50)) {
                        console.log('Dentro del bloque 3')
                        setBloqueActual("Bloque 3")
                        setEstado(true);
                    }

                }
                if (horario.bloque === 'Bloque 4') {
                    console.log('Bloque 4')
                    if ((hora >= 12 && minutos) >= 0 || (hora <= 13 && minutos <= 0)) {
                        console.log('Dentro del bloque 4')
                        setBloqueActual("Bloque 4")
                        setEstado(true);
                    }
                }
                if (horario.bloque === 'Bloque 5') {
                    console.log('Bloque 5')
                    if ((hora >= 13 && minutos >= 10) || (hora <= 14 && minutos <= 10)) {
                        console.log('Entre en bloque 5')
                        setBloqueActual("Bloque 5")
                        setEstado(true);
                    }
                }
                if (horario.bloque === 'Bloque 6') {
                    console.log('Bloque 6')
                    if ((hora >= 14 && minutos >= 20) || (hora <= 15 && minutos <= 20)) {
                        console.log('bloque 6 rdy')
                        setBloqueActual("Bloque 6")
                        setEstado(true);
                    }
                }
                if (horario.bloque === 'Bloque 7') {
                    console.log('bloque 7')
                    if ((hora >= 15 && minutos >= 30) || (hora <= 16 && minutos <= 30)) {
                        console.log('Dentro del bloque 7')
                        setBloqueActual("Bloque 7")
                        setEstado(true);
                    }
                }
                if (horario.bloque === 'Bloque 8') {
                    console.log('bloque 8');
                    if ((hora >= 16 && minutos >= 40) || (hora <= 17 && minutos <= 40)) {
                        console.log('Dentro del bloque 8');
                        setBloqueActual("Bloque 8")
                        setEstado(true);
                    }
                }
                if (horario.bloque === 'Bloque 9') {
                    console.log('Bloque')
                    if ((hora >= 17 && minutos >= 50) || (hora <= 18 && minutos <= 50)) {
                        console.log('bloque 9');
                        setBloqueActual("Bloque 9")
                        setEstado(true);
                    }
                }
                if (horario.bloque === 'Bloque 10') {
                    console.log('bloque 10')
                    if ((hora >= 19 && minutos >= 0) || (hora <= 20 && minutos <= 0)) {
                        console.log('Dentro del bloque 10');
                        setBloqueActual("Bloque 10")
                        setEstado(true);
                    }
                }
                if (horario.bloque === 'Bloque 11') {
                    console.log('bloque 11');
                    if ((hora >= 20 && minutos >= 10) || (hora <= 21 && minutos <= 10)) {
                        setBloqueActual("Bloque 11")
                        console.log('Dentro del bloque 11');
                        setEstado(true);
                    }
                }
            }
        })
    }

    const ActivarAsistencia = () => {
        setIniciarAsistencia(!iniciarAsistencia);
        let moduloNuevo = modulo;

        modulo.horario.forEach((horario, index) => {
            if (horario.bloque === bloqueActual) {
                if (moduloNuevo.horario[index].activo) {
                    moduloNuevo.horario[index].activo = false;
                    getDatos();
                } else {
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
            Activo: true
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
                                onClick={() => { console.log(estado) }}
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