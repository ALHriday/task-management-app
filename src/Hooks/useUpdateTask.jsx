import { useContext } from "react";
// import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const useUpdateTask = () => {
    const { todoData} = useContext(AuthContext);
    // const axiosPublic = useAxiosPublic();


    const handleUpdateTask = (id) => {

        const task = [...todoData].find(d => d._id === id);
        console.log(task);
        

        Swal.fire({
            html: 
            `<div class="mt-4">
                <div class="w-full flex flex-col gap-2">
                    <h1 class="font-bold text-center text-2xl text-success">Update Task</h1>
                    <label class="font-bold text-slate-300">Title : </label>
                    <input class="w-full p-2 rounded-sm" type="text" name="title" maxLength={50} defaultValue={task.title} />
                    <label class="font-bold text-slate-300">Description : </label>
                    <textarea name='textarea' class="min-h-20 max-h-36 w-full p-2 rounded-sm " maxLength={200} defaultValue={task.description}></textarea>
                    <input onClick={handleUpdate} type="submit" class="btn bg-success mt-2 text-black"/>
                </div>
        </div>`
            ,
          });
          
       
        
        // const data = { category: 'category' }
        // axiosPublic.put(`/todo/${id}`, data).then(res => {
        //     if (res.data.modifiedCount > 0) {
        //         fetchTodoData();
        //         return;
        //     }
        // }
        // )
    }
    return { handleUpdateTask };
};

export default useUpdateTask;