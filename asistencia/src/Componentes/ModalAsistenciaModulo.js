import React, { useEffect, useState } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {
    Typography,    
    Stack
}
    from '@mui/material';
import { db } from '../Utils/firebase'
import { useAuth } from '../Context/AuthContext';
import { doc, collection, query,  getDocs,getDoc } from "firebase/firestore";


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

    const getColor = () => {
        if(getPorcentaje() >= 70){
            return '#008000' 
        }else{
            return '#FF0000'
        }
    }

    const getPorcentaje = () => {
        let porcentaje = (totalAsistido/getTotal())*100;  
        if(!isNaN(porcentaje)){
            return Math.round(porcentaje);
        }else{
            return 0;
        }  
        
    }

    return(
       <div>
           <Stack borderBottom="1px solid" sx={{ justifyContent: "center"}}>
               <Typography gutterBottom align= 'justify' style={{display:'flex', color: "#A61F38", fontSize: "25px"} }>
                   Mi Asistencia en {nombreModulo}
               </Typography>
           </Stack>
           <Stack marginTop="20px" marginLeft="15%" marginBottom="10px"  direction = "row" spacing = {20}>
                   <Typography style={{fontSize: "18px", fontWeight: "bold"}}>
                       Fecha
                   </Typography>
                   <Typography style={{fontSize: "18px", fontWeight: "bold"}}>
                       Bloque
                   </Typography>
                   <Typography style={{fontSize: "18px", fontWeight: "bold"}}   >
                       Asistencia
                   </Typography>    
               </Stack>
           {clasesAsistidas.map((c, index) => (                
               <Stack width= "65%" 
               borderBottom= "1px solid" 
               marginTop="20px" 
               marginLeft="15%" 
               marginBottom="25px" 
               key = {index} 
               direction = "row" 
               spacing = {20}>
                   <Typography>
                       {c.Fecha}
                   </Typography>
                   <Typography  marginRight="5%">
                        {c.Bloque}
                   </Typography>
                   <CheckCircleOutlineIcon sx= {{color: "#008000"}} />
               </Stack>
           ))}
           {clasesNoAsistidas.map((c, index) => (
               <Stack width= "65%"
                borderBottom= "1px solid"  
                marginLeft="15%" 
                marginBottom= "25px"
                 key = {index}
                  direction = "row" 
                  spacing= {20} >
                   <Typography >
                        {c.Fecha}
                   </Typography>
                   <Typography>
                       {c.Bloque}
                   </Typography>
                   <CancelOutlinedIcon sx={{color: "#FF0000"}}/>
               </Stack>
           ))}
           <Stack direction="row" spacing= {5} marginTop= "60px" style={{textAlign: 'center'}} borderTop="1px solid"     >
               <Typography>
                    Clases Asistidas = {totalAsistido}
               </Typography>
               <Typography>
                   Clases Faltadas = {totalNoAsistido}
               </Typography>
               <Typography>
                   Clases Totales = {getTotal()}
               </Typography>
               <Typography color={getColor()}>
                   Porcentaje asistido = {getPorcentaje()} %
               </Typography>
           </Stack>
            
       </div>
    )
}