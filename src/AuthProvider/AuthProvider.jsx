import { createContext, useEffect, useState } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import auth from "../Auth/firebase.config";

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActve] = useState([]);

    const signInWithGoogle = () =>{
        const googleProvider = new GoogleAuthProvider();
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const handleLogOut = () =>{
        return signOut(auth);
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{  
            setUser(currentUser);
            setLoading(false);
        })
        return () => unSubscribe();
    }, [])
    

    const values = {
        active,
        setActve,
        loading,
        user,
        setUser,
        signInWithGoogle,
        handleLogOut
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;