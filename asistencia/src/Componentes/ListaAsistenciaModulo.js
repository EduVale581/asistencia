import React, { useEffect, useState } from 'react';
import {
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Skeleton
} from '@mui/material/';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { doc, arrayUnion, getDoc, arrayRemove, updateDoc } from "firebase/firestore";
import { db } from '../Utils/firebase';
import { LoadingButton } from '@mui/lab';


export default function ListaAsistenciaModulo(props) {
    const { asistencia, iniciarAsistencia, idModulo, estudiantesModulo } = props;
    const [estudiantes, setEstudiantes] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [cargandoDatos, setCargandoDatos] = useState(false);
    const q = doc(db, "modulos/" + idModulo + "/asistencias/" + asistencia.id);

    function obtenerAsistencia() {
        setCargando(false);
        getDoc(q).then((docSnap) => {
            if (docSnap.exists()) {
                const documentoObtenido = docSnap.data();

                if (documentoObtenido.Asistentes) {
                    if (Array.isArray(estudiantesModulo) && Array.isArray(documentoObtenido.Asistentes)) {
                        const estudiantesAsistenciaFinal = []
                        estudiantesModulo.forEach(element => {
                            let estudianteAsiste = documentoObtenido.Asistentes.filter(e => e === element.correo)[0]
                            if (estudianteAsiste) {
                                estudiantesAsistenciaFinal.push({ ...element, presente: true })

                            }
                            else {
                                estudiantesAsistenciaFinal.push({ ...element, presente: false })

                            }


                        });

                        setEstudiantes(estudiantesAsistenciaFinal)
                        setCargando(true)

                    }


                }
            } else {
                setCargando(true)
            }

        }).catch(() => {
            setCargando(true)

        })

    }


    useEffect(() => {
        obtenerAsistencia();
    }, []);

    return (
        <>
            {cargando ? (
                <List dense={true}>
                    {estudiantes.map((estudiante, index) => {
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
                                            (<LoadingButton
                                                loading={cargandoDatos}
                                                variant='contained'
                                                color="success"
                                                onClick={() => {
                                                    setCargandoDatos(true);
                                                    updateDoc(q, {
                                                        Asistentes: arrayRemove(estudiante.correo)
                                                    }).then(() => {
                                                        obtenerAsistencia();
                                                        setCargandoDatos(false);
                                                    }).catch(() => { setCargandoDatos(false); });

                                                }}
                                            >
                                                Presente
                                            </LoadingButton>
                                            )
                                            :
                                            (
                                                <LoadingButton
                                                    loading={cargandoDatos}
                                                    variant='outlined'
                                                    color="error"
                                                    onClick={() => {
                                                        setCargandoDatos(true);
                                                        updateDoc(q, {
                                                            Asistentes: arrayUnion(estudiante.correo)
                                                        }).then(() => {
                                                            obtenerAsistencia();
                                                            setCargandoDatos(false);
                                                        }).catch(() => { setCargandoDatos(false); });

                                                    }}
                                                >
                                                    Ausente
                                                </LoadingButton>)
                                    ) : (estudiante.presente ?
                                        (<Button variant='contained' color="success" disabled>Presente</Button>)
                                        :
                                        (<Button variant='outlined' color="error" disabled>Ausente</Button>)
                                    )
                                }

                            </ListItem>

                        )
                    })
                    }
                </List>
            ) : (
                <Skeleton variant="rectangular" width={210} height={118} />
            )


            }
        </>

    )
}