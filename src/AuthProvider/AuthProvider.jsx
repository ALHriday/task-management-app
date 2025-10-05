import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import auth from "../Auth/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

import { io } from "socket.io-client";
const socket = io("https://todo-app-server-rosy.vercel.app");

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState([]);
    const [createBtn, setCreateBtn] = useState(false);
    const [updateTaskBtn, setUpdateTaskBtn] = useState(false);
    const [todoData, setTodoData] = useState([]);
    const [task, setTask] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [data, setData] = useState([]);

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
        active,
        setActive,
        loading,
        user,
        setUser,
        signInWithGoogle,
        handleLogOut,
        createBtn,
        setCreateBtn,
        todoData,
        setTodoData,
        updateTaskBtn,
        setUpdateTaskBtn,
        task,
        setTask,
        socket,
        isModalOpen,
        openModal,
        closeModal,
        setIsModalOpen,
        isUpdate,
        setIsUpdate,
        data,
        setData,
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