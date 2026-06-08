import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface LandingStateProps {
  onSelectSample: (word: string) => void;
}

const LandingState = ({ onSelectSample }: LandingStateProps) => (
  <View className="mt-12 items-center px-6">
    <View className="bg-indigo-50 dark:bg-indigo-900/30 p-10 rounded-full mb-8 shadow-inner">
      <FontAwesome name="book" size={100} color="#4f46e5" />
    </View>
    <Text className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-3 text-center">
      Welcome to LexiDict
    </Text>
    <Text className="text-gray-500 dark:text-gray-400 text-center mb-10 text-lg leading-7">
      Your ultimate companion for words. Explore definitions, synonyms, and pronunciations in a snap.
    </Text>
    
    <View className="w-full bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
      <Text className="text-gray-400 dark:text-gray-500 font-bold mb-4 uppercase tracking-wider text-xs">Try searching for:</Text>
      <View className="flex-row flex-wrap">
        {['serendipity', 'eloquent', 'resilient', 'nebula'].map((sWord, sIdx) => (
          <TouchableOpacity 
            key={sIdx} 
            onPress={() => onSelectSample(sWord)}
            className="bg-indigo-50 dark:bg-indigo-900/50 px-4 py-2 rounded-xl mr-2 mb-2"
          >
            <Text className="text-indigo-600 dark:text-indigo-300 font-medium">{sWord}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </View>
);

export default LandingState;
