import React, { useState } from 'react'
import Stack from '@mui/material/Stack';
import {
    Button, Typography
} from '@mui/material';

export default function VisualizarModuloEstudiante() {
    return (

        <div>
            <Stack direction="row" spacing={10} borderBottomColor="#A61F38" borderBottom="1px solid">
                <Typography gutterBottom style={{ color: "#A61F38" }}>
                    Gestión de proyectos tecnológicos
                </Typography>
                <Typography display="block" gutterBottom >
                    Luis Silvestre
                </Typography>
            </Stack>

            <Stack marginTop="30px" marginBottom="30px" direction="row" spacing={10} sx={{ borderTopColor: '#FFFFFF', borderBottom: '1px solid' }}>
                <Typography gutterBottom>
                    Lunes
                </Typography>
                <Typography gutterBottom>
                    10/04/2022
                </Typography>
                <Typography gutterBottom>
                    Bloque 10
                </Typography>
                <Typography gutterBottom >
                    19:00 hrs - 20:00 hrs
                </Typography>
                <Button >
                    Marcar asistencia
                </Button>
            </Stack>

            <Stack marginTop="30px" marginBottom="30px" direction="row" spacing={10} sx={{ borderTopColor: '#FFFFFF', borderBottom: '1px solid' }}>
                <Typography gutterBottom >
                    Lunes
                </Typography>
                <Typography gutterBottom >
                    10/04/2022
                </Typography>
                <Typography gutterBottom>
                    Bloque 10
                </Typography>
                <Typography gutterBottom >
                    19:00 hrs - 20:00 hrs
                </Typography>
                <Button >
                    Marcar asistencia
                </Button>
            </Stack>
        </div>


    )
}