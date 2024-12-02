import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" state={{from: window.location.pathname}}/>;
    }

    return children;
};

export default PrivateRoute;