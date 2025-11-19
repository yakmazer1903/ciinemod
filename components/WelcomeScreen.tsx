import React from 'react';
import { Film, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="glass-panel p-10 rounded-3xl shadow-2xl max-w-2xl w-full animate-fade-in border border-white/10">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-tr from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <Film size={48} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl font-serif font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200">
          SineMod
        </h1>
        
        <p className="text-lg text-slate-300 mb-8 font-light leading-relaxed">
          Ne izleyeceğine karar veremiyor musun? Ruh halini, enerjini ve hislerini bize anlat.
          Yapay zeka destekli sinema asistanımız, tam şu an için sana en uygun filmi bulsun.
        </p>

        <button 
          onClick={onStart}
          className="group relative px-8 py-4 bg-white text-slate-900 font-bold rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Testi Başlat <Sparkles size={20} className="group-hover:animate-spin" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
      
      <footer className="absolute bottom-4 text-slate-500 text-sm">
        Powered by Google Gemini 2.5
      </footer>
    </div>
  );
};

export default WelcomeScreen;