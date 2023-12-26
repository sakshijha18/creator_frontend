import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="bg-cover bg-center bg-gray-100 relative flex items-center justify-center h-screen" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1566545455366-bcae28fd3929?q=80&w=877&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
      <div className="absolute inset-0 bg-black backdrop-blur-sm opacity-60"></div>
      <div className="text-center relative z-10">
        <h1 className="text-5xl font-bold text-white mb-6">Vendor Connect</h1>

        <div className="flex flex-col sm:flex-row justify-center space-x-8">
        

          <Link to="/login" className="text-white">
            <div className="flex flex-col items-center p-6 rounded-lg transform transition-transform hover:scale-110">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="User"
                style={{ width: '200px', height: '200px' }}
                className="rounded mb-4 object-cover"
              />
              <span className="text-lg sm:text-xl font-semibold">Login</span>
            </div>
          </Link>

          <Link to="/signup" className="text-white">
            <div className="flex flex-col items-center p-6 rounded-lg transform transition-transform hover:scale-110">
              <img
                src="https://images.unsplash.com/photo-1492551557933-34265f7af79e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Admin"
                style={{ width: '200px', height: '200px' }}
                className="rounded mb-4 object-cover"
              />
              <span className="text-lg sm:text-xl font-semibold">Signup</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
