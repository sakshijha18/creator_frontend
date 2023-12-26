import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-3xl font-semibold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-4">Oops! The page you are looking for does not exist.</p>

        <Link to="/" className="bg-gray-800 text-white  px-5 py-2 rounded hover:bg-gray-800">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
