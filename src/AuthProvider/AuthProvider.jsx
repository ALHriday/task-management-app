import { createContext, useEffect, useState } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import auth from "../Auth/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";
// import useTaskData from "../Hooks/useTaskData";
// import { io } from "socket.io-client";
// const socket = io("http://localhost:2100");

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActve] = useState([]);
    const [createBtn, setCreateBtn] = useState(false);
    const [updateTaskBtn, setUpdateTaskBtn] = useState(false);
    const [todoData, setTodoData] = useState([]);
    const [task, setTask] = useState([]);

    const fetchTodoData = async () => {
        const res = await axiosPublic(`/todoList/${user?.email}`);
        setTodoData(res.data);
      };

    const axiosPublic = useAxiosPublic(); 

    
    
    // useEffect(() => {
    //     // Listen for incoming messages
    //     socket.on("receive_message", (data) => {
    //         console.log(data);
            
    //       setTodoData((prev) => [...prev, data]);
    //     });
    
    //     return () => {
    //       socket.off("receive_message"); // Clean up listener
    //     };
    //   }, []);


    const signInWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const handleLogOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => unSubscribe();
    }, [])

    useEffect(() => {
        axiosPublic.get(`/todoList/${user?.email}`).then(res => {
            setTodoData(res.data);
        })
        setLoading(false);
    }, [axiosPublic, user])


    const values = {
        active,
        setActve,
        loading,
        user,
        setUser,
        signInWithGoogle,
        handleLogOut,
        createBtn,
        setCreateBtn,
        todoData,
        setTodoData,
        fetchTodoData,
        updateTaskBtn, 
        setUpdateTaskBtn,
        task, 
        setTask
        // handleUpdateCategory
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;