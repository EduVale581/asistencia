import React,{useState,useEffect} from 'react'
import Stack from '@mui/material/Stack';
import {
    Button, Typography
} from '@mui/material';
import { db } from '../Utils/firebase'
import { doc, onSnapshot, collection, query, where, getDocs,getDoc } from "firebase/firestore";

export default function VisualizarModuloEstudiante(props) {
    const {id} = props;
    const [nombreModulo,setNombreModulo] = useState('');
    const [nombreProfesor,setNombreProfesor] = useState('');
    const [horario, setHorario] = useState([]);
    const deleteRef = doc(db, 'modulos', id);
    useEffect(()=>{
      getDoc(deleteRef).then((snapshot) => {
        setNombreModulo(snapshot.data().nombre);
        setNombreProfesor(snapshot.data().profesor);
        setHorario(snapshot.data().horario);
      });
    },[])


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
              <Stack key = {index} marginTop="30px" marginBottom="30px" direction="row" spacing={10} sx={{ borderTopColor: '#FFFFFF', borderBottom: '1px solid' }}>
                  <Typography gutterBottom>
                      {h.diaSemana}
                  </Typography>
                  <Typography gutterBottom>
                      {h.bloque}
                  </Typography>
                  <Typography gutterBottom >
                      {h.sala}
                  </Typography>
                  <Button >
                      Marcar asistencia
                  </Button>
              </Stack>
            ))}
        </div>
    )
}
