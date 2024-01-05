import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    permissions: {
      contractApprover: false,
      invoiceCreator: false,
      invoiceApprover: false,
      vendorApprover: false,
      vendorCreator: false,
      goodsReceiptCreator: false,
    },
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
        "http://localhost:3001/signup",
        formData
      );
  
      if (response.data.success === true) {
        console.log(response.data);
        toast.success("User created successfully!");
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userId", response.data.userId);
        sessionStorage.setItem("userName", response.data.userName);
        handleLogin(response.data.token);
        navigate("/home");
      } else {
        toast.error("Error creating user. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      console.error("Detailed error response:", error.response);
  
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "Email already exists"
      ) {
        toast.error("Email already exists. Please use a different email.");
      } else {
        toast.error("Error creating user. Please try again.");
      }
    }
  
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

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
              Signup
            </button>
          </div>
        </form>
        <div className="text-center mt-8">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login here
            </Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
