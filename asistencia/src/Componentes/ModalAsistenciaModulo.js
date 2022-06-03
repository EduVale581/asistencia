import React, { useEffect, useState } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {
    Typography,    
    Stack
}
    from '@mui/material';
import NavbarInicio from '../Componentes/NavbarInicio';
import { db } from '../Utils/firebase'
import { useAuth } from '../Context/AuthContext';
import { doc, onSnapshot, collection, query, where, getDocs,getDoc, updateDoc } from "firebase/firestore";


export default function ModalAsistenciaModulo(props){
    const {id} = props;
    const { currentUser } = useAuth();
    const ref = doc(db, 'modulos', id);    
    const [clasesAsistidas,setClasesAsistidas] = useState([]);  
    const [clasesNoAsistidas, setClasesNoAsistidas] = useState([]);
    const [nombreModulo, setNombreModulo] = useState("");
    const [totalAsistido, setTotalAsistido] = useState(0);
    const [totalNoAsistido, setTotalNoAsistido] = useState(0);

    useEffect(() => {        
        const listaAux = [];   
        const listaAux2 = [];     
        const q = query(collection(db, "modulos/"+id+"/asistencias"));
        getDocs(q).then((querySnapshot)=>{            
            querySnapshot.forEach((doc) => {
                if(doc.data().Asistentes.includes(currentUser.email)){
                    listaAux.push(doc.data());   
                }else{
                    listaAux2.push(doc.data());
                }
                                             
            });              
            setClasesAsistidas(listaAux);
            setTotalAsistido(listaAux.length);
            setClasesNoAsistidas(listaAux2);
            setTotalNoAsistido(listaAux2.length);
        });  
    },[])

    useEffect(() => {
        getDoc(ref).then((snapshot) => {
            setNombreModulo(snapshot.data().nombre);
          });
    }, [])

    const getTotal = () => {
        return totalAsistido + totalNoAsistido;
    }

    const getPorcentaje = () => {
        let porcentaje = (totalAsistido/getTotal())*100;        
        return porcentaje;
    }

    return(
       <div>
           <Stack borderBottom="1px solid" sx={{ justifyContent: "center"}}>
               <Typography gutterBottom align= 'justify' style={{display:'flex', color: "#A61F38", fontSize: "25px"} }>
                   Mi Asistencia en {nombreModulo}
               </Typography>
           </Stack>
           {clasesAsistidas.map((c, index) => (                
               <Stack marginTop="20px" marginLeft="20%" marginBottom="10px" key = {index} direction = "row" spacing = {20}>
                   <Typography>
                       {c.Fecha}
                   </Typography>
                   <Typography>
                       {c.Bloque}
                   </Typography>
                   <CheckCircleOutlineIcon sx= {{color: "#008000"}} />
               </Stack>
           ))}
           {clasesNoAsistidas.map((c, index) => (
               <Stack  marginLeft="20%" marginBottom= "10px" key = {index} direction = "row" spacing= {20}>
                   <Typography>
                        {c.Fecha}
                   </Typography>
                   <Typography>
                       {c.Bloque}
                   </Typography>
                   <CancelOutlinedIcon sx={{color: "#FF0000"}}/>
               </Stack>
           ))}
           <Stack direction="row" spacing= {2} marginTop= "20px">
               <Typography>
                   Clases Asistidas = {totalAsistido}
               </Typography>
               <Typography>
                   Clases Faltadas = {totalNoAsistido}
               </Typography>
               <Typography>
                   Clases Totales = {getTotal()}
               </Typography>
               <Typography>
                   Porcentaje asistido = {getPorcentaje()} %
               </Typography>
           </Stack>
       </div>
    )
}