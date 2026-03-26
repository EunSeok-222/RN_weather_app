import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { OutfitCategory } from '../services/outfitService';
import { HourlyForecastItem } from '../hooks/useHourlyForecast';
import AvatarCoat from './avatars/AvatarCoat';
import AvatarHeavyOuter from './avatars/AvatarHeavyOuter';
import AvatarHoodie from './avatars/AvatarHoodie';
import AvatarJacket from './avatars/AvatarJacket';
import AvatarLightKnit from './avatars/AvatarLightKnit';
import AvatarLongSleeve from './avatars/AvatarLongSleeve';
import AvatarShortSleeve from './avatars/AvatarShortSleeve';
import AvatarSleeveless from './avatars/AvatarSleeveless';

interface HourlyFashionGuideProps {
    items: HourlyForecastItem[];
    hasBigTempGap: boolean;
    minTemp: number;
    maxTemp: number;
    onSelect?: (item: HourlyForecastItem) => void;
}

const ICON_SIZE = 56;

function MiniAvatar({ category }: { category: OutfitCategory }) {
    const size = ICON_SIZE;
    switch (category) {
        case 'heavy_outer': return <AvatarHeavyOuter size={size} />;
        case 'coat': return <AvatarCoat size={size} />;
        case 'jacket': return <AvatarJacket size={size} />;
        case 'light_knit': return <AvatarLightKnit size={size} />;
        case 'hoodie': return <AvatarHoodie size={size} />;
        case 'long_sleeve': return <AvatarLongSleeve size={size} />;
        case 'short_sleeve': return <AvatarShortSleeve size={size} />;
        case 'sleeveless': return <AvatarSleeveless size={size} />;
        default: return <AvatarLongSleeve size={size} />;
    }
}

function getTempColor(temp: number): string {
    if (temp <= 0) return '#1A73E8';
    if (temp <= 10) return '#42A5F5';
    if (temp <= 15) return '#66BB6A';
    if (temp <= 20) return '#FFCA28';
    if (temp <= 25) return '#FFA726';
    if (temp <= 30) return '#FF7043';
    return '#E53935';
}

function getWeatherIcon(weatherMain: string): string {
    switch (weatherMain) {
        case 'Clear': return 'sunny-outline';
        case 'Clouds': return 'cloudy-outline';
        case 'Rain':
        case 'Drizzle': return 'rainy-outline';
        case 'Thunderstorm': return 'thunderstorm-outline';
        case 'Snow': return 'snow-outline';
        default: return 'partly-sunny-outline';
    }
}

export default function HourlyFashionGuide({ items, hasBigTempGap, minTemp, maxTemp, onSelect }: HourlyFashionGuideProps) {
    if (items.length === 0) return null;

    return (
        <Animated.View entering={FadeInDown.duration(600).delay(200)} style={styles.container}>
            {/* 섹션 제목 */}
            <View style={styles.titleRow}>
                <Ionicons name="shirt-outline" size={20} color="#555" />
                <Text style={styles.title}>시간대별 패션 가이드</Text>
            </View>

            {/* 일교차 팁 */}
            {hasBigTempGap && (
                <Animated.View entering={FadeInDown.duration(400).delay(400)} style={styles.tipContainer}>
                    <LinearGradient
                        colors={['#FF9800', '#FF5722']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.tipGradient}
                    >
                        <Ionicons name="alert-circle" size={18} color="#fff" />
                        <Text style={styles.tipText}>
                            일교차 {maxTemp - minTemp}°C! 낮에는 겉옷을 벗으셔도 좋아요! 🌡️
                        </Text>
                    </LinearGradient>
                </Animated.View>
            )}

            {/* 가로 스크롤 카드 */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {items.map((item, index) => (
                    <Animated.View
                        key={`${item.time}-${index}`}
                        entering={FadeInRight.duration(400).delay(100 * index)}
                    >
                        <TouchableOpacity 
                            style={styles.card}
                            onPress={() => onSelect?.(item)}
                            activeOpacity={0.7}
                        >
                            {/* 시간 */}
                            <Text style={styles.timeText}>{item.time}</Text>

                            {/* 날씨 아이콘 */}
                            <Ionicons
                                name={getWeatherIcon(item.weatherMain) as any}
                                size={18}
                                color="#888"
                                style={styles.weatherIcon}
                            />

                            {/* 아바타 */}
                            <View style={[styles.avatarCircle, { borderColor: getTempColor(item.temp) }]}>
                                <MiniAvatar category={item.category} />
                            </View>

                            {/* 기온 */}
                            <Text style={[styles.tempText, { color: getTempColor(item.temp) }]}>
                                {item.temp}°
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                ))}
            </ScrollView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginBottom: 16,
        backgroundColor: '#F8F9FB',
        borderRadius: 20,
        paddingVertical: 16,
        // 그림자
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        marginBottom: 10,
        gap: 6,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
    },
    tipContainer: {
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 12,
        overflow: 'hidden',
    },
    tipGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10,
        gap: 8,
    },
    tipText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 14,
        gap: 10,
    },
    card: {
        width: 88,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 6,
        // 카드 그림자
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    timeText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#555',
        marginBottom: 4,
    },
    weatherIcon: {
        marginBottom: 6,
    },
    avatarCircle: {
        width: ICON_SIZE + 8,
        height: ICON_SIZE + 8,
        borderRadius: (ICON_SIZE + 8) / 2,
        borderWidth: 2,
        backgroundColor: 'rgba(255,255,255,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    tempText: {
        fontSize: 18,
        fontWeight: '800',
    },
});
