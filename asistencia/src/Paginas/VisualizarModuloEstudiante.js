import React,{useState,useEffect} from 'react'
import Stack from '@mui/material/Stack';
import {
    Button, Typography
} from '@mui/material';
import { db } from '../Utils/firebase'
import { doc, onSnapshot, collection, query, where, getDocs,getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from '../Context/AuthContext';


export default function VisualizarModuloEstudiante(props) {
    const {id} = props;
    const { currentUser } = useAuth();
    const [nombreModulo,setNombreModulo] = useState('');
    const [nombreProfesor,setNombreProfesor] = useState('');
    const [horario, setHorario] = useState([]);
    const [idLista, setIdLista] = useState("");
    const ref = doc(db, 'modulos', id);
    const [listaAsistentes,setListaAsistentes] = useState([null])
    const [cargando, setCargando] = useState(false);

    useEffect(()=>{
      getDoc(ref).then((snapshot) => {
        setNombreModulo(snapshot.data().nombre);
        setNombreProfesor(snapshot.data().profesor);
        setHorario(snapshot.data().horario);
      });
    },[])

    useEffect(() => {
        /*async function obtenerListaAsistencia() {
            const docRef = doc(db, "modulos/"+id+"/asistencias/"+idLista);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {

                setListaAsistentes(docSnap.data());
                setCargando(true);
                console.log(listaAsistentes);
            }        
        }*/
        const q = query(collection(db, "modulos/"+id+"/asistencias"), where("Activo", "==", true));
        getDocs(q).then((querySnapshot)=>{
            let idLista = 0
            querySnapshot.forEach((doc) => {
                idLista = doc.id;
            });  
            console.log(idLista)
            setIdLista(idLista)
            const docRef = doc(db, "modulos/"+id+"/asistencias/"+idLista);
            console.log(docRef)
            getDoc(docRef).then((docSnap)=>{
                if (docSnap.exists()) {
                    

                    setListaAsistentes(docSnap.data());
                    setCargando(true);
                    console.log(docSnap.data());
                }   

            })

        });
        
        
            //const docSnap = await getDoc(docRef);
            
             
        //btenerListaAsistencia();
    }, [id])

    /*useEffect(() => {
        async function obtenerIDLista() {
            const q = query(collection(db, "modulos/"+id+"/asistencias"), where("Activo", "==", true));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setIdLista(doc.id);
            });  
        }        
        obtenerIDLista();
    }, [])*/
    
    const marcarAsistencia = async () => {
        let nuevaAsistencia = listaAsistentes;
        console.log("marcarAsistencia",nuevaAsistencia)
        var presente = false;
        nuevaAsistencia.Asistentes.map((nuevo) => {
            if(nuevo === currentUser.email){
                presente = true;
                console.log("Estas presente");
            }
        })
        if (!presente){
            nuevaAsistencia.Asistentes.push(currentUser.email);    
        }
        await updateDoc(doc(db, "modulos/"+id+"/asistencias/"+idLista), nuevaAsistencia);
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
              <Stack key = {index} marginTop="30px" marginBottom="30px" direction="row" spacing={21} sx={{ borderTopColor: '#FFFFFF', borderBottom: '1px solid' }}>
                  <Typography gutterBottom>
                      {h.diaSemana}
                  </Typography>
                  <Typography gutterBottom>
                      {h.bloque}
                  </Typography>
                  <Typography gutterBottom >
                      {h.sala}
                  </Typography>
                    <Button disabled = {!h.activo} onClick = {marcarAsistencia}>
                      Marcar asistencia
                    </Button>
 
                  
              </Stack>
            ))}
        </div>
    )
}
