import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../App/Navbar";

const Permissions = () => {
  const roles = [
    { name: "Contract Approver", role: "contractApprover" },
    { name: "Invoice Creator", role: "invoiceCreator" },
    { name: "Invoice Approver", role: "invoiceApprover" },
    { name: "Vendor Approver", role: "vendorApprover" },
    { name: "Vendor Creator", role: "vendorCreator" },
    { name: "Goods Receipt Creator", role: "goodsReceiptCreator" },
  ];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8 text-center">
        <h2 className="text-4xl font-bold mb-8">Permissions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <Link key={index} to={`/permissions/${role.role.toLowerCase()}`}>
              <div className="custom-button transform transition-transform hover:scale-110 bg-white rounded-lg p-6 shadow-md flex flex-col items-center justify-center text-gray-800 h-40">
                <div className="text-center text-lg font-bold">
                  {role.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Permissions;
