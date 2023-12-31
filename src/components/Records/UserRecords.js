import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataNotFound from "../App/DataNotFound";
import Navbar from "../App/Navbar";
import { RingLoader } from "react-spinners";

function UserRecords() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/records/users?search=${encodeURIComponent(
            searchKeyword
          )}`
        );
        const data = await response.json();

        if (data.length === 0) {
          setUsers([]);
        } else {
          setUsers(data);
        }
      } catch (error) {
        console.error("Error fetching user records:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchKeyword]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 bg-white">
        <h1 className="text-3xl font-bold mb-4 text-center">User Records</h1>

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by ID, Name, or Email..."
            className="border px-4 py-2 w-full rounded-xl"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>

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
                <th rowSpan={2} className="border px-4 py-2">
                  Status
                </th>
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
                    <Link to={`/records/users/${user._id}`}>{user.status}</Link>
                  </td>

                  <td className="border px-4 py-2 text-center">
                    <Link to={`/records/users/${user._id}`}>
                      {user.permissions.contractApprover ? "Yes" : "No"}
                    </Link>
                  </td>

                  <td className="border px-4 py-2 text-center">
                    <Link to={`/records/users/${user._id}`}>
                      {user.permissions.invoiceCreator ? "Yes" : "No"}
                    </Link>
                  </td>

                  <td className="border px-4 py-2 text-center">
                    <Link to={`/records/users/${user._id}`}>
                      {user.permissions.invoiceApprover ? "Yes" : "No"}
                    </Link>
                  </td>

                  <td className="border px-4 py-2 text-center">
                    <Link to={`/records/users/${user._id}`}>
                      {user.permissions.vendorApprover ? "Yes" : "No"}
                    </Link>
                  </td>

                  <td className="border px-4 py-2 text-center">
                    <Link to={`/records/users/${user._id}`}>
                      {user.permissions.vendorCreator ? "Yes" : "No"}
                    </Link>
                  </td>

                  <td className="border px-4 py-2 text-center">
                    <Link to={`/records/users/${user._id}`}>
                      {user.permissions.goodsReceiptCreator ? "Yes" : "No"}
                    </Link>
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

export default UserRecords;
