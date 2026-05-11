import { Stack } from 'expo-router';
import { CartProvider } from '@/context/CartContext';

export default function HomeLayout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="restaurant/[id]" />
        <Stack.Screen name="cart" />
      </Stack>
    </CartProvider>
  );
}
