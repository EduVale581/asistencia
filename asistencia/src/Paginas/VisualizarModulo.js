import React, { useState } from 'react'
import ListaCursos from '../Componentes/ListaCursos'
import NavbarInicio from '../Componentes/NavbarInicio';
import Stack from '@mui/material/Stack';
import {
    Button, Typography, Box } from '@mui/material';
import VisualizarModuloEstudiante from './VisualizarModuloEstudiante';


export default function VisualizarModulo() {
    return (
        <div>
            <NavbarInicio navBarActivo="Módulos" />
            <Box sx={{ flexGrow: 1, marginLeft: "20%", borderBottom: "1px solid", width: "60%", marginTop: "3%" }}>
                <Stack direction="row" spacing={5}>
                    <Typography component="div" gutterBottom style={{ color: "#A61F38", fontSize: "30px" }}>
                        Gestión de proyectos tecnológicos
                    </Typography>
                    <Button style={{marginLeft: "30%"}}>
                        Volver
                    </Button>
                    

                </Stack>
            </Box>
            <ListaCursos />
            
        </div >
    )
}