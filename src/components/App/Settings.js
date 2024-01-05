import React, { useState } from "react";
import Navbar from "./Navbar";
import LogoutPopup from "./LogoutPopup";
import { useNavigate } from "react-router-dom";

const Settings = ({ handleLogout }) => {
  const [isLogoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleUserAccessClick = () => {
    navigate("/useraccess");
  };

  // const handlePermissionsClick = () => {
  //   navigate("/permissions");
  // };

  const handleLogoutClick = () => {
    setLogoutPopupOpen(true);
  };

  const handleLogoutConfirmed = () => {
    setLogoutPopupOpen(false);
    handleLogout();
    navigate("/");
  };

  const handleLogoutCancelled = () => {
    setLogoutPopupOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8 text-center">
        <h2 className="text-4xl font-bold mb-8">Settings</h2>
        <ul className="flex flex-col items-start space-y-4">
          {/* <li>
            <button
              className="bg-white hover:bg-gray-200 font-bold py-2 px-4 rounded"
              onClick={handleUserAccessClick}
            >
              Roles
            </button>
          </li>
          <li>
            <button
              className="bg-white hover:bg-gray-200 font-bold py-2 px-4 rounded"
              onClick={handlePermissionsClick}
            >
              Permissions
            </button>
          </li> */}
          <li>
            <button
              className="bg-white hover:bg-gray-200 font-bold py-2 px-4 rounded"
              onClick={handleUserAccessClick}
            >
              User Access
            </button>
          </li>
          <li>
            <button
              className="bg-white hover:bg-gray-200 font-bold py-2 px-4 rounded"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      <LogoutPopup
        isOpen={isLogoutPopupOpen}
        onClose={handleLogoutCancelled}
        onLogout={handleLogoutConfirmed}
      />
    </div>
  );
};

export default Settings;
