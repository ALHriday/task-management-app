import { Link } from "react-router-dom";
import Todo from "../Todo";
import InProgress from "../InProgress";
import Done from "../Done";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import CreateTodo from "../CreateTodo";
// import UpdateTask from "../UpdateTask";

const TodoApp = () => {
    const { createBtn, setCreateBtn } = useContext(AuthContext);

    return (
        <div className="w-full md:w-11/12 mx-auto border border-info p-4 rounded-md bg-slate-800 min-h-screen">
            <div className="mb-6 flex flex-col md:flex-row md:justify-start justify-center items-center gap-2">
                <div className="w-20 h-20 md:w-28 md:h-28">
                    <img className="w-full h-full" src="https://img.icons8.com/?size=100&id=5CtiUq0Pvtnd&format=png&color=000000" alt="" />
                </div>
                <h1 className="text-4xl md:text-5xl text-blue-400 font-bold text-center">Task Management</h1>
            </div>

            <div className="w-full flex flex-col justify-end gap-2 py-1 px-1 rounded-sm">

                <div className="flex flex-col border-2 border-secondary rounded-md shadow-md mb-4">
                    <div className="w-full flex justify-between items-center gap-2 bg-secondary rounded-sm p-1 ">
                        <h2 className="text-xl px-4 pl-2">Create a list</h2>
                        {createBtn ?
                            <Link onClick={() => setCreateBtn(!createBtn)} className="btn btn-sm font-bold px-4 border bg-red-500">X</Link>
                            :
                            <Link onClick={() => setCreateBtn(!createBtn)} className="btn btn-sm font-bold px-2 md:px-4 border bg-black">Create</Link>
                        }
                    </div>
                    {createBtn ?
                        <div className="p-4 rounded-md bg-[#083e541b] shadow-2xl">
                            <CreateTodo></CreateTodo>
                        </div>
                        : <></>}

                </div>
                {/* {updateTaskBtn ? <>
                    <div className="p-4 rounded-md bg-[#083e541b] shadow-2xl">
                        <UpdateTask></UpdateTask>
                    </div>
                </> : <></>} */}
            </div>
            <div className="p-1 grid grid-cols-1 md:grid-cols-3 gap-2 overflow-auto">
                <div className="border border-success rounded-md h-auto">
                    <div className="text-center p-1 rounded-md">
                        <Link to='/todo-app' className="btn btn-success font-bold px-2 md:px-4 py-1 w-full">To-Do</Link>
                    </div>
                    <div className="px-2 py-1">
                        <Todo />
                    </div>
                </div>
                <div className="border border-error rounded-md ">
                    <div className="text-center p-1 rounded-md">
                        <Link to='/todo-app/inprogress' className="btn btn-error font-bold px-2 md:px-4 py-1 w-full">In Progress</Link>
                    </div>
                    <div className="px-2 py-1">
                        <InProgress />
                    </div>
                </div>
                <div className="border border-info rounded-md h-auto">
                    <div className="text-center p-1 rounded-md">
                        <Link to='/todo-app/done' className="btn  btn-info font-bold px-2 md:px-4 py-1 w-full">Done</Link>
                    </div>
                    <div className="px-2 py-1">
                        <Done />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TodoApp;