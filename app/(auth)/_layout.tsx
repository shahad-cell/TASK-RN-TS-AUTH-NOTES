import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />      {/* Login screen */}
      <Stack.Screen name="Register" />   {/* Register screen */}
    </Stack>
  );
}
