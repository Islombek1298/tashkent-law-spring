import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaUserPlus, FaHandshake } from 'react-icons/fa';
import CountdownTimer from '../components/ui/CountdownTimer';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import LanguageSelector from '../components/ui/LanguageSelector';

const HomePage: React.FC = () => {
  return (
    <div className="p-6">
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
          Welcome
        </h1>
        <p className="text-base text-text-medium font-medium">
          IV INTERNATIONAL LEGAL FORUM "TASHKENT LAW SPRING"
        </p>
      </div>
      
      {/* Main Event Card */}
      <Card className="mb-8 overflow-hidden">
        <div className="relative h-45 bg-gradient-to-r from-blue-500 to-pink-500">
          <LanguageSelector />
          <img 
            src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
            alt="Tashkent Law Spring"
            className="w-full h-full object-cover opacity-85 transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-60 flex flex-col justify-end p-6 text-white">
            <h2 className="text-2xl font-bold mb-4 leading-tight">IV International Legal Forum "Tashkent Law Spring"</h2>
            <div className="flex items-center gap-2 text-sm mb-2 opacity-90">
              <FaCalendarAlt size={16} />
              <span>29-30 of May, 2025</span>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <FaMapMarkerAlt size={16} />
              <span>Tashkent, Intercontinental Hotel</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <CountdownTimer targetDate="May 29, 2025 09:00:00" />
          
          <div className="flex gap-4">
            <Button 
              variant="primary" 
              fullWidth 
              icon={<FaUserPlus />}
              onClick={() => window.open('https://reg.tashkentlawspring.uz/en', '_blank')}
            >
              Register
            </Button>
            <Button 
              variant="secondary" 
              fullWidth 
              icon={<FaHandshake />}
              onClick={() => window.open('https://tashkentlawspring.uz/site/partners', '_blank')}
            >
              Partners
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Link to="/location" className="bg-card rounded-md p-4 flex flex-col items-center text-center shadow-sm transition-all hover:scale-95 active:scale-95">
          <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center mb-2">
            <FaMapMarkerAlt size={20} />
          </div>
          <div className="text-xs text-text-medium font-medium">Location</div>
        </Link>
        {/* Add other quick action buttons similarly */}
      </div>
      
      {/* Sessions Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-dark">Sessions</h2>
          <Link to="/sessions" className="text-sm text-primary font-medium flex items-center gap-1">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Link>
        </div>
        
        {/* Session items will go here */}
        <div className="flex flex-col gap-4">
          {/* Sample session card */}
          <Link to="/sessions" className="bg-card rounded-md shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="flex p-4 gap-4">
              <div className="flex flex-col items-center justify-center min-w-[70px] relative">
                <div className="text-lg font-bold text-primary mb-1">May 29</div>
                <div className="text-xs text-text-medium">09:00 AM</div>
                <div className="absolute top-1/4 right-[-10px] h-1/2 w-px bg-border"></div>
              </div>
              <div className="flex-1">
                <Badge text="Keynote" className="mb-1" />
                <h3 className="text-base font-semibold mb-2 leading-tight text-text-dark">Legal Education 4.0: New Competencies, Technologies and Challenges</h3>
                <div className="flex items-center gap-2">
                  <img src="/assets/speakers/bakhshillo-khodzhaev.jpg" alt="Speaker" className="w-8 h-8 rounded-full object-cover" />
                  <div className="text-xs text-text-medium">Bakhshillo Khodzhaev</div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Other sections would follow */}
    </div>
  );
};

export default HomePage;
