import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.svg";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const handleLogOut = () => {
    setAuth({});
    navigate("/login");
  };
  return (
    <>
      <header className="flex justify-between items-center mb-12">
        <img src={logo} className="h-7" />
        <div>
          
          {auth?.user ? (
            <button
              onClick={handleLogOut}
              className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
              style={{ fontFamily: "Jaro" }}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
              style={{ fontFamily: "Jaro" }}
            >
              Login
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
