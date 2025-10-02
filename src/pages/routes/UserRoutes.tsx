import { Route, Routes } from "react-router-dom";

export default function UserRoutes() {
    //   const user = JSON.parse(localStorage.getItem("user") || "null") as User;
    //   const navigate = useNavigate();

    //   useEffect(() => {
    //     if (
    //       user?.user_roles?.find((q) => q.role?.name !== "user") ||
    //       user === null
    //     ) {
    //       navigate("/login");
    //     }
    //   }, [user, navigate]);
    return (
        <Routes>
            <Route path="/profile" element={<></>} />
        </Routes>
    );
}
