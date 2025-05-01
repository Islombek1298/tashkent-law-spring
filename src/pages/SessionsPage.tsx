import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/layout/Header';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Session } from '../types';

const SessionsPage: React.FC = () => {
  const { t } = useTranslation();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [days, setDays] = useState<string[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessionsCollection = collection(db, 'sessions');
        const sessionsSnapshot = await getDocs(sessionsCollection);
        const sessionsList = sessionsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Session[];
        
        setSessions(sessionsList);
        
        // Extract unique days
        const uniqueDays = [...new Set(sessionsList.map(session => session.date))];
        setDays(uniqueDays.sort());
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const filteredSessions = activeFilter === 'all' 
    ? sessions 
    : sessions.filter(session => session.category.toLowerCase().includes(activeFilter));

  const renderSessionsByDay = (day: string) => {
    const daySessions = filteredSessions.filter(session => session.date === day);
    
    if (daySessions.length === 0) return null;
    
    return (
      <div key={day} className="mb-6">
        <div className="flex items-center gap-2 py-3 px-6 text-base font-semibold text-text-dark bg-background border-b border-border">
          <FaCalendarAlt className="text-primary" size={18} />
          {day}
        </div>
        
        <div className="px-4 py-3">
          {daySessions.map(session => (
            <div 
              key={session.id} 
              className="bg-card rounded-md overflow-hidden shadow-sm transition-all hover:-translate-y-1 hover:shadow-md mb-4"
            >
              <div className="flex p-4 gap-4">
                <div className="flex flex-col items-center justify-center min-w-[70px] relative">
                  <div className="text-lg font-bold text-primary mb-1">
                    {session.startTime}
                  </div>
                  <div className="text-xs text-text-medium">
                    {session.endTime}
                  </div>
                  <div className="absolute top-1/4 right-[-10px] h-1/2 w-px bg-border"></div>
                </div>
                
                <div className="flex-1">
                  <div className="inline-block px-2 py-1 text-xs font-semibold bg-primary-light text-primary rounded-full mb-1">
                    {session.tag}
                  </div>
                  
                  <h3 className="text-base font-semibold mb-2 leading-tight text-text-dark">
                    {session.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-xs text-text-medium mb-2">
                    <FaMapMarkerAlt />
                    <span>{session.location}</span>
                  </div>
                  
                  {/* We would fetch and display speaker information here */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center text-primary text-xs font-bold">
                      {session.speakers.length > 0 ? session.speakers[0].charAt(0) : '?'}
                    </div>
                    <div className="text-xs font-medium text-text-dark">
                      {session.speakers.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header 
        title={t('sessions.title')} 
        subtitle={t('sessions.subtitle')}
      />
      
      {/* Filters */}
      <div className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="p-4 overflow-x-auto flex gap-2 pb-3">
          <button 
            className={`py-2 px-6 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeFilter === 'all' 
                ? 'bg-primary text-white shadow-md'
                : 'bg-background text-text-medium hover:bg-primary-light'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            {t('sessions.allSessions')}
          </button>
          
          <button 
            className={`py-2 px-6 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeFilter === 'legal innovation' 
                ? 'bg-primary text-white shadow-md'
                : 'bg-background text-text-medium hover:bg-primary-light'
            }`}
            onClick={() => setActiveFilter('legal innovation')}
          >
            {t('sessions.legalInnovation')}
          </button>
          
          <button 
            className={`py-2 px-6 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeFilter === 'legal education' 
                ? 'bg-primary text-white shadow-md'
                : 'bg-background text-text-medium hover:bg-primary-light'
            }`}
            onClick={() => setActiveFilter('legal education')}
          >
            {t('sessions.legalEducation')}
          </button>
          
          <button 
            className={`py-2 px-6 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeFilter === 'legal tech' 
                ? 'bg-primary text-white shadow-md'
                : 'bg-background text-text-medium hover:bg-primary-light'
            }`}
            onClick={() => setActiveFilter('legal tech')}
          >
            {t('sessions.legalTech')}
          </button>
        </div>
      </div>
      
      {/* Sessions List */}
      <div className="px-4 py-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-text-medium">{t('common.loading')}</p>
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-text-medium">No sessions found for this filter.</p>
          </div>
        ) : (
          <div>
            {days.map(day => renderSessionsByDay(day))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionsPage;
