import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Aside from "./Aside";

const Admin = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  return (
    <div className="bg-gray-100 min-h-screen flex">
      {auth.authToken ? (
        <>
          <Aside />
          <Outlet />
        </>
      ) : (
        navigate("/login")
      )}
    </div>
  );
};

export default Admin;
