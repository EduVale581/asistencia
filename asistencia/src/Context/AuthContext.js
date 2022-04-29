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
                setCurrentUser(user);

            }
            else {
                navigate('/login');
            }

        })
    }, [navigate])

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
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