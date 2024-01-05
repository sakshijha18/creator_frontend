import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Navbar from "../App/Navbar";
import DataNotFound from "../App/DataNotFound";
import { RingLoader } from "react-spinners";

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
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredMails, setFilteredMails] = useState([]);

  const fetchMailData = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const response = await axios.get(
        "http://localhost:3001/api/records/mails"
      );

      // Filter records based on userId
      const filteredMails = response.data.filter(
        (record) => record.recordOwnerId === userId
      );

      setMails(filteredMails);
      setFilteredMails(filteredMails);
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

  // Function to filter mails based on search keyword
  const handleSearch = useCallback(() => {
    const filtered = mails.filter((mail) =>
      Object.values(mail).some((value) =>
        String(value).toLowerCase().includes(searchKeyword.toLowerCase())
      )
    );
    setFilteredMails(filtered);
  }, [searchKeyword, mails]);

  // Handle search on input change
  useEffect(() => {
    handleSearch();
  }, [searchKeyword, mails, handleSearch]);

  return (
    <div>
      <Navbar />
      <div className="bg-white p-8 mx-auto my-10 shadow-2xl rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Mail Records
        </h2>

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by keyword"
            className="border px-4 py-2 w-full rounded-xl"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>

        {loading ? (
          <Loader />
        ) : filteredMails.length === 0 ? (
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
              {filteredMails.map((mail) => (
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

                  <td className="border p-2">
                    <Link to={`/records/mails/${mail._id}`}>
                      {mail.attachment1 ? "Yes" : "No"}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/mails/${mail._id}`}>
                      {mail.attachment2 ? "Yes" : "No"}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/mails/${mail._id}`}>
                      {mail.attachment3 ? "Yes" : "No"}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/mails/${mail._id}`}>
                      {mail.attachment4 ? "Yes" : "No"}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/mails/${mail._id}`}>
                      {mail.attachment5 ? "Yes" : "No"}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/mails/${mail._id}`}>
                      {mail.attachment6 ? "Yes" : "No"}
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
