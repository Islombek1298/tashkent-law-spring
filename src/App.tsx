import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { App as CapApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

// Lazy-loaded page components
const HomePage = lazy(() => import('./pages/HomePage'));
const SessionsPage = lazy(() => import('./pages/SessionsPage'));
const SpeakersPage = lazy(() => import('./pages/SpeakersPage'));
const SpeakerDetailPage = lazy(() => import('./pages/SpeakerDetailPage'));
const LocationPage = lazy(() => import('./pages/LocationPage'));
const MediaPage = lazy(() => import('./pages/MediaPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminSpeakers = lazy(() => import('./pages/admin/SpeakersManagement'));
const AdminSessions = lazy(() => import('./pages/admin/SessionsManagement'));

// Loading fallback
const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// Handle hardware back button in native apps
const AppContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      CapApp.addListener('backButton', ({ canGoBack }) => {
        if (canGoBack) {
          navigate(-1);
        } else {
          CapApp.exitApp();
        }
      });
    }
    
    return () => {
      if (Capacitor.isNativePlatform()) {
        CapApp.removeAllListeners();
      }
    };
  }, [navigate]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/sessions" element={<Layout><SessionsPage /></Layout>} />
        <Route path="/speakers" element={<Layout><SpeakersPage /></Layout>} />
        <Route path="/speakers/:id" element={<Layout><SpeakerDetailPage /></Layout>} />
        <Route path="/location" element={<Layout><LocationPage /></Layout>} />
        <Route path="/media" element={<Layout><MediaPage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/speakers" element={<AdminSpeakers />} />
        <Route path="/admin/sessions" element={<AdminSessions />} />
      </Routes>
    </Suspense>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
