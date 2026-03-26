import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import HourlyFashionGuide from "../../components/HourlyFashionGuide";
import WeatherAvatar from "../../components/WeatherAvatar";
import WeatherCard from "../../components/WeatherCard";
import { useHourlyForecast } from "../../hooks/useHourlyForecast";
import { useOutfitRecommendation } from "../../hooks/useOutfitRecommendation";
import { analyzeWeather } from "../../utils/weatherAnalyzer";
import AnimatedInsightCard from "../../components/AnimatedInsightCard";
import { useDailyForecast } from "../../hooks/useDailyForecast";
import ForecastList from "../../components/ForecastList";


type WeatherType = "화창" | "구름" | "비" | "천둥" | "눈";
const myApiKey = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;

const weatherBackgroundColors: Record<WeatherType, [string, string, ...string[]]> = {
    "화창": ["#FFD200", "#F7971E"],
    "구름": ["#D7D2CC", "#304352"],
    "비": ["#0052D4", "#4364F7", "#6FB1FC"],
    "천둥": ["#1e3c72", "#2a5298"],
    "눈": ["#d0daffff", "#5c5d61ff"],
};

const mapWeatherMainToType = (main: string): WeatherType => {
    if (main === "Clear") return "화창";
    if (main === "Clouds") return "구름";
    if (main === "Rain" || main === "Drizzle") return "비";
    if (main === "Thunderstorm") return "천둥";
    if (main === "Snow") return "눈";
    return "화창";
};

