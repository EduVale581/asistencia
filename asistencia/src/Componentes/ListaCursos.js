import React from 'react';
import {
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
} from '@mui/material/';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';


export default function ListaCursos(props) {
    const { estudiantes } = props;
    return (
        <List dense={true}>
            {estudiantes && estudiantes.map((elemento, index) => {
                return (
                    <ListItem key={"listaEstudiantes_" + index}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemIcon >
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <Stack spacing={0} width="100%" marginLeft="5%">
                            <ListItemText primary={elemento.nombre} style={{ color: "#A61F38" }} />
                            <ListItemText primary={elemento.correo} color="GrayText" />
                        </Stack>
                    </ListItem>
                )
            })}
        </List>
    )
}