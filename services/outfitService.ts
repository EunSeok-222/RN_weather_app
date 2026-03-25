import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export type OutfitCategory =
  | "heavy_outer" // 패딩, 두꺼운 코트 (5도 이하)
  | "coat" // 코트, 가죽재킷 (6~9도)
  | "jacket" // 트렌치코트, 야상, 점퍼 (10~11도)
  | "light_knit" // 가디건, 니트 (12~16도)
  | "hoodie" // 맨투맨, 후드티, 얇은 니트 (17~19도)
  | "long_sleeve" // 셔츠, 긴팔티 (20~22도)
  | "short_sleeve" // 반팔티, 반바지 (23도~27도)
  | "sleeveless"; // 민소매, 린넨 (28도 이상)

export interface OutfitRecommendation {
  recommendation: string;
  category: OutfitCategory;
}

export const getOutfitRecommendation = async (
  temp: number,
  windSpeed: number,
  weatherStatus: string,
): Promise<OutfitRecommendation> => {
  if (!apiKey) {
    console.warn(
      "Gemini API key is not set. Please set EXPO_PUBLIC_GEMINI_API_KEY in .env",
    );
    return {
      recommendation: "오늘 날씨에 맞는 옷차림을 준비하세요!",
      category: "long_sleeve",
    };
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction:
      '당신은 20대 패션에 관심이 많은 친근하고 센스 있는 친구입니다. 사용자의 날씨(온도, 풍속, 상태)를 바탕으로 옷차림을 추천해주세요. 30자 이내의 짧고 세련된 문장으로 반환해야 합니다. 응답은 반드시 JSON 형식으로 다음 구조를 따라야 합니다: { "recommendation": "추천 문구(30자 이내)", "category": "heavy_outer | coat | jacket | light_knit | hoodie | long_sleeve | short_sleeve | sleeveless 중 하나" }',
  });

  const prompt = `현재 날씨 상태: ${weatherStatus}, 온도: ${temp}도, 풍속: ${windSpeed}m/s. 추천해줘!`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    // 마크다운 코드 블록 등이 포함되어 있을 수 있으므로 정규식으로 JSON 영역 추출
    const jsonStrMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonStrMatch) {
      const data = JSON.parse(jsonStrMatch[0]);
      return {
        recommendation: data.recommendation,
        category: data.category as OutfitCategory,
      };
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Gemini API error:", error);
    return {
      recommendation: "편안한 일상복을 추천할게!",
      category: "long_sleeve",
    };
  }
};
