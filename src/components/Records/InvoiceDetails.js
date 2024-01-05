import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../App/Navbar";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InvoiceDetails() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState({});
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");
  const [editingStatus, setEditingStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/records/invoices/${id}`
        );
        const data = await response.json();
        setInvoice(data);

        const userResponse = await fetch(
          `http://localhost:3001/api/records/users/${data.recordOwnerId}`
        );
        const userData = await userResponse.json();
        setUserRole(userData.role);
      } catch (error) {
        console.error("Error fetching invoice details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceDetails();
  }, [id]);

  const handleStatusChange = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/records/invoices/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: selectedStatus,
          }),
        }
      );

      if (response.ok) {
        setInvoice({ ...invoice, status: selectedStatus });

        setEditingStatus(false);

        toast.success("Status Changed Successfully", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        console.error("Failed to update status");

        toast.error("Failed to update status", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
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
            Invoice Details
          </h1>
          <div className="flex items-center justify-center">
            <table className="table-auto bg-white">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-bold">Invoice Id:</td>
                  <td className="border px-4 py-2">{invoice._id}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Company Name:</td>
                  <td className="border px-4 py-2">{invoice.companyName}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Record Owner Id:
                  </td>
                  <td className="border px-4 py-2">{invoice.recordOwnerId}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Record Owner Name:
                  </td>
                  <td className="border px-4 py-2">
                    {invoice.recordOwnerName}
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Document Reference:
                  </td>
                  <td className="border px-4 py-2">
                    {invoice.documentReference}
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Document Type:</td>
                  <td className="border px-4 py-2">{invoice.documentType}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Document Currency:
                  </td>
                  <td className="border px-4 py-2">
                    {invoice.documentCurrency}
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">PO Number:</td>
                  <td className="border px-4 py-2">{invoice.poNumber}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Instructions:</td>
                  <td className="border px-4 py-2">{invoice.instructions}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Attachment 1:</td>
                  <td className="border px-4 py-2">
                    {invoice.attachment1 ? invoice.attachment1.fileName : "N/A"}
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Attachment 2:</td>
                  <td className="border px-4 py-2">
                    {invoice.attachment2 ? invoice.attachment2.fileName : "N/A"}
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Attachment 3:</td>
                  <td className="border px-4 py-2">
                    {invoice.attachment3 ? invoice.attachment3.fileName : "N/A"}
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Attachment 4:</td>
                  <td className="border px-4 py-2">
                    {invoice.attachment4 ? invoice.attachment4.fileName : "N/A"}
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Attachment 5:</td>
                  <td className="border px-4 py-2">
                    {invoice.attachment5 ? invoice.attachment5.fileName : "N/A"}
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Attachment 6:</td>
                  <td className="border px-4 py-2">
                    {invoice.attachment6 ? invoice.attachment6.fileName : "N/A"}
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Status:</td>
                  <td className="border px-4 py-2">
                    {editingStatus ? (
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approve">Approve</option>
                        <option value="Reject">Reject</option>
                        <option value="Hold">Hold</option>
                      </select>
                    ) : (
                      invoice.status
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {userRole === "Vendor" && (
        <div className="flex items-center justify-center mt-6">
          {editingStatus ? (
            <button
              onClick={handleStatusChange}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditingStatus(true)}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Set Status
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default InvoiceDetails;
