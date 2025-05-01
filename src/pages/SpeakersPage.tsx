import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/layout/Header';
import { FaSearch } from 'react-icons/fa';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Speaker } from '../types';

const SpeakersPage: React.FC = () => {
  const { t } = useTranslation();
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [featuredSpeakers, setFeaturedSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const speakersCollection = collection(db, 'speakers');
        const speakersSnapshot = await getDocs(speakersCollection);
        const speakersList = speakersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Speaker[];
        
        setSpeakers(speakersList.filter(speaker => !speaker.featured));
        setFeaturedSpeakers(speakersList.filter(speaker => speaker.featured));
      } catch (error) {
        console.error('Error fetching speakers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  const filteredSpeakers = speakers.filter(speaker => 
    speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    speaker.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header 
        title={t('speakers.title')} 
        subtitle={t('speakers.subtitle')}
      />
      
      {/* Search */}
      <div className="sticky top-0 z-10 bg-card border-b border-border p-4">
        <div className="flex items-center bg-background rounded-md px-3 py-2">
          <FaSearch className="text-text-light mr-2" />
          <input
            type="text"
            placeholder={t('speakers.searchSpeakers')}
            className="flex-1 bg-transparent outline-none text-text-dark"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-text-medium">{t('common.loading')}</p>
        </div>
      ) : (
        <div className="p-6">
          {/* Featured Speakers */}
          {featuredSpeakers.length > 0 && searchTerm === '' && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">{t('speakers.featuredSpeakers')}</h2>
              
              <div className="space-y-4">
                {featuredSpeakers.map(speaker => (
                  <Link 
                    key={speaker.id}
                    to={`/speakers/${speaker.id}`}
                    className="bg-card rounded-md overflow-hidden shadow-sm flex transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="w-24 h-24 relative overflow-hidden">
                      <img 
                        src={speaker.photo} 
                        alt={speaker.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/100';
                        }}
                      />
                    </div>
                    
                    <div className="p-4 flex-1">
                      <div className="inline-block px-2 py-1 text-xs font-semibold bg-primary-light text-primary rounded-full mb-1">
                        {speaker.role}
                      </div>
                      
                      <h3 className="text-base font-semibold text-text-dark mb-1">{speaker.name}</h3>
                      <p className="text-xs text-text-medium mb-2">{speaker.position}</p>
                      
                      <div className="flex items-center text-xs text-text-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span className="ml-1">{speaker.sessions.length} Session{speaker.sessions.length !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* All Speakers */}
          <div>
            <h2 className="text-lg font-semibold mb-4">{t('speakers.allSpeakers')}</h2>
            
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {filteredSpeakers.map(speaker => (
                <Link 
                  key={speaker.id}
                  to={`/speakers/${speaker.id}`}
                  className="bg-card rounded-md overflow-hidden shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="h-14 bg-gradient-to-r from-primary to-primary-dark"></div>
                  
                  <div className="p-4 text-center -mt-8">
                    <div className="w-16 h-16 rounded-full border-3 border-white mx-auto mb-2 overflow-hidden bg-primary-light">
                      <img 
                        src={speaker.photo} 
                        alt={speaker.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/64';
                        }}
                      />
                    </div>
                    
                    <h3 className="text-sm font-semibold mb-1 text-text-dark">{speaker.name}</h3>
                    <p className="text-xs text-text-medium line-clamp-2 h-8">{speaker.position}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeakersPage;
