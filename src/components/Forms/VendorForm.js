import React, { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../App/Navbar";

const VendorForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    state: "",
    contactPerson: "",
    mobileNumber: "",
    supplierType: "",
    billSubmissionFrequency: "",
    gstInputCredit: "",
    tdsApplicabilityType: "",
    taxRegistrationNumber: "",
    companyRegistrationNumber: "",
    bankAccountNumber: "",
    ifscCode: "",
    branchName: "",
    registeredInSME: "",
    hasLowerTDSCertificate: "",
    status: "pending",
  });

  const fileInputsRef = useRef({
    panFile: null,
    gstFile: null,
    vatFile: null,
    tinFile: null,
    salesTaxFile: null,
    msmeCertFile: null,
    aoaFile: null,
    moaFile: null,
    cancelledChequeFile: null,
  });

  const handleChange = (e) => {
    const { name, type } = e.target;
    const value = type === "file" ? e.target.files[0] : e.target.value;

    // Retrieve user information from sessionStorage
    const userId = sessionStorage.getItem("userId");
    const userName = sessionStorage.getItem("userName");

    setFormData((prevFormData) => ({
      ...prevFormData,
      recordOwnerId: userId,
      recordOwnerName: userName,
      [name]: type === "file" ? e.target.files[0] : value,
    }));
  };

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    // Check if key is defined
    if (key && file) {
      fileInputsRef.current[key] = file;

      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [key]: file,
        }));
      };

      fileReader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    const newFormData = { ...initialFormData };
    for (const key of Object.keys(fileInputsRef.current)) {
      if (fileInputsRef.current[key]) {
        fileInputsRef.current[key].value = null;
      }
    }
    setFormData(newFormData);
  };

  const initialFormData = {
    companyName: "",
    address: "",
    state: "",
    contactPerson: "",
    mobileNumber: "",
    supplierType: "",
    billSubmissionFrequency: "",
    gstInputCredit: "",
    tdsApplicabilityType: "",
    taxRegistrationNumber: "",
    companyRegistrationNumber: "",
    bankAccountNumber: "",
    ifscCode: "",
    branchName: "",
    registeredInSME: "",
    hasLowerTDSCertificate: "",
    panFile: null,
    gstFile: null,
    vatFile: null,
    tinFile: null,
    salesTaxFile: null,
    msmeCertFile: null,
    aoaFile: null,
    moaFile: null,
    cancelledChequeFile: null,
    status: "pending",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataForUpload = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      if (
        [
          "status",
          "supplierType",
          "billSubmissionFrequency",
          "gstInputCredit",
          "tdsApplicabilityType",
          "registeredInSME",
          "hasLowerTDSCertificate",
        ].includes(key)
      ) {
        formDataForUpload.append(key, value);
      } else if (value instanceof File) {
        formDataForUpload.append(key, value, value.name);
      } else {
        formDataForUpload.append(key, value);
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/forms/vendor",
        formDataForUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        toast.success("Vendor registered successfully!");
        resetForm();
      } else {
        toast.error("Failed to register vendor. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting vendor form:", error);
      toast.error("Error registering vendor. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white p-8 mx-auto my-10 shadow-2xl max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Vendor Registration
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="contactPerson"
              className="block text-sm font-medium text-gray-600"
            >
              Contact Person Name
            </label>
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-600"
            >
              Mobile Number
            </label>
            <input
              type="phone"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="supplierType"
              className="block text-sm font-medium text-gray-600"
            >
              Type of Supplier
            </label>

            <select
              id="supplierType"
              name="supplierType"
              value={formData.supplierType}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Select Document Type</option>
              <option value="services">Services</option>
              <option value="goods">Goods or Services</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="billSubmissionFrequency"
              className="block text-sm font-medium text-gray-600"
            >
              Frequency of bill submission
            </label>

            <select
              id="billSubmissionFrequency"
              name="billSubmissionFrequency"
              value={formData.billSubmissionFrequency}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Select Document Type</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="gstInputCredit"
              className="block text-sm font-medium text-gray-600"
            >
              GST Input Cred
            </label>

            <select
              id="gstInputCredit"
              name="gstInputCredit"
              value={formData.gstInputCredit}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Select Document Type</option>
              <option value="vat">VAT</option>
              <option value="stroke">Stroke GST Input</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="tdsApplicabilityType"
              className="block text-sm font-medium text-gray-600"
            >
              TDS applicability type
            </label>

            <select
              id="tdsApplicabilityType"
              name="tdsApplicabilityType"
              value={formData.tdsApplicabilityType}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Select Document Currency</option>
              <option value="transporter">Transporter</option>
              <option value="hospital">Hospital</option>
              <option value="government">Government</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="taxRegistrationNumber"
              className="block text-sm font-medium text-gray-600"
            >
              Tax Registration Number
            </label>
            <input
              type="text"
              id="taxRegistrationNumber"
              name="taxRegistrationNumber"
              value={formData.taxRegistrationNumber}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md "
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="companyRegistrationNumber"
              className="block text-sm font-medium text-gray-600"
            >
              Company Registration Number
            </label>
            <input
              type="text"
              id="companyRegistrationNumber"
              name="companyRegistrationNumber"
              value={formData.companyRegistrationNumber}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="bankAccountNumber"
              className="block text-sm font-medium text-gray-600"
            >
              Bank Account Number
            </label>
            <input
              type="number"
              id="bankAccountNumber"
              name="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="ifscCode"
              className="block text-sm font-medium text-gray-600"
            >
              IFSC Code
            </label>
            <input
              type="text"
              id="ifscCode"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="branchName"
              className="block text-sm font-medium text-gray-600"
            >
              Branch Name
            </label>
            <input
              type="text"
              id="branchName"
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="registeredInSME"
              className="block text-sm font-medium text-gray-600"
            >
              Company is registered in SME
            </label>

            <select
              id="registeredInSME"
              name="registeredInSME"
              value={formData.registeredInSME}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Select Document Currency</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="hasLowerTDSCertificate"
              className="block text-sm font-medium text-gray-600"
            >
              Does vendor has has Lower TDS Certificate
            </label>

            <select
              id="hasLowerTDSCertificate"
              name="hasLowerTDSCertificate"
              value={formData.hasLowerTDSCertificate}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Select Document Currency</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="panFile"
              className="block text-sm font-medium text-gray-600"
            >
              PAN
            </label>
            <input
              type="file"
              id="panFile"
              name="panFile"
              onChange={(e) => handleFileChange(e, "panFile")}
              ref={(input) => (fileInputsRef.current["panFile"] = input)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="gstFile"
              className="block text-sm font-medium text-gray-600"
            >
              GST
            </label>
            <input
              type="file"
              id="gstFile"
              name="gstFile"
              onChange={(e) => handleFileChange(e, "gstFile")}
              ref={(input) => (fileInputsRef.current["gstFile"] = input)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="vatFile"
              className="block text-sm font-medium text-gray-600"
            >
              VAT
            </label>
            <input
              type="file"
              id="vatFile"
              name="vatFile"
              onChange={(e) => handleFileChange(e, "vatFile")}
              ref={(input) => (fileInputsRef.current["vatFile"] = input)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="tinFile"
              className="block text-sm font-medium text-gray-600"
            >
              TIN
            </label>
            <input
              type="file"
              id="tinFile"
              name="tinFile"
              onChange={(e) => handleFileChange(e, "tinFile")}
              ref={(input) => (fileInputsRef.current["tinFile"] = input)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="salesTaxFile"
              className="block text-sm font-medium text-gray-600"
            >
              Sales Tax
            </label>
            <input
              type="file"
              id="salesTaxFile"
              name="salesTaxFile"
              onChange={(e) => handleFileChange(e, "salesTaxFile")}
              ref={(input) => (fileInputsRef.current["salesTaxFile"] = input)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="msmeCertFile"
              className="block text-sm font-medium text-gray-600"
            >
              MSME Cert
            </label>
            <input
              type="file"
              id="msmeCertFile"
              name="msmeCertFile"
              onChange={(e) => handleFileChange(e, "msmeCertFile")}
              ref={(input) => (fileInputsRef.current["msmeCertFile"] = input)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="aoaFile"
              className="block text-sm font-medium text-gray-600"
            >
              Article of Association
            </label>
            <input
              type="file"
              id="aoaFile"
              name="aoaFile"
              onChange={(e) => handleFileChange(e, "aoaFile")}
              ref={(input) => (fileInputsRef.current["aoaFile"] = input)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="moaFile"
              className="block text-sm font-medium text-gray-600"
            >
              Memorandum of Association
            </label>
            <input
              type="file"
              id="moaFile"
              name="moaFile"
              onChange={(e) => handleFileChange(e, "moaFile")}
              ref={(input) => (fileInputsRef.current["moaFile"] = input)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="cancelledChequeFile"
              className="block text-sm font-medium text-gray-600"
            >
              Cancelled Cheque
            </label>
            <input
              type="file"
              id="cancelledChequeFile"
              name="cancelledChequeFile"
              onChange={(e) => handleFileChange(e, "cancelledChequeFile")}
              ref={(input) =>
                (fileInputsRef.current["cancelledChequeFile"] = input)
              }
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-600"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={(e) => handleChange(e)}
              className="mt-1 p-2 w-full border rounded-md"
              required
              disabled
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="onHold">Hold</option>
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

export default VendorForm;
