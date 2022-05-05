import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function ListaCursos() {
    const [check, setCheck] = useState(false);
    const lista = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <Box sx={{ width: "60%", marginLeft: " 25%" }}>
            <List dense={true}>
                {lista.map((elemento) => {
                    const id = elemento;
                    return (
                        <ListItem key={id} >
                            <ListItemIcon >
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <Stack spacing={0} width="60%" marginLeft="5%">
                                <ListItemText primary="Alumno 1" style={{ color: "#A61F38" }} />
                                <ListItemText primary="alumno@alumno.utalca.cl" color="GrayText" />
                            </Stack>
                            <Checkbox checked={false} sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />
                        </ListItem>
                    )
                })}
            </List>
        </Box >
    )
}