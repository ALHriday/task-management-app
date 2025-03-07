import { FaArrowAltCircleRight } from "react-icons/fa";
import useAxiosPublic from "../Hooks/useAxiosPublic";
// import useTaskData from "../Hooks/useTaskData";
import useHandleUpdateCategory from "../Hooks/useHandleUpdateCategory";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useUpdateTask from "../Hooks/useUpdateTask";

const Todo = () => {
    const {todoData, fetchTodoData} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const {handleUpdateCategory} = useHandleUpdateCategory();
    const {handleUpdateTask} = useUpdateTask();


    const handleDeleteTodo = (id) => {
        axiosPublic.delete(`/todo/${id}`).then(res => {
            if (res.data.deletedCount > 0) {
                fetchTodoData();
            }
        }
        )
    }


    const todoCategory = todoData && [...todoData].filter(data => data.category === 'todo');

    return (
        <div>
            {todoCategory && todoCategory.map(data =>
                <div key={data._id} className="p-2 my-1 shadow-2xl flex flex-col gap-2 border border-info rounded-md bg-success text-black relative">
                    <h1 className="text-xl w-[60%] flex overflow-x-auto">{data.title}</h1>

                    <p>{data.description}</p>
                    <div className="flex justify-between">
                        <p onClick={() => handleUpdateCategory(data._id,'inprogress')} className="bg-error p-1 rounded-full badge-error text-sm text-center flex justify-center items-center"><FaArrowAltCircleRight></FaArrowAltCircleRight></p>
                        <p className="text-sm ">{data.currentTime}</p>
                    </div>
                    <div className="flex gap-1 absolute top-1 right-1">
                        <button onClick={() => handleUpdateTask(data._id)} className="btn btn-sm bg-black">Edit</button>
                        <button onClick={() => handleDeleteTodo(data._id)} className="btn btn-sm bg-red-500">x</button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Todo;