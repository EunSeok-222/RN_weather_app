import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HourlyFashionGuide from "../../components/HourlyFashionGuide";
import WeatherAvatar from "../../components/WeatherAvatar";
import WeatherCard from "../../components/WeatherCard";
import { useHourlyForecast } from "../../hooks/useHourlyForecast";
import { useOutfitRecommendation } from "../../hooks/useOutfitRecommendation";


type WeatherType = "화창" | "구름" | "비" | "천둥" | "눈";
const myApiKey = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;

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
    const [loading, setLoading] = useState<boolean>(true);
    const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

    const { data: outfitData } = useOutfitRecommendation(
        Math.round(temp),
        Math.round(windSpeed),
        weatherType,
        !loading && temp !== 0
    );

    const { data: forecastData } = useHourlyForecast(
        coords?.lat,
        coords?.lon,
        searchCity || undefined,
        !loading,
    );

    const renderWeatherComponent = () => {
        const props = {
            type: weatherType,
            temp: Math.round(temp),
            high: Math.round(high),
            low: Math.round(low),
            city: city,
            humidity: humidity,
            windSpeed: windSpeed,
            dt: dt
        };
        return <WeatherCard {...props} />;
    };

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
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myApiKey}&units=metric`
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

            const mainWeather = json.weather[0].main;
            if (mainWeather === "Clear") setWeatherType("화창");
            else if (mainWeather === "Clouds") setWeatherType("구름");
            else if (mainWeather === "Rain" || mainWeather === "Drizzle") setWeatherType("비");
            else if (mainWeather === "Thunderstorm") setWeatherType("천둥");
            else if (mainWeather === "Snow") setWeatherType("눈");
        }
    };

    async function getCurrentLocation() {
        setLoading(true);
        let data = await Location.requestForegroundPermissionsAsync();
        if (data.status !== 'granted') {
            console.error('위치 권한이 없습니다.');
            setCity("위치 거부됨");
            setLoading(false);
            return;
        }

        let location;
        try {
            location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });
        } catch {
            console.log("현재 위치 정보를 가져올 수 없어 마지막 위치를 시도합니다.");
            location = await Location.getLastKnownPositionAsync({});
        }

        if (!location) {
            console.error('위치 정보를 사용할 수 없습니다.');
            setCity("위치 확인 불가");
            setLoading(false);
            return;
        }

        const { coords: { latitude, longitude } } = location; // latitude위도, longitude경도 
        setCoords({ lat: latitude, lon: longitude });
        const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude }); //위도,경도로 주소 변환
        if (reverseGeocode.length > 0) {
            const address = reverseGeocode[0];
            setCity(address.city || address.region || "알 수 없는 위치");
        }

        // 날씨 정보 가져오기
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${myApiKey}&units=metric`
            );
            const json = await response.json();
            updateWeatherData(json);
        } catch (error) {
            console.error("날씨 정보 상세 에러:", error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push("/search")} style={styles.menuButton}>
                    <Ionicons name="menu" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.cityText}>{city}</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.weatherWrapper}>
                    {loading ? (
                        <Text style={styles.loadingText}>날씨 정보를 불러오는 중...</Text>
                    ) : (
                        renderWeatherComponent()
                    )}
                </View>

                {outfitData && (
                    <WeatherAvatar
                        category={outfitData.category}
                        temp={Math.round(temp)}
                        recommendation={outfitData.recommendation}
                    />
                )}

                {forecastData && forecastData.items.length > 0 && (
                    <HourlyFashionGuide
                        items={forecastData.items}
                        hasBigTempGap={forecastData.hasBigTempGap}
                        minTemp={forecastData.minTemp}
                        maxTemp={forecastData.maxTemp}
                    />
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
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
});
