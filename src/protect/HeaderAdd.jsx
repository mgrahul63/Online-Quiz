import { Outlet } from "react-router-dom";
import Header from "../Pages/Header";
import { useAuth } from "../hooks/useAuth";

const HeaderAdd = () => {
  const { auth } = useAuth();
  return (
    <>
      {auth.authToken ? (
        <div className="bg-[#F5F3FF] min-h-screen">
          <div className="container mx-auto py-3">
            <Header />
            <Outlet />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default HeaderAdd;
