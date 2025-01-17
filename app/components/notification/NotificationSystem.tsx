import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/app/components/ui/alert';

interface NotificationSystemProps {
  onScanStart: () => void;
}

const NotificationSystem = ({ onScanStart }: NotificationSystemProps) => {
  const [timeLeft, setTimeLeft] = useState('2:00');

  useEffect(() => {
    let timeRemaining = 120; // 2 minutes
    const interval = setInterval(() => {
      timeRemaining -= 1;
      if (timeRemaining <= 0) {
        clearInterval(interval);
      } else {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    // Only cleanup the interval
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 animate-bounce">
      <Alert 
        className="w-96 bg-green-800 border-green-600 text-white cursor-pointer hover:bg-green-700 transition-colors" 
        onClick={onScanStart}
      >
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <AlertTitle>Time to Scan!</AlertTitle>
        </div>
        <AlertDescription>
          Quick! Scan an object to add to your collection! ({timeLeft} remaining)
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default NotificationSystem;