import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/pokemon" options={{
        headerShown: true,
        title: "포켓몬 상세 정보",
        headerBackButtonDisplayMode: "minimal",
        headerTitleAlign: "center",
        presentation: "card",
        backgroundColor: "red",
      }} />
    </Stack>
  )
}
