import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import Button from '../../components/ui/Button';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { FaTrash, FaEdit, FaPlus, FaSearch } from 'react-icons/fa';
import { Speaker } from '../../types';

const SpeakersManagement: React.FC = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const speakersCollection = collection(db, 'speakers');
        const speakersSnapshot = await getDocs(speakersCollection);
        const speakersList = speakersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Speaker[];
        
        setSpeakers(speakersList);
      } catch (error) {
        console.error('Error fetching speakers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  const handleDeleteSpeaker = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this speaker?')) {
      try {
        await deleteDoc(doc(db, 'speakers', id));
        setSpeakers(speakers.filter(speaker => speaker.id !== id));
      } catch (error) {
        console.error('Error deleting speaker:', error);
      }
    }
  };

  const filteredSpeakers = speakers.filter(speaker => 
    speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    speaker.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text-dark mb-2">Speakers Management</h2>
          <p className="text-text-medium">Manage speaker profiles for the forum.</p>
        </div>
        <Button 
          variant="primary" 
          icon={<FaPlus />}
          onClick={() => navigate('/admin/speakers/new')}
        >
          Add Speaker
        </Button>
      </div>

      {/* Search and filters */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center border border-border rounded-md px-3 py-2">
          <FaSearch className="text-text-light mr-2" />
          <input
            type="text"
            placeholder="Search speakers..."
            className="flex-1 outline-none text-text-dark"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Speakers Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-text-medium">Loading speakers...</p>
          </div>
        ) : filteredSpeakers.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-text-medium">No speakers found.</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-background">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-medium uppercase tracking-wider">
                  Speaker
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-medium uppercase tracking-wider">
                  Position
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-medium uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-medium uppercase tracking-wider">
                  Featured
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border">
              {filteredSpeakers.map((speaker) => (
                <tr key={speaker.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full mr-3">
                        <img 
                          src={speaker.photo} 
                          alt={speaker.name} 
                          className="h-10 w-10 rounded-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/40';
                          }}
                        />
                      </div>
                      <div className="text-sm font-medium text-text-dark">{speaker.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-medium">{speaker.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-light text-primary">
                      {speaker.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-medium">
                    {speaker.featured ? 'Yes' : 'No'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-primary hover:text-primary-dark mr-4"
                      onClick={() => navigate(`/admin/speakers/edit/${speaker.id}`)}
                    >
                      <FaEdit size={18} />
                    </button>
                    <button 
                      className="text-error hover:text-red-700"
                      onClick={() => handleDeleteSpeaker(speaker.id)}
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default SpeakersManagement;
