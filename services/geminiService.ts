import { GoogleGenAI, Type } from "@google/genai";
import { UserAnswers, MovieRecommendation, QuizOption } from "../types";
import { QUIZ_QUESTIONS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getRecommendations = async (answers: UserAnswers): Promise<MovieRecommendation[]> => {
  
  // Construct a descriptive prompt based on answers
  let promptContext = "Kullanıcı aşağıdaki ruh hali testini çözdü:\n";
  
  Object.entries(answers).forEach(([questionId, option]) => {
    const question = QUIZ_QUESTIONS.find(q => q.id === parseInt(questionId));
    if (question) {
      promptContext += `- Soru: ${question.question}\n  Cevap: ${option.text} (Anlamı: ${option.value})\n`;
    }
  });

  const prompt = `
    ${promptContext}
    
    Lütfen bu kullanıcının ruh haline ve tercihlerine MÜKEMMEL şekilde uyan 3 adet film öner.

    ÖNEMLİ KURALLAR:
    1. Önerilen filmler SADECE "IMDb Top 250" veya "Ölmeden Önce İzlenmesi Gereken 1001 Film" listelerinde yer alan, sinema tarihine geçmiş YÜKSEK PUANLI başyapıtlar olmalıdır.
    2. Sıradan veya düşük puanlı filmler önerme.
    3. Öneriler birbirinden farklı türlerde olabilir ama hepsi ana ruh haliyle uyumlu olmalı.
    4. Açıklamalar Türkçe, samimi, kısa ve öz (tek cümle) olmalı.
    5. GÖRSEL SEÇİMİ (Çok Önemli): "posterUrl" alanı için, filmin adını Google Görseller'de arattığımızda çıkacak ilk sonuca benzer, YÜKSEK KALİTELİ, RESMİ ve ÇALIŞAN bir resim bağlantısı ver (Örn: Wikimedia Commons, TheMovieDB veya Amazon kaynaklı .jpg/.png linki). Eğer emin değilsen boş bırakma, en iyi tahminini yap.
    6. Ayrıca filmin "imdbId"sini (tt1234567 formatında) kesinlikle doğru ver.

  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Filmin Türkçe adı" },
              originalTitle: { type: Type.STRING, description: "Filmin orijinal adı" },
              year: { type: Type.STRING, description: "Yapım yılı" },
              director: { type: Type.STRING, description: "Yönetmen" },
              genre: { type: Type.STRING, description: "Türler" },
              summary: { type: Type.STRING, description: "Tek cümlelik vurucu özet" },
              reason: { type: Type.STRING, description: "Neden bu film? (Kısa)" },
              moodMatch: { type: Type.INTEGER, description: "Ruh haline uygunluk yüzdesi (80-100 arası)" },
              imdbScore: { type: Type.STRING, description: "IMDb puanı (örn: 8.9)" },
              imdbId: { type: Type.STRING, description: "Filmin IMDb ID'si (örn: tt0111161)" },
              posterUrl: { type: Type.STRING, description: "Filmin çalışan, dikey formatlı resmi poster URL'si" }
            },
            required: ["title", "originalTitle", "year", "director", "genre", "summary", "reason", "moodMatch", "imdbScore", "imdbId", "posterUrl"],
          },
        },
      },
    });

    if (response.text) {
        const data = JSON.parse(response.text);
        return data as MovieRecommendation[];
    }
    throw new Error("No data returned from Gemini");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};