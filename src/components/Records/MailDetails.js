import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../App/Navbar";
import { RingLoader } from "react-spinners";

function MailDetails() {
  const { id } = useParams();
  const [mail, setMail] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMailDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/records/mails/${id}`
        );
        const data = await response.json();
        setMail(data);
      } catch (error) {
        console.error("Error fetching mail details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMailDetails();
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
            Mail Details
          </h1>
          <div className="flex items-center justify-center">
            <table className="table-auto bg-white">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-bold">Mail Id:</td>
                  <td className="border px-4 py-2">{mail._id}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Record Owner Id:</td>
                  <td className="border px-4 py-2">{mail.recordOwnerId}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Record Owner Name:</td>
                  <td className="border px-4 py-2">{mail.recordOwnerName}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Consignment Number:
                  </td>
                  <td className="border px-4 py-2">{mail.consignmentNumber}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Company Name:</td>
                  <td className="border px-4 py-2">{mail.companyName}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Document Reference:
                  </td>
                  <td className="border px-4 py-2">{mail.documentReference}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Document Type:</td>
                  <td className="border px-4 py-2">{mail.documentType}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Document Currency:
                  </td>
                  <td className="border px-4 py-2">{mail.documentCurrency}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">PO Number:</td>
                  <td className="border px-4 py-2">{mail.poNumber}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Attachment 1:</td>
                  <td className="border px-4 py-2">
                    {mail.attachment1 ? (
                      <Link
                        to={`/image/${mail._id}/attachment1`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {mail.attachment1.fileName}
                      </Link>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Attachment 2:</td>
                  <td className="border px-4 py-2">
                    {mail.attachment2 ? (
                      <a
                        href={`data:${
                          mail.attachment2.contentType
                        };base64,${mail.attachment2.data.toString("base64")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {mail.attachment2.fileName}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Attachment 3:</td>
                  <td className="border px-4 py-2">
                    {mail.attachment3 ? (
                      <a
                        href={`data:${
                          mail.attachment3.contentType
                        };base64,${mail.attachment3.data.toString("base64")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {mail.attachment3.fileName}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Attachment 4:</td>
                  <td className="border px-4 py-2">
                    {mail.attachment4 ? (
                      <a
                        href={`data:${
                          mail.attachment4.contentType
                        };base64,${mail.attachment4.data.toString("base64")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {mail.attachment4.fileName}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Attachment 5:</td>
                  <td className="border px-4 py-2">
                    {mail.attachment5 ? (
                      <a
                        href={`data:${
                          mail.attachment5.contentType
                        };base64,${mail.attachment5.data.toString("base64")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {mail.attachment5.fileName}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Attachment 6:</td>
                  <td className="border px-4 py-2">
                    {mail.attachment6 ? (
                      <a
                        href={`data:${
                          mail.attachment6.contentType
                        };base64,${mail.attachment6.data.toString("base64")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {mail.attachment6.fileName}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Status:</td>
                  <td className="border px-4 py-2">{mail.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default MailDetails;
