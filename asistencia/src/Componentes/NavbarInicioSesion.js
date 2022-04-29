import React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,

} from '@mui/material/';

export default function NavbarInicioSesion() {
    return (
        <Box>
            <AppBar position="static" style={{ backgroundColor: "#FFFFFF" }}>
                <Toolbar>
                    <Typography color="primary" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ASISTENCIA UTALCA
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}