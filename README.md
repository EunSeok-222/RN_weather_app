[날씨앱 웹으로 미리보기](https://rn-weather-app-tau.vercel.app/)
# 🌤️ Weather Insight: AI 기반 맞춤형 날씨 앱
**"단순한 수치를 넘어, 당신의 일상을 챙겨주는 기상 캐스터"**

단순히 온도만 알려주는 것이 아니라, **Gemini AI**를 활용해 오늘 입을 옷을 추천하고, 세차하기 좋은 날인지 분석해주는 React Native 기반 날씨 애플리케이션입니다.

## 핵심 기능 (Key Features)

- 실시간 위치 기반 날씨: OpenWeatherMap API를 활용한 정확한 현재 및 시간별/주간 예보.

- AI 체감 온도 코디: AI가 현재 기온과 습도를 분석해 최적의 옷차림 제안.

- 일상 지수 서비스: 3일간의 강수 예보를 분석하여 알려주는 '세차 지수' 및 활동 점수 제공.

- 인사이트 카드: 전날 대비 기온 차이 분석 등 한눈에 들어오는 날씨 요약.

## 🛠 Tech Stack

| Category | Tech Stack |
| :--- | :--- |
| **Framework** | ![React Native](https://img.shields.io/badge/react_native-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black) ![Expo](https://img.shields.io/badge/expo-000020?style=for-the-badge&logo=expo&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) |
| **Navigation** | `Expo Router` |
| **State** | ![TanStack Query](https://img.shields.io/badge/-TanStack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white) |
| **AI & API** | ![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white) ![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-EB6E4B?style=for-the-badge&logo=openweathermap&logoColor=white) |
| **Deployment** | ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) `Expo Go` |


## 🚀 기술적 도전 및 해결 (Technical Challenges)

- 데이터 최적화: TanStack Query를 도입하여 불필요한 API 호출을 줄이고 캐싱 처리를 통해 사용자 경험을 개선했습니다.

- AI 프롬프트 엔지니어링: 기상 데이터(습도, 풍속 등)를 AI가 이해하기 쉬운 형태로 가공하여, 상황에 맞는 자연스러운 의상 추천 답변을 도출했습니다.

- 크로스 플랫폼 대응: Expo를 활용하여 iOS/Android뿐만 아니라 Web 환경에서도 동일한 UI를 제공할 수 있도록 구현했습니다.
