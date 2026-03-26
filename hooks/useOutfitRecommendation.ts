import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOutfitRecommendation, OutfitRecommendation } from '../services/outfitService';

const OUTFIT_CACHE_KEY = 'weather_outfit_cache';

interface OutfitCache {
  temp: number;
  windSpeed: number;
  data: OutfitRecommendation;
  timestamp: number;
}

const checkAndFetchOutfit = async (temp: number, windSpeed: number, weatherStatus: string): Promise<OutfitRecommendation> => {
  try {
    // 1. 로컬 스토리지 확인하여 오차 범위 내인지 체크
    const cachedString = await AsyncStorage.getItem(OUTFIT_CACHE_KEY);
    if (cachedString) {
      const cached: OutfitCache = JSON.parse(cachedString);
      
      const isExactMatch = Math.round(cached.temp) === Math.round(temp) && 
                           Math.round(cached.windSpeed) === Math.round(windSpeed);
      
      // 1시간 이내의 캐시인지 확인
      const isRecent = Date.now() - cached.timestamp < 1000 * 60 * 60;

      // 1시간 이내의 캐시이고 정확히 같은 조건일 때만 캐시 응답 반환
      if (isExactMatch && isRecent) {
        console.log("로컬 스토리지 캐시 명중:", cached.data);
        return cached.data;
      }
    }
    
    // 2. 캐시를 사용할 수 없을 때 API 요청
    const newData = await getOutfitRecommendation(temp, windSpeed, weatherStatus);
    
    // 3. 응답값을 로컬 스토리지에 캐시로 저장
    const newCache: OutfitCache = {
      temp,
      windSpeed,
      data: newData,
      timestamp: Date.now()
    };
    await AsyncStorage.setItem(OUTFIT_CACHE_KEY, JSON.stringify(newCache));
    
    return newData;
  } catch (error) {
    console.error("옷차림 추천 가져오기 에러:", error);
    throw error;
  }
};

export const useOutfitRecommendation = (temp: number, windSpeed: number, weatherStatus: string, enabled: boolean) => {
  return useQuery({
    // 온도를 반올림하여 쿼리 키에 넣음으로써 미세한 앱 리렌더링마다 쿼리가 달라지는 것을 방지
    queryKey: ['outfitRecommendation', Math.round(temp), Math.round(windSpeed), weatherStatus],
    queryFn: () => checkAndFetchOutfit(temp, windSpeed, weatherStatus),
    staleTime: 1000 * 60 * 30, // 30분 (요구사항)
    enabled: enabled,
  });
};
