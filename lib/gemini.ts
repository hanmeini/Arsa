import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const MODEL_NAME = "gemini-3-flash-preview";

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
