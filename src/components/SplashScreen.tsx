
import { useState, useEffect } from 'react';
import { Battery } from 'lucide-react';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-primary z-[9999] flex flex-col items-center justify-center animate-fade-in min-h-screen min-w-screen">
      <div className="text-white flex flex-col items-center">
        <Battery className="h-20 w-20 mb-4 animate-pulse" />
        <h1 className="text-3xl font-bold mb-2">Battery Keeper</h1>
        <p className="text-lg opacity-80">Your battery database manager</p>
      </div>
    </div>
  );
};

export default SplashScreen;
