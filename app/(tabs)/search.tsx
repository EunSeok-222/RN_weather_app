import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const STORAGE_KEY = "@favorite_regions"; // 기기에 저장될 즐겨찾기 목록의 고유 키값

export default function Search() {
    const router = useRouter(); // 화면 간 이동을 도와주는 도구
    const [searchQuery, setSearchQuery] = useState("");
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    // 1. 휴대폰 저장소(AsyncStorage)에서 기존 즐겨찾기 목록을 가져오는 함수
    const loadFavorites = async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);
            if (stored) {
                // 저장된 텍스트(JSON)를 다시 배열 형태로 바꿔서 화면에 세팅합니다.
                setFavorites(JSON.parse(stored));
            }
        } catch (e) {
            console.error("즐겨찾기 로드 실패", e);
        }
    };

    // 2. 검색한 도시를 즐겨찾기 목록에 새로 추가(저장)하는 함수
    const saveFavorite = async (city: string) => {
        // 검색어가 비어있거나, 이미 즐겨찾기에 있는 도시라면 무시합니다.
        if (!city.trim() || favorites.includes(city)) return;

        try {
            // 기존 목록 끝에 새로운 도시를 더해 새 배열을 만듭니다.
            const newFavorites = [...favorites, city.trim()];
            // 업데이트된 배열을 다시 텍스트(JSON)로 바꿔서 휴대폰 저장소에 덮어씁니다.
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
            setFavorites(newFavorites);
            setSearchQuery("");
        } catch (e) {
            console.error("즐겨찾기 저장 실패", e);
        }
    };

    // 3. 쓰레기통 버튼을 눌렀을 때 특정 도시를 삭제하는 함수
    const removeFavorite = async (cityToRemove: string) => {
        try {
            const newFavorites = favorites.filter(city => city !== cityToRemove);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
            setFavorites(newFavorites);
        } catch (e) {
            console.error("즐겨찾기 삭제 실패", e);
        }
    };

    // 4. (보통 키보드 엔터 쳤을 때) 검색어 그대로 날씨 화면으로 넘어가는 함수
    const handleSearch = () => {
        if (searchQuery.trim()) {
            // 이전에 있던 날씨 기본 화면으로 이동하면서, 주소 뒤에 ?city=검색어 형태로 파라미터를 붙여 넘깁니다.
            router.push({ pathname: "/(tabs)", params: { city: searchQuery.trim() } });
        }
    };

    // 현재 위치 날씨 보기 버튼을 눌렀을 때
    const handleCurrentLocation = () => {
        // 파라미터(city)를 비워서 메인 페이지로 이동해 내 위치 기준 날씨를 표시하게 합니다.
        router.push({ pathname: "/(tabs)", params: { city: "" } });
    };

    // 5. 이미 저장된 즐겨찾기 리스트 안의 항목을 눌렀을 때 날씨 화면으로 넘어가는 함수
    const handleSelectFavorite = (city: string) => {
        router.push({ pathname: "/(tabs)", params: { city } });
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* 상단 헤더 영역 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>지역 검색</Text>
                <View style={{ width: 28 }} />
            </View>

            {/* 검색창 영역 */}
            <View style={styles.searchContainer}>
                <View style={styles.inputContainer}>
                    <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="도시 이름을 영어로 입력하세요 (예: Seoul)"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                    />
                </View>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => saveFavorite(searchQuery)}
                >
                    <Text style={styles.saveButtonText}>저장</Text>
                </TouchableOpacity>
            </View>

            {/* 현재 위치로 보기 버튼 */}
            <TouchableOpacity style={styles.currentLocationButton} onPress={handleCurrentLocation}>
                <Ionicons name="navigate" size={20} color="white" />
                <Text style={styles.currentLocationText}>현재 위치 날씨 보기</Text>
            </TouchableOpacity>

            {/* 즐겨찾기 목록 영역 */}
            <View style={styles.favoritesContainer}>
                <Text style={styles.favoritesTitle}>즐겨찾는 지역</Text>
                {favorites.length === 0 ? (
                    <Text style={styles.emptyText}>저장된 지역이 없습니다.</Text>
                ) : (
                    <FlatList
                        data={favorites}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.favoriteItem}
                                onPress={() => handleSelectFavorite(item)}
                            >
                                <View style={styles.favoriteCityInfo}>
                                    <Ionicons name="location-outline" size={24} color="#333" />
                                    <Text style={styles.favoriteCityText}>{item}</Text>
                                </View>
                                <TouchableOpacity onPress={() => removeFavorite(item)}>
                                    <Ionicons name="trash-outline" size={24} color="#ff4444" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>
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
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    backButton: {
        padding: 5,
    },
    searchContainer: {
        flexDirection: "row",
        padding: 20,
        alignItems: "center",
    },
    inputContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 50,
        marginRight: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: "#0052D4",
        height: 50,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    saveButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    currentLocationButton: {
        backgroundColor: "#F7971E", // 밝고 눈에 띄는 주황색 테마
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
        marginBottom: 20,
        paddingVertical: 15,
        borderRadius: 10,
    },
    currentLocationText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },
    favoritesContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    favoritesTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#333",
    },
    favoriteItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    favoriteCityInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    favoriteCityText: {
        fontSize: 18,
        marginLeft: 10,
        color: "#333",
    },
    emptyText: {
        textAlign: "center",
        color: "#999",
        marginTop: 30,
        fontSize: 16,
    },
});
