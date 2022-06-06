import React, { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack';
import {
    Button, Typography, Alert, Modal, IconButton, Box, AlertTitle
} from '@mui/material';
import { db } from '../Utils/firebase'
import { doc, collection, query, where, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from '../Context/AuthContext';
import CloseIcon from '@mui/icons-material/Close';




export default function VisualizarModuloEstudiante(props) {
    const { id } = props;
    const { currentUser } = useAuth();
    const [nombreModulo, setNombreModulo] = useState('');
    const [nombreProfesor, setNombreProfesor] = useState('');
    const [horario, setHorario] = useState([]);
    const [idLista, setIdLista] = useState("");
    const ref = doc(db, 'modulos', id);
    const [listaAsistentes, setListaAsistentes] = useState([null])
    const [presente, setPresente] = useState(false);
    const [abrirModal, setAbrirModal] = useState(false);


    const handleCerrarModal = () => {
        setAbrirModal(false);

    }


    useEffect(() => {
        getDoc(ref).then((snapshot) => {
            setNombreModulo(snapshot.data().nombre);
            setNombreProfesor(snapshot.data().profesor);
            setHorario(snapshot.data().horario);
        });
    }, [ref])

    useEffect(() => {

        const q = query(collection(db, "modulos/" + id + "/asistencias"), where("Activo", "==", true));
        getDocs(q).then((querySnapshot) => {
            let idLista = 0
            querySnapshot.forEach((doc) => {
                idLista = doc.id;
            });
            setIdLista(idLista)
            const docRef = doc(db, "modulos/" + id + "/asistencias/" + idLista);
            getDoc(docRef).then((docSnap) => {
                if (docSnap.exists()) {
                    setListaAsistentes(docSnap.data());
                }

            })

        });

    }, [id])



    const marcarAsistencia = async () => {
        setPresente(false);
        let nuevaAsistencia = listaAsistentes;
        var presente = false;
        nuevaAsistencia.Asistentes.map((nuevo) => {
            if (nuevo === currentUser.email) {
                presente = true;
                setPresente(true);
            }
        })
        if (!presente) {
            nuevaAsistencia.Asistentes.push(currentUser.email);
            setPresente(false);
        }
        await updateDoc(doc(db, "modulos/" + id + "/asistencias/" + idLista), nuevaAsistencia);
        setAbrirModal(true);
    }

    return (

        <div>
            <Stack direction="row" spacing={10} borderBottomColor="#A61F38" borderBottom="1px solid">
                <Typography gutterBottom style={{ color: "#A61F38" }}>
                    {nombreModulo}
                </Typography>
                <Typography display="block" gutterBottom >
                    {nombreProfesor}
                </Typography>
            </Stack>

            {horario.map((h, index) => (
                <Stack key={index} marginTop="30px" marginBottom="30px" direction="row" spacing={21} sx={{ borderTopColor: '#FFFFFF', borderBottom: '1px solid' }}>
                    <Typography gutterBottom>
                        {h.diaSemana}
                    </Typography>
                    <Typography gutterBottom>
                        {h.bloque}
                    </Typography>
                    <Typography gutterBottom >
                        {h.sala}
                    </Typography>
                    <Button disabled={!h.activo} onClick={marcarAsistencia}>
                        Marcar asistencia
                    </Button>
                </Stack>
            ))}
            {presente ? (
                <Modal
                    open={abrirModal}
                    
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        height: 70
                    }}>
                    <Box sx={{ width: '100%' }} spacing={2}>
                        <Alert severity='error' style={{ width: '100%' }} action={
                            <IconButton
                                aria-label='close'
                                color='inherit'
                                size='small'
                                onClick={handleCerrarModal}>
                                <CloseIcon fontSize='inherit' />
                            </IconButton>
                        }>
                            <AlertTitle>
                                Error
                            </AlertTitle>
                            Ya has marcado tu asistencia en esta clase!</Alert>
                    </Box>

                </Modal>
            ) : (
                <Modal
                    open={abrirModal}
                    
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        height: 70
                    }}>
                    <Box sx={{ width: '100%' }} spacing={2}>
                        <Alert style={{ width: '100%' }} action={
                            <IconButton
                                aria-label='close'
                                color='inherit'
                                size='small'
                                onClick={handleCerrarModal}>
                                <CloseIcon fontSize='inherit' />
                            </IconButton>
                        }>
                            <AlertTitle>
                                Éxito
                            </AlertTitle>
                            Se ha marcado tu asistencia con éxito</Alert>
                    </Box>

                </Modal>
            )}




        </div>
    )
}
