import { Question } from './types';

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Şu anki enerji seviyen nasıl?",
    options: [
      { id: 'high', text: "Çok enerjik, yerimde duramıyorum!", emoji: "⚡", value: "Energetic, fast-paced" },
      { id: 'medium', text: "Normal, sakin bir akşam.", emoji: "🍵", value: "Balanced, moderate pace" },
      { id: 'low', text: "Pilim bitik, yorgunum.", emoji: "🔋", value: "Slow, relaxing, easy to watch" },
      { id: 'chaotic', text: "Kafam çok karışık.", emoji: "🌀", value: "Complex, mind-bending or comforting" },
    ]
  },
  {
    id: 2,
    question: "Hangi hava durumu ruh halini en iyi yansıtıyor?",
    options: [
      { id: 'sunny', text: "Güneşli ve parlak", emoji: "☀️", value: "Bright, uplifting, warm" },
      { id: 'rainy', text: "Yağmurlu ve melankolik", emoji: "🌧️", value: "Melancholic, atmospheric, noir" },
      { id: 'stormy', text: "Fırtınalı ve gergin", emoji: "⛈️", value: "Intense, dramatic, thriller" },
      { id: 'foggy', text: "Sisli ve gizemli", emoji: "🌫️", value: "Mysterious, suspenseful" },
    ]
  },
  {
    id: 3,
    question: "Bu filmden beklentin ne?",
    options: [
      { id: 'laugh', text: "Sadece gülmek istiyorum", emoji: "😂", value: "Comedy, light-hearted" },
      { id: 'cry', text: "Ağlayıp içimi dökmek istiyorum", emoji: "😭", value: "Emotional drama, tearjerker" },
      { id: 'think', text: "Hayatı sorgulamak istiyorum", emoji: "🤔", value: "Philosophical, sci-fi, psychological" },
      { id: 'escape', text: "Başka diyarlara kaçmak istiyorum", emoji: "🚀", value: "Fantasy, adventure, escapism" },
      { id: 'scare', text: "Korkudan titremek istiyorum", emoji: "😱", value: "Horror, thriller" },
    ]
  },
  {
    id: 4,
    question: "Kiminle izleyeceksin?",
    options: [
      { id: 'alone', text: "Yalnızım", emoji: "🧘", value: "Personal, introspective" },
      { id: 'partner', text: "Sevgilim/Eşimle", emoji: "❤️", value: "Romantic, engaging for couples" },
      { id: 'friends', text: "Arkadaşlarla toplandık", emoji: "🍕", value: "Fun, crowd-pleaser, action" },
      { id: 'family', text: "Ailece", emoji: "👨‍👩‍👧", value: "Family-friendly, wholesome" },
    ]
  }
];

export const LOADING_MESSAGES = [
  "Patlamış mısırlar hazırlanıyor...",
  "Senaryolar taranıyor...",
  "Yönetmen koltuğuna oturuluyor...",
  "Ruh haline uygun frekans bulunuyor...",
  "Replikler ezberleniyor..."
];