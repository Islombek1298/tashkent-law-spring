import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Simple Layout component
const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-blue-50">
    <main className="flex-1">{children}</main>
    <nav className="fixed bottom-0 left-0 right-0 bg-white flex justify-around items-center py-4 border-t border-gray-200">
      <a href="/" className="flex flex-col items-center text-xs font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span>Home</span>
      </a>
      <a href="/sessions" className="flex flex-col items-center text-xs font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>Sessions</span>
      </a>
      <a href="/speakers" className="flex flex-col items-center text-xs font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span>Speakers</span>
      </a>
      <a href="/about" className="flex flex-col items-center text-xs font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>About</span>
      </a>
    </nav>
  </div>
);

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Page components
const HomePage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-blue-600 mb-4">Tashkent Law Spring</h1>
    <p className="text-gray-700 mb-4">Welcome to the IV International Legal Forum "Tashkent Law Spring".</p>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Event Details</h2>
      <p className="mb-4">29-30 of May, 2025 • Tashkent, Intercontinental Hotel</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
        Register Now
      </button>
    </div>
  </div>
);

const SessionsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-blue-600 mb-4">Sessions</h1>
    <p className="text-gray-700 mb-4">Browse all conference sessions.</p>
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="text-sm text-blue-600 mb-1">May 29, 2025 • 09:00 - 10:30</div>
        <h2 className="text-lg font-semibold mb-1">Legal Education 4.0</h2>
        <p className="text-gray-600">Exploring new technologies and competencies in legal education.</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="text-sm text-blue-600 mb-1">May 29, 2025 • 11:00 - 12:30</div>
        <h2 className="text-lg font-semibold mb-1">Legal Challenges of the Metaverse</h2>
        <p className="text-gray-600">Virtual worlds and real laws: navigating the emerging landscape.</p>
      </div>
    </div>
  </div>
);

const SpeakersPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-blue-600 mb-4">Speakers</h1>
    <p className="text-gray-700 mb-4">Meet our expert presenters.</p>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3"></div>
        <h2 className="font-semibold">John Smith</h2>
        <p className="text-sm text-gray-600">Legal Tech Expert</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3"></div>
        <h2 className="font-semibold">Jane Doe</h2>
        <p className="text-sm text-gray-600">Professor of Law</p>
      </div>
    </div>
  </div>
);

const AboutPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-blue-600 mb-4">About</h1>
    <p className="text-gray-700 mb-4">Information about the forum.</p>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">About the Forum</h2>
      <p className="mb-4">
        The International Legal Forum "Tashkent Law Spring" is one of the key events in the field of law and business in Central Asia, 
        held under the auspices of the Ministry of Justice of Uzbekistan.
      </p>
      <p>
        In 2025, the Forum will take place under the theme "The Age of Digital Technologies: A Legal Perspective on the Future."
      </p>
    </div>
  </div>
);

// Main App component with routes
const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/sessions" element={<Layout><SessionsPage /></Layout>} />
          <Route path="/speakers" element={<Layout><SpeakersPage /></Layout>} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="*" element={<Layout><HomePage /></Layout>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
