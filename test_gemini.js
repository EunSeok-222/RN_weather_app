require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "";
console.log("API Key length:", apiKey.length);
if (!apiKey) {
    console.error("API Key is missing!");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function test() {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash", // Try a known model
            systemInstruction: 'Test system instruction',
        });
        const prompt = "Hi, say hello!";
        const result = await model.generateContent(prompt);
        console.log("Response text:", result.response.text());
    } catch (error) {
        console.error("Error occurred:", error);
        
        console.log("\nTrying alternate model (gemini-1.5-flash)...");
        try {
            const model2 = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
            });
            const result2 = await model2.generateContent(prompt);
            console.log("Response text (1.5-flash):", result2.response.text());
        } catch (error2) {
            console.error("Error with gemini-1.5-flash:", error2);
        }
    }
}

test();
