import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FaHome, 
  FaUsers, 
  FaCalendarAlt, 
  FaImage, 
  FaCog, 
  FaSignOutAlt 
} from 'react-icons/fa';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  if (!currentUser) {
    navigate('/admin/login', { replace: true });
    return null;
  }

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-primary text-white flex flex-col">
        <div className="p-4 border-b border-primary-dark flex items-center">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="font-bold">TLS Admin</div>
            <div className="text-xs opacity-80">Tashkent Law Spring</div>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/admin" 
                className={`flex items-center py-2 px-4 rounded-md ${isActive('/admin') ? 'bg-primary-dark' : 'hover:bg-primary-dark'}`}
              >
                <FaHome className="mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/speakers" 
                className={`flex items-center py-2 px-4 rounded-md ${isActive('/admin/speakers') ? 'bg-primary-dark' : 'hover:bg-primary-dark'}`}
              >
                <FaUsers className="mr-3" />
                Speakers
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/sessions" 
                className={`flex items-center py-2 px-4 rounded-md ${isActive('/admin/sessions') ? 'bg-primary-dark' : 'hover:bg-primary-dark'}`}
              >
                <FaCalendarAlt className="mr-3" />
                Sessions
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/media" 
                className={`flex items-center py-2 px-4 rounded-md ${isActive('/admin/media') ? 'bg-primary-dark' : 'hover:bg-primary-dark'}`}
              >
                <FaImage className="mr-3" />
                Media
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/settings" 
                className={`flex items-center py-2 px-4 rounded-md ${isActive('/admin/settings') ? 'bg-primary-dark' : 'hover:bg-primary-dark'}`}
              >
                <FaCog className="mr-3" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-primary-dark">
          <button 
            onClick={handleLogout}
            className="flex items-center text-sm py-2 px-4 w-full rounded-md hover:bg-primary-dark"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
          <div className="text-xs mt-2 opacity-60">
            {currentUser.email}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-border h-16 flex items-center px-6 shadow-sm">
          <h1 className="text-xl font-semibold">Admin Panel</h1>
        </header>
        
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
