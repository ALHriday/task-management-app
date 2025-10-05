import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { TbCircleArrowRightFilled } from "react-icons/tb";

const CreateTodo = () => {
    const { user, socket, closeModal, setIsModalOpen } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const axiosPublic = useAxiosPublic();

    const onSubmit = (data) => {

        const userEmail = user.email;
        const userName = user.displayName;
        const { title, description, category } = data;
        const time = new Date();
        const currentTime = time.toLocaleDateString();

        const todoInfo = { title, description, category, currentTime, userName, userEmail };

        axiosPublic.post('/todo', todoInfo).then(result => {
            if (result.data.insertedId) {
                reset();
                socket.emit('task_updated');
                setIsModalOpen(false);
            }
        })
    }

    return (
        <div className="modal modal-open modal-middle rounded-md">
            <div className="modal-box relative  bg-blue-600 border-2 border-white">
                <div className="modal-action absolute -top-5 right-1">
                    <button className="text-4xl font-bold px-4 py-1" onClick={closeModal}><TbCircleArrowRightFilled /></button>
                </div>
                <form onSubmit={handleSubmit(onSubmit
                )}>
                    <div className="w-full flex flex-col gap-2">
                        <label className="font-bold text-slate-300">Title : </label>
                        <input {...register('title', { require: true })} required className="w-full p-2 rounded-sm" type="text" maxLength={50} />
                        <label className="font-bold text-slate-300">Category : </label>
                        <select {...register('category', { require: true })} className="w-full p-2 rounded-sm bg-slate-200 text-black" required>
                            <option value="">Select</option>
                            <option value="todo">To-Do</option>
                            <option value="inprogress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                        <label className="font-bold text-slate-300">Description : </label>
                        <textarea {...register('description', { require: true })} required className="min-h-20 max-h-36 w-full p-2 rounded-sm " maxLength={200}></textarea>
                        {errors.title && <p>Please enter the title</p>}

                        <input type="submit" className="btn bg-base-content text-black mt-2" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTodo;