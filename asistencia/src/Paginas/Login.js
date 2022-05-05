import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarInicioSesion from '../Componentes/NavbarInicioSesion';

import { useAuth } from '../Context/AuthContext';

import {
    Alert,
    Grid,
    Stack,
    TextField,
    Card,
    CardMedia,
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';


export default function Login() {

    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = e => setEmail(e.target.value);
    const handlePassword = e => setPassword(e.target.value);

    const ingresar = async (e) => {
        setLoading(true);
        try {
            let elemento = await login(email, password);
            if (elemento === "Correo Inválido") {
                setLoading(false);
                setError('Correo Inválido');
                setTimeout(() => setError(''), 1500);

            }
            else {
                setLoading(false);
                navigate('/');

            }

        } catch (error) {
            setLoading(false);
            setError('Credenciales incorrectas');
            setTimeout(() => setError(''), 1500);
        }
    }


    return (
        <div>
            <NavbarInicioSesion />
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '80vh' }}
            >

                <Grid item>
                    <Stack spacing={2}>
                        <Card style={{ marginBottom: "30%" }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/static/images/Logo.png"
                            />
                        </Card>
                        <TextField
                            fullWidth
                            type={"email"}
                            label="Correo Electronico"
                            variant="outlined"
                            value={email}
                            onChange={handleEmail}
                        />
                        <TextField
                            fullWidth
                            type={"password"}
                            label="Contraseña"
                            variant="outlined"
                            value={password}
                            onChange={handlePassword}
                        />

                        {error !== "" && (<Alert severity='error'>{error}</Alert>)}

                        <LoadingButton
                            loading={loading}
                            fullWidth
                            style={{ marginTop: "40%" }}
                            onClick={ingresar}
                            variant="contained"
                        >
                            Ingresar
                        </LoadingButton>
                    </Stack>
                </Grid>

            </Grid>


        </div>
    )
}