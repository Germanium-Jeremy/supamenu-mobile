import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface NotFoundStateProps {
  notFoundWord: string;
  errorMessage: string;
  suggestedWords: string[];
  onSelectSuggestion: (word: string) => void;
}

const NotFoundState = ({ 
  notFoundWord, 
  errorMessage, 
  suggestedWords, 
  onSelectSuggestion 
}: NotFoundStateProps) => (
  <View className="mt-10 items-center px-6">
    <View className="bg-rose-50 dark:bg-rose-900/20 p-8 rounded-full mb-6">
      <MaterialIcons name="sentiment-dissatisfied" size={80} color="#f43f5e" />
    </View>
    <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
      Word Not Found
    </Text>
    <Text className="text-gray-500 dark:text-gray-400 text-center mb-6 leading-6">
      {errorMessage || `Sorry, we couldn't find any definitions for "${notFoundWord}". Maybe try searching for something else?`}
    </Text>
    
    <View className="w-full bg-indigo-50 dark:bg-gray-900 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/50">
      <Text className="text-indigo-800 dark:text-indigo-300 font-bold mb-4 text-lg">Suggestions:</Text>
      <View className="flex-row flex-wrap">
        {suggestedWords.map((sWord, sIdx) => (
          <TouchableOpacity 
            key={sIdx} 
            onPress={() => onSelectSuggestion(sWord)}
            className="bg-white dark:bg-gray-800 px-4 py-2 rounded-xl mr-2 mb-2 shadow-sm border border-indigo-100 dark:border-indigo-900/50"
          >
            <Text className="text-indigo-600 dark:text-indigo-300 font-medium">{sWord}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </View>
);

export default NotFoundState;
