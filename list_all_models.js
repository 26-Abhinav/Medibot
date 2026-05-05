const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function listAllModels() {
    const key = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => {
                console.log(`- ${m.name} (${m.displayName})`);
            });
        } else {
            console.log("No models found or error:", JSON.stringify(data, null, 2));
        }
    } catch (err) {
        console.error("Fetch error:", err);
    }
}

listAllModels();
