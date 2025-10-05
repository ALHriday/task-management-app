import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import auth from "../Auth/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

import { io } from "socket.io-client";
const socket = io("http://localhost:2100");

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [todoData, setTodoData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const axiosPublic = useAxiosPublic();


    useEffect(() => {
        const fetchTodoData = async () => {
            const res = await axiosPublic.get(`/todoList/${user?.email}`);
            setTodoData(res.data);
        };
        fetchTodoData();
        // Listen for incoming messages
        socket.on("refresh_tasks", fetchTodoData);
        return () => {
            socket.off("refresh_tasks"); // Clean up listener
        };
    }, [axiosPublic, user?.email]);


    const handleDeleteTodo = (id) => {
        axiosPublic.delete(`/todo/${id}`).then(res => {
            if (res.data.deletedCount > 0) {
                socket.emit('task_updated');
            }
        })
    }

    const handleUpdateTodo = () => {
        setIsUpdate(true);
    }


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


    const values = {
        loading,
        user,
        setUser,
        signInWithGoogle,
        handleLogOut,
        todoData,
        setTodoData,
        socket,
        isModalOpen,
        openModal,
        closeModal,
        setIsModalOpen,
        isUpdate,
        setIsUpdate,
        handleDeleteTodo,
        handleUpdateTodo,
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;