import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from "react-native-reanimated";

export type WeatherType = "화창" | "구름" | "비" | "천둥" | "눈";

interface WeatherProps {
    type: WeatherType;
    temp: number;
    high: number;
    low: number;
    city: string;
    humidity: number;
    windSpeed: number;
    dt: number;
    description?: string;
    delayAnimation?: boolean; // 애니메이션 지연 여부 추가
    shouldAnimate?: boolean; // 애니메이션 실행 여부 추가
}

const weatherInfo = {
    "화창": { colors: ["#FFD200", "#F7971E"], icon: "sunny", desc: "맑음" },
    "구름": { colors: ["#D7D2CC", "#304352"], icon: "cloudy", desc: "흐림" },
    "비": { colors: ["#0052D4", "#4364F7", "#6FB1FC"], icon: "rainy", desc: "비 내림" },
    "천둥": { colors: ["#1e3c72", "#2a5298"], icon: "thunderstorm", desc: "천둥 번개" },
    "눈": { colors: ["#d0daffff", "#5c5d61ff"], icon: "snow", desc: "눈" },
};

export default function WeatherCard({ type, temp, high, low, city, humidity, windSpeed, dt, description, delayAnimation, shouldAnimate }: WeatherProps) {
    const dayName = new Date(dt * 1000).toLocaleDateString("ko-KR", { weekday: "long" });
    const { colors, icon, desc: fallbackDesc } = weatherInfo[type] || weatherInfo["화창"];
    const displayDesc = description || fallbackDesc;

    const scale = useSharedValue(1);

    useEffect(() => {
        if (!shouldAnimate) return;

        // 데이터가 바뀌면 살짝 커졌다가 돌아오는 효과 (더 선명하게)
        // 밑에서 올라오는 경우(daily 선택) 지연 후 실행
        const animation = withSequence(
            withTiming(1.1, { duration: 120, easing: Easing.out(Easing.back(1.3)) }),
            withTiming(1, { duration: 200, easing: Easing.in(Easing.quad) })
        );

        if (delayAnimation) {
            scale.value = withDelay(300, animation);
        } else {
            scale.value = animation;
        }
    }, [dt, temp, scale, delayAnimation, shouldAnimate]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    return (
        <LinearGradient colors={colors as [string, string, ...string[]]} style={styles.container}>
            <Animated.View style={[styles.content, animatedStyle]}>
                <Text style={styles.dayText}>{dayName}</Text>
                <View style={styles.iconContainer}>
                    <Ionicons name={icon as any} size={120} color="white" />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.tempText}>{temp}°</Text>
                    <Text style={styles.descText}>{displayDesc}</Text>
                    <Text style={styles.highLowText}>최고: {high}° | 최저: {low}°</Text>
                </View>

                <View style={styles.extraInfoContainer}>
                    <View style={styles.extraInfoItem}>
                        <Ionicons name="water-outline" size={24} color="white" />
                        <Text style={styles.extraInfoValue}>{humidity}%</Text>
                        <Text style={styles.extraInfoLabel}>습도</Text>
                    </View>
                    <View style={styles.extraInfoItem}>
                        <Ionicons name="speedometer-outline" size={24} color="white" />
                        <Text style={styles.extraInfoValue}>{windSpeed}m/s</Text>
                        <Text style={styles.extraInfoLabel}>풍속</Text>
                    </View>
                </View>

                <View style={styles.updateTime}>
                    <Text style={styles.updateTimeText}>마지막 업데이트: {new Date(dt * 1000).toLocaleTimeString("ko-KR")}</Text>
                </View>
            </Animated.View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 30,
        margin: 10,
        overflow: 'hidden'
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    dayText: {
        fontSize: 28,
        color: "white",
        fontWeight: "bold",
        marginBottom: 10,
    },
    iconContainer: {
        marginBottom: 10,
    },
    infoContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    tempText: {
        fontSize: 80,
        fontWeight: "bold",
        color: "white",
    },
    descText: {
        fontSize: 24,
        color: "white",
        fontWeight: "500",
        marginBottom: 5,
    },
    highLowText: {
        fontSize: 16,
        color: "rgba(255, 255, 255, 0.8)",
    },
    extraInfoContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 20,
        padding: 20,
    },
    extraInfoItem: {
        alignItems: "center",
    },
    extraInfoValue: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
        marginTop: 5,
    },
    extraInfoLabel: {
        fontSize: 12,
        color: "rgba(255, 255, 255, 0.7)",
        marginTop: 2,
    },
    updateTime: {
        marginTop: 10,
    },
    updateTimeText: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.6)",
    },
});
