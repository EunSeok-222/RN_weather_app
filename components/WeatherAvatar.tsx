import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withSequence, withTiming, Easing } from 'react-native-reanimated';
import { OutfitCategory } from '../services/outfitService';
import AvatarCoat from './avatars/AvatarCoat';
import AvatarHeavyOuter from './avatars/AvatarHeavyOuter';
import AvatarHoodie from './avatars/AvatarHoodie';
import AvatarJacket from './avatars/AvatarJacket';
import AvatarLightKnit from './avatars/AvatarLightKnit';
import AvatarLongSleeve from './avatars/AvatarLongSleeve';
import AvatarShortSleeve from './avatars/AvatarShortSleeve';
import AvatarSleeveless from './avatars/AvatarSleeveless';

interface WeatherAvatarProps {
    category: OutfitCategory;
    temp: number;
    recommendation: string;
}

const AVATAR_SIZE = 140;

const categoryLabels: Record<OutfitCategory, string> = {
    heavy_outer: '🧥 패딩 · 두꺼운 코트',
    coat: '🧣 코트 · 가죽재킷',
    jacket: '🧥 트렌치코트 · 야상',
    light_knit: '🧶 가디건 · 니트',
    hoodie: '👕 맨투맨 · 후드티',
    long_sleeve: '👔 셔츠 · 긴팔티',
    short_sleeve: '👕 반팔티 · 반바지',
    sleeveless: '🩳 민소매 · 린넨',
};

function AvatarByCategory({ category }: { category: OutfitCategory }) {
    const size = AVATAR_SIZE;
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

/**
 * 기온에 따라 배경 그라데이션 색상을 반환합니다.
 * 차가운 파랑 (≤0°C) → 따뜻한 빨강/주황 (≥30°C)
 */
function getGradientColors(temp: number): [string, string] {
    if (temp <= 0) return ['#1A73E8', '#4FC3F7'];        // 매우 추움 — 진한 파랑
    if (temp <= 5) return ['#3D8BFD', '#81D4FA'];        // 추움 — 파랑
    if (temp <= 10) return ['#42A5F5', '#B3E5FC'];       // 쌀쌀 — 연한 파랑
    if (temp <= 15) return ['#66BB6A', '#C8E6C9'];       // 선선 — 초록
    if (temp <= 20) return ['#FFCA28', '#FFF9C4'];       // 온화 — 노란색
    if (temp <= 25) return ['#FFA726', '#FFE0B2'];       // 따뜻 — 주황
    if (temp <= 30) return ['#FF7043', '#FFCCBC'];       // 더움 — 빨간 주황
    return ['#E53935', '#FF8A80'];                       // 매우 더움 — 빨강
}

export default function WeatherAvatar({ category, temp, recommendation }: WeatherAvatarProps) {
    const [startColor, endColor] = getGradientColors(temp);
    const scale = useSharedValue(1);

    useEffect(() => {
        // 카테고리(옷)가 바뀌면 캐릭터가 기분 좋게 팝! 효과
        scale.value = withSequence(
            withTiming(1.15, { duration: 150, easing: Easing.out(Easing.back(1.5)) }),
            withTiming(1, { duration: 200, easing: Easing.in(Easing.quad) })
        );
    }, [category, scale]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    return (
        <Animated.View entering={FadeInDown.duration(800).springify()} style={styles.wrapper}>
            <LinearGradient
                colors={[startColor, endColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
            >
                <Animated.View style={[styles.avatarContainer, animatedStyle]}>
                    <AvatarByCategory category={category} />
                </Animated.View>

                <View style={styles.textContainer}>
                    <Text style={styles.categoryLabel}>{categoryLabels[category]}</Text>
                    <Text style={styles.recommendation}>{recommendation}</Text>
                </View>
            </LinearGradient>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 24,
        overflow: 'hidden',
        // 그림자
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
    },
    container: {
        paddingVertical: 24,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    avatarContainer: {
        backgroundColor: 'rgba(255,255,255,0.25)',
        borderRadius: 70,
        padding: 10,
        marginBottom: 16,
    },
    textContainer: {
        alignItems: 'center',
    },
    categoryLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 8,
    },
    recommendation: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
        lineHeight: 26,
        paddingHorizontal: 10,
    },
});
