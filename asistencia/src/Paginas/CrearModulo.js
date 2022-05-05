import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Button, Checkbox, FormControlLabel,
    FormGroup, Typography, AccordionDetails, AccordionSummary,
    Accordion, Autocomplete, TextField, Box, Grid, Divider, Stack
}
    from '@mui/material';

import { db } from '../Utils/firebase'
import { collection, addDoc } from "firebase/firestore";


const CrearModulo = () => {

    const [nombreModulo, setNombreModulo] = useState('');
    const [codigoModulo, setCodigoModulo] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaTermino, setFechaTermino] = useState('');
    const [carrera, setCarrera] = useState('');
    const [horario, setHorario] = useState([]);

    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const bloques = [
        'Bloque 1 / 8:30 - 9:30',
        'Bloque 2 / 9:40 - 10:40',
        'Bloque 3 / 10:50 - 11:50',
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
        'Ingeniería Civil en Computación - Campus Los Niches',
        'Ingeniería Civil Mecánica - Campus Los Niches',
        'Ingeniería Civil en Minas - Campus Los Niches',
        'Ingeniería Civil en Mecatrónica - Campus Los Niches',
        'Ingeniería Civil Industrial - Campus Los Niches',
        'Ingeniería Civil Eléctrica - Campus Los Niches',
        'Ingeniería Civil en Obras Civiles - Campus Los Niches',
    ]

    const handleSubmit = async () => {
        try {
            /* const data = await db.collection('modulos').get();
            console.log(data.docs); */
            const dataBase = db;
            const docRef = await addDoc(collection(dataBase, "modulos"), {
                nombre: nombreModulo,
                codigo: codigoModulo,
                fechaInicio: fechaInicio,
                fechaTermino: fechaTermino,
                carrera: carrera,
                horario: horario
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleReset = () => {
        setNombreModulo('');
        setCodigoModulo('');
        setFechaInicio('');
        setFechaTermino('');
        setCarrera('');
        setHorario([]);
    }

    const handleChecBox = (dia, bloque) => {
        let bloqueDefinido = dia + ' ' + bloque;
        if (horario.includes(bloqueDefinido)) {
            var pos = horario.indexOf(bloqueDefinido);
            horario.splice(pos, 1);
        } else {
            setHorario([...horario, bloqueDefinido]);
        }
    }

    return (
        <>
            <Stack spacing={2} style={{ marginTop: "50px", marginRight: "50px" }}>
                <Typography
                    style={{ textAlign: "center", color: "#A61F35" }}
                    variant='h4'
                >
                    Crear Módulo
                </Typography>
                <Divider style={{ marginLeft: "10px", backgroundColor: "#A61F38" }} />
                <Box sx={{ flexGrow: 1 }} style={{ margin: "50px", padding: '10px', backgroundColor: "#E5E5E5" }}>

                    <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}  >
                        <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ margin: '10px' }}>

                            <Grid item xs={8}>
                                <TextField
                                    label={"Nombre módulo"}
                                    variant='outlined'
                                    fullWidth
                                    value={nombreModulo}
                                    onChange={(e) => { setNombreModulo(e.target.value) }}
                                />
                            </Grid>

                            <Grid item xs={2.4}>
                                <TextField
                                    label="Codigo módulo"
                                    variant='outlined'
                                    fullWidth
                                    value={codigoModulo}
                                    onChange={(e) => { setCodigoModulo(e.target.value) }}
                                />
                            </Grid>

                            <Grid item xs={3.5}>
                                <TextField
                                    label="Fecha de inicio"
                                    variant='outlined'
                                    helperText='Fomato: dd/mm/aaaa'
                                    fullWidth
                                    value={fechaInicio}
                                    onChange={(e) => { setFechaInicio(e.target.value) }}
                                />
                            </Grid>

                            <Grid item xs={3.5}>
                                <TextField
                                    label="Fecha de término"
                                    variant='outlined'
                                    helperText='Fomato: dd/mm/aaaa'
                                    fullWidth
                                    value={fechaTermino}
                                    onChange={(e) => { setFechaTermino(e.target.value) }}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={carrerasUtal}
                                    renderInput={(params) => <TextField {...params} label="Carrera" />}
                                    fullWidth
                                    onInputChange={(e, inputValue) => { setCarrera(inputValue) }}
                                />
                            </Grid>

                        </Grid>
                        <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ margin: '10px' }}>
                            {
                                dias.map((dia, index) => (
                                    <Grid item xs={2} sm={4} md={4} key={index}>

                                        <Accordion key={index} style={{ margin: '10px' }}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"

                                            >
                                                <Typography>{dia}</Typography>
                                            </AccordionSummary>

                                            <AccordionDetails>
                                                {bloques.map((bloque, index) => (
                                                    <FormGroup key={index}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    onChange={() => { handleChecBox(dia, bloque) }}
                                                                />}
                                                            label={bloque}
                                                        />
                                                    </FormGroup>
                                                ))}
                                            </AccordionDetails>

                                        </Accordion>
                                    </Grid>

                                ))
                            }
                        </Grid>
                    </Grid>
                    <Box sx={{ '& button': { m: 1 } }} style={{ margin: '10px' }}>
                        <Button variant='contained' onClick={handleSubmit}>Añadir módulo</Button>
                        <Button variant="contained" onClick={handleReset}>Vaciar campos</Button>
                        <Button variant="contained">Cancelar</Button>
                    </Box>
                </Box>
            </Stack>
        </>
    )
}

export default CrearModulo;