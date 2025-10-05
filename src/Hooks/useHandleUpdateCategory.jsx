import { useContext } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../AuthProvider/AuthProvider";

const useHandleUpdateCategory = () => {
    const { socket } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const handleUpdateCategory = (id, categoryName) => {
        const data = { category: categoryName }
        axiosPublic.put(`/todo/${id}`, data).then(res => {
            if (res.data.modifiedCount > 0) {
                socket.emit('task_updated');
                return;
            }
        })
    }
    return { handleUpdateCategory };
};

export default useHandleUpdateCategory;