/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form
import { Link, useNavigate } from "react-router-dom"; // Import the useNavigate hook
import Saly from "../assets/Saly-1.png";
import logo from "../assets/logo.svg";
import Field from "../components/common/Field"; // Import Field component

const RegistrationPage = () => {
  const navigate = useNavigate(); // Initialize the navigate hook
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm();

  const password = watch("password");

  const handleSubmitForm = async (data) => {
    const { name: full_name, email, password, isAdmin: role } = data;

    // Create object, including role only if it exists
    const registerData = {
      full_name,
      email,
      password,
      ...(role && { role: "admin" }),
    };

    // console.log(registerData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        registerData
      );

      if (response.status === 201) {
        console.log("Registration successful:", response.data);
        navigate("/login");
      } else {
        // console.log("Registration failed:", response.data);
        setErrorMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      // console.error("Error during registration:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred during registration. Please try again."
      );
    }
  };

  return (
    <div className="bg-white text-gray-800">
      <div className="flex min-h-screen max-h-screen">
        {/* Left side */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 h-full fixed left-0 top-0">
          <div className="text-white">
            <img
              src={Saly}
              alt="Illustration"
              className="mx-auto 2xl:ml-0 max-h-64 max-w-lg"
            />
            <h2 className="text-3xl font-bold mb-1">Sign Up Now</h2>
            <p className="text-xl mb-4 font-medium">
              Boost Your Learning Capabilities
            </p>
            <p className="mb-8 max-w-lg">
              Logging in unlocks your personal progress tracker, letting you
              evaluate your performance and see how you stack up against others.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="fixed right-0 top-0 w-full h-full lg:w-1/2 flex items-start xl:items-center justify-center p-6 lg:p-8 xl:p-12 overflow-y-auto xl:overflow-hidden">
          <div className="w-full max-w-lg">
            <h2 className="text-3xl font-bold mb-3 flex gap-2 items-center">
              <span>Welcome to</span>
              <img src={logo} className="h-7" alt="Logo" />
            </h2>
            <h1 className="text-4xl font-bold mb-6">Sign Up</h1>

            <form onSubmit={handleSubmit(handleSubmitForm)}>
              {/* Full Name */}
              <Field label="Full Name" htmlFor="name" error={errors.name}>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300"
                  placeholder="John Doe"
                  {...register("name", { required: "Full name is required" })}
                />
              </Field>

              {/* Email */}
              <Field label="Email" htmlFor="email" error={errors.email}>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300"
                  placeholder="Email address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: /^[^@]+@[^@]+\.[^@]+$/,
                  })}
                />
              </Field>

              <div className="flex gap-4">
                {/* Password */}
                <Field
                  label="Enter your Password"
                  htmlFor="password"
                  error={errors.password}
                >
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                </Field>

                {/* Confirm Password */}
                <Field
                  label="Confirm Password"
                  htmlFor="confirm-password"
                  error={errors.confirmPassword}
                >
                  <input
                    type="password"
                    id="confirm-password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />
                </Field>
              </div>

              {/* Admin Checkbox */}
              <div className="mb-6 flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="admin"
                  className="px-4 py-3 rounded-lg border border-gray-300"
                  {...register("isAdmin")}
                />
                <label htmlFor="admin" className="block">
                  Register as Admin
                </label>
              </div>

              {errorMessage && (
                <p className="text-red-500 font-medium">{errorMessage}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg mb-2"
              >
                Create Account
              </button>
            </form>

            <div className="mt-2 text-gray-400">
              <p className="text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-primary">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
