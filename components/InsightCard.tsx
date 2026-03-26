import { Ionicons } from '@expo/vector-icons'; // Expo 아이콘 사용
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Insight {
  level: 'normal' | 'warn' | 'good';
  message: string;
  activityScore: number;
  clothingTip?: string;
}

interface InsightCardProps {
  insight: Insight;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const isWarn = insight.level === 'warn';

  return (
    <View style={[styles.container, isWarn ? styles.warnBg : styles.normalBg]}>
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

      <View style={styles.scoreBarContainer}>
        <Text style={styles.scoreLabel}>활동 지수 {insight.activityScore}점</Text>
        <View style={styles.scoreBarBg}>
          <View style={[styles.scoreBarFill, { width: `${insight.activityScore}%` }]} />
        </View>
      </View>
    </View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // 반투명 배경 (그라데이션과 어울리게)
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
  scoreBarBg: { height: 6, backgroundColor: '#E0E0E0', borderRadius: 3 },
  scoreBarFill: { height: 6, backgroundColor: '#4D96FF', borderRadius: 3 },
});

export default InsightCard;
