import React from 'react';
import { Link } from 'react-router-dom';

const AdminEntry = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Admin Access</h1>
        <p className="text-gray-700 mb-6">
          Welcome to the Tashkent Law Spring admin panel. Please log in to continue.
        </p>
        <div className="space-y-4">
          <Link 
            to="/admin/login" 
            className="block w-full bg-blue-600 text-white text-center px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login to Admin
          </Link>
          <Link 
            to="/" 
            className="block w-full bg-gray-200 text-gray-700 text-center px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminEntry;
