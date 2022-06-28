import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Skeleton,
    IconButton
} from '@mui/material/';
import { db } from "../Utils/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye"
import ModalListaAsistencia from './ModalListaAsistencia';
export default function TablaAsistenciaModulo(props) {
    
    const { idModulo, iniciarAsistencia, estudiantesModulo } = props;

    const [asistencia, setAsistencias] = useState([])
    const [cargandoDatos, setCargandoDatos] = useState(false)
    const [mostrarAsistenciaModulo, setMostrarAsistenciaModulo] = useState(false)
    const [asistenciaSeleccionada, setAsistenciaSeleccionada] = useState(null)


    const q = query(collection(db, "modulos/" + idModulo + "/asistencias"));

    useEffect(() => {
        onSnapshot(q, (querySnapshot) => {
            const asistenciasAux = []
            querySnapshot.forEach((doc) => {
                asistenciasAux.push({ id: doc.id, ...doc.data() })
            });
            setAsistencias(asistenciasAux)
            setCargandoDatos(true)
        });

    }, [q])




    function sortFunction(a, b) {
        const fechaA = String(a.Fecha).split("/");
        const fechaB = String(b.Fecha).split("/");
        var dateA = new Date(fechaA[2] + "/" + fechaA[1] + "" / +fechaA[0]).getTime();
        var dateB = new Date(fechaB[2] + "/" + fechaB[1] + "" / +fechaB[0]).getTime();
        return dateA > dateB ? 1 : -1;
    };

    return (
        <>
            {
                !cargandoDatos ? (
                    <Skeleton variant="rectangular" width={210} height={118} />

                ) : (
                    <TableContainer component={Paper}>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell align="right">Estado</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {asistencia.sort(sortFunction).map((row, idx) => (
                                    <TableRow
                                        key={"asistencia_" + idx}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.Fecha}
                                        </TableCell>
                                        <TableCell align="right">{row.Activo ? "Activo" : "Inactivo"}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                onClick={() => {
                                                    setAsistenciaSeleccionada(row)
                                                    setMostrarAsistenciaModulo(true);
                                                }}
                                            >
                                                <RemoveRedEye />
                                            </IconButton>

                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table >
                    </TableContainer >

                )
            }

            {mostrarAsistenciaModulo && (
                <ModalListaAsistencia
                    open={mostrarAsistenciaModulo}
                    setOpen={setMostrarAsistenciaModulo}
                    asistencia={asistenciaSeleccionada}
                    idModulo={idModulo}
                    iniciarAsistencia={iniciarAsistencia}
                    estudiantesModulo={estudiantesModulo}
                />


            )}


        </>


    );
}