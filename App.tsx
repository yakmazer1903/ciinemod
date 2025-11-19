import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultsScreen from './components/ResultsScreen';
import { AppState, UserAnswers, MovieRecommendation } from './types';
import { getRecommendations } from './services/geminiService';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>(AppState.WELCOME);
  const [recommendations, setRecommendations] = useState<MovieRecommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const startQuiz = () => {
    setCurrentState(AppState.QUIZ);
    setError(null);
  };

  const handleQuizComplete = async (answers: UserAnswers) => {
    setCurrentState(AppState.LOADING);
    try {
      const results = await getRecommendations(answers);
      setRecommendations(results);
      setCurrentState(AppState.RESULTS);
    } catch (err) {
      console.error(err);
      setError("Film önerileri oluşturulurken bir hata oluştu. Lütfen tekrar dene.");
      setCurrentState(AppState.ERROR);
    }
  };

  const retry = () => {
    setCurrentState(AppState.WELCOME);
    setRecommendations([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-cinema-900 text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
      {currentState === AppState.WELCOME && (
        <WelcomeScreen onStart={startQuiz} />
      )}

      {currentState === AppState.QUIZ && (
        <QuizScreen onComplete={handleQuizComplete} />
      )}

      {currentState === AppState.LOADING && (
        <LoadingScreen />
      )}

      {currentState === AppState.RESULTS && (
        <ResultsScreen recommendations={recommendations} onRetry={retry} />
      )}

      {currentState === AppState.ERROR && (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="glass-panel p-8 rounded-2xl max-w-md text-center border border-red-500/30">
             <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="text-red-500" size={32} />
             </div>
             <h2 className="text-xl font-bold text-white mb-2">Hata Oluştu</h2>
             <p className="text-slate-400 mb-6">{error}</p>
             <button 
              onClick={retry}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
             >
               Ana Sayfaya Dön
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;