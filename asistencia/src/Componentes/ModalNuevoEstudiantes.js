import React, { useState } from 'react';
import {
    Button,
    FormControl,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Grid,
    IconButton
} from '@mui/material/';
import { FileUploader } from "react-drag-drop-files";
import DeleteIcon from '@mui/icons-material/Delete';
import * as XLSX from "xlsx";
import { db } from '../Utils/firebase';
import { collection, addDoc, query, where, getDocs, setDoc, doc, getDoc } from "firebase/firestore";
import { LoadingButton } from '@mui/lab';
const fileTypes = ["XLSX"];

export default function ModalNuevoEstudiantes(props) {
    const { open, setOpen, documento, id, setEstudiantes, setModuloObtenido } = props

    const [tipoAgregar, setTipoAgregar] = useState('Manual');

    const [cargando, setCargando] = useState(false);

    const [archivo, setArchivo] = useState(null);

    const [elementosCopiados, setElementosCopiados] = useState(0);
    const [elementosNOCopiados, setElementosNOCopiados] = useState(0);

    const [nombreCompletoAlumno, setNombreCompletoAlumno] = useState("");
    const [correoAlumno, setCorreoAlumno] = useState("");
    const [numeroMatricula, setNumeroMatricula] = useState("");

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeTipoAgregar = (event) => {
        setTipoAgregar(event.target.value);
    };

    const handleChangeNumeroMatricula = (event) => {
        setNumeroMatricula(event.target.value);
    };

    const handleChangeCorreoAlumno = (event) => {
        setCorreoAlumno(event.target.value);
    };

    const handleChangeNombreAlumno = (event) => {
        setNombreCompletoAlumno(event.target.value);
    };

    const handleChangeArchivo = (file) => {
      console.log(file);
      if (file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
        setArchivo(file);
      }





    };

    const descargarPlantilla = () => {
      let worksheet = XLSX.utils.aoa_to_sheet([['Nombre',	'Apellido(s)', 'Dirección de correo']]);
      let new_workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(new_workbook, worksheet, "Sheet1");
      XLSX.writeFile(new_workbook, "PlantillaAlumnos.xlsx");

    };

    const agregarEstudiante = async () => {
        if (tipoAgregar === "Manual") {
            setCargando(true);
            const q = query(collection(db, "estudiantes"), where("correo", "==", correoAlumno));
            const querySnapshot = await getDocs(q);
            let existe = false;
            querySnapshot.forEach((doc) => {
                existe = true;
            });
            if (existe) {
                let estudiantes = []
                if (documento.estudiantes) {
                    estudiantes = documento.estudiantes
                    let existeAlumnoModulo = estudiantes.filter(e => e.correo === correoAlumno)[0];
                    if (existeAlumnoModulo) {

                    }
                    else {
                        estudiantes.push({ nombre: String(nombreCompletoAlumno).toUpperCase(), correo: correoAlumno })
                    }
                    documento.estudiantes = estudiantes;

                    setDoc(doc(db, "modulos", id), documento).then(async () => {
                        const docRef = doc(db, "modulos", id);
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            if (docSnap.data().estudiantes) {
                                setEstudiantes(docSnap.data().estudiantes);
                            }
                            else {
                                setEstudiantes([]);

                            }
                            setModuloObtenido(docSnap.data())

                        } else {
                        }
                        setCargando(false);
                        setOpen(false);
                    });



                }
                else {
                    estudiantes.push({ nombre: String(nombreCompletoAlumno).toUpperCase(), correo: correoAlumno })
                    documento.estudiantes = estudiantes;
                    setDoc(doc(db, "modulos", id), documento).then(async () => {
                        const docRef = doc(db, "modulos", id);
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            if (docSnap.data().estudiantes) {
                                setEstudiantes(docSnap.data().estudiantes);
                            }
                            else {
                                setEstudiantes([]);

                            }
                            setModuloObtenido(docSnap.data())

                        } else {
                        }
                        setCargando(false);
                        setOpen(false);
                    });

                }

            }
            else {
                addDoc(collection(db, "estudiantes"), {
                    correo: correoAlumno,
                    nombre: String(nombreCompletoAlumno).toUpperCase(),
                    numeroMatricula: numeroMatricula
                }).then(() => {
                    let estudiantes = []
                    if (documento.estudiantes) {
                        estudiantes = documento.estudiantes
                        let existeAlumnoModulo = estudiantes.filter(e => e.correo === correoAlumno)[0];
                        if (existeAlumnoModulo) {

                        }
                        else {
                            estudiantes.push({ nombre: String(nombreCompletoAlumno).toUpperCase(), correo: correoAlumno })
                        }
                        documento.estudiantes = estudiantes;

                        setDoc(doc(db, "modulos", id), documento).then(async () => {
                            const docRef = doc(db, "modulos", id);
                            const docSnap = await getDoc(docRef);

                            if (docSnap.exists()) {
                                if (docSnap.data().estudiantes) {
                                    setEstudiantes(docSnap.data().estudiantes);
                                }
                                else {
                                    setEstudiantes([]);

                                }
                                setModuloObtenido(docSnap.data())

                            } else {
                            }
                            setCargando(false);
                            setOpen(false);
                        });



                    }
                    else {
                        estudiantes.push({ nombre: String(nombreCompletoAlumno).toUpperCase(), correo: correoAlumno })
                        documento.estudiantes = estudiantes;
                        setDoc(doc(db, "modulos", id), documento).then(async () => {
                            const docRef = doc(db, "modulos", id);
                            const docSnap = await getDoc(docRef);

                            if (docSnap.exists()) {
                                if (docSnap.data().estudiantes) {
                                    setEstudiantes(docSnap.data().estudiantes);
                                }
                                else {
                                    setEstudiantes([]);

                                }
                                setModuloObtenido(docSnap.data())

                            } else {
                            }
                            setCargando(false);
                            setOpen(false);
                        });

                    }

                })

            }


        }
        else{
          try {
            setCargando(true);
            let file = archivo;
            let reader = new FileReader();

            reader.onload = async function (e) {
                let data = new Uint8Array(e.target.result);
                let workbook = XLSX.read(data, { type: "array" });
                let worksheet = workbook.Sheets[workbook.SheetNames[0]];
                let sheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                sheet.forEach(async (item, i) => {
                  if (i===0){

                  }
                  else{
                    console.log(Object.keys(item).length);
                    if (typeof item === 'object' && Object.keys(item).length === 3 && item[0] !==""){
                      let correoAlumno = item[2];
                      let nombreCompletoAlumno = String(item[0]).toUpperCase() + " " + String(item[1]).toUpperCase();
                      const q = query(collection(db, "estudiantes"), where("correo", "==", correoAlumno));
                      const querySnapshot = await getDocs(q);
                      let existe = false;
                      querySnapshot.forEach((doc) => {
                          existe = true;
                      });
                      if (existe) {
                        let estudiantes = []
                        if (documento.estudiantes) {
                            estudiantes = documento.estudiantes
                            let existeAlumnoModulo = estudiantes.filter(e => e.correo === correoAlumno)[0];
                            if (existeAlumnoModulo) {

                            }
                            else {
                                estudiantes.push({ nombre: String(nombreCompletoAlumno).toUpperCase(), correo: correoAlumno })
                            }
                            documento.estudiantes = estudiantes;

                            setDoc(doc(db, "modulos", id), documento).then(async () => {
                                const docRef = doc(db, "modulos", id);
                                const docSnap = await getDoc(docRef);

                                if (docSnap.exists()) {
                                    if (docSnap.data().estudiantes) {
                                        setEstudiantes(docSnap.data().estudiantes);
                                    }
                                    else {
                                        setEstudiantes([]);

                                    }
                                    setModuloObtenido(docSnap.data())

                                } else {
                                }
                            });



                        }
                        else {
                            estudiantes.push({ nombre: String(nombreCompletoAlumno).toUpperCase(), correo: correoAlumno })
                            documento.estudiantes = estudiantes;
                            setDoc(doc(db, "modulos", id), documento).then(async () => {
                                const docRef = doc(db, "modulos", id);
                                const docSnap = await getDoc(docRef);

                                if (docSnap.exists()) {
                                    if (docSnap.data().estudiantes) {
                                        setEstudiantes(docSnap.data().estudiantes);
                                    }
                                    else {
                                        setEstudiantes([]);

                                    }
                                    setModuloObtenido(docSnap.data())

                                } else {
                                }
                            });

                        }

                    }
                    else {
                        addDoc(collection(db, "estudiantes"), {
                            correo: correoAlumno,
                            nombre: String(nombreCompletoAlumno).toUpperCase(),
                            numeroMatricula: numeroMatricula
                        }).then(() => {
                            let estudiantes = []
                            if (documento.estudiantes) {
                                estudiantes = documento.estudiantes
                                let existeAlumnoModulo = estudiantes.filter(e => e.correo === correoAlumno)[0];
                                if (existeAlumnoModulo) {

                                }
                                else {
                                    estudiantes.push({ nombre: String(nombreCompletoAlumno).toUpperCase(), correo: correoAlumno })
                                }
                                documento.estudiantes = estudiantes;

                                setDoc(doc(db, "modulos", id), documento).then(async () => {
                                    const docRef = doc(db, "modulos", id);
                                    const docSnap = await getDoc(docRef);

                                    if (docSnap.exists()) {
                                        if (docSnap.data().estudiantes) {
                                            setEstudiantes(docSnap.data().estudiantes);
                                        }
                                        else {
                                            setEstudiantes([]);

                                        }
                                        setModuloObtenido(docSnap.data())

                                    } else {
                                    }
                                });



                            }
                            else {
                                estudiantes.push({ nombre: String(nombreCompletoAlumno).toUpperCase(), correo: correoAlumno })
                                documento.estudiantes = estudiantes;
                                setDoc(doc(db, "modulos", id), documento).then(async () => {
                                    const docRef = doc(db, "modulos", id);
                                    const docSnap = await getDoc(docRef);

                                    if (docSnap.exists()) {
                                        if (docSnap.data().estudiantes) {
                                            setEstudiantes(docSnap.data().estudiantes);
                                        }
                                        else {
                                            setEstudiantes([]);

                                        }
                                        setModuloObtenido(docSnap.data())

                                    } else {
                                    }
                                });

                            }

                        })

                    }



                  }


                }


              });
            }.bind(this);
            reader.readAsArrayBuffer(file);
            setCargando(false);
            setOpen(false);
          } catch (exception) {
            setCargando(false);
          }

        }
    }

    return (
        <div>
            <Dialog
                fullWidth
                maxWidth="md"
                open={open}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Agregar Estudiantes"}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={tipoAgregar}
                                onChange={handleChangeTipoAgregar}
                            >
                                <FormControlLabel value="Manual" control={<Radio />} label="Manual" />
                                <FormControlLabel value="Archivo" control={<Radio />} label="Archivo" />
                            </RadioGroup>
                        </FormControl>

                        {tipoAgregar === "Manual" ? (
                            <>
                                <TextField
                                    label="Número Matricula Estudiante"
                                    variant="outlined"
                                    value={numeroMatricula}
                                    onChange={handleChangeNumeroMatricula}

                                />
                                <TextField
                                    label="Nombre Completo Estudiante"
                                    variant="outlined"
                                    value={nombreCompletoAlumno}
                                    onChange={handleChangeNombreAlumno}
                                />
                                <TextField
                                    type={"email"}
                                    label="Correo Estudiante"
                                    variant="outlined"
                                    value={correoAlumno}
                                    onChange={handleChangeCorreoAlumno}
                                />

                            </>
                        ) : (
                            <>
                                <Button onClick={descargarPlantilla} variant="contained" autoFocus>
                                    Descargar Plantilla
                                </Button>

                                <FileUploader
                                    handleChange={handleChangeArchivo}
                                    name="file"
                                    types={fileTypes}
                                    label="Cargue o suelte un archivo aquí"
                                    hoverTitle="Soltar aquí"
                                />

                                <Grid
                                    container
                                >
                                    <Grid item xs={archivo ? 10 : 12} md={archivo ? 10 : 12}>
                                        <p>{archivo ? `Archivo: ${archivo.name}` : "Aún no se han subido archivos"}</p>

                                    </Grid>
                                    {archivo && (
                                        <Grid item xs={2} md={2}>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => {
                                                    setArchivo(null)
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>


                                        </Grid>
                                    )
                                    }


                                </Grid>
                            </>
                        )}

                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                    <LoadingButton
                        loading={cargando}
                        onClick={agregarEstudiante}
                        variant="contained"
                        autoFocus
                    >
                        Agregar
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}
