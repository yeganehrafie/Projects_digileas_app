import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext ";
const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { setCurrentUser, setUser } = useContext(AppContext);
    const handelLogout = () => {

        setCurrentUser(undefined);
        setUser(undefined);
        localStorage.removeItem("currentUser");
        navigate("/");
    }
    return (
        <>
            <button onClick={handelLogout}>
                خروج
            </button>
        </>
    );
}

export default Dashboard;