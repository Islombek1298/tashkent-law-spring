import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaInstagram, FaLongArrowAltLeft } from 'react-icons/fa';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Speaker, Session } from '../types';

const SpeakerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [speaker, setSpeaker] = useState<Speaker | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeakerAndSessions = async () => {
      try {
        if (!id) return;
        
        // Fetch speaker
        const speakerDoc = await getDoc(doc(db, 'speakers', id));
        if (speakerDoc.exists()) {
          const speakerData = { id: speakerDoc.id, ...speakerDoc.data() } as Speaker;
          setSpeaker(speakerData);
          
          // Fetch sessions for this speaker
          // In a real implementation, you'd query the sessions collection
          // For now, we'll use a placeholder
          setSessions([
            {
              id: '1',
              title: 'Legal Challenges of the Metaverse: Virtual World and Real Laws',
              description: 'Exploring the intersection of virtual worlds and legal frameworks',
              date: 'May 29, 2025',
              startTime: '09:00',
              endTime: '09:15',
              location: 'Conference Room B, Intercontinental Hotel',
              tag: 'Panel',
              category: 'metaverse',
              speakers: [id, 'speaker-2', 'speaker-3']
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching speaker details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakerAndSessions();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!speaker) {
    return (
      <div className="p-6 text-center">
        <p className="text-text-medium">Speaker not found.</p>
        <Link to="/speakers" className="text-primary hover:underline mt-4 inline-block">
          Back to Speakers
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Speaker Header */}
      <header className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 md:rounded-md relative">
        <Link 
          to="/speakers" 
          className="absolute top-4 left-4 w-9 h-9 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white"
        >
          <FaLongArrowAltLeft />
        </Link>
        
        <div className="pt-6 flex flex-col items-center text-center">
          <img 
            src={speaker.photo} 
            alt={speaker.name}
            className="w-30 h-30 rounded-full border-4 border-white shadow-md mb-4 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/120';
            }}
          />
          <h1 className="text-2xl font-bold mb-1">{speaker.name}</h1>
          <p className="text-sm opacity-90 max-w-sm">{speaker.position}</p>
          
          <div className="flex gap-4 mt-4">
            {speaker.social.map((social, index) => {
              let Icon;
              switch (social.type) {
                case 'linkedin':
                  Icon = FaLinkedin;
                  break;
                case 'twitter':
                  Icon = FaTwitter;
                  break;
                default:
                  Icon = FaInstagram;
              }
              
              return (
                <a 
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="w-9 h-9 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </header>
      
      <div className="p-6 grid md:grid-cols-2 gap-6">
        {/* Biography */}
        <div className="bg-white rounded-md shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 relative pl-6 text-text-dark">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-primary to-primary-dark rounded-full"></span>
            Biography
          </h2>
          
          <div className="text-sm text-text-medium space-y-4">
            <p>
              {speaker.bio || `${speaker.name} is a speaker at the IV International Legal Forum "Tashkent Law Spring" 2025.`}
            </p>
            
            <p>
              With extensive experience in the field, {speaker.name.split(' ')[0]} brings valuable insights to the discussions on legal challenges in the digital age.
            </p>
          </div>
        </div>
        
        {/* Sessions */}
        <div className="bg-white rounded-md shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 relative pl-6 text-text-dark">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-primary to-primary-dark rounded-full"></span>
            Sessions
          </h2>
          
          {sessions.length === 0 ? (
            <p className="text-sm text-text-medium">No sessions found for this speaker.</p>
          ) : (
            <div className="space-y-4">
              {sessions.map(session => (
                <div 
                  key={session.id}
                  className="border border-border rounded-md p-4"
                >
                  <div className="flex items-center gap-2 text-xs text-primary mb-2">
                    <FaCalendarAlt />
                    <span>{session.date} • {session.startTime} - {session.endTime}</span>
                  </div>
                  
                  <h3 className="text-base font-semibold mb-2">{session.title}</h3>
                  
                  <div className="flex items-center gap-2 text-xs text-text-medium mb-3">
                    <FaMapMarkerAlt />
                    <span>{session.location}</span>
                  </div>
                  
                  {session.speakers.length > 1 && (
                    <div>
                      <div className="text-xs text-text-medium mb-2">Other speakers in this session:</div>
                      <div className="flex flex-wrap gap-2">
                        {session.speakers
                          .filter(speakerId => speakerId !== id)
                          .map((speakerId, index) => (
                            <div 
                              key={index}
                              className="bg-background rounded-md py-1 px-2 flex items-center gap-2 text-xs"
                            >
                              <div className="w-6 h-6 bg-primary-light rounded-full flex items-center justify-center text-primary text-xs font-bold">
                                {speakerId.charAt(0).toUpperCase()}
                              </div>
                              <span>Speaker Name</span>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeakerDetailPage;
