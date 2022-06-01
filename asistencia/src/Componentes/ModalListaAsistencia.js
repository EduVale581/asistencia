import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material/';
import ListaAsistenciaModulo from './ListaAsistenciaModulo';

export default function ModalListaAsistencia(props) {
    const { open, setOpen, asistencia, idModulo, iniciarAsistencia, estudiantesModulo } = props


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                fullWidth
                maxWidth="md"
                open={open}
            >
                <DialogTitle id="alert-dialog-title">
                    Fecha Asistencia: {asistencia ? (asistencia.Fecha ? asistencia.Fecha : "") : ""}
                </DialogTitle>
                <DialogContent>
                    <ListaAsistenciaModulo
                        estudiantesModulo={estudiantesModulo}
                        idModulo={idModulo}
                        asistencia={asistencia}
                        iniciarAsistencia={iniciarAsistencia}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
