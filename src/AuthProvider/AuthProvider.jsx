import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import auth from "../Auth/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

import { io } from "socket.io-client";
const socket = io("https://task-management-app-server-asrd.onrender.com", { transports: ["websocket"] });

// {transports: ["websocket"],}

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
        if (!user?.email) return;

        const fetchTodoData = async () => {
            try {
                const res = await axiosPublic.get(`/todoList/${user.email}`);
                setTodoData(res.data);
            } catch (err) {
                console.error("Failed to fetch todo:", err);
            }
        };

        fetchTodoData();

        const handleRefresh = () => fetchTodoData();

        socket.on("refresh_tasks", handleRefresh);
        return () => {
            socket.off("refresh_tasks", handleRefresh); // Clean up listener
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