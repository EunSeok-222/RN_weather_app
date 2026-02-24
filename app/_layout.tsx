import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "포켓몬 도감", headerTitleAlign: "center" }} />
      <Stack.Screen name="details" options={{
        title: "포켓몬 상세 정보",
        headerBackButtonDisplayMode: "minimal",
        headerTitleAlign: "center",
        presentation: "card",
      }} />
    </Stack>
  )
}
