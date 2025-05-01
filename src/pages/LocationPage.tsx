import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/layout/Header';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaDirections, FaSubway, FaMobileAlt, FaCompass } from 'react-icons/fa';

const LocationPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Header 
        title={t('location.title')} 
        subtitle={t('location.subtitle')}
      />
      
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Venue Information */}
          <div className="bg-white rounded-md overflow-hidden shadow-sm mb-6">
            <div className="h-48 relative overflow-hidden">
              <img 
                src="/assets/images/inter.webp" 
                alt="Intercontinental Hotel Tashkent" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-2">Intercontinental Hotel Tashkent</h2>
              <p className="text-sm text-text-medium mb-6">
                The IV International Legal Forum "Tashkent Law Spring" will be held at the prestigious Intercontinental Hotel in Tashkent, offering modern conference facilities and comfortable accommodation.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-light rounded-md flex items-center justify-center text-primary flex-shrink-0">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-text-light mb-1">Address</div>
                    <div className="text-sm font-medium text-text-dark">{t('location.address')}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-light rounded-md flex items-center justify-center text-primary flex-shrink-0">
                    <FaCalendarAlt size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-text-light mb-1">Event Dates</div>
                    <div className="text-sm font-medium text-text-dark">{t('location.eventDates')}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-light rounded-md flex items-center justify-center text-primary flex-shrink-0">
                    <FaClock size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-text-light mb-1">Event Hours</div>
                    <div className="text-sm font-medium text-text-dark">{t('location.eventHours')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Directions */}
          <div>
            <div className="bg-white rounded-md shadow-sm p-6 mb-6">
              <h3 className="flex items-center gap-2 text-base font-semibold mb-4">
                <FaDirections className="text-primary" />
                {t('location.gettingThere')}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <FaMobileAlt size={16} />
                  </div>
                  <div className="text-sm text-text-medium">
                    <strong>From the Airport:</strong> Islam Karimov Tashkent International Airport is approximately 15 minutes by car. Taxis are readily available, or you can pre-arrange transportation with the hotel.
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <FaSubway size={16} />
                  </div>
                  <div className="text-sm text-text-medium">
                    <strong>Public Transportation:</strong> The nearest metro station is Kosmonavtlar, which is a 10-minute walk from the hotel.
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <FaCompass size={16} />
                  </div>
                  <div className="text-sm text-text-medium">
                    <strong>By Car:</strong> The hotel is located in the center of Tashkent, near the State Law University and Amir Temur Square. Parking is available on-site.
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-md shadow-sm p-6">
              <h3 className="flex items-center gap-2 text-base font-semibold mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
                {t('location.nearbyAttractions')}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <div className="text-sm text-text-medium">
                    <strong>Amir Temur Square:</strong> A central landmark of Tashkent, located just a 5-minute walk from the hotel.
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                  <div className="text-sm text-text-medium">
                    <strong>Tashkent State Law University:</strong> One of Uzbekistan's premier law schools, located nearby.
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </div>
                  <div className="text-sm text-text-medium">
                    <strong>Tashkent Broadway:</strong> A popular pedestrian street with cafes, shops, and street art, within walking distance.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="bg-white rounded-md shadow-sm overflow-hidden mt-6">
          <div className="h-96">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.0661133238736!2d69.26590841544003!3d41.309797179272744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bc49e0511ff%3A0x4f5d7437eb21653d!2sShahrisabz%20ko&#39;chasi%202%2C%20Toshkent%2C%20Uzbekistan!5e0!3m2!1sen!2sus!4v1649924573852!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Event location map"
            ></iframe>
          </div>
          
          <div className="p-4">
            <a 
              href="https://www.google.com/maps/place/Shahrisabz+ko'chasi+2,+Toshkent,+Uzbekistan/@41.3097972,69.2659084,17z/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-primary text-white rounded-md py-3 px-4 font-semibold text-sm w-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
              </svg>
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
