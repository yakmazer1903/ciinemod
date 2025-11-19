import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import { UserAnswers, QuizOption } from '../types';
import { ArrowRight, Check } from 'lucide-react';

interface QuizScreenProps {
  onComplete: (answers: UserAnswers) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUIZ_QUESTIONS.length - 1;

  const handleOptionSelect = (option: QuizOption) => {
    setSelectedOptionId(option.id);
    
    // Automatically advance after a short delay for smoother UX
    setTimeout(() => {
      const newAnswers = { ...answers, [currentQuestion.id]: option };
      setAnswers(newAnswers);
      
      if (isLastQuestion) {
        onComplete(newAnswers);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOptionId(null);
      }
    }, 400);
  };

  const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="w-full max-w-xl mb-8 h-2 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="w-full animate-slide-up">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-10 text-white">
          {currentQuestion.question}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            
            return (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option)}
                className={`
                  relative p-6 rounded-2xl border text-left transition-all duration-300 group
                  ${isSelected 
                    ? 'bg-purple-600 border-purple-500 scale-105 shadow-xl shadow-purple-900/50' 
                    : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-500 hover:shadow-lg'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{option.emoji}</span>
                    <span className={`text-lg font-medium ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {option.text}
                    </span>
                  </div>
                  
                  {isSelected && (
                    <div className="bg-white/20 rounded-full p-1">
                      <Check size={20} className="text-white" />
                    </div>
                  )}
                </div>
                
                {/* Hover Effect Background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}></div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-center text-slate-500 text-sm">
          Soru {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;