import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../App/Navbar";

const GoodsForm = () => {
  const [formData, setFormData] = useState({
    purchaseOrderNumber: "",
    deliveryChallanDetails: "",
    documentReference: "",
    receiptType: "",
    quantity: "",
    itemDetails: "",
    numberOfMonthsService: "",
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
      const response = await axios.post(
        "http://localhost:3001/api/forms/goods",
        formData
      );

      if (response.status === 200) {
        console.log(response.data);
        toast.success("Goods receipt saved!");
      } else {
        toast.error("Error registering goods. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error registering goods. Please try again.");
    }

    setFormData({
      purchaseOrderNumber: "",
      deliveryChallanDetails: "",
      documentReference: "",
      receiptType: "",
      quantity: "",
      itemDetails: "",
      numberOfMonthsService: "",
    });
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white p-8 mx-auto my-10 shadow-2xl  max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Goods Receipting
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="purchaseOrderNumber"
              className="block text-sm font-medium text-gray-600"
            >
              Purchase Order Number
            </label>
            <input
              type="text"
              id="purchaseOrderNumber"
              name="purchaseOrderNumber"
              value={formData.purchaseOrderNumber}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="deliveryChallanDetails"
              className="block text-sm font-medium text-gray-600"
            >
              Delivery Challan Details
            </label>
            <textarea
              id="deliveryChallanDetails"
              name="deliveryChallanDetails"
              value={formData.deliveryChallanDetails}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="documentReference"
              className="block text-sm font-medium text-gray-600"
            >
              Document Reference (Invoice Number)
            </label>
            <input
              type="text"
              id="documentReference"
              name="documentReference"
              value={formData.documentReference}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="receiptType"
              className="block text-sm font-medium text-gray-600"
            >
              Type of Receipt
            </label>
            <select
              id="receiptType"
              name="receiptType"
              value={formData.receiptType}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Select Receipt Type</option>
              <option value="material">Material</option>
              <option value="services">Services</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-600"
            >
              Quantity
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="itemDetails"
              className="block text-sm font-medium text-gray-600"
            >
              Item Details
            </label>
            <textarea
              id="itemDetails"
              name="itemDetails"
              value={formData.itemDetails}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="numberOfMonthsService"
              className="block text-sm font-medium text-gray-600"
            >
              Number of Months Service
            </label>
            <input
              type="number"
              id="numberOfMonthsService"
              name="numberOfMonthsService"
              value={formData.numberOfMonthsService}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
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

export default GoodsForm;
