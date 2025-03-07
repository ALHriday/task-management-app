import useAxiosPublic from "../Hooks/useAxiosPublic";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import useHandleUpdateCategory from "../Hooks/useHandleUpdateCategory";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useContext } from "react";

const InProgress = () => {
    const {handleUpdateCategory, fetchTodoData} = useHandleUpdateCategory();
    const {todoData} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const handleDeleteTodo = (id) => {
        axiosPublic.delete(`/todo/${id}`).then(res => {
            if (res.data.deletedCount > 0) {
                fetchTodoData();
                return;
            }
        }
        )
    }

    const inProgressCategory = todoData && [...todoData].filter(data => data.category === 'inprogress');


    return (
        <div>
            {inProgressCategory && inProgressCategory.map(data =>
                <div key={data._id} className="p-2 my-1 shadow-2xl flex flex-col gap-2 border border-info rounded-md bg-error text-black relative">
                    <h1 className="text-xl w-[60%] flex overflow-x-auto">{data.title}</h1>

                    <p>{data.description}</p>
                    <div className="flex justify-between">
                        <div className="flex gap-1">
                            <p onClick={() => handleUpdateCategory(data._id, 'todo')} className="bg-success p-1 rounded-full badge-success text-sm text-center flex justify-center items-center"><FaArrowAltCircleLeft></FaArrowAltCircleLeft></p>
                            <p onClick={() => handleUpdateCategory(data._id, 'done')} className="bg-info p-1 rounded-full badge-info text-sm text-center flex justify-center items-center"><FaArrowAltCircleRight></FaArrowAltCircleRight></p>
                        </div>

                        <p className="text-sm ">{data.currentTime}</p>
                    </div>
                    <div className="flex gap-1 absolute top-1 right-1">
                        <button className="btn btn-sm bg-black">Edit</button>
                        <button onClick={() => handleDeleteTodo(data._id)} className="btn btn-sm bg-red-500">x</button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default InProgress;