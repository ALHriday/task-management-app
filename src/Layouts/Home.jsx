import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="px-4 py-2">
            <div className="flex flex-col justify-center items-center gap-4">
                <img className="w-40 h-40" src="https://img.icons8.com/?size=100&id=5CtiUq0Pvtnd&format=png&color=000000" alt="" />
                <h1 className="text-4xl font-bold">Task Management</h1>
                <p className="font-bold">Stay Organized, Stay Productive</p>
                <p className="text-center">
                Effortlessly manage tasks with real-time updates, drag-and-drop functionality, and seamless collaboration. Simplify your workflow and boost productivity today!</p>
                
                <div>
                    <Link className="btn bg-blue-500" to='/todo-app'>Get Started</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;