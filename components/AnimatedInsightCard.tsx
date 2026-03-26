import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  Easing 
} from 'react-native-reanimated';

interface Insight {
  level: 'normal' | 'warn' | 'good';
  message: string;
  activityScore: number;
  carWashScore: number;
  carWashMessage: string;
  clothingTip?: string;
}

interface AnimatedInsightCardProps {
  insight: Insight;
}

const AnimatedInsightCard: React.FC<AnimatedInsightCardProps> = ({ insight }) => {
  const isWarn = insight.level === 'warn';

  // 1. 카드 전체 애니메이션을 위한 공유 값
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(20);

  // 2. 활동 지수 바 애니메이션을 위한 공유 값
  const scoreWidth = useSharedValue(0);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 애니메이션 시작
    cardOpacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.exp) });
    cardTranslateY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.exp) });

    // 카드 애니메이션이 약간 진행된 후 바 애니메이션 시작 (딜레이)
    scoreWidth.value = withDelay(
      400, 
      withTiming(insight.activityScore, { duration: 1000, easing: Easing.inOut(Easing.quad) })
    );
  }, [insight.activityScore, cardOpacity, cardTranslateY, scoreWidth]);

  // 3. 애니메이션 스타일 정의
  const animatedCardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }],
  }));

  const animatedScoreBarStyle = useAnimatedStyle(() => ({
    width: `${scoreWidth.value}%`,
  }));

  return (
    <Animated.View style={[styles.container, animatedCardStyle]}>
      <View style={styles.header}>
        <Ionicons 
          name={isWarn ? "alert-circle" : "sunny"} 
          size={24} 
          color={isWarn ? "#FF6B6B" : "#4D96FF"} 
        />
        <Text style={styles.title}>오늘의 날씨 인사이트</Text>
      </View>
      
      <Text style={styles.message}>{insight.message}</Text>
      
      {insight.clothingTip ? (
        <View style={styles.tipContainer}>
          <Text style={styles.tipText}>💡 {insight.clothingTip}</Text>
        </View>
      ) : null}

      {/* 세차 지수 영역 */}
      <View style={styles.divider} />
      <View style={styles.carWashContainer}>
        <View style={styles.header}>
          <Ionicons name="car-sport" size={20} color="#4D96FF" />
          <Text style={styles.subTitle}>세차 지수</Text>
        </View>
        <Text style={styles.carWashText}>{insight.carWashMessage}</Text>
      </View>

      <View style={styles.scoreBarContainer}>
        <Text style={styles.scoreLabel}>오늘의 활동 지수 {insight.activityScore}점</Text>
        <View style={styles.scoreBarBg}>
          <Animated.View style={[styles.scoreBarFill, animatedScoreBarStyle]} />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 20,
    marginHorizontal: 15,
    marginVertical: 10,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  warnBg: { backgroundColor: 'rgba(255, 244, 244, 0.9)', borderWidth: 1, borderColor: '#FFD1D1' },
  normalBg: { backgroundColor: 'rgba(240, 247, 255, 0.9)' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 16, fontWeight: 'bold', marginLeft: 8, color: '#333' },
  message: { fontSize: 15, color: '#555', lineHeight: 22 },
  tipContainer: { marginTop: 10, backgroundColor: 'rgba(255,255,255,0.5)', padding: 8, borderRadius: 8 },
  tipText: { fontSize: 13, color: '#666' },
  scoreBarContainer: { marginTop: 15 },
  scoreLabel: { fontSize: 12, color: '#888', marginBottom: 4 },
  scoreBarBg: { height: 6, backgroundColor: '#E0E0E0', borderRadius: 3, overflow: 'hidden' },
  scoreBarFill: { height: 6, backgroundColor: '#4D96FF', borderRadius: 3 },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginVertical: 12,
  },
  carWashContainer: {
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
    color: '#444',
  },
  carWashText: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    lineHeight: 18,
  },
});

export default AnimatedInsightCard;
