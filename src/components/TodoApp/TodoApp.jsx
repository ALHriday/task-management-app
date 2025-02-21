import { Link, Outlet } from "react-router-dom";

const TodoApp = () => {
    return (
        <div className="w-full md:w-5/6 lg:w-3/6 mx-auto border-2 p-4 rounded-md bg-slate-900">
            <div className="">
                <h1 className="text-4xl font-bold text-center my-8">Task Management</h1>
            </div>

            <div className="flex justify-between items-center gap-6 py-1 px-1 rounded-sm bg-slate-800">
                <div className="flex justify-between items-center gap-4 bg-secondary rounded-sm md:px-1 md:py-1 shadow-md">
                    <h2 className="md:text-xl md:px-4 pl-2">Create a list</h2>
                    <button className="btn btn-sm font-bold px-2 md:px-4 border btn-secondary bg-black">Create</button>
                </div>
                <div className="flex justify-end items-center gap-2">
                    <Link to='/todo-app/inprogress' className="btn btn-sm md:btn btn-error font-bold px-2 md:px-4 py-1">In Progress</Link>
                    <Link to='/todo-app/done' className="btn btn-sm md:btn btn-info font-bold px-2 md:px-4 py-1">Done</Link>
                </div>
            </div>
            <div className="w-full flex flex-col gap-2 my-4">
                <label>Title : </label>
                <input className="w-full px-4 py-2 rounded-sm" type="text" />
                <label>Description : </label>
                <textarea className="min-h-20 max-h-36 w-full px-4 py-2 rounded-sm"></textarea>
                <button className="btn bg-blue-500">Save</button>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default TodoApp;