import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../App/Navbar";
import { RingLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SetRoles() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/records/users/${id}`);
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

  const handleSavePermissions = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/records/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: user.role }),
      });

      if (response.ok) {
        toast.success('Permissions updated successfully!');
      } else {
        toast.error('Failed to save permissions:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving permissions:', error);
      toast.error('An error occurred while saving permissions.');
    }
  };

  const handleRoleChange = (newValue) => {
    setUser((prevUser) => ({
      ...prevUser,
      role: newValue,
    }));
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
          <h1 className="text-3xl font-bold mt-8 mb-6 text-center">Set Role</h1>
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
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(e.target.value)}
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                      <option value="Vendor">Vendor</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Contract Approver:</td>
                  <td className="border px-4 py-2">{user.permissions.contractApprover ? "Yes" : "No"}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Invoice Creator:</td>
                  <td className="border px-4 py-2">{user.permissions.invoiceCreator ? "Yes" : "No"}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Invoice Approver:</td>
                  <td className="border px-4 py-2">{user.permissions.invoiceApprover ? "Yes" : "No"}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Vendor Creator:</td>
                  <td className="border px-4 py-2">{user.permissions.vendorCreator ? "Yes" : "No"}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Vendor Approver:</td>
                  <td className="border px-4 py-2">{user.permissions.vendorApprover ? "Yes" : "No"}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Goods Receipt Creator:</td>
                  <td className="border px-4 py-2">{user.permissions.goodsReceiptCreator ? "Yes" : "No"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-center mt-6">
            <Link to={`/records/users/${id}`}>
              <button
                className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
                onClick={handleSavePermissions}
              >
                Save
              </button>
            </Link>
          </div>

          <ToastContainer />
        </div>
      )}
    </div>
  );
}

export default SetRoles;
