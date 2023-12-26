import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { RingLoader } from "react-spinners";

function InvoiceDetails() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/records/invoices/${id}`
        );
        const data = await response.json();
        setInvoice(data);
      } catch (error) {
        console.error("Error fetching invoice details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceDetails();
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
            Invoice Details
          </h1>
          <div className="flex items-center justify-center">
            <table className="table-auto bg-white">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-bold">Invoice Id:</td>
                  <td className="border px-4 py-2">{invoice._id}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Company Name:</td>
                  <td className="border px-4 py-2">{invoice.companyName}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Document Reference:</td>
                  <td className="border px-4 py-2">{invoice.documentReference}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Document Type:</td>
                  <td className="border px-4 py-2">{invoice.documentType}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Document Currency:</td>
                  <td className="border px-4 py-2">{invoice.documentCurrency}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">PO Number:</td>
                  <td className="border px-4 py-2">{invoice.poNumber}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Instructions:
                  </td>
                  <td className="border px-4 py-2">{invoice.instructions}</td>
                </tr>


                <tr>
                  <td className="border px-4 py-2 font-bold">Attachment 1:</td>
                  <td className="border px-4 py-2">
                    {invoice.attachment1 ? invoice.attachment1.fileName : "N/A"}
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Attachment 2:</td>
                  <td className="border px-4 py-2">
                    {invoice.attachment2 ? invoice.attachment2.fileName : "N/A"}
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Attachment 3:</td>
                  <td className="border px-4 py-2">
                    {invoice.attachment3 ? invoice.attachment3.fileName : "N/A"}
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Attachment 4:</td>
                  <td className="border px-4 py-2">
                    {invoice.attachment4 ? invoice.attachment4.fileName : "N/A"}
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Attachment 5:</td>
                  <td className="border px-4 py-2">
                    {invoice.attachment5 ? invoice.attachment5.fileName : "N/A"}
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Attachment 6:</td>
                  <td className="border px-4 py-2">
                    {invoice.attachment6 ? invoice.attachment6.fileName : "N/A"}
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Status:</td>
                  <td className="border px-4 py-2">{invoice.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvoiceDetails;
