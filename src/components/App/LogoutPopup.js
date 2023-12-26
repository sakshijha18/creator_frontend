import React from "react";

const LogoutPopup = ({ isOpen, onClose, onLogout }) => {
  const handleLogout = async () => {
    onClose();
    onLogout();
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      } transition-opacity duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-center h-screen">
        <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        <div className="bg-white p-8 rounded shadow-md z-10">
          <p className="text-lg font-semibold mb-4">
            Are you sure you want to log out?
          </p>
          <div className="flex justify-end">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
              onClick={onClose}
            >
              No
            </button>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
              onClick={handleLogout}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
