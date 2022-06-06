import React, { useState } from 'react';
import NavbarInicio from '../Componentes/NavbarInicio';
import { useAuth } from '../Context/AuthContext';
import {
    Stack,
    Alert,
    Typography,
    FormControl,
    InputLabel,
    OutlinedInput,
    IconButton,
    InputAdornment
} from '@mui/material/';
import { auth } from '../Utils/firebase';

import { updatePassword } from "firebase/auth";
import { LoadingButton } from '@mui/lab';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export default function Perfil() {
    const { currentUser } = useAuth();

    const [contrasena, setContrasena] = useState("")
    const [verificacionContrasena, setVerificacionContrasena] = useState("")
    const [mostrarContrasena, setMostrarContrasena] = useState(false)
    const [cargando, setCargando] = useState(false);
    const [alerta, setAlerta] = useState(false);
    const [colorAlerta, setColorAlerta] = useState("success");
    const [mensajeAlerta, setMensajeAlerta] = useState("");

    const handleChangeContrasena = (e) => {
        setContrasena(e.target.value)
    }

    const handleChangeVerificacionContrasena = (e) => {
        setVerificacionContrasena(e.target.value)
    }

    const handleClickShowPassword = () => {
        setMostrarContrasena(!mostrarContrasena);
    };

    const guardarDatos = () => {
        setCargando(true)
        setMensajeAlerta("");
        setColorAlerta("success");
        setAlerta(false);
        if (contrasena === verificacionContrasena) {
            const user = auth.currentUser;

            updatePassword(user, contrasena).then(() => {
                setMensajeAlerta("Contraseña actualizada con éxito");
                setColorAlerta("success");
                setCargando(false)
                setTimeout(setAlerta(true), 3000);
            }).catch((error) => {
                setMensajeAlerta("Ha ocurrido un error al actualizar la contraseña");
                setColorAlerta("error");
                setAlerta(true);
                setCargando(false)
            });

        }
        else {
            setMensajeAlerta("Las contraseñas no coinciden");
            setColorAlerta("error");
            setAlerta(true);
            setCargando(true)

        }

    };



    return (
        <div>
            <NavbarInicio navBarActivo="Perfil" />

            <Stack spacing={2} style={{ marginTop: "50px", marginRight: "50px", marginLeft: "50px" }}>
                <Typography variant="h4" style={{ textAlign: "center" }} color="primary">{currentUser.email}</Typography>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Nueva Contraseña</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={mostrarContrasena ? 'text' : 'password'}
                        value={contrasena}
                        onChange={handleChangeContrasena}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {mostrarContrasena ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Nueva Contraseña"
                    />
                </FormControl>

                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password2">Confirmación Nueva Contraseñaa</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password2"
                        type={mostrarContrasena ? 'text' : 'password'}
                        value={verificacionContrasena}
                        onChange={handleChangeVerificacionContrasena}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {mostrarContrasena ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Confirmación Nueva Contraseña"
                    />
                </FormControl>

                {
                    alerta && (
                        <Alert severity={colorAlerta}>{mensajeAlerta}</Alert>

                    )

                }

                <LoadingButton
                    loading={cargando}
                    variant='contained'
                    onClick={guardarDatos}
                >
                    Guardar Datos
                </LoadingButton>

            </Stack>

        </div>
    )
}
