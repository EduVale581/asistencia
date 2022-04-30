import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from "../Utils/firebase"
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

import { useNavigate } from "react-router-dom"

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {

    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.email && String(user.email).includes("@alumnos.utalca.cl")) {
                    setCurrentUser({ ...user, tipoUsuario: "Estudiante" });

                }
                else {
                    setCurrentUser({ ...user, tipoUsuario: "Profesor" });

                }



            }
            else {
                navigate('/login');
            }

        })
    }, [navigate])

    const login = (email, password) => {
        let correoElectronico = String(email).toLowerCase();
        if (correoElectronico.includes("@alumnos.utalca.cl") || correoElectronico.includes("@utalca.cl")) {
            return signInWithEmailAndPassword(auth, email, password);
        }
        else {
            return "Correo Inválido";
        }
    }

    const logout = () => {
        signOut(auth).then(() => {

        }).catch(() => {

        });
    }

    const value = {
        currentUser,
        login,
        logout,
    };
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}