import React, { useContext, useEffect, useState } from "react";
import {auth} from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
// import { setUserProperties } from "firebase/analytics";

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider ({ children }) {
    const [currUser, setCurrUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);       //true means code is trying to load in what is the current login state

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, [])

    async function initializeUser(user) {
        if (user) {         // if user object is valid it means there is a user logged in currently
            setCurrUser({ ...user });
            setUserLoggedIn(true);
        } else {
            setCurrUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const value = {
        currUser,
        userLoggedIn,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}