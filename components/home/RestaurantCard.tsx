import { View, Text, Image, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { Restaurant } from '@/data/restaurants';

interface RestaurantCardProps {
  restaurant: Restaurant;
  variant: 'popular' | 'nearby';
  onPress?: () => void;
}

export default function RestaurantCard({ restaurant, variant, onPress }: RestaurantCardProps) {
  if (variant === 'popular') {
    return (
      <Pressable onPress={onPress} className="mr-4 w-56">
        <View className="rounded-2xl overflow-hidden bg-white shadow-sm">
          <Image source={restaurant.image} className="w-full h-32" resizeMode="cover" />
          <View className="p-3">
            <Text className="text-base font-bold text-gray-900" numberOfLines={1}>
              {restaurant.name}
            </Text>
            <Text className="text-sm text-gray-400 mt-0.5">{restaurant.cuisine}</Text>
            <View className="flex-row items-center mt-1.5">
              <MaterialCommunityIcons name="star" size={16} color="#F7941D" />
              <Text className="text-sm font-semibold text-gray-700 ml-1">{restaurant.rating}</Text>
              <Text className="text-xs text-gray-400 ml-2">• {restaurant.deliveryTime}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }

  // Nearby variant — horizontal card
  return (
    <Pressable onPress={onPress} className="mb-4">
      <View className="flex-row bg-white rounded-2xl overflow-hidden shadow-sm">
        <Image source={restaurant.image} className="w-28 h-28" resizeMode="cover" />
        <View className="flex-1 p-3 justify-center">
          <Text className="text-base font-bold text-gray-900" numberOfLines={1}>
            {restaurant.name}
          </Text>
          <Text className="text-sm text-gray-400 mt-0.5">{restaurant.cuisine}</Text>
          <View className="flex-row items-center mt-2">
            <MaterialCommunityIcons name="star" size={16} color="#F7941D" />
            <Text className="text-sm font-semibold text-gray-700 ml-1">{restaurant.rating}</Text>
            <View className="flex-row items-center ml-3">
              <MaterialCommunityIcons name="map-marker-outline" size={14} color="#9ca3af" />
              <Text className="text-xs text-gray-400 ml-0.5">{restaurant.distance}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
