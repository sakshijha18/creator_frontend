import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import DataNotFound from "../DataNotFound";
import { RingLoader } from "react-spinners";
import { FaCheck, FaTimes } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <RingLoader color="#718096" loading={true} size={80} />
    </div>
  );
};

const MailRecords = () => {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMailData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/records/mails");
      setMails(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching mail data:", error);
      toast.error("Error fetching mail data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMailData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-white p-8 mx-auto my-10 shadow-2xl rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-10">Mail Records</h2>
        {loading ? (
          <Loader />
        ) : mails.length === 0 ? (
          <DataNotFound />
        ) : (
          <table className="w-full border">
            <thead>
              <tr>
                <th className="border p-2">Mail Id</th>
                <th className="border p-2">Consignment Number</th>
                <th className="border p-2">Company Name</th>
                <th className="border p-2">Document Reference</th>
                <th className="border p-2">Document Type</th>
                <th className="border p-2">Document Currency</th>
                <th className="border p-2">PO Number</th>
                <th className="border p-2">Number of Attachments</th>
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
              {mails.map((mail) => (
                <tr key={mail._id}>
                  <td className="border p-2">
                    <Link to={`/records/mails/${mail._id}`}>{mail._id}</Link>
                  </td>
                  <td className="border p-2">{mail.consignmentNumber}</td>
                  <td className="border p-2">{mail.companyName}</td>
                  <td className="border p-2">{mail.documentReference}</td>
                  <td className="border p-2">{mail.documentType}</td>
                  <td className="border p-2">{mail.documentCurrency}</td>
                  <td className="border p-2">{mail.poNumber}</td>
                  <td className="border p-2">{mail.numberOfAttachments}</td>

                  <td className="border p-2">
                    <Link to={`/records/mails/${mail._id}`}>
                    {mail.attachment1 ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/mails/${mail._id}`}>
                    {mail.attachment2 ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/mails/${mail._id}`}>
                    {mail.attachment3 ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/mails/${mail._id}`}>
                    {mail.attachment4 ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/mails/${mail._id}`}>
                    {mail.attachment5 ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/mails/${mail._id}`}>
                    {mail.attachment6 ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/mails/${mail._id}`}>{mail.status}</Link>
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

export default MailRecords;
