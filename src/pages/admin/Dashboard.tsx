import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  FaUsers, 
  FaCalendarAlt, 
  FaGlobe, 
  FaUserFriends, 
  FaEdit, 
  FaImage 
} from 'react-icons/fa';

const Dashboard: React.FC = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-dark mb-2">Dashboard</h2>
        <p className="text-text-medium">Welcome to the Tashkent Law Spring 2025 admin panel.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
          <div className="rounded-full bg-primary-light p-4 mr-4">
            <FaUsers className="text-primary text-xl" />
          </div>
          <div>
            <div className="text-sm text-text-medium">Total Speakers</div>
            <div className="text-2xl font-bold text-text-dark">48</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
          <div className="rounded-full bg-primary-light p-4 mr-4">
            <FaCalendarAlt className="text-primary text-xl" />
          </div>
          <div>
            <div className="text-sm text-text-medium">Sessions</div>
            <div className="text-2xl font-bold text-text-dark">24</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
          <div className="rounded-full bg-primary-light p-4 mr-4">
            <FaGlobe className="text-primary text-xl" />
          </div>
          <div>
            <div className="text-sm text-text-medium">Countries</div>
            <div className="text-2xl font-bold text-text-dark">32</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
          <div className="rounded-full bg-primary-light p-4 mr-4">
            <FaUserFriends className="text-primary text-xl" />
          </div>
          <div>
            <div className="text-sm text-text-medium">Admin Users</div>
            <div className="text-2xl font-bold text-text-dark">5</div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/admin/speakers/new" className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md flex items-center">
            <div className="rounded-full bg-primary-light p-3 mr-4">
              <FaEdit className="text-primary" />
            </div>
            <div>
              <div className="font-medium">Add New Speaker</div>
              <div className="text-sm text-text-medium">Create a new speaker profile</div>
            </div>
          </a>
          
          <a href="/admin/sessions/new" className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md flex items-center">
            <div className="rounded-full bg-primary-light p-3 mr-4">
              <FaCalendarAlt className="text-primary" />
            </div>
            <div>
              <div className="font-medium">Create Session</div>
              <div className="text-sm text-text-medium">Add a new program session</div>
            </div>
          </a>
          
          <a href="/admin/media/upload" className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md flex items-center">
            <div className="rounded-full bg-primary-light p-3 mr-4">
              <FaImage className="text-primary" />
            </div>
            <div>
              <div className="font-medium">Upload Media</div>
              <div className="text-sm text-text-medium">Add images to gallery</div>
            </div>
          </a>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-background">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-medium uppercase tracking-wider">
                  Action
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-medium uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-medium uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-dark">Added new speaker: Anna Gullard</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-medium">admin@example.com</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-medium">
                  Today, 10:24 AM
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-dark">Updated session: Legal Tech 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-medium">editor@example.com</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-medium">
                  Yesterday, 3:45 PM
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-dark">Uploaded 5 new photos</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-medium">admin@example.com</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-medium">
                  Apr 29, 2025
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
