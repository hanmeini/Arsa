const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

async function main() {
  try {
    const envPath = path.join(__dirname, ".env.local");
    // Fallback to .env if .env.local doesn't exist
    let envContent;
    try {
      envContent = fs.readFileSync(envPath, "utf8");
    } catch (e) {
      envContent = fs.readFileSync(path.join(__dirname, ".env"), "utf8");
    }

    const match = envContent.match(/NEXT_PUBLIC_GEMINI_API_KEY=(.*)/);
    const apiKey = match ? match[1].trim().replace(/['"]/g, "") : null;

    if (!apiKey) {
      console.error("❌ API Key not found");
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Dummy model init to get to listModels if possible, actually listModels is on genAI instance? No, it's usually on a specific manager or we just try models.

    // GoogleGenerativeAI SDK doesn't always expose listModels directly easily in all versions without the correct client.
    // Let's try to just run a generation with the requested model name to see if it works,
    // but actually the user already proved it doesn't.
    // Let's use the verify script to try 'gemini-2.0-flash' or 'gemini-1.5-pro' etc.

    // Better yet, let's try to use the @google/genai SDK used in the server action, as that might be different.

    console.log("Checking with @google/generative-ai SDK...");
    // There isn't a direct listModels on the high level SDK often, need to check docs or try common ones.

    const modelsToTry = [
      "gemini-2.0-flash-exp",
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-1.5-pro",
      "imagen-3.0-generate-001",
    ];

    for (const m of modelsToTry) {
      try {
        console.log(`Pinging ${m}...`);
        const model = genAI.getGenerativeModel({ model: m });
        await model.generateContent("Hello");
        console.log(`✅ ${m} is AVAILABLE`);
      } catch (e) {
        console.log(`❌ ${m} error: ${e.message.split("\n")[0]}`);
      }
    }
  } catch (error) {
    console.error("Script error:", error);
  }
}

main();
