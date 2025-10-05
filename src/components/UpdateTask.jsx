import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { TbCircleArrowRightFilled } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";


const UpdateTask = () => {
    const { setIsUpdate, socket } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const param = useParams();

    const {
        register,
        handleSubmit,
        reset
    } = useForm();


    const onSubmit = (data) => {
        const { title, description } = data;
        const todoInfo = { title, description };
        axiosPublic.put(`/todoData/${param?._id}`, todoInfo).then(result => {
            if (result.data.modifiedCount > 0) {
                socket.emit('task_updated');
                setIsUpdate(false);
                reset();
                navigate('/todo-app');
            }
        })
    }


    return (
        <div>
            <div className="modal modal-open modal-middle">
                <div className="modal-box bg-blue-500 p-4 text-white border-2">
                    <div className="modal-action absolute -top-5 right-1">
                        <button className="text-4xl font-bold px-4 py-1" onClick={() => setIsUpdate(false)}><TbCircleArrowRightFilled /></button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit
                    )}>
                        <div className="w-full flex flex-col gap-2 text-white">
                            <h1 className="font-bold text-center text-2xl text-success">Update Task</h1>
                            <label className="font-bold text-slate-300">Title : </label>
                            <input {...register('title', { require: true })} className="w-full p-2 rounded-sm" type="text" maxLength={50} />
                            <label className="font-bold text-slate-300">Description : </label>
                            <textarea {...register('description', { require: true })} className="min-h-20 max-h-36 w-full p-2 rounded-sm " maxLength={200}></textarea>

                            <input type="submit" className="btn bg-base-content text-black mt-2" />
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );

};

export default UpdateTask;