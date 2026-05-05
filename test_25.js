const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

async function test25() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent("Hi");
    console.log("SUCCESS:", result.response.text());
  } catch (err) {
    console.error("FAILURE:", err.message);
    if (err.response) {
        console.error("Response data:", JSON.stringify(err.response, null, 2));
    }
  }
}

test25();
