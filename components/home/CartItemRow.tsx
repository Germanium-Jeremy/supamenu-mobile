import { View, Text, Image, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { CartItem } from '@/context/CartContext';

interface CartItemRowProps {
  item: CartItem;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onRemove?: () => void;
}

export default function CartItemRow({ item, onIncrement, onDecrement, onRemove }: CartItemRowProps) {
  return (
    <View className="flex-row items-center bg-white rounded-2xl p-3 mb-3 shadow-sm">
      {/* Food image */}
      <Image source={item.image} className="w-20 h-20 rounded-xl" resizeMode="cover" />

      {/* Info */}
      <View className="flex-1 ml-3">
        <View className="flex-row items-start justify-between">
          <Text className="text-base font-bold text-gray-900 flex-1 mr-2" numberOfLines={1}>
            {item.name}
          </Text>
          <Pressable onPress={onRemove} hitSlop={8}>
            <MaterialCommunityIcons name="close" size={18} color="#9ca3af" />
          </Pressable>
        </View>
        <Text className="text-sm text-brand-orange font-semibold mt-1">
          {item.price.toLocaleString()} RWF
        </Text>

        {/* Quantity stepper */}
        <View className="flex-row items-center mt-2">
          <Pressable
            onPress={onDecrement}
            className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
          >
            <MaterialCommunityIcons name="minus" size={18} color="#374151" />
          </Pressable>
          <Text className="mx-4 text-base font-bold text-gray-900">{item.quantity}</Text>
          <Pressable
            onPress={onIncrement}
            className="w-8 h-8 rounded-full bg-brand-orange items-center justify-center"
          >
            <MaterialCommunityIcons name="plus" size={18} color="#fff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
