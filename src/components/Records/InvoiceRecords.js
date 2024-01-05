import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Navbar from "../App/Navbar";
import DataNotFound from "../App/DataNotFound";
import { RingLoader } from "react-spinners";
import { FaCheck, FaTimes } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <RingLoader color="#718096" loading={true} size={80} />
    </div>
  );
};

const InvoiceRecords = () => {
  const [invoice, setInvoice] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoiceData = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const response = await axios.get(
        "http://localhost:3001/api/records/invoices"
      );

      // Filter records based on userId
      const filteredInvoice = response.data.filter(
        (record) => record.recordOwnerId === userId
      );

      setInvoice(filteredInvoice);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching invoice data:", error);
      toast.error("Error fetching invoice data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoiceData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-white p-8 mx-auto my-10 shadow-2xl rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Invoice Records
        </h2>
        {loading ? (
          <Loader />
        ) : invoice.length === 0 ? (
          <DataNotFound />
        ) : (
          <table className="w-full border">
            <thead>
              <tr>
                <th className="border p-2">Invoice Id</th>
                <th className="border p-2">Company Name</th>
                <th className="border p-2">Document Reference</th>
                <th className="border p-2">Document Type</th>
                <th className="border p-2">Document Currency</th>
                <th className="border p-2">PO Number</th>
                <th className="border p-2">Instructions</th>
                <th className="border p-2">Attachment 1</th>
                <th className="border p-2">Attachment 2</th>
                <th className="border p-2">Attachment 3</th>
                <th className="border p-2">Attachment 4</th>
                <th className="border p-2">Attachment 5</th>
                <th className="border p-2">Attachment 6</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoice.map((invoice) => (
                <tr key={invoice._id}>
                  <td className="border p-2">
                    <Link to={`/records/invoices/${invoice._id}`}>{invoice._id}</Link>
                  </td>
                  <td className="border p-2">{invoice.companyName}</td>
                  <td className="border p-2">{invoice.documentReference}</td>
                  <td className="border p-2">{invoice.documentType}</td>
                  <td className="border p-2">{invoice.documentCurrency}</td>
                  <td className="border p-2">{invoice.poNumber}</td>
                  <td className="border p-2">{invoice.instructions}</td>

                  <td className="border p-2">
                    <Link to={`/records/invoices/${invoice._id}`}>
                      {invoice.attachment1 ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/invoices/${invoice._id}`}>
                      {invoice.attachment2 ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/invoices/${invoice._id}`}>
                      {invoice.attachment3 ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/invoices/${invoice._id}`}>
                      {invoice.attachment4 ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/invoices/${invoice._id}`}>
                      {invoice.attachment5 ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/invoices/${invoice._id}`}>
                      {invoice.attachment6 ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/invoices/${invoice._id}`}>{invoice.status}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default InvoiceRecords;
