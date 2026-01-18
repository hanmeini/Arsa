const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

async function main() {
  try {
    // 1. Get API Key
    const envPath = path.join(__dirname, ".env.local");
    const envContent = fs.readFileSync(envPath, "utf8");
    const match = envContent.match(/NEXT_PUBLIC_GEMINI_API_KEY=(.*)/);
    const apiKey = match ? match[1].trim().replace(/['"]/g, "") : null;

    if (!apiKey) {
      console.error("❌ API Key not found");
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const modelsToTest = [
      "gemini-2.0-flash-exp-image-generation",
      "gemini-3-flash-preview",
    ];

    for (const modelName of modelsToTest) {
      console.log(`\n-----------------------------------`);
      console.log(`Testing Image Generation with ${modelName}...`);

      const model = genAI.getGenerativeModel({ model: modelName });
      const prompt = "Draw a cute robot holding a flower";

      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;

        console.log("✅ Success!");
        // console.log("Response candidates:", JSON.stringify(response.candidates, null, 2));
        console.log("Text Response:", response.text());

        // Check for inline data (images)
        if (response.candidates && response.candidates[0].content.parts) {
          response.candidates[0].content.parts.forEach((part, index) => {
            if (part.inlineData) {
              console.log(
                `Found inline image data at part ${index} (Mime: ${part.inlineData.mimeType})`
              );
            }
          });
        }
      } catch (e) {
        console.error(`❌ Failed with ${modelName}:`, e.message);
      }
    }
  } catch (error) {
    console.error("Script error:", error);
  }
}

main();
