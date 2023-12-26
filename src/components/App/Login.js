import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        formData
      );

      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.token);
        handleLogin(response.data.token);
        navigate("/home");
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      handleError(error);
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  const handleError = (error) => {
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);

      if (error.response.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error("An error occurred");
      }
    } else if (error.request) {
      console.error("No response received. Request details:", error.request);
    } else {
      console.error("Error details:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded pr-10"
                required
              />
              <button
                type="button"
                className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <i className="fas fa-eye"></i>
                ) : (
                  <i className="fas fa-eye-slash"></i>
                )}
              </button>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-gray-800 text-white pl-4 pr-4 pt-2 pb-2 rounded-md hover:bg-gray-900 focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-8">
          <p>
            Not have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Create one
            </Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
