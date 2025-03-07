import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const { loading, user } = useContext(AuthContext);

    if (loading) {
        return <div className="my-6 flex justify-center items-center">
            <h1>Loading...</h1>
        </div>
    }
    if (user) {
        return children;
    }

    return <Navigate to='/login'></Navigate>;
};

export default PrivateRoute;