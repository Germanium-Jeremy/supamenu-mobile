import { View, Text, ScrollView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CartItemRow from '@/components/home/CartItemRow';
import { useCart } from '@/context/CartContext';

const DELIVERY_FEE = 1000;

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const { items, increment, decrement, removeItem, clearCart, subtotal } = useCart();
  const total = subtotal + (items.length > 0 ? DELIVERY_FEE : 0);

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      <StatusBar style="dark" />

      {/* ── Header ─────────────────────────────────────── */}
      <View className="flex-row items-center justify-between px-5 py-4">
        <Pressable onPress={() => router.back()} className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
          <MaterialCommunityIcons name="arrow-left" size={24} color="#374151" />
        </Pressable>
        <Text className="text-xl font-bold text-gray-900">Cart</Text>
        <Pressable onPress={clearCart} disabled={items.length === 0} className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
          <MaterialCommunityIcons name="trash-can-outline" size={22} color={items.length > 0 ? '#ef4444' : '#d1d5db'} />
        </Pressable>
      </View>

      {items.length === 0 ? (
        /* ── Empty state ────────────────────────────────── */
        <View className="flex-1 items-center justify-center px-8">
          <MaterialCommunityIcons name="cart-off" size={80} color="#d1d5db" />
          <Text className="text-xl font-bold text-gray-400 mt-4">Your cart is empty</Text>
          <Text className="text-sm text-gray-400 text-center mt-2">
            Browse restaurants and add delicious items to your cart
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="bg-brand-orange rounded-full px-8 py-3.5 mt-6"
          >
            <Text className="text-white font-bold text-base">Browse Restaurants</Text>
          </Pressable>
        </View>
      ) : (
        <>
          {/* ── Cart Items ──────────────────────────────── */}
          <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onIncrement={() => increment(item.id)}
                onDecrement={() => decrement(item.id)}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </ScrollView>

          {/* ── Order Summary ───────────────────────────── */}
          <View
            className="bg-white rounded-t-3xl px-6 pt-5 shadow-lg"
            style={{ paddingBottom: insets.bottom + 16 }}
          >
            <View className="flex-row justify-between mb-2">
              <Text className="text-sm text-gray-400">Subtotal</Text>
              <Text className="text-sm font-semibold text-gray-700">{subtotal.toLocaleString()} RWF</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-sm text-gray-400">Delivery Fee</Text>
              <Text className="text-sm font-semibold text-gray-700">{DELIVERY_FEE.toLocaleString()} RWF</Text>
            </View>
            <View className="h-px bg-gray-200 my-2" />
            <View className="flex-row justify-between mb-5">
              <Text className="text-base font-bold text-gray-900">Total</Text>
              <Text className="text-base font-bold text-brand-orange">{total.toLocaleString()} RWF</Text>
            </View>

            <Pressable className="bg-brand-orange py-4 rounded-full items-center">
              <Text className="text-white text-base font-bold">Place Order</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}
