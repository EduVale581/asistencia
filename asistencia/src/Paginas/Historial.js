import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAuth } from '../Context/AuthContext';
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Typography,
    AccordionDetails,
    AccordionSummary,
    Accordion,
    Autocomplete,
    TextField,
    Box,
    Grid,
    Divider,
    Stack,
    Card,
    CardContent
}
    from '@mui/material';
import NavbarInicio from '../Componentes/NavbarInicio';
import { db } from '../Utils/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";



export default function Historial(){

  const { currentUser } = useAuth();

  const [modulos, setModulos] = useState([])

  useEffect(() => {
    async function obtenerModulos() {

        const q = query(collection(db, "modulos"));
        const querySnapshot = await getDocs(q);
        const modulosAux = [];
        querySnapshot.forEach((doc) => {
          if(currentUser.tipoUsuario === 'Profesor'){
            if(currentUser.uid === doc.data().idProfesor){
              modulosAux.push(doc.data());
            }
          }
          if(currentUser.tipoUsuario === 'Estudiante'){
            doc.data().estudiantes.map((estudiante) => {
              if(estudiante.correo == currentUser.email){
                /* console.log(estudiante.nombre+' está en la lista del modulo '+doc.data().nombre); */
                modulosAux.push(doc.data());
              }else{
                /* console.log('no está en el modulo '+doc.data().nombre) */
              }
              
            })
          }
          
        });
        setModulos(modulosAux);
      }
      obtenerModulos()

  }, [currentUser])

  return(
    <div>
      <NavbarInicio navBarActivo="Modulos" />

      <Stack spacing={2} style={{ marginTop: "50px", marginRight: "50px" }}>

        <Typography component="div" gutterBottom style={{ textAlign: 'center' ,color: "#A61F38", fontSize: "30px" }}>
         Historial de módulos
         </Typography>


         <Grid container spacing = {{xs : 2}} columns = {{xs: 4, sm: 8, md: 12}} marginTop = "5%" justifyContent = "center" >
         {modulos.map((modulo, index) => (
           <Grid item xs={2} sm={4} md={4} key={index}>
               <Card sx={{ height: 300 }}>
                 <CardContent>
                 <Box sx={{height: 250}}>
                   <Typography style= {{textAlign: 'center'}} >
                     {modulo.nombre}
                   </Typography>
                 </Box>


                   <Box sx={{height: 50}}>
                     <Button fullWidth variant = "contained" style= {{display: 'center'}}>
                       Ver historial
                     </Button>
                   </Box>

                 </CardContent>
               </Card>
              </Grid>
             ))}
         </Grid>

       </Stack>


    </div>
  )
}
