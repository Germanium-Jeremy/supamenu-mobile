import { View, Text, Image, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { MenuItem } from '@/data/restaurants';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart?: () => void;
}

export default function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  return (
    <View className="bg-white rounded-2xl overflow-hidden shadow-sm mb-4">
      <Image source={item.image} className="w-full h-36" resizeMode="cover" />
      <View className="p-3">
        <Text className="text-base font-bold text-gray-900" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="text-xs text-gray-400 mt-0.5" numberOfLines={2}>
          {item.description}
        </Text>
        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-lg font-bold text-brand-orange">
            {item.price.toLocaleString()} RWF
          </Text>
          <Pressable
            onPress={onAddToCart}
            className="bg-brand-orange rounded-full p-2"
          >
            <MaterialCommunityIcons name="plus" size={18} color="#fff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
