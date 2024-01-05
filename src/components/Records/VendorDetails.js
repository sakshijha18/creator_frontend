import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../App/Navbar";
import { RingLoader } from "react-spinners";

function VendorDetails() {
  const { id } = useParams();
  const [vendor, setVendor] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/records/vendors/${id}`
        );
        const data = await response.json();
        setVendor(data);
      } catch (error) {
        console.error("Error fetching vendor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorDetails();
  }, [id]);

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
            Vendor Details
          </h1>
          <div className="flex items-center justify-center">
            <table className="table-auto bg-white">
              <tbody>

                <tr>
                  <td className="border px-4 py-2 font-bold">ID:</td>
                  <td className="border px-4 py-2">{vendor._id}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Contact Person:</td>
                  <td className="border px-4 py-2">{vendor.contactPerson}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Record Owner Id:</td>
                  <td className="border px-4 py-2">{vendor.recordOwnerId}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Record Owner Name:</td>
                  <td className="border px-4 py-2">{vendor.recordOwnerName}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Company Name:</td>
                  <td className="border px-4 py-2">{vendor.companyName}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Address:</td>
                  <td className="border px-4 py-2">{vendor.address}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">State:</td>
                  <td className="border px-4 py-2">{vendor.state}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Mobile Number:</td>
                  <td className="border px-4 py-2">{vendor.mobileNumber}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Supplier Type:</td>
                  <td className="border px-4 py-2">{vendor.supplierType}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Bill Submission Frequency:</td>
                  <td className="border px-4 py-2">{vendor.billSubmissionFrequency}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">GST Input Credit:</td>
                  <td className="border px-4 py-2">{vendor.gstInputCredit}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">TDS Applicability Type:</td>
                  <td className="border px-4 py-2">{vendor.tdsApplicabilityType}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Tax Registration Number:</td>
                  <td className="border px-4 py-2">{vendor.taxRegistrationNumber}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Company Registration Number:</td>
                  <td className="border px-4 py-2">{vendor.companyRegistrationNumber}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Bank Account Number:</td>
                  <td className="border px-4 py-2">{vendor.bankAccountNumber}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">IFSC Code:</td>
                  <td className="border px-4 py-2">{vendor.ifscCode}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Branch Name:</td>
                  <td className="border px-4 py-2">{vendor.branchName}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Registered in SME:</td>
                  <td className="border px-4 py-2">{vendor.registeredInSME}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Has Lower TDS Certificate:</td>
                  <td className="border px-4 py-2">{vendor.hasLowerTDSCertificate}</td>
                </tr>

                <tr>
                <td className="border px-4 py-2 font-bold">PAN:</td>
                <td className="border px-4 py-2">
                  {vendor.panFile ? vendor.panFile.fileName : "N/A"}
                </td>
              </tr>

              <tr>
                <td className="border px-4 py-2 font-bold">GST:</td>
                <td className="border px-4 py-2">
                  {vendor.gstFile ? vendor.gstFile.fileName : "N/A"}
                </td>
              </tr>

              <tr>
                <td className="border px-4 py-2 font-bold">VAT:</td>
                <td className="border px-4 py-2">
                  {vendor.vatFile ? vendor.vatFile.fileName : "N/A"}
                </td>
              </tr>

              <tr>
                <td className="border px-4 py-2 font-bold">TIN:</td>
                <td className="border px-4 py-2">
                  {vendor.tinFile ? vendor.tinFile.fileName : "N/A"}
                </td>
              </tr>

              <tr>
                <td className="border px-4 py-2 font-bold">Sales Tax:</td>
                <td className="border px-4 py-2">
                  {vendor.salesTaxFile ? vendor.salesTaxFile.fileName : "N/A"}
                </td>
              </tr>

              <tr>
                <td className="border px-4 py-2 font-bold">MSME Cert:</td>
                <td className="border px-4 py-2">
                  {vendor.msmeCertFile ? vendor.msmeCertFile.fileName : "N/A"}
                </td>
              </tr>

              <tr>
                <td className="border px-4 py-2 font-bold">Article of Association:</td>
                <td className="border px-4 py-2">
                  {vendor.aoaFile ? vendor.aoaFile.fileName : "N/A"}
                </td>
              </tr>

              <tr>
                <td className="border px-4 py-2 font-bold">Memorandum of Association:</td>
                <td className="border px-4 py-2">
                  {vendor.moaFile ? vendor.moaFile.fileName : "N/A"}
                </td>
              </tr>

              <tr>
                  <td className="border px-4 py-2 font-bold">Status:</td>
                  <td className="border px-4 py-2">{vendor.status}</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default VendorDetails;
