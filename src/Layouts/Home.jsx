import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="px-4 py-2 min-h-screen">
            <div className="flex flex-col justify-center items-center gap-4">
                <img className="w-40 h-40" src="https://img.icons8.com/?size=100&id=5CtiUq0Pvtnd&format=png&color=000000" alt="" />
                <h1 className="text-4xl md:text-5xl font-bold text-blue-500 text-center">Task Management</h1>
                <p className="font-bold text-slate-200"><span className="text-info">Stay Organized</span>, <span className="text-error">Stay Productive</span></p>
                <p className="text-center text-slate-300">
                Effortlessly manage tasks with real-time updates, drag-and-drop functionality, and seamless collaboration. Simplify your workflow and boost productivity today!</p>             
                <div>
                    <Link className="btn shadow-md bg-blue-500" to='/todo-app'>Get Started</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;