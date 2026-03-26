import { useQuery } from '@tanstack/react-query';
import { OutfitCategory, getFallbackOutfit } from '../services/outfitService';

const myApiKey = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;

export interface HourlyForecastItem {
    time: string;       // "09시", "12시" 등
    temp: number;       // 반올림된 기온
    category: OutfitCategory;
    weatherMain: string; // "Clear", "Clouds" 등
    weatherDescription: string; // "맑음" 등
    windSpeed: number; // 풍속 추가
}

export interface HourlyForecastResult {
    items: HourlyForecastItem[];
    hasBigTempGap: boolean; // 일교차 ≥ 10°C
    minTemp: number;
    maxTemp: number;
    todayDaily?: {
        temp: {
            min: number;
            max: number;
            day: number;
        };
        wind_speed: number;
        humidity: number;
    };
}


async function fetchHourlyForecast(
    lat?: number,
    lon?: number,
    cityName?: string,
): Promise<HourlyForecastResult> {
    let url: string;
    if (lat !== undefined && lon !== undefined) {
        url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${myApiKey}&units=metric&lang=kr`;
    } else if (cityName) {
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${myApiKey}&units=metric&lang=kr`;
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
            category: getFallbackOutfit(roundedTemp).category,
            weatherMain: item.weather[0].main,
            weatherDescription: item.weather[0].description,
            windSpeed: item.wind.speed,
        };
    });

    const temps = items.map(i => i.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const hasBigTempGap = (maxTemp - minTemp) >= 10;

    // 일일 데이터 요약 (analyzeWeather 용)
    const todayDaily = {
        temp: {
            min: minTemp,
            max: maxTemp,
            day: items.length > 0 ? items[0].temp : 0, // 현재 시간대 기온을 대표값으로 사용
        },
        wind_speed: todayForecasts.length > 0 ? todayForecasts[0].wind.speed : 0,
        humidity: todayForecasts.length > 0 ? todayForecasts[0].main.humidity : 0,
    };

    return { items, hasBigTempGap, minTemp, maxTemp, todayDaily };
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
