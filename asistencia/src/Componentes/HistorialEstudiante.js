import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Context/AuthContext';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../Utils/firebase';

const HistorialEstudiante = () => {

    const { currentUser } = useAuth();

    


    return (
        <div>
            <h1>
                Lista de Asistencia
                {currentUser.email}
            </h1>
        </div>
    )
}

export default HistorialEstudiante;