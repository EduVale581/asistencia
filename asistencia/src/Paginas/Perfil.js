import React, { useEffect, useState } from 'react';
import NavbarInicio from '../Componentes/NavbarInicio';
import { useAuth } from '../Context/AuthContext';
import {
    Stack,
    TextField,
    Typography
} from '@mui/material/';
import { useNavigate } from "react-router-dom"
import VisualizarModuloEstudiante from './VisualizarModuloEstudiante';
import { db } from '../Utils/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { semestreActual } from '../Utils/funciones';

import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from '@mui/lab';


export default function Perfil() {
    const { currentUser } = useAuth();
    console.log(currentUser)

    const [nombre, setNombre] = useState("")
    const [numeroMatricula, setNumeroMatricula] = useState("")

    useEffect(() => {
        if (currentUser.tipoUsuario !== "Profesor") {
            const q = query(collection(db, "estudiantes"), where("correo", "==", currentUser.email));
            getDocs(q).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    if (doc.data().nombre) {
                        setNombre(doc.data().nombre)

                    }
                    if (doc.data().numeroMatricula) {
                        setNumeroMatricula(doc.data().numeroMatricula)

                    }
                });

            }).catch(() => {

            })



        }

    }, [currentUser.tipoUsuario, currentUser.email])



    return (
        <div>
            <NavbarInicio navBarActivo="Perfil" />

            <Stack spacing={2} style={{ marginTop: "50px", marginRight: "50px", marginLeft: "50px" }}>
                <Typography variant="h4" style={{ textAlign: "center" }} color="primary">{currentUser.email}</Typography>
                {currentUser.tipoUsuario !== "Profesor" && (
                    <Stack spacing={2}>
                        <TextField
                            id="outlined-basic"
                            label="Número Matricula"
                            variant="outlined"
                            value={numeroMatricula}

                        />
                        <TextField
                            id="outlined-basic"
                            label="Nombre"
                            variant="outlined"
                            value={nombre}
                        />



                    </Stack>
                )}
                <TextField
                    id="outlined-basic"
                    label="Nueva Contraseña"
                    variant="outlined"
                    type={"password"}
                />

                <TextField
                    id="outlined-basic"
                    label="Confirmación Nueva Contraseña"
                    variant="outlined"
                    type={"password"}
                />

                <LoadingButton
                    variant='contained'
                >
                    Guardar Datos
                </LoadingButton>

            </Stack>

        </div>
    )
}
