import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataNotFound from "../App/DataNotFound";
import Navbar from "../App/Navbar";
import { RingLoader } from "react-spinners";

function ContractApprover() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/records/users");
        const data = await response.json();

        if (data.length === 0) {
          setUsers([]);
        } else {
          const contractApprovers = data.filter(
            (user) => user.permissions.contractApprover
          );

          setUsers(contractApprovers);
        }
      } catch (error) {
        console.error("Error fetching user records:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 bg-white">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Contract Approver
        </h1>
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <RingLoader color="#718096" loading={true} size={80} />
          </div>
        ) : users.length > 0 ? (
          <table className="min-w-full border border-gray-500">
            <thead>
              <tr>
                <th rowSpan={2} className="border px-4 py-2">
                  ID
                </th>
                <th rowSpan={2} className="border px-4 py-2">
                  Name
                </th>
                <th rowSpan={2} className="border px-4 py-2">
                  Email
                </th>
                <th rowSpan={2} className="border px-4 py-2">
                  Role
                </th>
                {/* Add a new row for Permissions heading */}
                <th
                  colSpan={6}
                  className="border px-4 py-2 text-center font-bold"
                >
                  Permissions
                </th>
              </tr>
              <tr>
                <th className="border px-4 py-2">Contract Approver</th>
                <th className="border px-4 py-2">Invoice Creator</th>
                <th className="border px-4 py-2">Invoice Approver</th>
                <th className="border px-4 py-2">Vendor Approver</th>
                <th className="border px-4 py-2">Vendor Creator</th>
                <th className="border px-4 py-2">Goods Receipt Creator</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2 text-center">
                    <Link to={`/records/users/${user._id}`}>{user._id}</Link>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <Link to={`/records/users/${user._id}`}>{user.name}</Link>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <Link to={`/records/users/${user._id}`}>{user.email}</Link>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <Link to={`/records/users/${user._id}`}>{user.role}</Link>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <i
                      className={`${
                        user.permissions.contractApprover
                          ? "fas fa-check text-green-500"
                          : "fas fa-times text-red-500"
                      } ml-2`}
                    ></i>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <i
                      className={`${
                        user.permissions.invoiceCreator
                          ? "fas fa-check text-green-500"
                          : "fas fa-times text-red-500"
                      } ml-2`}
                    ></i>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <i
                      className={`${
                        user.permissions.invoiceApprover
                          ? "fas fa-check text-green-500"
                          : "fas fa-times text-red-500"
                      } ml-2`}
                    ></i>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <i
                      className={`${
                        user.permissions.vendorApprover
                          ? "fas fa-check text-green-500"
                          : "fas fa-times text-red-500"
                      } ml-2`}
                    ></i>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <i
                      className={`${
                        user.permissions.vendorCreator
                          ? "fas fa-check text-green-500"
                          : "fas fa-times text-red-500"
                      } ml-2`}
                    ></i>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <i
                      className={`${
                        user.permissions.goodsReceiptCreator
                          ? "fas fa-check text-green-500"
                          : "fas fa-times text-red-500"
                      } ml-2`}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <DataNotFound />
        )}
      </div>
    </div>
  );
}

export default ContractApprover;
