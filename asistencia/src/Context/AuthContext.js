import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from "../Utils/firebase"
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

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
                    localStorage.setItem("ID", user.uid)
                    setCurrentUser({ ...user, tipoUsuario: "Estudiante" });

                }
                else {
                    localStorage.setItem("ID", user.uid)
                    setCurrentUser({ ...user, tipoUsuario: "Profesor" });

                }



            }
            else {
                navigate('/login');
            }

        })
    }, [navigate])

    const login = async (email, password) => {
        let correoElectronico = String(email).toLowerCase();
        if (correoElectronico.includes("@alumnos.utalca.cl") || correoElectronico.includes("@utalca.cl")) {

            if (correoElectronico.includes("@alumnos.utalca.cl")) {
                const q = query(collection(db, "estudiantes"), where("correo", "==", email));
                const querySnapshot = await getDocs(q);
                let existe = false;
                querySnapshot.forEach((doc) => {
                    existe = true;
                });

                if (existe) {
                    try {
                        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                        const user = userCredential.user;
                        setCurrentUser({ ...user, tipoUsuario: "Estudiante" });
                        navigate('/');

                    }
                    catch {
                        return signInWithEmailAndPassword(auth, email, password);

                    }

                } else {
                    return "No registrado";
                }

            }
            else {
                return signInWithEmailAndPassword(auth, email, password);

            }


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