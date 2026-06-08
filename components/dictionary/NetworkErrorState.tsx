import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface NetworkErrorStateProps {
  onRetry: () => void;
}

const NetworkErrorState = ({ onRetry }: NetworkErrorStateProps) => (
  <View className="mt-10 items-center px-6">
    <View className="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-full mb-6">
      <MaterialIcons name="wifi-off" size={80} color="#d97706" />
    </View>
    <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
      Connection Error
    </Text>
    <Text className="text-gray-500 dark:text-gray-400 text-center mb-8 leading-6">
      It looks like you're offline. Please check your internet connection and try again.
    </Text>
    
    <TouchableOpacity 
      onPress={onRetry}
      className="bg-indigo-600 dark:bg-indigo-700 px-8 py-4 rounded-2xl flex-row items-center shadow-md shadow-indigo-200 dark:shadow-none"
    >
      <MaterialIcons name="refresh" size={24} color="white" className="mr-2" />
      <Text className="text-white font-bold text-lg">Try Again</Text>
    </TouchableOpacity>
  </View>
);

export default NetworkErrorState;
