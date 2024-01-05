import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../App/Navbar";
import { RingLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const permissionOptions = ["Yes", "No"];
const statusOptions = ["Active", "Blocked"];

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/records/users/${id}`
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleButtonClick = (button) => {
    setMode(button);
    setSelectedRole(user.role);
    setSelectedStatus(user.status);
  };

  const handlePermissionChange = (permissionKey, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      permissions: {
        ...prevUser.permissions,
        [permissionKey]: value === "Yes",
      },
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/records/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: selectedRole,
          permissions: user.permissions,
          status: selectedStatus,
        }),
      });
  
      const data = await response.json();
  
      setUser(data);
  
      if (mode === "changeRole") {
        toast.success("Role changed successfully");
      } else if (mode === "changePermissions") {
        toast.success("Permissions saved successfully");
      } else if (mode === "changeStatus") {
        toast.success(`Status changed to ${selectedStatus}`);
      }
    } catch (error) {
      console.error("Error updating role, permissions, and status:", error);
  
      if (mode === "changeRole") {
        toast.error("Error changing role");
      } else if (mode === "changePermissions") {
        toast.error("Error saving permissions");
      } else if (mode === "changeStatus") {
        toast.error("Error changing status");
      }
    } finally {
      setMode(null);
    }
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <RingLoader color="#718096" loading={true} size={80} />
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mt-8 mb-6 text-center">
            User Details
          </h1>
          <div className="flex items-center justify-center">
            <table className="table-auto bg-white">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-bold">ID:</td>
                  <td className="border px-4 py-2">{user._id}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Name:</td>
                  <td className="border px-4 py-2">{user.name}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Email:</td>
                  <td className="border px-4 py-2">{user.email}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Role:</td>
                  <td className="border px-4 py-2">
                    {mode === "changeRole" ? (
                      <div className="flex flex-col">
                        <select
                          onChange={handleRoleChange}
                          value={selectedRole}
                          className="mr-4"
                        >
                          <option value="User">User</option>
                          <option value="Vendor">Vendor</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </div>
                    ) : (
                      <span>{user.role}</span>
                    )}
                  </td>
                </tr>

                <tr>
            <td className="border px-4 py-2 font-bold">Status:</td>
            <td className="border px-4 py-2">
              {mode === "changeStatus" ? (
                <div className="flex flex-col">
                  <select
                    onChange={(e) => handleStatusChange(e.target.value)}
                    value={selectedStatus}
                    className="mr-4"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <span>{user.status}</span>
              )}
            </td>
          </tr>

                <tr>
            <td className="border px-4 py-2 font-bold">Contract Approver:</td>
            <td className="border px-4 py-2">
              {mode === "changePermissions" ? (
                <select
                  onChange={(e) =>
                    handlePermissionChange("contractApprover", e.target.value)
                  }
                  value={user.permissions.contractApprover ? "Yes" : "No"}
                  className="mr-4"
                >
                  {permissionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <i
                  className={`${
                    user.permissions.contractApprover
                      ? "fas fa-check text-green-500"
                      : "fas fa-times text-red-500"
                  } ml-2`}
                ></i>
              )}
            </td>
          </tr>

          <tr>
            <td className="border px-4 py-2 font-bold">Invoice Creator:</td>
            <td className="border px-4 py-2">
              {mode === "changePermissions" ? (
                <select
                  onChange={(e) =>
                    handlePermissionChange("contractApprover", e.target.value)
                  }
                  value={user.permissions.invoiceCreator ? "Yes" : "No"}
                  className="mr-4"
                >
                  {permissionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <i
                  className={`${
                    user.permissions.invoiceCreator
                      ? "fas fa-check text-green-500"
                      : "fas fa-times text-red-500"
                  } ml-2`}
                ></i>
              )}
            </td>
          </tr>

          <tr>
            <td className="border px-4 py-2 font-bold">Invoice Approver:</td>
            <td className="border px-4 py-2">
              {mode === "changePermissions" ? (
                <select
                  onChange={(e) =>
                    handlePermissionChange("invoiceApprover", e.target.value)
                  }
                  value={user.permissions.invoiceApprover ? "Yes" : "No"}
                  className="mr-4"
                >
                  {permissionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <i
                  className={`${
                    user.permissions.invoiceApprover
                      ? "fas fa-check text-green-500"
                      : "fas fa-times text-red-500"
                  } ml-2`}
                ></i>
              )}
            </td>
          </tr>


          <tr>
            <td className="border px-4 py-2 font-bold">Vendor Approver:</td>
            <td className="border px-4 py-2">
              {mode === "changePermissions" ? (
                <select
                  onChange={(e) =>
                    handlePermissionChange("vendorApprover", e.target.value)
                  }
                  value={user.permissions.vendorApprover ? "Yes" : "No"}
                  className="mr-4"
                >
                  {permissionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <i
                  className={`${
                    user.permissions.vendorApprover
                      ? "fas fa-check text-green-500"
                      : "fas fa-times text-red-500"
                  } ml-2`}
                ></i>
              )}
            </td>
          </tr>


          <tr>
            <td className="border px-4 py-2 font-bold">Vendor Creator:</td>
            <td className="border px-4 py-2">
              {mode === "changePermissions" ? (
                <select
                  onChange={(e) =>
                    handlePermissionChange("vendorCreator", e.target.value)
                  }
                  value={user.permissions.vendorCreator ? "Yes" : "No"}
                  className="mr-4"
                >
                  {permissionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <i
                  className={`${
                    user.permissions.vendorCreator
                      ? "fas fa-check text-green-500"
                      : "fas fa-times text-red-500"
                  } ml-2`}
                ></i>
              )}
            </td>
          </tr>

          <tr>
            <td className="border px-4 py-2 font-bold">Goods Receipt Creator:</td>
            <td className="border px-4 py-2">
              {mode === "changePermissions" ? (
                <select
                  onChange={(e) =>
                    handlePermissionChange("goodsReceiptCreator", e.target.value)
                  }
                  value={user.permissions.goodsReceiptCreator ? "Yes" : "No"}
                  className="mr-4"
                >
                  {permissionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <i
                  className={`${
                    user.permissions.goodsReceiptCreator
                      ? "fas fa-check text-green-500"
                      : "fas fa-times text-red-500"
                  } ml-2`}
                ></i>
              )}
            </td>
          </tr>

              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-center mt-6">
            {mode === null && (
              <>
                <button
                  onClick={() => handleButtonClick("changeRole")}
                  className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  Change Role
                </button>
                <button
                  onClick={() => handleButtonClick("changePermissions")}
                  className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  Change Permissions
                </button>
                <button
                  onClick={() => handleButtonClick("changeStatus")}
                  className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  Change Status
                </button>
              </>
            )}

            {mode === "changeRole" && (
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                Save Role
              </button>
            )}

            {mode === "changePermissions" && (
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                Save Permissions
              </button>
            )}

            {mode === "changeStatus" && (
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                Save Status
              </button>
            )}

            <Link
              to="/records/users"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Back
            </Link>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
}

export default UserDetails;
