import { Route, Routes } from "react-router-dom";
import Main from "../landing/Main";
export default function PublicRoutes() {
    return (
        <Routes>
            <Route path="/*" element={<Main />} />
        </Routes>
    );
}
