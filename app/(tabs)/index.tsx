import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WeatherClear from "../../components/WeatherClear";
import WeatherCloudy from "../../components/WeatherCloudy";
import WeatherRainy from "../../components/WeatherRainy";
import WeatherThunder from "../../components/WeatherThunder";

import * as Location from "expo-location";

type WeatherType = "화창" | "구름" | "비" | "천둥" | "눈";

const { width: SCREEN_WIDTH } = Dimensions.get("window")

export default function WeatherScreen() {
    const [weatherType, setWeatherType] = useState<WeatherType>("화창");
    const [city, setCity] = useState<string>("로딩 중...");
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [permission, setPermission] = useState<boolean>(false);

    const renderWeatherComponent = () => {
        const props = { temp: 24, high: 28, low: 21, city: city };
        switch (weatherType) {
            case "화창": return <WeatherClear {...props} />;
            case "구름": return <WeatherCloudy {...props} />;
            case "비": return <WeatherRainy {...props} />;
            case "천둥": return <WeatherThunder {...props} />;
            default: return <WeatherClear {...props} />;
        }
    };

    useEffect(() => {
        async function getCurrentLocation() {
            let data = await Location.requestForegroundPermissionsAsync();
            console.log('상태:', data);
            if (data.status !== 'granted') {
                setErrorMsg('위치 권한이 없습니다.');
                setCity("위치 거부됨");
                return;
            }
            setPermission(true);

            let location = await Location.getCurrentPositionAsync({}); //현재 위치 위도,경도
            setLocation(location);

            const { coords: { latitude, longitude } } = location; // latitude위도, longitude경도 
            const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude }); //위도,경도로 주소 변환
            console.log('위치:', reverseGeocode);
            if (reverseGeocode.length > 0) {
                const address = reverseGeocode[0];
                setCity(address.city || address.region || "알 수 없는 위치");
            }
        }

        getCurrentLocation();
    }, []);


    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton}>
                    <Ionicons name="menu" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.cityText}>{city}</Text>
                <View style={{ width: 28 }} />
            </View>

            <View style={styles.tabContainer}>
                {(["화창", "구름", "비", "천둥", "눈"] as WeatherType[]).map((type) => (
                    <TouchableOpacity
                        key={type}
                        style={[styles.tabButton, weatherType === type && styles.activeTab]}
                        onPress={() => setWeatherType(type)}
                    >
                        <Text style={[styles.tabText, weatherType === type && styles.activeTabText]}>{type}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView horizontal pagingEnabled contentContainerStyle={styles.weather} showsHorizontalScrollIndicator={false}>
                <View style={styles.weatherWrapper}>
                    {renderWeatherComponent()}
                    {renderWeatherComponent()}
                    {renderWeatherComponent()}
                    {renderWeatherComponent()}
                </View>
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
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        backgroundColor: "#f0f0f0",
        marginHorizontal: 20,
        borderRadius: 15,
        marginBottom: 20,
    },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    activeTab: {
        backgroundColor: "white",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    tabText: {
        fontSize: 14,
        color: "#666",
        fontWeight: "500",
    },
    activeTabText: {
        color: "#000",
        fontWeight: "bold",
    },
    weather: {
        flexDirection: "row",
        width: SCREEN_WIDTH * 4,
    },
    weatherWrapper: {
        flex: 1,
        flexDirection: "row",
        width: SCREEN_WIDTH,
        marginBottom: 30,
    },
});
