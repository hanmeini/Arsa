const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");
const https = require("https");

async function main() {
  try {
    // 1. Get API Key
    const envPath = path.join(__dirname, ".env");
    const envContent = fs.readFileSync(envPath, "utf8");
    const match = envContent.match(/NEXT_PUBLIC_GEMINI_API_KEY=(.*)/);
    const apiKey = match ? match[1].trim().replace(/['"]/g, "") : null;

    if (!apiKey) {
      console.error("❌ API Key not found in .env.local");
      return;
    }
    console.log(
      "✅ Found API Key (starts with):",
      apiKey.substring(0, 4) + "...",
    );

    // 2. Try to use the SDK to generate content with the problematic model
    const modelName = "gemini-3-flash-preview";
    console.log(`\nTesting generateContent with '${modelName}'...`);
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    // Small 1x1 red pixel JPEG base64
    const base64Image =
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: "image/png",
      },
    };

    try {
      console.log("Sending prompt + image...");
      const result = await model.generateContent([
        "Describe this image",
        imagePart,
      ]);
      const response = await result.response;
      console.log("✅ Success! Response:", response.text());
    } catch (e) {
      console.error(`❌ Failed with '${model.model}' (Multimodal):`);
      console.error(e.message);
    }

    // 3. List models using raw REST API (since SDK might not expose listModels easily in all envs)
    console.log("\nListing available models via REST API...");
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            if (json.error) {
              console.error("❌ API Error listing models:", json.error);
            } else if (json.models) {
              console.log("✅ Available Models:");
              const modelNames = json.models
                .map((m) => ` - ${m.name} (${m.displayName})`)
                .join("\n");
              console.log(modelNames);
              fs.writeFileSync("models_list.txt", modelNames);
            } else {
              console.log("Received data:", json);
            }
          } catch (e) {
            console.error("Error parsing response:", e);
          }
        });
      })
      .on("error", (e) => {
        console.error("Network error:", e);
      });
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}

main();
