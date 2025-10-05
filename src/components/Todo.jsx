import { FaArrowAltCircleRight } from "react-icons/fa";
import useHandleUpdateCategory from "../Hooks/useHandleUpdateCategory";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { ButtonDelete, ButtonEdit } from "./Buttons/Buttons";
import { Link } from "react-router-dom";

const Todo = () => {
    const { todoData } = useContext(AuthContext);
    const { handleUpdateCategory } = useHandleUpdateCategory();

    const todoCategory = todoData && [...todoData].filter(data => data.category === 'todo');

    return (
        <div>
            {todoCategory && todoCategory.map(data =>
                <div key={data._id} className="p-2 my-1 shadow-2xl flex flex-col gap-2 border border-info rounded-md bg-success text-black relative">
                    <h1 className="text-xl w-[60%] flex overflow-x-auto">{data.title}</h1>

                    <p>{data.description}</p>
                    <div className="flex justify-between">
                        <p onClick={() => handleUpdateCategory(data._id, 'inprogress')} className="bg-error p-1 rounded-full badge-error text-sm text-center flex justify-center items-center"><FaArrowAltCircleRight></FaArrowAltCircleRight></p>
                        <p className="text-sm ">{data.currentTime}</p>
                    </div>
                    <div className="flex gap-1 absolute top-1 right-1">
                        <Link to={`/todo-app/update-todo/${data._id}`}>
                            <ButtonEdit id={data._id} />
                        </Link>
                        <ButtonDelete id={data._id} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Todo;