import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming
} from 'react-native-reanimated';

const getWeatherIcon = (main: string) => {
  switch (main) {
    case 'Clear': return 'sunny';
    case 'Clouds': return 'cloudy';
    case 'Rain': return 'rainy';
    case 'Thunderstorm': return 'thunderstorm';
    case 'Snow': return 'snow';
    default: return 'help-circle-outline';
  }
};

const ForecastItem = ({ item, index, onSelect }: { item: any, index: number, onSelect?: (item: any) => void }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withDelay(index * 100, withTiming(1, { duration: 500 }));
    translateY.value = withDelay(index * 100, withTiming(0, { duration: 500, easing: Easing.out(Easing.back()) }));
  }, [index, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const date = new Date(item.dt * 1000);
  const today = new Date();
  const dayName = date.toLocaleDateString('ko-KR', { weekday: 'short' });
  const dateNum = date.getDate();

  return (
    <Animated.View style={[styles.itemContainer, animatedStyle]}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => onSelect?.(item)}
        activeOpacity={0.6}
      >
        <Text style={styles.dateText}>{today.getDate() === dateNum ? '오늘' : dayName} {dateNum}일</Text>

        <View style={styles.iconContainer}>
          <Ionicons name={getWeatherIcon(item.weather[0].main) as any} size={28} color="#555" />
          {item.pop > 0 && (
            <Text style={styles.rainText}>{(item.pop * 100).toFixed(0)}%</Text>
          )}
        </View>

        <View style={styles.tempContainer}>
          <Text style={styles.maxTemp}>{Math.round(item.temp.max)}°</Text>
          <Text style={styles.minTemp}>{Math.round(item.temp.min)}°</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const ForecastList = ({ forecastData, onSelect }: { forecastData: any[], onSelect?: (item: any) => void }) => {
  if (!forecastData || forecastData.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>주간예보</Text>
      <View style={styles.listWrapper}>
        {forecastData.map((item, index) => (
          <ForecastItem key={item.dt} item={item} index={index} onSelect={onSelect} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  listWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 24,
    padding: 10,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  touchable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: 16,
    width: 70,
    color: '#444',
    fontWeight: '500',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  rainText: {
    fontSize: 12,
    color: '#4D96FF',
    marginLeft: 4,
    fontWeight: '600',
  },
  tempContainer: {
    flexDirection: 'row',
    width: 90,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  maxTemp: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginRight: 15
  },
  minTemp: {
    fontSize: 18,
    color: '#888',
    fontWeight: '500',
  },
});

export default ForecastList;
