import React, { useState, useEffect } from "react";
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

const GoodsRecords = () => {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGoodsData = async () => {

    try {
      const userId = sessionStorage.getItem("userId");
      const response = await axios.get("http://localhost:3001/api/records/goods");

      const filteredGoods = response.data.filter(
        (record) => record.recordOwnerId === userId
      );
      setGoods(filteredGoods);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching goods data:", error);
      toast.error("Error fetching goods data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoodsData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-white p-8 mx-auto my-10 shadow-2xl rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Goods Records
        </h2>

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by keyword"
            className="border px-4 py-2 w-full rounded-xl"
            // value={searchKeyword}
            // onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>


        {loading ? (
          <Loader />
        ) : goods.length === 0 ? (
          <DataNotFound />
        ) : (
          <table className="w-full border">
            <thead>
              <tr>
                <th className="border p-2">Goods Id</th>
                <th className="border p-2">Purchase Order Number</th>
                <th className="border p-2">Delivery Challan Details</th>
                <th className="border p-2">Document Reference</th>
                <th className="border p-2">Recepient Type</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Item Details</th>
                <th className="border p-2">Number of Months Service</th>
              </tr>
            </thead>
            <tbody>
              {goods.map((goods) => (
                <tr key={goods._id}>
                  <td className="border p-2">
                    <Link to={`/records/goods/${goods._id}`}>{goods._id}</Link>
                  </td>
                  <td className="border p-2">{goods.purchaseOrderNumber}</td>
                  <td className="border p-2">{goods.deliveryChallanDetails}</td>
                  <td className="border p-2">{goods.documentReference}</td>
                  <td className="border p-2">{goods.receiptType}</td>
                  <td className="border p-2">{goods.quantity}</td>
                  <td className="border p-2">{goods.itemDetails}</td>
                  <td className="border p-2">{goods.numberOfMonthsService}</td>
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

export default GoodsRecords;
