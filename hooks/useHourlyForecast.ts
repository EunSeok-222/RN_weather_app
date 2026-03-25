import { useQuery } from '@tanstack/react-query';
import { OutfitCategory } from '../services/outfitService';

const myApiKey = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;

export interface HourlyForecastItem {
    time: string;       // "09시", "12시" 등
    temp: number;       // 반올림된 기온
    category: OutfitCategory;
    weatherMain: string; // "Clear", "Clouds" 등
}

export interface HourlyForecastResult {
    items: HourlyForecastItem[];
    hasBigTempGap: boolean; // 일교차 ≥ 10°C
    minTemp: number;
    maxTemp: number;
}

/**
 * 기온을 기반으로 OutfitCategory를 결정합니다.
 * (Gemini API를 호출하지 않고 온도 범위만으로 매핑)
 */
function tempToCategory(temp: number): OutfitCategory {
    if (temp <= 5) return 'heavy_outer';
    if (temp <= 9) return 'coat';
    if (temp <= 11) return 'jacket';
    if (temp <= 16) return 'light_knit';
    if (temp <= 19) return 'hoodie';
    if (temp <= 22) return 'long_sleeve';
    if (temp <= 27) return 'short_sleeve';
    return 'sleeveless';
}

async function fetchHourlyForecast(
    lat?: number,
    lon?: number,
    cityName?: string,
): Promise<HourlyForecastResult> {
    let url: string;
    if (lat !== undefined && lon !== undefined) {
        url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${myApiKey}&units=metric`;
    } else if (cityName) {
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${myApiKey}&units=metric`;
    } else {
        throw new Error('lat/lon 또는 cityName이 필요합니다.');
    }

    const response = await fetch(url);
    const json = await response.json();

    if (json.cod !== '200') {
        throw new Error(json.message || '예보 데이터를 가져올 수 없습니다.');
    }

    // 오늘 날짜의 데이터만 필터 (최대 8개 = 24시간)
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0]; // "YYYY-MM-DD"
    const tomorrowDate = new Date(now);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrowStr = tomorrowDate.toISOString().split('T')[0];

    const todayForecasts = json.list.filter((item: any) => {
        const dtTxt: string = item.dt_txt; // "2026-03-25 12:00:00"
        return dtTxt.startsWith(todayStr) || dtTxt.startsWith(tomorrowStr);
    }).slice(0, 8); // 최대 8개 시간대

    if (todayForecasts.length === 0) {
        return { items: [], hasBigTempGap: false, minTemp: 0, maxTemp: 0 };
    }

    const items: HourlyForecastItem[] = todayForecasts.map((item: any) => {
        const dt = new Date(item.dt * 1000);
        const hour = dt.getHours();
        const roundedTemp = Math.round(item.main.temp);
        return {
            time: `${hour}시`,
            temp: roundedTemp,
            category: tempToCategory(roundedTemp),
            weatherMain: item.weather[0].main,
        };
    });

    const temps = items.map(i => i.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const hasBigTempGap = (maxTemp - minTemp) >= 10;

    return { items, hasBigTempGap, minTemp, maxTemp };
}

export const useHourlyForecast = (
    lat?: number,
    lon?: number,
    cityName?: string,
    enabled: boolean = false,
) => {
    return useQuery({
        queryKey: ['hourlyForecast', lat?.toFixed(2), lon?.toFixed(2), cityName],
        queryFn: () => fetchHourlyForecast(lat, lon, cityName),
        staleTime: 1000 * 60 * 30, // 30분
        enabled,
    });
};
