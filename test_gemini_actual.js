require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

async function test() {
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash", 
        systemInstruction: '당신은 20대 패션에 관심이 많은 친근하고 센스 있는 친구입니다. 사용자의 날씨(온도, 풍속, 상태)를 바탕으로 옷차림을 추천해주세요. 30자 이내의 짧고 세련된 문장으로 반환해야 합니다. 응답은 반드시 JSON 형식으로 다음 구조를 따라야 합니다: { "recommendation": "추천 문구(30자 이내)", "category": "heavy_outer | coat | jacket | light_knit | hoodie | long_sleeve | short_sleeve | sleeveless 중 하나" }',
    });

    const prompt = `현재 날씨 상태: 화창, 온도: 20도, 풍속: 2m/s. 추천해줘!`;

    try {
        console.log("Gemini 요청 전송 중...");
        const result = await model.generateContent(prompt);
        console.log("Raw Response:", result.response.text());
    } catch (error) {
        console.error("Gemini Error:", error);
    }
}

test();
