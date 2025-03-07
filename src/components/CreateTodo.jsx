import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const CreateTodo = () => {
    const {user, fetchTodoData} = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const axiosPublic = useAxiosPublic();

    const onSubmit = (data) =>{

        const userEmail = user.email;
        const userName = user.displayName;
        const {title, description, category} = data;
        const time = new Date();
        const currentTime = time.toLocaleDateString();

        const todoInfo = {title, description,category, currentTime, userName, userEmail};

        axiosPublic.post('/todo', todoInfo).then(result => {
        if(result.data.insertedId){                
            reset();
            fetchTodoData();
        }})
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit
            )}>
                <div className="w-full flex flex-col gap-2 bg-slate-800">
                    <label className="font-bold text-slate-300">Title : </label>
                    <input {...register('title', {require: true})} className="w-full p-2 rounded-sm" type="text" maxLength={50} />
                    <label className="font-bold text-slate-300">Category : </label>
                    <select {...register('category', {require: true})} className="w-full p-2 rounded-sm" required>
                        <option value="todo">Select</option>
                        <option value="todo">To-Do</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                    <label className="font-bold text-slate-300">Description : </label>
                    <textarea {...register('description', {require: true})} className="min-h-20 max-h-36 w-full p-2 rounded-sm " maxLength={200}></textarea>
                    {errors.title && <p>Please enter the title</p>}

                    <input type="submit" className="btn bg-secondary mt-2"/>
                </div>
            </form>
        </div>
    );
};

export default CreateTodo;