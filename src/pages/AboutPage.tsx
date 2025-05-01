import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/layout/Header';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Header 
        title={t('about.title')} 
        subtitle={t('about.subtitle')}
      />
      
      <div className="p-6">
        {/* About Forum Section */}
        <section className="bg-white rounded-md shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 relative pl-6 text-text-dark">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-primary to-primary-dark rounded-full"></span>
            {t('about.aboutForumTitle')}
          </h2>
          
          <div className="text-sm text-text-medium space-y-4">
            <p>
              The International Legal Forum <strong>Tashkent Law Spring</strong> is one of the key events in the field of law and business in the Central Asian region, held under the auspices of the Ministry of Justice of the Republic of Uzbekistan every two years.
            </p>
            
            <p>
              The Forum serves as an open platform for dialogue among lawyers, scholars, IT specialists, experts, and business communities from around the world, bringing them together to discuss trending issues of legal regulation and to find solutions to modern challenges.
            </p>
            
            <p>
              In 2025, the Forum will take place under the theme <strong>"The Age of Digital Technologies: A Legal Perspective on the Future,"</strong> bringing together leading experts, innovators, and visionaries from around the world to define the legal architecture of the digital future.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-background rounded-md p-4 text-center">
              <div className="text-2xl font-bold text-primary">30+</div>
              <div className="text-xs text-text-medium">Countries</div>
            </div>
            
            <div className="bg-background rounded-md p-4 text-center">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-xs text-text-medium">Speakers</div>
            </div>
            
            <div className="bg-background rounded-md p-4 text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-xs text-text-medium">Participants</div>
            </div>
            
            <div className="bg-background rounded-md p-4 text-center">
              <div className="text-2xl font-bold text-primary">10+</div>
              <div className="text-xs text-text-medium">Sessions</div>
            </div>
          </div>
        </section>
        
        {/* Forum Topics Section */}
        <section className="bg-white rounded-md shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 relative pl-6 text-text-dark">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-primary to-primary-dark rounded-full"></span>
            Forum Topics
          </h2>
          
          <div className="text-sm text-text-medium mb-6">
            <p>
              Digital technologies are rapidly transforming the world, creating new challenges for legal systems. Despite the universality of basic legal regulation approaches, they must be adapted to modern realities, where digital technologies permeate almost every aspect of life.
            </p>
          </div>
          
          <div className="space-y-3 mt-4">
            <div className="flex items-start gap-2">
              <div className="min-w-6 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
              </div>
              <span>Legal Education 4.0: new competencies, technologies and challenges</span>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="min-w-6 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
              </div>
              <span>Legal Challenges of the Metaverse: Virtual Worlds and Real Laws</span>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="min-w-6 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
              </div>
              <span>Legal Tech 2025: automation of legal procedures and new business models of legal services</span>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="min-w-6 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
              </div>
              <span>Digital Identity and Privacy in the Legal Framework</span>
            </div>
          </div>
        </section>
        
        {/* Organizer Section */}
        <section className="bg-white rounded-md shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 relative pl-6 text-text-dark">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-primary to-primary-dark rounded-full"></span>
            {t('about.organizer')}
          </h2>
          
          <div className="flex gap-4 mb-4">
            <div className="w-14 h-14 bg-primary-light rounded-md flex items-center justify-center flex-shrink-0">
              <img src="/assets/images/ministry-logo.png" alt="Ministry of Justice" className="w-10 h-10" />
            </div>
            
            <div>
              <h3 className="text-base font-semibold mb-1">{t('about.ministryOfJustice')}</h3>
              <p className="text-sm text-text-medium">{t('about.republicOfUzbekistan')}</p>
            </div>
          </div>
          
          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-2 text-sm text-text-medium">
              <FaPhone className="text-primary" />
              <span>+998 (71) 233-24-22</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-text-medium">
              <FaEnvelope className="text-primary" />
              <span>info@adliya.uz</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-text-medium">
              <FaMapMarkerAlt className="text-primary" />
              <span>Tashkent, street Sayilgoh, 5</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-text-medium">
              <FaClock className="text-primary" />
              <span>09:00 AM - 06:00 PM (GMT+5)</span>
            </div>
          </div>
          
          {/* Map */}
          <div className="mt-4 h-48 bg-primary-light rounded-md overflow-hidden relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.074877953275!2d69.2656207!3d41.3097441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bc49e0511ff%3A0x4f5d7437eb21653d!2z0KjQsNGF0YDQuNGB0LDQsdC3INC60L7PsNGH0LDRgdC4IDIsINCi0L7RiNC60LXQvdGCLCDQo9C30LHQtdC60LjRgdGC0LDQvQ!5e0!3m2!1sru!2s!4v1681404619509!5m2!1sru!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Ministry of Justice location"
            ></iframe>
            
            <div className="absolute inset-0 bg-black bg-opacity-10 flex flex-col items-center justify-center">
              <a 
                href="https://www.google.com/maps/place/Shahrisabz+ko'chasi+2,+Toshkent,+Uzbekistan/@41.3097972,69.2659084,17z/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-primary border-none py-2 px-4 rounded-full font-semibold text-sm shadow-md flex items-center gap-2 mt-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                </svg>
                Open in Maps
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
