import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { user, handleLogOut } = useContext(AuthContext);

    return (
        <div>
            <div className="navbar bg-slate-800 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/todo-app'>Todo-App</Link></li>
                        </ul>
                    </div>
                    <div className="text-xl w-10 h-10">
                        <img className="w-full h-full" src="https://img.icons8.com/?size=100&id=5CtiUq0Pvtnd&format=png&color=000000" alt="" />
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/todo-app'>Todo-App</Link></li>
                    </ul>
                </div>
                <div className="navbar-end gap-2">
                    <h1>{user?.displayName}</h1>
                    {user ? <>
                        <a onClick={handleLogOut} className="btn bg-red-600 btn-sm">LogOut</a>
                    </> : <>
                        <Link to='/login' className="btn bg-blue-500">LogIn</Link>
                    </>}

                </div>
            </div>
        </div>
    );
};

export default Navbar;