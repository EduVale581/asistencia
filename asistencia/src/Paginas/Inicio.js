import React, { useState } from 'react';
import NavbarInicio from '../Componentes/NavbarInicio';
import { useAuth } from '../Context/AuthContext';
import {
    Grid,
    Card,
    CardContent,
    Box,
    Button,
    Stack,
    Typography,
    Divider
} from '@mui/material/';

import AddIcon from "@mui/icons-material/Add";


export default function Inicio() {

    const { currentUser } = useAuth();

    const [modulos, setModulos] = useState([]);


    return (
        <div>
            <NavbarInicio navBarActivo="Inicio" />

            <Stack spacing={2} style={{ marginTop: "50px", marginRight: "50px" }}>
                <Typography
                    style={{ textAlign: "center" }}
                    variant='h4'
                    color="primary"
                >
                    Módulos Semestre Actual
                </Typography>

                <Divider style={{ marginLeft: "10px", backgroundColor: "#A61F38" }} />
                {currentUser.tipoUsuario && currentUser.tipoUsuario === "Profesor" && (
                    <Grid container style={{ marginLeft: "10px" }}>
                        <Grid item>
                            <Button
                                variant="contained"
                            >
                                <AddIcon /> Agregar Módulo
                            </Button>
                        </Grid>

                    </Grid>

                )}

                <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {Array.from(Array(6)).map((_, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <Card sx={{ height: 300 }}>
                                <CardContent>
                                    <Box sx={{ height: 230 }}>

                                    </Box>

                                    <Box sx={{ height: 90 }}>
                                        <Button
                                            fullWidth
                                            variant='contained'

                                        >
                                            Historial de Asistencia

                                        </Button>

                                    </Box>

                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

            </Stack>


        </div>
    )
}