import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Session } from '../../types';
import AdminLayout from '../../components/admin/AdminLayout';
import Button from '../../components/ui/Button';
import SessionForm from '../../components/admin/SessionForm';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const SessionsManagement: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const sessionsCollection = collection(db, 'sessions');
      const sessionsSnapshot = await getDocs(sessionsCollection);
      const sessionsList = sessionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Session[];
      
      setSessions(sessionsList);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSession = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      try {
        await deleteDoc(doc(db, 'sessions', id));
        setSessions(sessions.filter(session => session.id !== id));
      } catch (error) {
        console.error('Error deleting session:', error);
      }
    }
  };

  const handleAddSession = () => {
    setSelectedSession(null);
    setShowForm(true);
  };

  const handleEditSession = (session: Session) => {
    setSelectedSession(session);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    fetchSessions();
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const filteredSessions = sessions.filter(session => 
    session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group sessions by date
  const sessionsByDate = filteredSessions.reduce((acc, session) => {
    if (!acc[session.date]) {
      acc[session.date] = [];
    }
    acc[session.date].push(session);
    return acc;
  }, {} as Record<string, Session[]>);

  // Sort dates
  const sortedDates = Object.keys(sessionsByDate).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  if (showForm) {
    return (
      <AdminLayout>
        <SessionForm 
          session={selectedSession || undefined}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text-dark mb-2">Sessions Management</h2>
          <p className="text-text-medium">Manage program sessions for the forum.</p>
        </div>
        <Button 
          variant="primary" 
          icon={<FaPlus />}
          onClick={handleAddSession}
        >
          Add Session
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center border border-border rounded-md px-3 py-2">
          <FaSearch className="text-text-light mr-2" />
          <input
            type="text"
            placeholder="Search sessions..."
            className="flex-1 outline-none text-text-dark"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Sessions List */}
      {loading ? (
        <div className="p-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text-medium">Loading sessions...</p>
        </div>
      ) : filteredSessions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-text-medium">No sessions found.</p>
        </div>
      ) : (
        <>
          {sortedDates.map(date => (
            <div key={date} className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <FaCalendarAlt className="text-primary" />
                {date}
              </h3>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {sessionsByDate[date].map(session => (
                  <div 
                    key={session.id} 
                    className="border-b border-border last:border-b-0 p-4 hover:bg-background"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="inline-block px-2 py-1 bg-primary-light text-primary text-xs font-semibold rounded-full mr-2">
                          {session.tag || session.category}
                        </div>
                        <span className="text-sm text-primary font-medium">
                          {session.startTime} - {session.endTime}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className="text-primary hover:text-primary-dark"
                          onClick={() => handleEditSession(session)}
                        >
                          <FaEdit size={18} />
                        </button>
                        <button 
                          className="text-error hover:text-red-700"
                          onClick={() => handleDeleteSession(session.id)}
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </div>
                    
                    <h4 className="text-base font-semibold mb-2">{session.title}</h4>
                    
                    <div className="flex items-center gap-1 text-sm text-text-medium mb-2">
                      <FaMapMarkerAlt size={14} />
                      <span>{session.location}</span>
                    </div>
                    
                    {session.description && (
                      <p className="text-sm text-text-medium mb-2">{session.description}</p>
                    )}
                    
                    <div className="mt-2">
                      <div className="text-xs text-text-light mb-1">Speakers:</div>
                      <div className="flex flex-wrap gap-1">
                        {session.speakers.map((speakerId, index) => (
                          <div 
                            key={index}
                            className="bg-background rounded-full py-1 px-2 text-xs"
                          >
                            {speakerId}
                          </div>
                        ))}
                        {session.speakers.length === 0 && (
                          <span className="text-xs text-text-light">No speakers assigned</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </AdminLayout>
  );
};

export default SessionsManagement;
