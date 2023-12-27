import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../App/Navbar";
import { RingLoader } from "react-spinners";

function UserDetails() {
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

  // const handleChangePermissions = () => {
  //   console.log("Changing permissions...");
  // };

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <RingLoader color="#718096" loading={true} size={80} />
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mt-8 mb-6 text-center">User Details</h1>
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
                  <td className="border px-4 py-2">{user.role}</td>
                </tr>
                {/* Display separate rows for each permission */}
                <tr>
                  <td className="border px-4 py-2 font-bold">Contract Approver:</td>
                  <td className="border px-4 py-2">
                    <i
                      className={`${
                        user.permissions.contractApprover
                          ? "fas fa-check text-green-500"
                          : "fas fa-times text-red-500"
                      } ml-2`}
                    ></i>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Invoice Creator:</td>
                  <td className="border px-4 py-2">
                    <i
                      className={`${
                        user.permissions.invoiceCreator
                          ? "fas fa-check text-green-500"
                          : "fas fa-times text-red-500"
                      } ml-2`}
                    ></i>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Invoice Approver:</td>
                  <td className="border px-4 py-2">
                    <i
                      className={`${
                        user.permissions.invoiceApprover
                          ? "fas fa-check text-green-500"
                          : "fas fa-times text-red-500"
                      } ml-2`}
                    ></i>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Vendor Approver:</td>
                  <td className="border px-4 py-2">
                    <i
                      className={`${
                        user.permissions.vendorApprover
                          ? "fas fa-check text-green-500"
                          : "fas fa-times text-red-500"
                      } ml-2`}
                    ></i>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Vendor Creator:</td>
                  <td className="border px-4 py-2">
                    <i
                      className={`${
                        user.permissions.vendorCreator
                          ? "fas fa-check text-green-500"
                          : "fas fa-times text-red-500"
                      } ml-2`}
                    ></i>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Goods Receipt Creator:</td>
                  <td className="border px-4 py-2">
                    <i
                      className={`${
                        user.permissions.goodsReceiptCreator
                          ? "fas fa-check text-green-500"
                          : "fas fa-times text-red-500"
                      } ml-2`}
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-center mt-6">
            <Link
              to={`/records/users/${id}/changepermissions`}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Change Permissions
            </Link>

            <Link to="/records/users" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
              Back
            </Link>
          </div>

        </div>
      )}
    </div>
  );
}

export default UserDetails;
