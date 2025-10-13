import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext ";
const Profile: React.FC = () => {
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
            <button className="mt-10 text-amber-500 border-2 px-12 py-3" onClick={handelLogout}>
                خروج
            </button>
        </>
    );
}

export default Profile;