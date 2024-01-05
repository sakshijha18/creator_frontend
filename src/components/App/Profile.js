import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { RingLoader } from "react-spinners";

const Profile = () => {
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    email: "",
    role: "",
    permissions: {},
  });
  const [loading, setLoading] = useState(true);
  const [showPermissions, setShowPermissions] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = sessionStorage.getItem("userId");

        if (!userId) {
          return;
        }

        const response = await axios.get(`http://localhost:3001/api/profile/${userId}`);
        const user = response.data;

        if (user.error) {
        } else {
          setUserData(user);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const mapPermissionsToRoles = (permissions) => {
    const permissionToRoleMap = {
      goodsReceiptCreator: "Goods Receipt Creator",
      invoiceCreator: "Invoice Creator",
      invoiceApprover: "Invoice Approver",
      vendorApprover: "Vendor Approver",
      vendorCreator: "Vendor Creator",
      contractApprover: "Contract Approver",
    };

    const permissionRoles = Object.keys(permissions)
      .filter((permission) => permissions[permission] === true)
      .map((permission, index) => (
        <span
          className="bg-gray-500 text-white px-2 py-1 rounded-md inline-block mb-2 mr-2"
          key={index}
        >
          {permissionToRoleMap[permission]}
        </span>
      ));

    return permissionRoles.length ? permissionRoles : <p>No permission given</p>;
  };

  const togglePermissionsVisibility = () => {
    setShowPermissions(!showPermissions);
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <RingLoader color="#718096" loading={true} size={80} />
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="max-w-md w-full p-6 bg-white rounded shadow-md text-center">
            <div className="">
              <img
                src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=2000"
                alt="User Profile"
                className="w-32 h-32 mx-auto rounded-full object-cover"
              />

              <p className="bg-black text-white px-4 py-1 rounded-md inline mb-2">{userData.role}</p>

              <div className="text-sm text-gray-500 mt-4">
                <div className="mb-4">
                  <p>ID: {userData._id}</p>
                  <p>Name: {userData.name}</p>
                  <p>Email: {userData.email}</p>
                </div>

                <div className="mb-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded-md inline mb-2"
                    onClick={togglePermissionsVisibility}
                  >
                    {showPermissions ? "Hide Permissions" : "Show Permissions"}
                  </button>
                  {showPermissions && (
                    <div className="flex justify-center">
                      <div className="flex flex-wrap max-w-md">
                        {userData.permissions && mapPermissionsToRoles(userData.permissions)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
