import { Link } from "react-router-dom";
import Todo from "../Todo";
import InProgress from "../InProgress";
import Done from "../Done";

const TodoApp = () => {
    return (
        <div className="w-full md:w-5/6 lg:w-5/6 mx-auto border-2 p-4 rounded-md bg-slate-800">
            <div className="my-6">
                <h1 className="text-4xl md:text-5xl text-blue-500 font-bold text-center">Task Management</h1>
            </div>

            <div className="w-full flex justify-end gap-2 py-1 px-1 rounded-sm">
                <div className="flex justify-between items-center gap-2 bg-secondary rounded-sm p-1 shadow-md">
                    <h2 className="text-xl px-4 pl-2">Create a list</h2>
                    <Link to='/todo-app/create-todo' className="btn font-bold px-2 md:px-4 border bg-black">Create</Link>
                </div>
            </div>
            <div className="p-1 grid grid-cols-3 gap-2">
                <div>
                    <div className="border text-center p-1 rounded-md">
                        <Link to='/todo-app' className="btn btn-success font-bold px-2 md:px-4 py-1 w-full">To-Do</Link>
                    </div>
                    <Todo />
                </div>
                <div>
                    <div className="border text-center p-1 rounded-md">
                        <Link to='/todo-app/inprogress' className="btn btn-error font-bold px-2 md:px-4 py-1 w-full">In Progress</Link>
                    </div>
                    <InProgress />
                </div>
                <div>
                    <div className="border text-center p-1 rounded-md">
                        <Link to='/todo-app/done' className="btn  btn-info font-bold px-2 md:px-4 py-1 w-full">Done</Link>
                    </div>
                    <Done />
                </div>

            </div>
        </div>
    );
};

export default TodoApp;