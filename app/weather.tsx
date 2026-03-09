import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Weather() {
    return (
        <LinearGradient
            colors={["#4facfe", "#00f2fe"]}
            style={styles.container}
        >
            <StatusBar style="light" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.menuButton}>
                        <Ionicons name="menu" size={28} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.cityText}>서울시ㅇㅇㅇㅇ</Text>
                    <View style={{ width: 28 }} />
                </View>

                {/* 여기에 날씨 정보 등 다음 단계 내용이 들어갈 예정입니다. */}
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 10,
    },
    menuButton: {
        padding: 5,
    },
    cityText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
});