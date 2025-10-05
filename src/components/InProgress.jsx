
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import useHandleUpdateCategory from "../Hooks/useHandleUpdateCategory";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useContext } from "react";
import { ButtonDelete, ButtonEdit } from "./Buttons/Buttons";
import { Link } from "react-router-dom";

const InProgress = () => {
    const { handleUpdateCategory } = useHandleUpdateCategory();
    const { todoData } = useContext(AuthContext);

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

export default InProgress;