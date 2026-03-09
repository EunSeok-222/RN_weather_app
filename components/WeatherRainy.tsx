import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface WeatherProps {
    temp: number;
    high: number;
    low: number;
    city: string;
}

export default function WeatherRainy({ temp, high, low, city }: WeatherProps) {
    return (
        <LinearGradient colors={["#0052D4", "#4364F7", "#6FB1FC"]} style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Ionicons name="rainy" size={150} color="white" />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.tempText}>{temp}°</Text>
                    <Text style={styles.descText}>비 내림</Text>
                    <Text style={styles.highLowText}>최고: {high}° | 최저: {low}°</Text>
                </View>
            </View>
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
    iconContainer: {
        marginBottom: 20,
    },
    infoContainer: {
        alignItems: "center",
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
});
