/**
 * 날씨 데이터를 분석하여 인사이트 객체를 반환합니다.
 * @param {Object} currentDay - { temp: { max, min, day }, wind_speed }
 * @param {Array} forecastList - 향후 예보 배열
 */
export const analyzeWeather = (currentDay, forecastList = []) => {
  const { temp, wind_speed } = currentDay;
  const tempDiff = temp.max - temp.min; // 일교차 계산
  
  let insight = {
    level: 'normal', // 'normal', 'warn', 'good'
    message: '오늘 하루도 활기차게 보내세요!',
    activityScore: 80,
    carWashScore: 0,
    carWashMessage: '',
    clothingTip: ''
  };

  // 1. 일교차 분석
  if (tempDiff >= 10) {
    insight.level = 'warn';
    insight.message = `일교차가 ${tempDiff.toFixed(1)}°C로 커요! 감기 조심하세요.`;
    insight.clothingTip = '낮에는 덥더라도 아침저녁용 겉옷을 꼭 챙기세요.';
  }

  // 2. 활동 지수 계산 (온도, 풍속 조합)
  if (temp.day >= 18 && temp.day <= 25 && wind_speed < 5) {
    insight.activityScore = 95;
    insight.message = '야외 활동하기 완벽한 날씨예요! 산책 어떠신가요?';
  } else if (temp.day > 30 || temp.day < 5) {
    insight.activityScore = 40;
    insight.message = '장시간 야외 활동은 피하는 것이 좋겠어요.';
  }

  // 3. 세차 지수 분석 (향후 3일간 비 예보 체크)
  const next3Days = forecastList.slice(0, 3);
  const willRain = next3Days.some(day => 
    day.weather[0].main.toLowerCase().includes('rain') || 
    (day.pop && day.pop > 0.3)
  );

  if (!willRain) {
    insight.carWashScore = 100;
    insight.carWashMessage = "향후 3일간 비 소식이 없어요. 세차하기 딱 좋은 날씨예요! 🚗✨";
  } else {
    insight.carWashScore = 20;
    insight.carWashMessage = "며칠 내로 비 예보가 있어요. 세차는 조금 미루는 게 어떨까요? ☔";
  }

  return insight;
};
