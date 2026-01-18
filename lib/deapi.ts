const DEAPI_URL = "https://api.deapi.ai/api/v1/client/img2img";
const API_KEY = process.env.DEAPI_KEY;

export async function generateDesign(formData: FormData) {
  if (!API_KEY) {
    throw new Error("DEAPI_KEY is not set");
  }

  // DeAPI expects 'prompt', 'image' (file), 'model', etc.
  // We ensure 'model' is present.
  if (!formData.has("model")) {
    formData.append("model", "ZImageTurbo_INT8"); // User requested model
  }

  // Ensure steps/guidance have defaults if not provided
  if (!formData.has("steps")) formData.append("steps", "25");
  if (!formData.has("guidance")) formData.append("guidance", "7.5");

  try {
    console.log("Using API Key:", API_KEY ? "Present" : "Missing");

    const response = await fetch(DEAPI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "Origin": "https://deapi.ai",
        "Referer": "https://deapi.ai/",
      },
      body: formData,
    });

    const responseText = await response.text();
    console.log("Raw DeAPI Response:", responseText);

    if (!response.ok) {
      console.error("DeAPI Error Status:", response.status);
      console.error("DeAPI Error Body:", responseText);
      throw new Error(`DeAPI request failed: ${response.status} ${responseText}`);
    }

    let result;
    try {
        result = JSON.parse(responseText);
    } catch (e) {
        console.error("Failed to parse DeAPI JSON:", e);
        throw new Error("Invalid JSON response from DeAPI");
    }

    console.log("DeAPI Success Result:", JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error("Design Generation Error:", error);
    throw error;
  }
}
