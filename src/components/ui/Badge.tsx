import React from 'react';

interface BadgeProps {
  text: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ text, className = '' }) => {
  return (
    <span className={`inline-block px-2 py-1 text-xs font-semibold bg-primary-light text-primary rounded-full ${className}`}>
      {text}
    </span>
  );
};

export default Badge;
