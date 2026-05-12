import { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';

export default function SplashScreen() {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 800 });
    scale.value = withTiming(1, { duration: 800 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      className="flex-1 bg-brand-orange justify-center items-center"
      onPress={() => router.push('/(auth)/welcome')}
    >
      <StatusBar style="light" />
      <Animated.View style={animatedStyle}>
        <Text className="text-5xl font-extrabold">
          <Text className="text-gray-900">Supa</Text>
          <Text className="text-white">Menu</Text>
        </Text>
      </Animated.View>
    </Pressable>
  );
}
