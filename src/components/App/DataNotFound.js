import React from "react";
import { Link } from "react-router-dom";

const DataNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded shadow-md text-center">
        <div className="mb-4">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/007/104/553/small_2x/search-no-result-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
            alt="No Data"
            className="w-32 h-32 mx-auto mb-2 rounded-full object-cover"
          />
          <h1 className="text-4xl font-bold mb-10">No Data Found</h1>
          
          <Link
            to="/home"
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md inline-block"
          >
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DataNotFound;
