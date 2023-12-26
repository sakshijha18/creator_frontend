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

const VendorRecords = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVendorData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/records/vendors");
      setVendors(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vendor data:", error);
      toast.error("Error fetching vendor data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-white p-8 mx-auto my-10 shadow-2xl rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Vendor Records
        </h2>
        {loading ? (
          <Loader />
        ) : vendors.length === 0 ? (
          <DataNotFound />
        ) : (
          <table className="w-full border">
            <thead>
              <tr>
              <th className="border p-2">Vendor Id</th>
                <th className="border p-2">Company Name</th>
                <th className="border p-2">Contact Person</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">State</th>
                <th className="border p-2">Mobile Number</th>
                <th className="border p-2">Supplier Type</th>
                <th className="border p-2">Bill Submission Frequency</th>
                <th className="border p-2">GST Input Credit</th>
                <th className="border p-2">TDS Applicability Type</th>
                <th className="border p-2">Tax Registration Number</th>
                <th className="border p-2">Company Registration Number</th>
                <th className="border p-2">Bank Account Number</th>
                <th className="border p-2">IFSC Code</th>
                <th className="border p-2">Branch Name</th>
                <th className="border p-2">Registered in SME</th>
                <th className="border p-2">Has Lower TDS Certificate</th>
                <th className="border p-2">PAN</th>
                <th className="border p-2">GST</th>
                <th className="border p-2">VAT</th>
                <th className="border p-2">TIN</th>
                <th className="border p-2">Sales Tax</th>
                <th className="border p-2">MSME Cert</th>
                <th className="border p-2">Article of Association</th>
                <th className="border p-2">Memorandum of Association</th>
                <th className="border p-2">Cancelled Cheque</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor._id}>

                <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor._id}
                    </Link>
                  </td>
                
                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.companyName}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.contactPerson}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.address}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.state}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.mobileNumber}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.supplierType}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.billSubmissionFrequency}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.gstInputCredit}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.tdsApplicabilityType}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.taxRegistrationNumber}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.companyRegistrationNumber}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.bankAccountNumber}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.ifscCode}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.branchName}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.registeredInSME}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.hasLowerTDSCertificate}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                    {vendor.panFile ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                    {vendor.gstFile ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                    {vendor.vatFile ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                    {vendor.tinFile ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                    {vendor.salesTaxFile ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                    {vendor.msmeCertFile ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                    {vendor.aoaFile ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                    {vendor.moaFile ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                    {vendor.cancelledChequeFile ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                    </Link>
                  </td>


                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.status}
                    </Link>
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

export default VendorRecords;
