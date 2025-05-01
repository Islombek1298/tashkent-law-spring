import React from 'react';
import TabNavigation from './TabNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans text-text-dark">
      <main className="flex-1 overflow-y-auto -webkit-overflow-scrolling-touch pb-20 md:pb-0 max-w-[500px] mx-auto md:max-w-[1200px] md:px-8">
        {children}
      </main>
      <TabNavigation />
    </div>
  );
};

export default Layout;
