export enum AppState {
  WELCOME = 'WELCOME',
  QUIZ = 'QUIZ',
  LOADING = 'LOADING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}

export interface QuizOption {
  id: string;
  text: string;
  emoji: string;
  value: string;
}

export interface Question {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface MovieRecommendation {
  title: string;
  originalTitle: string;
  year: string;
  director: string;
  genre: string;
  summary: string;
  reason: string;
  moodMatch: number; // Percentage 0-100
  imdbScore: string;
  imdbId: string;
  posterUrl: string;
}

export interface UserAnswers {
  [questionId: number]: QuizOption;
}