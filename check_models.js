const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

async function listModels() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("No API key found in .env");
    return;
  }
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    console.log("Fetching all available models for your API key...");
    // The listModels method is available on the genAI object or via a different path depending on SDK version
    // For @google/generative-ai, it might not be directly on genAI. 
    // Actually, in the latest SDK, it's not a simple method on genAI.
    // Let's try a different way to check access.
    const testModels = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash", "gemini-pro"];
    for (const m of testModels) {
        try {
            const model = genAI.getGenerativeModel({ model: m });
            await model.generateContent("test");
            console.log(`✅ ${m}: AVAILABLE`);
        } catch (e) {
            console.log(`❌ ${m}: NOT AVAILABLE (${e.message})`);
        }
    }
  } catch (err) {
    console.error("Error checking models:", err);
  }
}

listModels();
