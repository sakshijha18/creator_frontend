import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import LogoutPopup from "./LogoutPopup";

const Profile = ({ handleLogout }) => {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });
  

  const [isLogoutPopupOpen, setLogoutPopupOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/profile");

        const user = response.data;
        setUserData({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogoutClick = () => {
    setLogoutPopupOpen(true);
  };

  const navigate = useNavigate();

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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full p-6 bg-white rounded shadow-md text-center">
          <div className="mb-4">
            <img
              src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=2000"
              alt="User Profile"
              className="w-32 h-32 mx-auto mb-2 rounded-full object-cover"
            />
            <h1 className="text-4xl font-bold mb-2">{userData.name}</h1>
            <h2 className="text-3xl font-bold">{userData.email}</h2>
            <p className="text-gray-700 mb-4">{userData.role}</p>
            <div className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md inline no-underline mr-5">
              Edit Profile
            </div>

            {/* Open the logout popup when the "Logout" button is clicked */}
            <button
              className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md inline no-underline"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Render the LogoutPopup component */}
      <LogoutPopup
        isOpen={isLogoutPopupOpen}
        onClose={handleLogoutCancelled}
        onLogout={handleLogoutConfirmed}
      />
    </div>
  );
};

export default Profile;
