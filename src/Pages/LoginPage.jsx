/* eslint-disable no-unsafe-optional-chaining */
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form"; // Import useForm hook
import { Link, useNavigate } from "react-router-dom";
import Saly from "../assets/Saly-1.png";
import logo from "../assets/logo.svg";
import Field from "../components/common/Field";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const { setAuth } = useAuth();
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    const { email, password, isAdmin: role } = data;

    // Prepare the login data
    const loginData = {
      email,
      password,
      ...(role && { role: "admin" }),
    };

    try {
      const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;

      // Send login request
      const response = await axios.post(
        `${serverBaseUrl}/auth/login`,
        loginData
      );

      if (response.status === 200) {
        const { tokens, user } = response?.data?.data;

        if (tokens) {
          const { accessToken: authToken, refreshToken } = tokens;

          setAuth({ user, authToken, refreshToken });

          // console.log(user);

          // Navigate based on role
          navigate(user?.role === "admin" ? "/admin/dashboard" : "/");
        }
      } else {
        setErr(response?.data?.message); // Handle login failure
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErr(error?.response?.data?.message); // Handle login failure
    }
  };

  return (
    <div className="bg-white text-gray-800 overflow-hidden">
      <div className="flex min-h-screen">
        {/* Left side */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 relative">
          <div className="text-white">
            <img src={Saly} alt="Illustration" className="mx-auto" />
            <h2 className="text-3xl font-bold mb-4">Sign in Now</h2>
            <p className="text-xl mb-4">Boost Your Learning Capabilities</p>
            <p className="mb-8">
              Logging in unlocks your personal progress tracker, letting you
              evaluate your performance and see how you stack up against others.
              Whether you&apos;re preparing for exams, improving your knowledge,
              or simply having fun, there&apos;s no better way to sharpen your
              mind.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-8 flex gap-2 items-center">
              <span>Welcome to</span>
              <img src={logo} className="h-7" alt="Logo" />
            </h2>
            <h1 className="text-5xl font-bold mb-8">Sign in</h1>

            <form onSubmit={handleSubmit(handleLogin)}>
              <Field
                label="Enter your username or email address"
                htmlFor="username"
                error={errors.email}
              >
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Username is required",
                  })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300"
                  placeholder="Username or email address"
                />
              </Field>

              <Field
                label="Enter your Password"
                htmlFor="password"
                error={errors.password}
              >
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300"
                  placeholder="Password"
                />
              </Field>

              <div className="mb-6 flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="admin"
                  className="px-4 py-3 rounded-lg border border-gray-300"
                  {...register("isAdmin")}
                />
                <label htmlFor="admin" className="block">
                  Login as Admin
                </label>
              </div>
              {err && <div className="error-message text-red-500">{err}</div>}
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg mb-4"
              >
                Sign in
              </button>
            </form>

            <div className="text-center">
              <Link to="/forgot-password" className="text-primary">
                Forgot Password?
              </Link>
            </div>

            <div className="mt-8">
              <p className="text-center">
                No Account?{" "}
                <Link to="/register" className="text-primary">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
