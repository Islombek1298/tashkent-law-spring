import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUsers, FaInfoCircle } from 'react-icons/fa';

const TabNavigation: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card flex justify-around items-center py-4 px-2 border-t border-border shadow-sm z-50 w-full md:relative md:mt-8 md:shadow-none md:rounded-md">
      <NavLink 
        to="/" 
        className={({ isActive }) => `flex flex-col items-center justify-center text-xs font-medium relative p-2 ${isActive ? 'text-primary' : 'text-text-light'}`}
        end
      >
        <div className="mb-1 w-6 h-6 flex items-center justify-center">
          <FaHome size={24} />
        </div>
        <span>Home</span>
        {({ isActive }) => isActive && (
          <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"></span>
        )}
      </NavLink>
      
      <NavLink 
        to="/sessions" 
        className={({ isActive }) => `flex flex-col items-center justify-center text-xs font-medium relative p-2 ${isActive ? 'text-primary' : 'text-text-light'}`}
      >
        <div className="mb-1 w-6 h-6 flex items-center justify-center">
          <FaCalendarAlt size={24} />
        </div>
        <span>Sessions</span>
      </NavLink>
      
      <NavLink 
        to="/speakers" 
        className={({ isActive }) => `flex flex-col items-center justify-center text-xs font-medium relative p-2 ${isActive ? 'text-primary' : 'text-text-light'}`}
      >
        <div className="mb-1 w-6 h-6 flex items-center justify-center">
          <FaUsers size={24} />
        </div>
        <span>Speakers</span>
      </NavLink>
      
      <NavLink 
        to="/about" 
        className={({ isActive }) => `flex flex-col items-center justify-center text-xs font-medium relative p-2 ${isActive ? 'text-primary' : 'text-text-light'}`}
      >
        <div className="mb-1 w-6 h-6 flex items-center justify-center">
          <FaInfoCircle size={24} />
        </div>
        <span>About</span>
      </NavLink>
    </nav>
  );
};

export default TabNavigation;
