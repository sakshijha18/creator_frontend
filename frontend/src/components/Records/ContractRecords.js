import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import DataNotFound from "../DataNotFound";
import { RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <RingLoader color="#718096" loading={true} size={80} />
    </div>
  );
};

const ContractRecords = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContractsData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/records/contracts");
      setContracts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contracts data:", error);
      toast.error("Error fetching contracts data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContractsData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-white p-8 mx-auto my-10 shadow-2xl rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Contracts Records
        </h2>
        {loading ? (
          <Loader />
        ) : contracts.length === 0 ? (
          <DataNotFound />
        ) : (
          <table className="w-full border">
            <thead>
              <tr>
                <th className="border p-2">Contract Id</th>
                <th className="border p-2">Contact Person Name</th>
                <th className="border p-2">Company Name</th>
                <th className="border p-2">Vendor Code</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">Street</th>
                <th className="border p-2">State</th>
                <th className="border p-2">Pin Code</th>
                <th className="border p-2">contractStartDate</th>
                <th className="border p-2">contractEndDate</th>
                <th className="border p-2">Contract Type</th>
                <th className="border p-2">IndemnityClauseApplicable</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contracts) => (
                <tr key={contracts._id}>
                  <td className="border p-2">
                    <Link to={`/records/contracts/${contracts._id}`}>{contracts._id}</Link>
                  </td>
                  <td className="border p-2">{contracts.contactPersonName}</td>
                  <td className="border p-2">{contracts.companyName}</td>
                  <td className="border p-2">{contracts.vendorCode}</td>
                  <td className="border p-2">{contracts.address}</td>
                  <td className="border p-2">{contracts.street}</td>
                  <td className="border p-2">{contracts.state}</td>
                  <td className="border p-2">{contracts.pinCode}</td>
                  <td className="border p-2">{contracts.contractStartDate}</td>
                  <td className="border p-2">{contracts.contractEndDate}</td>
                  <td className="border p-2">{contracts.contractType}</td>
                  <td className="border p-2">{contracts.indemnityClauseApplicable}</td>
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

export default ContractRecords;
