import React from 'react';
import { MovieRecommendation } from '../types';
import { RefreshCw, Star, Calendar, Clapperboard } from 'lucide-react';

interface ResultsScreenProps {
  recommendations: MovieRecommendation[];
  onRetry: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ recommendations, onRetry }) => {
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, movie: MovieRecommendation, index: number) => {
    const target = e.target as HTMLImageElement;
    
    // Fallback strategy:
    // 1. Try AI provided URL (initial)
    // 2. If fails, try MetaHub proxy using IMDb ID (often accurate for popular movies)
    // 3. If that fails, use a placeholder
    
    const aiUrl = movie.posterUrl;
    const proxyUrl = `https://images.metahub.space/poster/medium/${movie.imdbId}/img`;
    const placeholderUrl = `https://picsum.photos/seed/${movie.originalTitle.length + index}/400/600`;

    if (target.src === aiUrl) {
        target.src = proxyUrl;
    } else if (target.src === proxyUrl) {
        target.src = placeholderUrl;
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12">
      <header className="flex flex-col md:flex-row justify-between items-center mb-12 max-w-7xl mx-auto">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
            Senin İçin Seçtiklerimiz
          </h2>
          <p className="text-slate-400">
            Ruh halinle eşleşen, IMDb puanı yüksek 3 başyapıt.
          </p>
        </div>
        <button 
          onClick={onRetry}
          className="mt-4 md:mt-0 px-6 py-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors flex items-center gap-2 border border-slate-700"
        >
          <RefreshCw size={18} />
          Testi Tekrarla
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {recommendations.map((movie, index) => (
          <div 
            key={index} 
            className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/20 animate-slide-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Image Container */}
            <div className="aspect-[2/3] overflow-hidden relative bg-slate-900">
              <img 
                src={movie.posterUrl} 
                alt={movie.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                onError={(e) => handleImageError(e, movie, index)}
              />
              
              {/* Top Left: Mood Match */}
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-1 text-purple-400 font-bold border border-purple-500/30 shadow-lg">
                <Star size={14} fill="currentColor" />
                <span className="text-xs text-white">%</span>{movie.moodMatch} Uyum
              </div>

              {/* Top Right: IMDb Score */}
              <a 
                href={`https://www.imdb.com/title/${movie.imdbId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-md shadow-lg flex items-center gap-1.5 z-10 border-2 border-yellow-500 hover:bg-yellow-300 transition-colors cursor-pointer"
                title="IMDb Sayfasına Git"
              >
                <span className="font-black text-sm">IMDb</span>
                <span className="font-bold text-base">{movie.imdbScore}</span>
              </a>

              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-6 relative -mt-24">
              <div className="flex gap-2 mb-3 flex-wrap relative z-10">
                <span className="px-3 py-1 rounded-full bg-purple-600/90 backdrop-blur text-white text-xs font-medium border border-purple-400/30 shadow-sm">
                    {movie.genre}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-700/90 backdrop-blur text-slate-200 text-xs font-medium flex items-center gap-1 shadow-sm">
                    <Calendar size={12} /> {movie.year}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-1 leading-tight drop-shadow-lg">
                {movie.title}
              </h3>
              <p className="text-slate-300 text-sm mb-4 italic drop-shadow-md opacity-90">
                {movie.originalTitle} • Yön: {movie.director}
              </p>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3">
                {movie.summary}
              </p>

              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-full">
                    <Clapperboard size={18} className="text-purple-400" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-purple-400 uppercase tracking-wide mb-1">
                      Neden Bu Film?
                    </span>
                    <p className="text-slate-300 text-sm">
                      "{movie.reason}"
                    </p>
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

export default ResultsScreen;