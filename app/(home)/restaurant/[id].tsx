import { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CategoryChip from '@/components/home/CategoryChip';
import MenuItemCard from '@/components/home/MenuItemCard';
import { restaurants, foodCategories, menuItems } from '@/data/restaurants';
import { useCart } from '@/context/CartContext';

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { addItem, totalItems } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');

  const restaurant = restaurants.find((r) => r.id === id);
  if (!restaurant) return null;

  // Get menu items for this restaurant, filtered by category
  const allItems = menuItems.filter((m) => m.restaurantId === id);
  const filteredItems =
    activeCategory === 'all'
      ? allItems
      : allItems.filter((m) => m.categoryId === activeCategory);

  // If restaurant has no items, show items from all restaurants for demo
  const displayItems = filteredItems.length > 0 ? filteredItems : menuItems.filter(
    (m) => activeCategory === 'all' || m.categoryId === activeCategory
  );

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="light" />

      {/* ── Hero Image ─────────────────────────────────── */}
      <View className="relative">
        <Image source={restaurant.image} className="w-full h-56" resizeMode="cover" />

        {/* Gradient overlay */}
        <View className="absolute inset-0 bg-black/30" />

        {/* Top bar */}
        <View
          className="absolute left-0 right-0 flex-row items-center justify-between px-5"
          style={{ top: insets.top + 8 }}
        >
          <Pressable onPress={() => router.back()} className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </Pressable>
          <Pressable onPress={() => router.push('/(home)/cart')} className="relative w-10 h-10 rounded-full bg-white/20 items-center justify-center">
            <MaterialCommunityIcons name="cart-outline" size={22} color="#fff" />
            {totalItems > 0 && (
              <View className="absolute -top-1 -right-1 bg-brand-orange rounded-full w-5 h-5 items-center justify-center">
                <Text className="text-white text-xs font-bold">{totalItems}</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      {/* ── Restaurant Info ────────────────────────────── */}
      <View className="bg-white px-5 py-4 rounded-t-3xl -mt-6 z-10">
        <Text className="text-2xl font-bold text-gray-900">{restaurant.name}</Text>
        <Text className="text-sm text-gray-400 mt-1">{restaurant.cuisine}</Text>
        <View className="flex-row items-center mt-2">
          <MaterialCommunityIcons name="star" size={18} color="#F7941D" />
          <Text className="text-sm font-bold text-gray-700 ml-1">{restaurant.rating}</Text>
          <Text className="text-xs text-gray-400 ml-3">• {restaurant.deliveryTime}</Text>
          <Text className="text-xs text-gray-400 ml-3">• {restaurant.distance}</Text>
        </View>
      </View>

      {/* ── Category Chips ─────────────────────────────── */}
      <View className="bg-white pb-3">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 8 }}
        >
          {foodCategories.map((cat) => (
            <CategoryChip
              key={cat.id}
              name={cat.name}
              icon={cat.icon}
              active={activeCategory === cat.id}
              onPress={() => setActiveCategory(cat.id)}
            />
          ))}
        </ScrollView>
      </View>

      {/* ── Menu Items ─────────────────────────────────── */}
      <FlatList
        data={displayItems}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 24 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="w-[48%]">
            <MenuItemCard item={item} onAddToCart={() => addItem(item)} />
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center py-12">
            <MaterialCommunityIcons name="food-off" size={48} color="#d1d5db" />
            <Text className="text-gray-400 mt-3">No items in this category</Text>
          </View>
        }
      />
    </View>
  );
}
