const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const os = require("os");
const csv = require("csv-parser");
const pdf = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");
// Node 24+ has built-in fetch, so we don't need node-fetch unless specific features are needed.
// However, to maintain compatibility with the existing code style:
const fetch = globalThis.fetch;

require('dotenv').config();
 
 process.on('uncaughtException', (err) => {
   console.error('🔥 Uncaught Exception:', err);
 });
 
 process.on('unhandledRejection', (reason, promise) => {
   console.error('🔥 Unhandled Rejection at:', promise, 'reason:', reason);
 });

const app = express();
const OLLAMA_URL = "http://localhost:11434/api";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Auto-detect the current local IP address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const LOCAL_IP = getLocalIP();

app.use(cors());
app.use(express.json());

// Config endpoint - returns the server's current IP so clients can self-configure
app.get('/config', (req, res) => {
  res.json({ backendURL: `http://${LOCAL_IP}:3000` });
});

// Serve the frontend app from the www folder
app.use(express.static(path.join(__dirname, '..', 'www')));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

const uploadMiddleware = upload.single("file");

// --- DATASET INTEGRATION ---
let doctorsData = [];
let locationsData = {}; // Format: { "State": ["City1", "City2"] }
const CSV_PATH = path.join(__dirname, "medibot_realistic_india_master_dataset.csv");

function loadDataset() {
  console.log("📂 Loading Indian Doctors Dataset...");
  const results = [];
  fs.createReadStream(CSV_PATH)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      doctorsData = results;

      // Extract unique states and cities
      const stateMap = new Map();
      doctorsData.forEach(d => {
        const state = d.State_UT;
        const city = d.City_Town_District;
        if (state && city) {
          if (!stateMap.has(state)) {
            stateMap.set(state, new Set());
          }
          stateMap.get(state).add(city);
        }
      });

      // Sort states and cities
      Array.from(stateMap.keys()).sort().forEach(state => {
        locationsData[state] = Array.from(stateMap.get(state)).sort();
      });

      console.log(`✅ Dataset loaded: ${doctorsData.length} doctors found across ${Object.keys(locationsData).length} states.`);
    })
    .on("error", (err) => {
      console.error("❌ Error loading dataset:", err);
    });
}

loadDataset();

