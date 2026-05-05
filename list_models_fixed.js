const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    // There is no listModels in the main SDK class directly in older versions, 
    // but in newer ones it might be there. Let's try to fetch a known model metadata.
    console.log("Checking API key with a simple request...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello");
    console.log("Response:", result.response.text());
    console.log("✅ API Key and gemini-1.5-flash are working!");
  } catch (err) {
    console.error("Error details:", err);
    if (err.message.includes("404")) {
        console.log("Model not found. Trying gemini-pro...");
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent("Hello");
            console.log("Response:", result.response.text());
            console.log("✅ gemini-pro is working!");
        } catch (err2) {
            console.error("gemini-pro also failed:", err2.message);
        }
    }
  }
}

listModels();
