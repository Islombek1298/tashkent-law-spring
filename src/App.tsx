import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">Tashkent Law Spring</h1>
          <p className="text-gray-700">
            Welcome to the Tashkent Law Spring conference website. We are currently updating our site.
          </p>
          <div className="mt-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
