import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../App/Navbar";
import { RingLoader } from "react-spinners";

function GoodsDetails() {
  const { id } = useParams();
  const [goods, setGoods] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoodsDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/records/goods/${id}`
        );
        const data = await response.json();
        setGoods(data);
      } catch (error) {
        console.error("Error fetching goods details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoodsDetails();
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
            Goods Details
          </h1>
          <div className="flex items-center justify-center">
            <table className="table-auto bg-white">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-bold">Goods Id:</td>
                  <td className="border px-4 py-2">{goods._id}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Record Owner Id:</td>
                  <td className="border px-4 py-2">{goods.recordOwnerId}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Record Owner Name:</td>
                  <td className="border px-4 py-2">{goods.recordOwnerName}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Purchase Order Number:</td>
                  <td className="border px-4 py-2">{goods.purchaseOrderNumber}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Delivery Challan Details:</td>
                  <td className="border px-4 py-2">{goods.deliveryChallanDetails}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Document Reference:</td>
                  <td className="border px-4 py-2">{goods.documentReference}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Receipt Type:</td>
                  <td className="border px-4 py-2">{goods.receiptType}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Quantity:</td>
                  <td className="border px-4 py-2">{goods.quantity}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Item Details:
                  </td>
                  <td className="border px-4 py-2">{goods.itemDetails}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Number of Months Service:</td>
                  <td className="border px-4 py-2">{goods.numberOfMonthsService}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default GoodsDetails;
