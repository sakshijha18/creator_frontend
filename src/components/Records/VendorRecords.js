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

const VendorRecords = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredVendors, setFilteredVendors] = useState([]);

  const fetchVendorData = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const response = await axios.get(
        "http://localhost:3001/api/records/vendors"
      );

      // Filter records based on userId
      const filteredVendor = response.data.filter(
        (record) => record.recordOwnerId === userId
      );

      setVendors(filteredVendor);
      setFilteredVendors(filteredVendor);
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

  // Function to filter vendors based on search keyword
  const handleSearch = useCallback(() => {
    const filtered = vendors.filter((vendor) =>
      Object.values(vendor).some((value) =>
        String(value).toLowerCase().includes(searchKeyword.toLowerCase())
      )
    );
    setFilteredVendors(filtered);
  }, [searchKeyword, vendors]);

  // Handle search on input change
  useEffect(() => {
    handleSearch();
  }, [searchKeyword, vendors, handleSearch]);

  return (
    <div>
      <Navbar />
      <div className="bg-white p-8 mx-auto my-10 shadow-2xl rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Vendor Records
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
        ) : filteredVendors.length === 0 ? (
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
              {filteredVendors.map((vendor) => (
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
                      {vendor.panFile ? "Yes" : "No"}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.gstFile ? "Yes" : "No"}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.vatFile ? "Yes" : "No"}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.tinFile ? "Yes" : "No"}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.salesTaxFile ? "Yes" : "No"}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.msmeCertFile ? "Yes" : "No"}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.aoaFile ? "Yes" : "No"}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.moaFile ? "Yes" : "No"}
                    </Link>
                  </td>

                  <td className="border p-2">
                    <Link to={`/records/vendors/${vendor._id}`}>
                      {vendor.cancelledChequeFile ? "Yes" : "No"}
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
