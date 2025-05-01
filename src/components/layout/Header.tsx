import React from 'react';
import LanguageSelector from '../ui/LanguageSelector';

interface HeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, backgroundImage }) => {
  const bgStyle = backgroundImage 
    ? { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: 'linear-gradient(135deg, #0062cc, #004a9f)' };
    
  return (
    <header 
      className="relative text-white p-6 md:rounded-md"
      style={bgStyle}
    >
      <LanguageSelector />
      
      <h1 className="text-2xl font-bold mb-1">{title}</h1>
      {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
    </header>
  );
};

export default Header;
