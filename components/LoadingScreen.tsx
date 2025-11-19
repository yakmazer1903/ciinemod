import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { LOADING_MESSAGES } from '../constants';

const LoadingScreen: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="glass-panel p-12 rounded-3xl flex flex-col items-center max-w-md w-full text-center shadow-2xl">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 animate-pulse"></div>
          <Loader2 size={64} className="text-purple-400 animate-spin relative z-10" />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4 animate-fade-in key={messageIndex}">
          {LOADING_MESSAGES[messageIndex]}
        </h3>
        
        <p className="text-slate-400 text-sm">
          Yapay zeka en uygun seçenekleri analiz ediyor...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;