import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const UpdateTask = () => {
    const { fetchTodoData, task} = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const axiosPublic = useAxiosPublic();

    const onSubmit = (data) =>{

        const {title, description} = data;
        const todoInfo = {title, description};

        axiosPublic.put(`/todo`, todoInfo).then(result => {
        if(result.data.insertedId){                
            reset();
            fetchTodoData();
        }})
    }

    return (
        <div className="mt-4">
            <form onSubmit={handleSubmit(onSubmit
            )}>
                <div className="w-full flex flex-col gap-2 bg-slate-800">
                    <h1 className="font-bold text-center text-2xl text-success">Update Task</h1>
                    <label className="font-bold text-slate-300">Title : </label>
                    <input {...register('title', {require: true})} className="w-full p-2 rounded-sm" type="text" maxLength={50} defaultValue={task?.title} />
                    <label className="font-bold text-slate-300">Description : </label>
                    <textarea {...register('description', {require: true})} className="min-h-20 max-h-36 w-full p-2 rounded-sm " maxLength={200} defaultValue={task?.description}></textarea>

                    <input type="submit" className="btn bg-success mt-2 text-black"/>
                </div>
            </form>
        </div>
    );

};

export default UpdateTask;