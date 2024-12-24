import "expo-dev-client";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="method"
        options={{
          presentation: "modal",
          headerShown: false,
          animation: "slide_from_bottom",
          animationDuration: 250,
        }}
      />
    </Stack>
  );
}
