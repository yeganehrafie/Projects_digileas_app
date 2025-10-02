import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./pages/routes/AdminRoutes";
import PublicRoutes from "./pages/routes/PublicRoutes";
import UserRoutes from "./pages/routes/UserRoutes";
// import AppContext from "./context/AppContext ";
import DashboardLayout from "./components/dashboardLayout/Layout";
import LandingLayout from "./components/landingLayout/Leyout";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css'

function App() {
  return (
    <>
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <DashboardLayout>
              <AdminRoutes />
              <ToastContainer />
            </DashboardLayout>
          }
        />

        {/* User Routes */}
        <Route
          path="/user/*"
          element={
            <LandingLayout>
              <UserRoutes />
              <ToastContainer />
            </LandingLayout>
          }
        />

        {/* Public Routes */}
        <Route
          path="/*"
          element={
            <LandingLayout>
              <PublicRoutes />
              <ToastContainer />
            </LandingLayout>
          }
        />
      </Routes>


    </>
  )
}

export default App;