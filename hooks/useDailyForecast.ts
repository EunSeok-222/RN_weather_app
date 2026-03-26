import { useQuery } from '@tanstack/react-query';

const myApiKey = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;

export interface DailyForecastItem {
    dt: number;
    temp: {
        min: number;
        max: number;
    };
    weather: {
        main: string;
        description: string;
        icon: string;
    }[];
    pop: number; // 강수 확률 (0~1)
}

async function fetchDailyForecast(
    lat?: number,
    lon?: number,
    cityName?: string,
): Promise<DailyForecastItem[]> {
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

    // 3시간 단위 데이터를 일별로 그룹화 (최대 5일)
    const dailyMap: Record<string, DailyForecastItem> = {};

    json.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000).toISOString().split('T')[0];
        
        if (!dailyMap[date]) {
            dailyMap[date] = {
                dt: item.dt,
                temp: {
                    min: item.main.temp_min,
                    max: item.main.temp_max,
                },
                weather: item.weather,
                pop: item.pop || 0,
            };
        } else {
            // 하루 중 최저/최고 기온 및 최대 강수 확률 업데이트
            dailyMap[date].temp.min = Math.min(dailyMap[date].temp.min, item.main.temp_min);
            dailyMap[date].temp.max = Math.max(dailyMap[date].temp.max, item.main.temp_max);
            dailyMap[date].pop = Math.max(dailyMap[date].pop, item.pop || 0);
            
            // 정오(12시) 근처의 날씨 상태를 대표로 사용
            const hour = new Date(item.dt * 1000).getHours();
            if (hour >= 11 && hour <= 13) {
                dailyMap[date].weather = item.weather;
            }
        }
    });

    return Object.values(dailyMap).slice(0, 7); // 최대 5~6일치 데이터 반환 (OpenWeather 5day API 한계)
}

export const useDailyForecast = (
    lat?: number,
    lon?: number,
    cityName?: string,
    enabled: boolean = false,
) => {
    return useQuery({
        queryKey: ['dailyForecast', lat, lon, cityName],
        queryFn: () => fetchDailyForecast(lat, lon, cityName),
        staleTime: 1000 * 60 * 60, // 1시간
        enabled,
    });
};
