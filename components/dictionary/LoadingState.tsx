import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const LoadingState = () => (
  <View className="mt-20">
    <ActivityIndicator size="large" color="#4f46e5" />
    <Text className="text-center mt-4 text-gray-500 dark:text-gray-400">Searching...</Text>
  </View>
);

export default LoadingState;
