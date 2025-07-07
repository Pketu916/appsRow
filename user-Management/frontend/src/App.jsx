import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./features/AdminLogin";
import AdminSignup from "./features/AdminSignup";
import UsersManagement from "./modules/usersManagement";
import { useContext } from "react";
import { AuthContext } from "./store/AuthContext";

export default function App() {
  const { isLoggedIn } = useContext(AuthContext);

    if (isLoggedIn === null) return null;

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <UsersManagement /> : <Navigate to="/login" />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/signup" element={<AdminSignup />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
