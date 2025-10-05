import { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { AuthContext } from "../../AuthProvider/AuthProvider";

// eslint-disable-next-line react/prop-types
export const ButtonEdit = ({ id }) => {
    const { handleUpdateTodo } = useContext(AuthContext);
    return (
        <button onClick={() => handleUpdateTodo(id)} className="px-2 py-1 rounded-sm text-white bg-blue-500 cursor-pointer shadow-2xl text-center"><FaEdit /></button>
    );
};

// eslint-disable-next-line react/prop-types
export const ButtonDelete = ({ id }) => {
    const { handleDeleteTodo } = useContext(AuthContext);
    return (
        <button onClick={() => handleDeleteTodo(id)} className="px-2 py-1 rounded-sm text-white bg-[#f23232d7] cursor-pointer shadow-2xl text-center"><MdDeleteForever /></button>
    );
};


