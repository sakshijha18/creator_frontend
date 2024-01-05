import React, { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../App/Navbar";

const InvoiceForm = () => {

  const [formData, setFormData] = useState({
    companyName: "",
    documentReference: "",
    documentType: "",
    documentCurrency: "",
    poNumber: "",
    instructions: "",
    status: "pending",
  });

  const fileInputsRef = useRef({
    attachment1: null,
    attachment2: null,
    attachment3: null,
    attachment4: null,
    attachment5: null,
    attachment6: null,
  });

  const handleChange = (e) => {
    const { name, type } = e.target;
    const userId = sessionStorage.getItem("userId");
    const userName = sessionStorage.getItem("userName");
    const value = type === "file" ? e.target.files[0] : e.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      recordOwnerId: userId,
      recordOwnerName: userName,
      [name]: type === "file" ? e.target.files[0] : value,
    }));
  };

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    fileInputsRef.current[key] = file;
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [key]: file,
      }));
    };

    if (file) {
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
    documentReference: "",
    documentType: "",
    documentCurrency: "",
    poNumber: "",
    instructions: "",
    attachment1: null,
    attachment2: null,
    attachment3: null,
    attachment4: null,
    attachment5: null,
    attachment6: null,
    status: "pending",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataForUpload = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      if (["documentType", "documentCurrency", "status"].includes(key)) {
        formDataForUpload.append(key, value);
      } else if (value instanceof File) {
        formDataForUpload.append(key, value, value.name);
      } else {
        formDataForUpload.append(key, value);
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/forms/invoice",
        formDataForUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        toast.success("Invoice created successfully!");
        resetForm();
      } else {
        toast.error("Failed to create the Invoice. Please try again later.");
      }
    } catch (error) {
      console.error("Error creating Invoice:", error);
      toast.error("Error creating Invoice. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white p-8 mx-auto my-10 shadow-2xl  max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Invoice Submission
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
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="documentReference"
              className="block text-sm font-medium text-gray-600"
            >
              Document reference (invoice number)
            </label>
            <input
              type="text"
              id="documentReference"
              name="documentReference"
              value={formData.documentReference}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="documentType"
              className="block text-sm font-medium text-gray-600"
            >
              Type of document
            </label>

            <select
              id="documentType"
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Select Document Type</option>
              <option value="invoice">Invoice</option>
              <option value="debitNote">Debit Note</option>
              <option value="creditNote">Credit Note</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="documentCurrency"
              className="block text-sm font-medium text-gray-600"
            >
              Document Currency
            </label>
            <select
              id="documentCurrency"
              name="documentCurrency"
              value={formData.documentCurrency}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Select Document Currency</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="poNumber"
              className="block text-sm font-medium text-gray-600"
            >
              PO no.
            </label>
            <input
              type="text"
              id="poNumber"
              name="poNumber"
              value={formData.poNumber}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="instructions"
              className="block text-sm font-medium text-gray-600"
            >
              Instructions / Remarks
            </label>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="attachment1"
              className="block text-sm font-medium text-gray-600"
            >
              Attachment 1
            </label>
            <input
              type="file"
              id="attachment1"
              name="attachment1"
              onChange={(e) => handleFileChange(e, "attachment1")}
              ref={(input) => (fileInputsRef.current["attachment1"] = input)}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formData.attachments1 && (
              <p className="mt-2 text-sm text-gray-500">
                Selected file: {formData.attachments1.name}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="attachment2"
              className="block text-sm font-medium text-gray-600"
            >
              Attachment 2
            </label>
            <input
              type="file"
              id="attachment2"
              name="attachment2"
              onChange={(e) => handleFileChange(e, "attachment2")}
              ref={(input) => (fileInputsRef.current["attachment2"] = input)}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formData.attachments2 && (
              <p className="mt-2 text-sm text-gray-500">
                Selected file: {formData.attachments2.name}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="attachment3"
              className="block text-sm font-medium text-gray-600"
            >
              Attachment 3
            </label>
            <input
              type="file"
              id="attachment3"
              name="attachment3"
              onChange={(e) => handleFileChange(e, "attachment3")}
              ref={(input) => (fileInputsRef.current["attachment3"] = input)}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formData.attachments3 && (
              <p className="mt-2 text-sm text-gray-500">
                Selected file: {formData.attachments3.name}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="attachment4"
              className="block text-sm font-medium text-gray-600"
            >
              Attachment 4
            </label>
            <input
              type="file"
              id="attachment4"
              name="attachment4"
              onChange={(e) => handleFileChange(e, "attachment4")}
              ref={(input) => (fileInputsRef.current["attachment4"] = input)}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formData.attachments4 && (
              <p className="mt-2 text-sm text-gray-500">
                Selected file: {formData.attachments4.name}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="attachment5"
              className="block text-sm font-medium text-gray-600"
            >
              Attachment 5
            </label>
            <input
              type="file"
              id="attachment5"
              name="attachment5"
              onChange={(e) => handleFileChange(e, "attachment5")}
              ref={(input) => (fileInputsRef.current["attachment5"] = input)}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formData.attachments5 && (
              <p className="mt-2 text-sm text-gray-500">
                Selected file: {formData.attachments5.name}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="attachment6"
              className="block text-sm font-medium text-gray-600"
            >
              Attachment 6
            </label>
            <input
              type="file"
              id="attachment6"
              name="attachment6"
              onChange={(e) => handleFileChange(e, "attachment6")}
              ref={(input) => (fileInputsRef.current["attachment6"] = input)}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formData.attachments6 && (
              <p className="mt-2 text-sm text-gray-500">
                Selected file: {formData.attachments6.name}
              </p>
            )}
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

export default InvoiceForm;
