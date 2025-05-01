import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white bg-opacity-20 backdrop-blur-md py-1.5 px-2.5 rounded-full text-white text-xs font-semibold z-10">
      <FaGlobe size={14} />
      <select 
        className="bg-transparent border-none text-white text-xs font-semibold outline-none cursor-pointer"
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
      >
        <option value="en" className="bg-primary-dark text-white">EN</option>
        <option value="ru" className="bg-primary-dark text-white">RU</option>
        <option value="uz" className="bg-primary-dark text-white">UZ</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
