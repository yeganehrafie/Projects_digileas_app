import { Route, Routes } from "react-router-dom";

export default function AdminRoutes() {
    //   const user = JSON.parse(localStorage.getItem("user") || "null") as User;
    //   const navigate = useNavigate();

    //   useEffect(() => {
    //     if (
    //       user?.user_roles?.find((q) => q.role?.name !== "admin") ||
    //       user === null
    //     ) {
    //       navigate("/login");
    //     }
    //   }, [user, navigate]);

    return (
        <Routes>

            <Route path="/dashboard" element={<></>} />



        </Routes>
    );
}
