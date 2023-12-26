import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { RingLoader } from "react-spinners";

function ContractDetails() {
  const { id } = useParams();
  const [contract, setContract] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/records/contract/${id}`
        );
        const data = await response.json();
        setContract(data);
      } catch (error) {
        console.error("Error fetching contract details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContractDetails();
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
            Contract Details
          </h1>
          <div className="flex items-center justify-center">
            <table className="table-auto bg-white">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-bold">Contract Id:</td>
                  <td className="border px-4 py-2">{contract._id}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Company Name:</td>
                  <td className="border px-4 py-2">{contract.companyName}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Vendor Code:</td>
                  <td className="border px-4 py-2">{contract.vendorCode}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Address:</td>
                  <td className="border px-4 py-2">{contract.address}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Street:</td>
                  <td className="border px-4 py-2">{contract.street}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">State:</td>
                  <td className="border px-4 py-2">{contract.state}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Pin Code:
                  </td>
                  <td className="border px-4 py-2">{contract.pinCode}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Contact Person Name:</td>
                  <td className="border px-4 py-2">{contract.contactPersonName}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Contract Start Date:</td>
                  <td className="border px-4 py-2">{contract.contractStartDate}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Contract End Date:</td>
                  <td className="border px-4 py-2">{contract.contractEndDate}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Contract Type:</td>
                  <td className="border px-4 py-2">{contract.contractType}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-bold">Indemnity Clause Applicable:</td>
                  <td className="border px-4 py-2">{contract.indemnityClauseApplicable}</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContractDetails;
