import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const MODEL_NAME = "gemini-2.5-flash";

export async function generateCaption(prompt: string, imageBase64?: string) {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const maxRetries = 3;
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      let result;
      if (imageBase64) {
        // Need to strip the header (e.g., "data:image/jpeg;base64,") for the API if it exists,
        // but GenerativeAI SDK usually expects the base64 string directly or with inline data part.
        // Let's standardise on passing the raw base64 data portion + mimeType.
        
        // Basic parsing if full data URI is passed
        const mimeType = imageBase64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || "image/jpeg";
        const base64Data = imageBase64.split(",")[1] || imageBase64;

        const imagePart = {
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        };

        result = await model.generateContent([prompt, imagePart]);
      } else {
        result = await model.generateContent(prompt);
      }

      const response = await result.response;
      return response.text();
    } catch (error: any) {
      if (error?.status === 429 && retryCount < maxRetries - 1) {
        console.warn(`Gemini API rate limited. Retrying (${retryCount + 1}/${maxRetries})...`);
        retryCount++;
        // Wait before retrying (exponential backoff: 1s, 2s, 4s)
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount)));
        continue;
      }
      
      console.error("Gemini API Error:", error);
      throw new Error(`Failed to generate caption with Gemini: ${error.message}`);
    }
  }
}

export async function generateDashboardData(month: string = "Januari", year: string = "2026") {
  // Check cache first (1 hour expiry)
  const cacheKey = `dashboard_data_${month}_${year}`;
  const cacheExpiryKey = `${cacheKey}_expiry`;
  
  if (typeof window !== "undefined") {
    const cached = localStorage.getItem(cacheKey);
    const expiry = localStorage.getItem(cacheExpiryKey);
    
    if (cached && expiry) {
      const isExpired = Date.now() > parseInt(expiry);
      if (!isExpired) {
        console.log("Using cached dashboard data");
        return JSON.parse(cached);
      }
    }
  }

  // FORCE DISABLE GEMINI for Dashboard to prevent quota usage
  // Return fallback data immediately
  return {
    stats: {
      views: "1.245",
      sales: "156",
      orders: "56",
      trend: 12
    },
    trend: {
      year: "2026",
      description: "Mengikuti perubahan kebutuhan dan selera desain",
      data: [10, 25, 40, 30, 45, 35, 50, 40, 60, 55, 70, 65, 80]
    }
  };
}

const SYSTEM_INSTRUCTION = `
Anda adalah Arsa, asisten AI yang cerdas dan ramah yang khusus membantu pelaku UMKM (Usaha Mikro, Kecil, dan Menengah) dan bisnis. Tugas utama Anda adalah memberikan saran bisnis, strategi pemasaran, manajemen stok, dan solusi praktis untuk masalah usaha. 

Aturan Interaksi:
1. Fokus Utama: Jawablah pertanyaan seputar bisnis, kewirausahaan, manajemen, pemasaran, dan pengembangan produk.
2. Penolakan Sopan: Jika pengguna bertanya tentang topik di luar bisnis (seperti politik, gosip selebriti, hiburan, atau masalah pribadi yang tidak relevan dengan usaha), tolak dengan sopan dan alihkan kembali ke topik UMKM.
3. Gaya Bahasa: Gunakan bahasa Indonesia yang luwes, suportif, profesional namun santai (casual professional).
4. FORMAT OUTPUT (PENTING):
   - Gunakan format 'Point-by-Point' (Bullet points) untuk menjelaskan langkah-langkah atau daftar ide.
   - Gunakan **Bold** untuk penekanan kata kunci penting.
   - Hindari paragraf teks yang terlalu panjang (wall of text). Pecah menjadi paragraf pendek agar mudah dibaca di layar HP.
   - Gunakan heading (# subjudul) jika jawaban cukup panjang.
5. Motivasi: Berikan semangat dan motivasi kepada pengguna dalam menjalankan usahanya.
`;

export type ModelType = 'auto' | 'fast' | 'reasoning' | 'pro';

export async function getChatResponse(
  history: { role: "user" | "model"; parts: string }[],
  message: string,
  modelType: ModelType = 'auto'
) {
  let modelName = 'gemini-2.5-flash'; // Default (Auto)
  let instructionOverride = SYSTEM_INSTRUCTION;

  switch (modelType) {
    case 'fast':
      modelName = 'gemini-2.5-flash'; // Faster, optimized for latency
      break;
    case 'reasoning':
      modelName = 'gemini-2.5-flash';
      // Add logic enforcement to instruction
      instructionOverride += `\n\nPENTING: Gunakan kemampuan penalaran mendalam. Sebelum menjawab, pikirkan langkah demi langkah, analisis pro dan kontra, dan berikan argumen yang logis dan terstruktur. Jelaskan alasan di balik setiap saran Anda.`;
      break;
    case 'pro':
      modelName = 'gemini-2.5-flash'; // Higher capability
      break;
    default: // auto
      modelName = 'gemini-2.5-flash';
      break;
  }

  const model = genAI.getGenerativeModel({ 
    model: modelName,
    systemInstruction: instructionOverride
  });
  
  const chat = model.startChat({
    history: history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.parts }],
    })),
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });

  try {
    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    throw new Error("Maaf, Arsa sedang sibuk. Coba lagi nanti ya!");
  }
}
