import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/layout/Header';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Media } from '../types';

const MediaPage: React.FC = () => {
  const { t } = useTranslation();
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeYear, setActiveYear] = useState('2023');
  const [activeType, setActiveType] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const mediaCollection = collection(db, 'media');
        const mediaSnapshot = await getDocs(mediaCollection);
        const mediaList = mediaSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Media[];
        
        setMedia(mediaList);
      } catch (error) {
        console.error('Error fetching media:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const handleMediaClick = (media: Media) => {
    setSelectedMedia(media);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMedia(null);
  };

  // Filter media by year and type
  const filteredMedia = media.filter(item => {
    const yearMatch = item.year.toString() === activeYear;
    const typeMatch = activeType === 'all' || item.type === activeType;
    return yearMatch && typeMatch;
  });

  // Extract available years from media
  const years = [...new Set(media.map(item => item.year.toString()))].sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div>
      <Header 
        title="Media" 
        subtitle="Photos and videos from the forum"
      />

      {/* Year Tabs */}
      <div className="bg-white p-4 flex gap-0 border-b border-border shadow-sm">
        {years.length > 0 ? (
          years.map(year => (
            <button
              key={year}
              className={`flex-1 py-3 text-center font-medium transition-all ${
                activeYear === year 
                  ? 'text-primary border-b-2 border-primary bg-primary-light' 
                  : 'text-text-medium hover:text-primary'
              }`}
              onClick={() => setActiveYear(year)}
            >
              Forum {year}
            </button>
          ))
        ) : (
          <button className="flex-1 py-3 text-center font-medium text-primary border-b-2 border-primary bg-primary-light">
            Forum 2023
          </button>
        )}
      </div>

      {/* Media Type Tabs */}
      <div className="flex border-b border-border">
        <button
          className={`py-3 px-4 text-sm font-medium border-b-2 transition-all ${
            activeType === 'all' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-text-medium hover:text-primary'
          }`}
          onClick={() => setActiveType('all')}
        >
          All
        </button>
        <button
          className={`py-3 px-4 text-sm font-medium border-b-2 transition-all ${
            activeType === 'photo' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-text-medium hover:text-primary'
          }`}
          onClick={() => setActiveType('photo')}
        >
          Photos
        </button>
        <button
          className={`py-3 px-4 text-sm font-medium border-b-2 transition-all ${
            activeType === 'video' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-text-medium hover:text-primary'
          }`}
          onClick={() => setActiveType('video')}
        >
          Videos
        </button>
      </div>

      {/* Media Gallery */}
      <div className="p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-text-medium">{t('common.loading')}</p>
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-text-medium">No media found for this selection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {/* For demonstration, we're creating placeholder items */}
            {filteredMedia.length === 0 && 
              Array.from({ length: 6 }).map((_, index) => (
                <div 
                  key={index}
                  className="aspect-square relative rounded-md overflow-hidden cursor-pointer"
                  onClick={() => handleMediaClick({
                    id: index.toString(),
                    type: index % 2 === 0 ? 'photo' : 'video',
                    url: `https://images.unsplash.com/photo-${1550000000000 + index}`,
                    thumbnail: `https://images.unsplash.com/photo-${1550000000000 + index}`,
                    year: parseInt(activeYear),
                    featured: false
                  })}
                >
                  <img 
                    src={`https://source.unsplash.com/random/300x300?forum,conference&sig=${index}`}
                    alt={`Forum ${activeYear}`}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  {index % 3 === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))
            }
            
            {filteredMedia.map((item) => (
              <div 
                key={item.id}
                className="aspect-square relative rounded-md overflow-hidden cursor-pointer"
                onClick={() => handleMediaClick(item)}
              >
                <img 
                  src={item.thumbnail}
                  alt={item.title || `Media item ${item.id}`}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Load More Button */}
        <button 
          className="mt-6 w-full py-3 bg-primary-light text-primary font-medium rounded-md flex items-center justify-center gap-2"
          onClick={() => alert('In a real app, this would load more media items.')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          Load More
        </button>
      </div>

      {/* Media Modal */}
      {modalOpen && selectedMedia && (
        <div 
          className={`fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-6 transition-opacity ${
            modalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeModal}
        >
          <button 
            className="absolute top-4 right-4 w-9 h-9 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white"
            onClick={closeModal}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div 
            className="max-w-screen-md max-h-[80vh] rounded-lg overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {selectedMedia.type === 'photo' ? (
              <img 
                src={selectedMedia.url}
                alt={selectedMedia.title || 'Forum media'}
                className="w-full h-auto"
              />
            ) : (
              <iframe
                src={selectedMedia.url}
                title={selectedMedia.title || 'Forum video'}
                className="w-full aspect-video"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaPage;
