import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gray-800 p-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center">

          <Link to={`/profile/${sessionStorage.getItem("userId")}`} className="text-white hover:text-gray-300 text-2xl font-bold mr-6 focus:outline-none">
            <i className="fas fa-user"></i>
          </Link>

          <Link to="/home" className={`text-white hover:text-gray-300 text-base sm:text-sm md:text-lg lg:text-lg xl:text-xl font-bold mr-6 ${isActive("/home") && "text-gray-300"}`}
          >
            Home
          </Link>

          <Link to="/forms" className={`text-white hover:text-gray-300 text-base sm:text-sm md:text-lg lg:text-lg xl:text-xl font-bold mr-6 ${isActive("/forms") && "text-gray-300"}`}
          >
            Forms
          </Link>

          <Link to="/records" className={`text-white hover:text-gray-300 text-base sm:text-sm md:text-lg lg:text-lg xl:text-xl font-bold mr-6 ${isActive("/records") && "text-gray-300"}`}
          >
            Records
          </Link>

          <Link to="/settings" className={`text-white hover:text-gray-300 text-base sm:text-sm md:text-lg lg:text-lg xl:text-xl font-bold mr-6 ${isActive("/permissions") && "text-gray-300 "}`}
          >
            Settings
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
