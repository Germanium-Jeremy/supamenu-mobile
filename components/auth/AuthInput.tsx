import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput, TextInputProps, View } from 'react-native';

interface AuthInputProps extends TextInputProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

export default function AuthInput({ icon, ...props }: AuthInputProps) {
  return (
    <View className="flex-row items-center border-b border-gray-200 py-3 mb-4">
      <MaterialCommunityIcons name={icon} size={22} color="#9ca3af" />
      <TextInput
        className="flex-1 ml-3 text-base text-gray-700"
        placeholderTextColor="#9ca3af"
        {...props}
      />
    </View>
  );
}
