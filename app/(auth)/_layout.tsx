import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="forgot-pwd" />
      <Stack.Screen name="verify-code" />
      <Stack.Screen name="reset-pwd" />
    </Stack>
  );
}
