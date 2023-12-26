import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md text-center">
                <h1 className="text-3xl font-semibold mb-4">Unauthorized Access</h1>
                <p className="text-gray-600">
                    You need to log in to access this page. Please log in or create an account.
                </p>

                <div className="flex flex-col md:flex-row items-center mt-4">
                    <Link to="/login" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 mb-2 md:mb-0 md:mr-2">
                        Login
                    </Link>
                    <Link to="/" className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-800 hover:text-white mb-2 md:mb-0 md:mr-2 ">
                        Back
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default UnauthorizedPage;
