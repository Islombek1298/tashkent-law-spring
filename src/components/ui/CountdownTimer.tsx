
import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex justify-between my-6 py-4">
      <div className="flex flex-col items-center relative">
        <div className="text-2xl font-bold text-primary bg-primary-light w-14 h-14 rounded-full flex items-center justify-center mb-2 relative">
          <div className="absolute inset-0 border-3 border-primary-light rounded-full opacity-50 animate-pulse"></div>
          {timeLeft.days}
        </div>
        <div className="text-xs font-medium text-text-medium">Days</div>
      </div>
      
      <div className="flex flex-col items-center relative">
        <div className="text-2xl font-bold text-primary bg-primary-light w-14 h-14 rounded-full flex items-center justify-center mb-2 relative">
          <div className="absolute inset-0 border-3 border-primary-light rounded-full opacity-50 animate-pulse"></div>
          {timeLeft.hours}
        </div>
        <div className="text-xs font-medium text-text-medium">Hours</div>
      </div>
      
      <div className="flex flex-col items-center relative">
        <div className="text-2xl font-bold text-primary bg-primary-light w-14 h-14 rounded-full flex items-center justify-center mb-2 relative">
          <div className="absolute inset-0 border-3 border-primary-light rounded-full opacity-50 animate-pulse"></div>
          {timeLeft.minutes}
        </div>
        <div className="text-xs font-medium text-text-medium">Minutes</div>
      </div>
      
      <div className="flex flex-col items-center relative">
        <div className="text-2xl font-bold text-primary bg-primary-light w-14 h-14 rounded-full flex items-center justify-center mb-2 relative">
          <div className="absolute inset-0 border-3 border-primary-light rounded-full opacity-50 animate-pulse"></div>
          {timeLeft.seconds}
        </div>
        <div className="text-xs font-medium text-text-medium">Seconds</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
