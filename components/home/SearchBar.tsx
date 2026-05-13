import { View, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChangeText, placeholder = 'Search Restaurant' }: SearchBarProps) {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 py-3 mb-6">
      <MaterialCommunityIcons name="magnify" size={22} color="#9ca3af" />
      <TextInput
        className="flex-1 ml-3 text-base text-gray-700"
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
