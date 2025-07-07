import Button from "./button";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = ({ onClick, heading, buttonName }) => {
  const { logout, adminInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-slate-900">
      <div className="flex items-center justify-between max-w-6xl w-11/12 mx-auto py-6">
        <h1 className="text-3xl font-bold text-teal-500">{heading}</h1>

        <div className="flex items-center gap-4">
          {adminInfo && (
            <span className="text-white hidden sm:inline">
              Welcome, {adminInfo.email}
            </span>
          )}

          {buttonName && <Button onClick={onClick}>{buttonName}</Button>}

          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </header>
  );
};
export default Header;