function cleanMarkdown(text) {
  if (!text) return "";
  let html = text;
  html = html.replace(/```(?:html|json|markdown)?\n?([\s\S]*?)```/g, "$1");
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/^###\s+(.*)$/gm, "<h4 style='color:#176c94; margin:10px 0 5px 0;'>$1</h4>");
  html = html.replace(/^##\s+(.*)$/gm, "<h3 style='color:#176c94; margin:10px 0 5px 0;'>$1</h3>");
  html = html.replace(/^#\s+(.*)$/gm, "<h2 style='color:#176c94; margin:10px 0 5px 0;'>$1</h2>");
  html = html.replace(/^\s*\*\s+/gm, "&bull; ");
  html = html.replace(/^\s*-\s+/gm, "&bull; ");
  html = html.replace(/\n/g, "<br>");
  return html.trim();
}

// Gemini Helper with Multi-Model Fallback
async function getGeminiResponse(prompt, fileData = null) {
  const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-flash-latest"];
  let lastErr = null;

  for (const modelName of models) {
    try {
      console.log(`Trying Gemini model: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      let result;

      if (fileData) {
        result = await model.generateContent([
          prompt,
          {
            inlineData: {
              data: fileData.buffer.toString("base64"),
              mimeType: fileData.mimetype
            }
          }
        ]);
      } else {
        result = await model.generateContent(prompt);
      }

      const response = await result.response;
      return cleanMarkdown(response.text());
    } catch (err) {
      lastErr = err;
      console.error(`Gemini Error with ${modelName}:`, err.message);
      // If it's a 404 (model not found) or 503 (overloaded), try the next one
      if (err.message.includes("404") || err.message.includes("503") || err.message.includes("quota")) {
        continue;
      }
      throw err; // For other errors, stop and throw
    }
  }
  throw lastErr;
}

// --- ENDPOINTS ---

app.get("/test", (req, res) => {
  res.send("Medibot Backend with Dataset OK");
});

app.get("/locations", (req, res) => {
  res.json(locationsData);
});

app.get("/doctors", (req, res) => {
  const { specialization, state, city } = req.query;
  let filtered = doctorsData;

  if (specialization) {
    const spec = specialization.toLowerCase();
    filtered = filtered.filter(d => d.Specialization && d.Specialization.toLowerCase().includes(spec));
  }

  if (state) {
    const stateName = state.toLowerCase();
    filtered = filtered.filter(d => d.State_UT && d.State_UT.toLowerCase().includes(stateName));
  }

  if (city) {
    const cityName = city.toLowerCase();
    filtered = filtered.filter(d => d.City_Town_District && d.City_Town_District.toLowerCase().includes(cityName));
  }

  res.json(filtered.slice(0, 20));
});

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  const state = req.body.state || "Maharashtra";
  const city = req.body.city || "Mumbai";
  const language = req.body.language || "English";

  const systemPrompt = `You are Medibot, a helpful healthcare assistant. 
  Location Context: User is in ${city}, ${state}.
  Language Context: You MUST respond to the user entirely in ${language}.
  
  TASK:
  1. Analyze symptoms concisely.
  2. If the user needs a specialist, you MUST include a hidden trigger tag at the end of your message in this format: [SEARCH:SpecializationName]
     Example: "You should see a cardiologist. [SEARCH:Cardiologist]"
     Use only these categories if possible: Cardiologist, Pediatrician, Dermatologist, General Physician, Orthopedic, ENT Specialist.
  
  Rules:
  - Keep it professional.
  - Use HTML for formatting.
  - Don't mention the hidden tag to the user.`;

  const fullPrompt = `${systemPrompt}\n\nUser: ${userMessage}`;

  try {
    const response = await fetch(`${OLLAMA_URL}/chat`, {
      method: "POST",
      body: JSON.stringify({
        model: "llama3",
        messages: [{ role: "user", content: fullPrompt }],
        stream: false
      }),
      signal: AbortSignal.timeout(10000)
    });
    const data = await response.json();
    res.json({ reply: cleanMarkdown(data.message.content) });
  } catch (err) {
    console.log("Ollama unavailable, falling back to Gemini...");
    try {
      const reply = await getGeminiResponse(fullPrompt);
      res.json({ reply });
    } catch (geminiErr) {
      console.error("Gemini Fallback Error:", geminiErr);
      res.json({ reply: "All AI services are currently unavailable 😔 (Gemini Error: " + geminiErr.message + ")" });
    }
  }
});

app.post("/analyze", async (req, res) => {
  uploadMiddleware(req, res, async (err) => {
    if (err) return res.json({ reply: "Upload error 😔" });

    try {
      const file = req.file;
      if (!file) return res.json({ reply: "No file uploaded 😔" });

      const documentType = req.body.documentType || "report";
      const language = req.body.language || "English";
      const userQuery = req.body.query || (documentType === "prescription" ? "Read this prescription." : "Analyze this medical report.");
      
      let prompt = `[CRITICAL INSTRUCTION]: You MUST output your ENTIRE response in ${language}. Do not use English. Translate all headings, summaries, and findings into ${language}.\n\n`;
      if (documentType === "prescription") {
          prompt += `${userQuery} Extract the Doctor details, Patient details, and a clear list of prescribed medicines with their dosages and instructions. Return ONLY valid HTML for UI cards in ${language}. 
          Format: <div class="report-card"><h3>[Translated 'Prescription Details']</h3><p>...</p></div>
          <div class="report-card"><h3>[Translated 'Medicines']</h3><ul><li>...</li></ul></div>`;
      } else {
          prompt += `${userQuery}. Return ONLY valid HTML for UI cards in ${language}. 
          Format: <div class="report-card"><h3>[Translated 'Summary']</h3><p>...</p></div>
          <div class="report-card"><h3>[Translated 'Key Findings']</h3><ul><li>...</li></ul></div>
          <div class="report-card"><h3>[Translated 'Recommendations']</h3><p>...</p></div>`;
      }

      try {
        if (file.mimetype === "application/pdf") {
          const pdfData = await pdf(file.buffer);
          const pdfText = pdfData.text;
          const response = await fetch(`${OLLAMA_URL}/chat`, {
            method: "POST",
            body: JSON.stringify({
              model: "llama3",
              messages: [{ role: "user", content: `Analyze this: ${pdfText}\n\n${prompt}` }],
              stream: false
            }),
            signal: AbortSignal.timeout(10000)
          });
          const data = await response.json();
          return res.json({ reply: cleanMarkdown(data.message.content) });
        }

        if (file.mimetype.startsWith("image/")) {
          const response = await fetch(`${OLLAMA_URL}/generate`, {
            method: "POST",
            body: JSON.stringify({
              model: "llava",
              prompt: prompt,
              images: [file.buffer.toString("base64")],
              stream: false
            }),
            signal: AbortSignal.timeout(15000)
          });
          const data = await response.json();
          return res.json({ reply: cleanMarkdown(data.response) });
        }
      } catch (ollamaErr) {
        console.log("Ollama analysis failed, falling back to Gemini...");

        if (file.mimetype === "application/pdf") {
          const pdfData = await pdf(file.buffer);
          const reply = await getGeminiResponse(`${pdfData.text}\n\n${prompt}`);
          return res.json({ reply });
        } else {
          const reply = await getGeminiResponse(prompt, file);
          return res.json({ reply });
        }
      }

      res.json({ reply: "Unsupported file type 😔" });
    } catch (err) {
      console.error("Analysis Final Error:", err);
      res.json({ reply: "Error analyzing report 😔 (Details: " + err.message + ")" });
    }
  });
});

// Export for Vercel
module.exports = app;

// Only listen if running locally
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}



