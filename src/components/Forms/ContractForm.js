import React, { useState } from "react";
import axios from "axios";
import Navbar from "../App/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContractForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    vendorCode: "",
    address: "",
    street: "",
    state: "",
    pinCode: "",
    contactPersonName: "",
    contractStartDate: "",
    contractEndDate: "",
    contractType: "",
    indemnityClauseApplicable: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Retrieve user information from sessionStorage
    const userId = sessionStorage.getItem("userId");
    const userName = sessionStorage.getItem("userName");

    setFormData((prevData) => ({
      ...prevData,
      recordOwnerId: userId,
      recordOwnerName: userName,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:3001/api/forms/contract",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        toast.success("Contract successfully!");
      } else {
        toast.error("Error registering contract. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error registering contract. Please try again.");
    }

    setFormData({
      companyName: "",
      vendorCode: "",
      address: "",
      street: "",
      state: "",
      pinCode: "",
      contactPersonName: "",
      contractStartDate: "",
      contractEndDate: "",
      contractType: "",
      indemnityClauseApplicable: "",
    });
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white p-8 mx-auto my-10 shadow-2xl max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-lg">
        <h2 className="text-2xl font-semibold  text-center mb-10">
          Register Contract
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-600"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="vendorCode"
              className="block text-sm font-medium text-gray-600"
            >
              Vendor Code
            </label>
            <input
              type="text"
              id="vendorCode"
              name="vendorCode"
              value={formData.vendorCode}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-600"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-600"
            >
              Street
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-600"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="pinCode"
              className="block text-sm font-medium text-gray-600"
            >
              Pin Code
            </label>
            <input
              type="text"
              id="pinCode"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="contactPersonName"
              className="block text-sm font-medium text-gray-600"
            >
              Contact Person Name
            </label>
            <input
              type="text"
              id="contactPersonName"
              name="contactPersonName"
              value={formData.contactPersonName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="contractStartDate"
              className="block text-sm font-medium text-gray-600"
            >
              Contract Start Date
            </label>
            <input
              type="date"
              id="contractStartDate"
              name="contractStartDate"
              value={formData.contractStartDate}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="contractEndDate"
              className="block text-sm font-medium text-gray-600"
            >
              Contract End Date
            </label>
            <input
              type="date"
              id="contractEndDate"
              name="contractEndDate"
              value={formData.contractEndDate}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="contractType"
              className="block text-sm font-medium text-gray-600"
            >
              Type of Contract
            </label>
            <select
              id="contractType"
              name="contractType"
              value={formData.contractType}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Select Contract Type</option>
              <option value="employmentContract">Employment Contract</option>
              <option value="leaseAgreement">Lease Agreement</option>
              <option value="salesAgreement">Sales Agreement</option>
              <option value="serviceAgreement">Service Agreement</option>
              <option value="independentContractorAgreement">
                Independent Contractor Agreement
              </option>
              <option value="nonDisclosureAgreement">
                Non-Disclosure Agreement
              </option>
              <option value="nonCompeteAgreement">Non-Compete Agreement</option>
              <option value="consultingAgreement">Consulting Agreement</option>
              <option value="partnershipAgreement">
                Partnership Agreement
              </option>
              <option value="franchiseAgreement">Franchise Agreement</option>
              <option value="licensingAgreement">Licensing Agreement</option>
              <option value="loanAgreement">Loan Agreement</option>
              <option value="purchaseAgreement">Purchase Agreement</option>
              <option value="jointVentureAgreement">
                Joint Venture Agreement
              </option>
              <option value="confidentiallyAgreement">
                Confidentially Agreement
              </option>
              <option value="softwareLicenseAgreement">
                Software License Agreement
              </option>
              <option value="sponsorshipAgreement">
                Sponsorship Agreement
              </option>
              <option value="distributionAgreement">
                Distribution Agreement
              </option>
              <option value="intellectualPropertyAssignmentAgreement">
                Intellectual Property Assignment Agreement
              </option>
              <option value="agencyAgreement">Agency Agreement</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="indemnityClauseApplicable"
              className="block text-sm font-medium text-gray-600"
            >
              Indemnity Clause Applicable
            </label>
            <select
              id="indemnityClauseApplicable"
              name="indemnityClauseApplicable"
              value={formData.indemnityClauseApplicable}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-gray-800 text-white pl-4 pr-4 pt-2 pb-2 rounded-md hover:bg-gray-900 focus:outline-none mt-4"
            >
              Submit
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default ContractForm;
