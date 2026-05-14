import { Pressable, Text, View } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

interface SocialButtonProps {
  provider: 'google' | 'facebook';
  onPress?: () => void;
}

const config = {
  google: {
    label: 'Login with Google',
    iconColor: '#DB4437',
  },
  facebook: {
    label: 'Login with facebook',
    iconColor: '#4267B2',
  },
};

export default function SocialButton({ provider, onPress }: SocialButtonProps) {
  const { label, iconColor } = config[provider];

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center border border-gray-200 rounded-full py-3.5 px-6 mb-3"
    >
      <View className="w-8">
        {provider === 'google' ? (
          <AntDesign name="google" size={20} color={iconColor} />
        ) : (
          <FontAwesome name="facebook" size={22} color={iconColor} />
        )}
      </View>
      <Text className="flex-1 text-center text-gray-700 text-base font-medium">
        {label}
      </Text>
      <View className="w-8" />
    </Pressable>
  );
}
