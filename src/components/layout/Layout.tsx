import React from 'react';
import TabNavigation from './TabNavigation';
import { Capacitor } from '@capacitor/core';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isNative = Capacitor.isNativePlatform();
  
  return (
    <div className={`flex flex-col min-h-screen bg-background font-sans text-text-dark ${isNative ? 'pt-safe-top pb-safe-bottom' : ''}`}>
      <main className="flex-1 overflow-y-auto -webkit-overflow-scrolling-touch pb-20 md:pb-0 w-full mx-auto md:max-w-[1200px] md:px-8">
        {children}
      </main>
      <TabNavigation />
    </div>
  );
};

export default Layout;
