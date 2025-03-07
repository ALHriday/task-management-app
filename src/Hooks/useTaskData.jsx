import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const todoData = async () =>{
    const res = await axios.get(`http://localhost:2100/todo`) || {};
    return res.data;
}

const useTaskData = () => {
    
    const {data: tasksData = [], refetch} = useQuery({
        queryKey: ["tasksData"],
        queryFn: todoData,
        enabled: true     
    })
    return [tasksData, refetch];
 
};

export default useTaskData;