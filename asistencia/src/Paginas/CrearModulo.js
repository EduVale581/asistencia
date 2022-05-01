import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { 
        Button, Checkbox, FormControlLabel,
        FormGroup, Typography, AccordionDetails, AccordionSummary,
        Accordion, Autocomplete, TextField, Box, Grid
        } 
from '@mui/material';

const CrearModulo = () => {

    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const bloques = [
        'Bloque 1 / 8:30 - 9:30',
        'Bloque 2 / 9:40 - 10:40',
        'Bloque 3 / - 11:50',
        'Bloque 4 / 12:00 - 13:00',
        'Bloque 5 / 13:10 - 14:10',
        'Bloque 6 / 14:20 - 15:20',
        'Bloque 7 / 15:30 - 16:30',
        'Bloque 8 / 16:40 - 17:40',
        'Bloque 9 / 17:50 - 18:50',
        'Bloque 10 / 19:00 - 20:00',
        'Bloque 11 / 20:10 - 21:10'
    ]
    const carrerasUtal = [
        {label: 'Ingeniería Civil en Computación - Campus Los Niches'},
        {label: 'Ingeniería Civil Mecánica - Campus Los Niches'},
        {label: 'Ingeniería Civil en Minas - Campus Los Niches'},
        {label: 'Ingeniería Civil en Mecatrónica - Campus Los Niches'},
        {label: 'Ingeniería Civil Industrial - Campus Los Niches'},
        {label: 'Ingeniería Civil Eléctrica - Campus Los Niches'},
        {label: 'Ingeniería Civil en Obras Civiles - Campus Los Niches'},
    ]

    return (
        <>
            <div>CrearModulo</div>
            <br/>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <TextField label="Nombre módulo" variant='outlined' fullWidth/>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField label="Codigo módulo" variant='outlined' fullWidth/>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField label="Fecha de inicio" variant='outlined' fullWidth/>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField label="Fecha de término" variant='outlined' fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={carrerasUtal}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Carrera" />}
                            fullWidth
                            />
                    </Grid>
                    <Grid item xs={10}>
                        {
                            dias.map((dia, index)=>(
                                <Accordion key={index}>

                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        
                                        >
                                        <Typography>{dia}</Typography>
                                    </AccordionSummary>
                                    
                                    <AccordionDetails>
                                        {bloques.map((bloque, index)=>(
                                            <FormGroup key={index}>
                                                <FormControlLabel control={<Checkbox />} label={bloque} />
                                            </FormGroup>
                                        ))}
                                    </AccordionDetails>

                                </Accordion>
                            ))
                        }
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default CrearModulo