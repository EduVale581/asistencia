import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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



export default function Historial(){
  const lista = [1,2,3,4,5,6];
  return(
    <div>
      <NavbarInicio navBarActivo="Modulos" />

      <Stack spacing={2} style={{ marginTop: "50px", marginRight: "50px" }}>

        <Typography component="div" gutterBottom style={{ textAlign: 'center' ,color: "#A61F38", fontSize: "30px" }}>
         Historial de módulos
         </Typography>


         <Grid container spacing = {{xs : 2}} columns = {{xs: 4, sm: 8, md: 12}} marginTop = "5%" justifyContent = "center" >
         {lista.map((index) => (
           <Grid item xs={2} sm={4} md={4} key={index}>
               <Card sx={{ height: 300 }}>
                 <CardContent>
                 <Box sx={{height: 250}}>
                   <Typography style= {{textAlign: 'center'}} >
                     Modulo
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
