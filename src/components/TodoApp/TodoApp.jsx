import { Link, Outlet } from "react-router-dom";

const TodoApp = () => {
    return (
        <div className="w-full md:w-5/6 lg:w-3/6 mx-auto border-2 p-4 rounded-md bg-slate-800">
            <div className="my-8 md:my-10">
                <h1 className="text-4xl md:text-5xl text-blue-500 font-bold text-center ">Task Management</h1>
            </div>

            <div className="flex flex-col flex-wrap gap-2 py-1 px-1 rounded-sm">
                <div className="flex justify-between items-center gap-4 bg-secondary rounded-sm p-1 shadow-md">
                    <h2 className="text-xl px-4 pl-2">Create a list</h2>
                    <Link to='/todo-app/create-todo' className="btn font-bold px-2 md:px-4 border bg-black">Create</Link>
                </div>
                <div className="flex justify-start items-center gap-2">
                    <Link to='/todo-app' className="btn btn-success font-bold px-2 md:px-4 py-1">To-Do</Link>
                    <Link to='/todo-app/inprogress' className="btn btn-error font-bold px-2 md:px-4 py-1">In Progress</Link>
                    <Link to='/todo-app/done' className="btn  btn-info font-bold px-2 md:px-4 py-1">Done</Link>
                </div>          
            </div>
            <div className="py-4 px-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default TodoApp;