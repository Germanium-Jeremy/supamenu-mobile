import { View, Text, ScrollView, FlatList, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SearchBar from '@/components/home/SearchBar';
import RestaurantCard from '@/components/home/RestaurantCard';
import { restaurants } from '@/data/restaurants';
import { useCart } from '@/context/CartContext';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { totalItems } = useCart();

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      <StatusBar style="dark" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* ── Top bar ─────────────────────────────────────── */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="map-marker" size={22} color="#F7941D" />
            <View className="ml-2">
              <Text className="text-xs text-gray-400">Your Location</Text>
              <Text className="text-sm font-bold text-gray-900">Kigali, Rwanda</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            {/* Cart icon with badge */}
            <Pressable onPress={() => router.push('/(home)/cart')} className="mr-4 relative">
              <MaterialCommunityIcons name="cart-outline" size={26} color="#374151" />
              {totalItems > 0 && (
                <View className="absolute -top-1.5 -right-1.5 bg-brand-orange rounded-full w-5 h-5 items-center justify-center">
                  <Text className="text-white text-xs font-bold">{totalItems}</Text>
                </View>
              )}
            </Pressable>
            <Pressable>
              <MaterialCommunityIcons name="bell-outline" size={26} color="#374151" />
            </Pressable>
          </View>
        </View>

        {/* ── Greeting ────────────────────────────────────── */}
        <View className="px-5 pt-4 pb-2">
          <Text className="text-2xl font-bold text-gray-900">Hello Jeremy 👋</Text>
          <Text className="text-sm text-gray-400 mt-1">What would you like to eat?</Text>
        </View>

        {/* ── Search ──────────────────────────────────────── */}
        <View className="px-5 mt-3">
          <SearchBar />
        </View>

        {/* ── Popular Restaurants ──────────────────────────── */}
        <View className="flex-row items-center justify-between px-5 mb-3">
          <Text className="text-lg font-bold text-gray-900">Popular Restaurants</Text>
          <Pressable>
            <Text className="text-sm text-brand-orange font-semibold">See All</Text>
          </Pressable>
        </View>

        <FlatList
          data={restaurants.slice(0, 4)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 8 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RestaurantCard
              restaurant={item}
              variant="popular"
              onPress={() => router.push(`/(home)/restaurant/${item.id}`)}
            />
          )}
        />

        {/* ── Nearby Your Location ────────────────────────── */}
        <View className="flex-row items-center justify-between px-5 mt-6 mb-3">
          <Text className="text-lg font-bold text-gray-900">Nearby Your Location</Text>
          <Pressable>
            <Text className="text-sm text-brand-orange font-semibold">See All</Text>
          </Pressable>
        </View>

        <View className="px-5 pb-8">
          {restaurants.map((r) => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              variant="nearby"
              onPress={() => router.push(`/(home)/restaurant/${r.id}`)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
