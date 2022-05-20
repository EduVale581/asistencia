import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
} from '@mui/material/';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from '../Utils/firebase';


export default function ListaCursos(props) {
    const { estudiantes, setEstudiantes, desactivarBoton, idModulo } = props;

    const [cargando, setCargando] = useState(false)

    return (
        <List dense={true}>
            {estudiantes && estudiantes.map((elemento, index) => {
                return (
                    <ListItem key={"listaEstudiantes_" + index}
                        secondaryAction={
                            desactivarBoton ? (

                                <></>

                            ) : (
                                <LoadingButton
                                    edge="end"
                                    aria-label="delete"
                                    loading={cargando}
                                    onClick={() => {
                                        setCargando(true)
                                        if (Array.isArray(estudiantes)) {
                                            let arregloEstudiantes2 = estudiantes;

                                            let arregloEstudiantesEliminado = arregloEstudiantes2.filter(e => e.correo !== elemento.correo);
                                            const docRef = doc(db, "modulos", idModulo);
                                            updateDoc(docRef, {
                                                estudiantes: arregloEstudiantesEliminado
                                            }).then(() => {
                                                getDoc(docRef).then((docSnap) => {
                                                    if (docSnap.exists()) {
                                                        const documentoObtenido = docSnap.data();
                                                        if (documentoObtenido.estudiantes) {
                                                            setEstudiantes(documentoObtenido.estudiantes)

                                                        }
                                                        else {
                                                            setEstudiantes(arregloEstudiantesEliminado)
                                                        }

                                                    } else {
                                                    }

                                                });


                                            }).catch(() => {

                                            });

                                        }
                                    }}
                                >
                                    <DeleteIcon />
                                </LoadingButton>

                            )

                        }
                    >
                        <ListItemIcon >
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <Stack spacing={0} width="100%" marginLeft="5%">
                            <ListItemText primary={elemento.nombre} style={{ color: "#A61F38" }} />
                            <ListItemText primary={elemento.correo} color="GrayText" />
                        </Stack>
                    </ListItem>
                )
            })}
        </List>
    )
}