export default function WeatherScreen() {
    const router = useRouter();
    const { city: searchCity } = useLocalSearchParams<{ city?: string }>();

    const [weatherType, setWeatherType] = useState<WeatherType>("화창");
    const [city, setCity] = useState<string>("로딩 중...");
    const [temp, setTemp] = useState<number>(0);
    const [high, setHigh] = useState<number>(0);
    const [low, setLow] = useState<number>(0);
    const [humidity, setHumidity] = useState<number>(0);
    const [windSpeed, setWindSpeed] = useState<number>(0);
    const [dt, setDt] = useState<number>(0);
    const [weatherDescription, setWeatherDescription] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
    const [selectedItem, setSelectedItem] = useState<{
        type: 'hourly' | 'daily';
        data: any;
    } | null>(null);

    const scrollViewRef = useRef<ScrollView>(null);

    const [weatherCardY, setWeatherCardY] = React.useState(0);

    // 선택 항목 변경 시 자동으로 최상단으로 스크롤 (요일 선택 시에만)
    useEffect(() => {
        if (selectedItem?.type === 'daily') {
            scrollViewRef.current?.scrollTo({ y: weatherCardY, animated: true });
        }
    }, [selectedItem, weatherCardY]);


    const { data: forecastData } = useHourlyForecast(
        coords?.lat,
        coords?.lon,
        searchCity || undefined,
        !loading,
    );

    const { data: dailyForecastData } = useDailyForecast(
        coords?.lat,
        coords?.lon,
        searchCity || undefined,
        !loading,
    );


    useEffect(() => {
        if (searchCity) {
            getWeatherByCity(searchCity);
        } else {
            getCurrentLocation();
        }
    }, [searchCity]);

    async function getWeatherByCity(cityName: string) {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myApiKey}&units=metric&lang=kr`
            );
            const json = await response.json();

            if (json.cod === 200) {
                setCity(json.name);
                if (json.coord) {
                    setCoords({ lat: json.coord.lat, lon: json.coord.lon });
                }
                updateWeatherData(json);
            } else {
                console.error("도시 날씨 정보 에러:", json.message);
                setCity("검색 실패");
            }
        } catch (error) {
            console.error("도시 날씨 정보 가져오기 실패", error);
        } finally {
            setLoading(false);
        }
    }

    const updateWeatherData = (json: any) => {
        if (json.main) {
            setTemp(json.main.temp);
            setHigh(json.main.temp_max);
            setLow(json.main.temp_min);
            setHumidity(json.main.humidity);
            setWindSpeed(json.wind.speed);
            setDt(json.dt);
            setWeatherType(mapWeatherMainToType(json.weather[0].main));
            setWeatherDescription(json.weather[0].description);

            // API에서 제공하는 도시 이름으로 업데이트 (주소 변환 실패 대비)
            if (json.name) {
                setCity(json.name);
            }
        }
    };


    async function getCurrentLocation() {
        setLoading(true);
        try {
            let data = await Location.requestForegroundPermissionsAsync();
            if (data.status !== 'granted') {
                console.warn('위치 권한이 거부되었습니다.');
                setCity("위치 허용 필요");
                return;
            }

            let location;
            try {
                // 웹에서 15초 이상 걸리면 타임아웃 처리하도록 옵션 추가 (원하는 값으로 조정 가능)
                location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                    // @ts-ignore: timeout is not in standard expo-location types for all platforms but works on web/native in some versions
                    timeout: 10000 
                });
            } catch (e) {
                console.warn("현재 위치 정보를 가져오지 못했습니다. 마지막 위치 확인 중...", e);
                location = await Location.getLastKnownPositionAsync({});
            }

            if (!location) {
                console.error('위치 정보를 사용할 수 없습니다.');
                setCity("위치 확인 불가");
                return;
            }

            const { coords: { latitude, longitude } } = location;
            setCoords({ lat: latitude, lon: longitude });

            try {
                const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
                if (reverseGeocode.length > 0) {
                    const address = reverseGeocode[0];
                    setCity(address.city || address.region || "나의 위치");
                }
            } catch (e) {
                console.warn("주소 변환 실패:", e);
                setCity("나의 위치");
            }

            // 날씨 정보 가져오기
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${myApiKey}&units=metric&lang=kr`
            );
            const json = await response.json();
            updateWeatherData(json);

        } catch (error) {
            console.error("위치 기반 날씨 가져오기 에러:", error);
            setCity("날씨 로드 에러");
        } finally {
            setLoading(false);
        }
    }


    const backgroundColors = weatherBackgroundColors[weatherType] || weatherBackgroundColors["화창"];

    // 선택된 데이터에 따른 표시 값 결정
    const displayData = {
        temp: selectedItem?.type === 'hourly' ? selectedItem.data.temp : (selectedItem?.type === 'daily' ? selectedItem.data.temp.max : temp),
        weatherType: selectedItem?.type === 'hourly' ? mapWeatherMainToType(selectedItem.data.weatherMain) : (selectedItem?.type === 'daily' ? mapWeatherMainToType(selectedItem.data.weather[0].main) : weatherType),
        high: selectedItem?.type === 'daily' ? selectedItem.data.temp.max : high,
        low: selectedItem?.type === 'daily' ? selectedItem.data.temp.min : low,
        dt: selectedItem ? selectedItem.data.dt : dt,
        humidity: selectedItem?.type === 'daily' ? selectedItem.data.humidity || humidity : humidity,
        windSpeed: selectedItem?.type === 'hourly' ? selectedItem.data.windSpeed : (selectedItem?.type === 'daily' ? selectedItem.data.wind_speed || windSpeed : windSpeed),
        description: selectedItem?.type === 'hourly' ? selectedItem.data.weatherDescription : (selectedItem?.type === 'daily' ? selectedItem.data.weather[0].description : weatherDescription),
        category: selectedItem?.type === 'hourly' ? selectedItem.data.category : null,
    };

    // OutfitData 재계산 (표시 기온 기준)
    const { data: displayOutfitData, isLoading: isOutfitLoading } = useOutfitRecommendation(
        Math.round(displayData.temp),
        Math.round(displayData.windSpeed),
        displayData.weatherType,
        !!displayData.temp
    );

    return (
        <LinearGradient
            colors={backgroundColors as [string, string, ...string[]]}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <StatusBar style="dark" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push("/search")} style={styles.menuButton}>
                    <Ionicons name="menu" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.cityText}>{city}</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Weather Insight Section */}
                {loading || !forecastData?.todayDaily ? (
                    <View style={styles.skeletonContainer}>
                        <View style={styles.skeletonHeader} />
                        <View style={styles.skeletonText} />
                        <View style={styles.skeletonTextSmall} />
                    </View>
                ) : (
                    <AnimatedInsightCard insight={analyzeWeather(forecastData.todayDaily, dailyForecastData || []) as any} />
                )}

                <View onLayout={(e) => setWeatherCardY(e.nativeEvent.layout.y)} style={styles.weatherWrapper}>
                    {loading ? (
                        <Text style={styles.loadingText}>날씨 정보를 불러오는 중...</Text>
                    ) : (
                        <WeatherCard
                            type={displayData.weatherType}
                            temp={Math.round(displayData.temp)}
                            high={Math.round(displayData.high)}
                            low={Math.round(displayData.low)}
                            city={city}
                            humidity={displayData.humidity}
                            windSpeed={Math.round(displayData.windSpeed)}
                            dt={displayData.dt}
                            description={displayData.description}
                            delayAnimation={selectedItem?.type === 'daily'}
                            shouldAnimate={selectedItem?.type !== 'hourly'}
                        />
                    )}
                </View>

                {selectedItem && (
                    <TouchableOpacity 
                        style={styles.resetButton} 
                        onPress={() => setSelectedItem(null)}
                    >
                        <Ionicons name="refresh-circle" size={24} color="#4D96FF" />
                        <Text style={styles.resetText}>현재 날씨로 돌아가기</Text>
                    </TouchableOpacity>
                )}

                <WeatherAvatar
                    category={displayOutfitData?.category || displayData.category || "long_sleeve"}
                    temp={Math.round(displayData.temp)}
                    recommendation={displayOutfitData?.recommendation || (isOutfitLoading ? "날씨에 맞는 추천을 불러오는 중..." : "알맞은 옷차림을 추천해줄게!")}
                />

                {forecastData && forecastData.items.length > 0 && (
                    <HourlyFashionGuide
                        items={forecastData.items}
                        hasBigTempGap={forecastData.hasBigTempGap}
                        minTemp={forecastData.minTemp}
                        maxTemp={forecastData.maxTemp}
                        onSelect={(item) => setSelectedItem({ type: 'hourly', data: item })}
                    />
                )}

                {dailyForecastData && (
                    <ForecastList 
                        forecastData={dailyForecastData} 
                        onSelect={(item) => setSelectedItem({ type: 'daily', data: item })}
                    />
                )}
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
    },
    cityText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    menuButton: {
        padding: 5,
    },
    loadingText: {
        fontSize: 18,
        color: "#666",
        textAlign: "center",
        marginTop: 50,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 30,
    },
    weatherWrapper: {
        minHeight: 480,
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "center",
        marginBottom: 10,
    },
    skeletonContainer: {
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 16,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        height: 140,
        justifyContent: 'center',
    },
    skeletonHeader: {
        width: '60%',
        height: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 4,
        marginBottom: 12,
    },
    skeletonText: {
        width: '90%',
        height: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 4,
        marginBottom: 8,
    },
    skeletonTextSmall: {
        width: '40%',
        height: 14,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 4,
    },
    resetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        marginHorizontal: 100,
        paddingVertical: 8,
        borderRadius: 20,
        marginBottom: 10,
        gap: 5,
    },
    resetText: {
        fontSize: 14,
        color: '#4D96FF',
        fontWeight: 'bold',
    },
});
