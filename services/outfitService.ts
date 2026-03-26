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

/**
 * API 호출 실패 시 또는 보조 로직으로 사용될 온도 기반 기본 옷차림 추천 함수입니다.
 */
export function getFallbackOutfit(temp: number): { recommendation: string; category: OutfitCategory } {
    if (temp <= 5) return { recommendation: "패딩이나 두꺼운 코트를 꼭 챙기세요!", category: 'heavy_outer' };
    if (temp <= 9) return { recommendation: "코트나 가죽재킷이 적당한 날씨예요.", category: 'coat' };
    if (temp <= 11) return { recommendation: "트렌치코트나 가벼운 점퍼를 입어보세요.", category: 'jacket' };
    if (temp <= 16) return { recommendation: "가디건이나 니트가 잘 어울리는 날씨예요.", category: 'light_knit' };
    if (temp <= 19) return { recommendation: "가벼운 후드티나 맨투맨을 추천합니다.", category: 'hoodie' };
    if (temp <= 22) return { recommendation: "셔츠나 긴팔 티셔츠가 적당해요.", category: 'long_sleeve' };
    if (temp <= 27) return { recommendation: "반팔 티셔츠를 입기에 딱 좋은 날씨예요.", category: 'short_sleeve' };
    return { recommendation: "민소매나 얇은 린넨 옷이 시원할 거예요.", category: 'sleeveless' };
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
    return getFallbackOutfit(temp);
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash", // 모델명 업데이트 (필요 시)
    systemInstruction:
      '당신은 20대 패션에 관심이 많은 친근하고 센스 있는 친구입니다. 사용자의 날씨(온도, 풍속, 상태)를 바탕으로 옷차림을 추천해주세요. 30자 이내의 짧고 세련된 문장으로 반환해야 합니다. 응답은 반드시 JSON 형식으로 다음 구조를 따라야 합니다: { "recommendation": "추천 문구(30자 이내)", "category": "heavy_outer | coat | jacket | light_knit | hoodie | long_sleeve | short_sleeve | sleeveless 중 하나" }',
  });

  const prompt = `현재 날씨 상태: ${weatherStatus}, 온도: ${temp}도, 풍속: ${windSpeed}m/s. 추천해줘!`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
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
    console.warn("Gemini API error (fallback used):", error);
    return getFallbackOutfit(temp);
  }
};
