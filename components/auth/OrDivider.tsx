import { View, Text } from 'react-native';

export default function OrDivider() {
  return (
    <View className="flex-row items-center my-5">
      <View className="flex-1 h-px bg-gray-200" />
      <Text className="mx-4 text-gray-500 font-semibold">OR</Text>
      <View className="flex-1 h-px bg-gray-200" />
    </View>
  );
}
