import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./pages/routes/AdminRoutes";
import PublicRoutes from "./pages/routes/PublicRoutes";
import UserRoutes from "./pages/routes/UserRoutes";
import DashboardLayout from "./components/dashboardLayout/Layout";
import LandingLayout from "./components/landingLayout/Leyout";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import AppContext from "./context/AppContext ";
import type { ContextType } from "./context/AppContext ";
import type { BasketItem } from "./model/Basket";


const getStoredUser = (): ContextType['user'] => {
  const stored = localStorage.getItem("currentUser");
  return stored ? JSON.parse(stored) : undefined;
};

function App() {
  const [user, setUser] = useState<ContextType['user']>(getStoredUser());
  const [idToken, setIdToken] = useState<string | undefined>(undefined);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(true);




  const contextValue: ContextType = {
    user,
    currentUser: user,
    currentBusinessRoleUser: undefined,
    setUser,
    setCurrentUser: setUser,
    idToken,
    setIdToken,
    isVerified,
    setIsVerified,
    basket: basket || [],
    setBasket,
    isOpen,
    setIsOpen,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <DashboardLayout>
              <AdminRoutes />
              <ToastContainer />
            </DashboardLayout>
          }
        />
        <Route
          path="/user/*"
          element={
            <DashboardLayout>
              <UserRoutes />
              <ToastContainer />
            </DashboardLayout>
          }
        />
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
    </AppContext.Provider>
  );
}

export default App;