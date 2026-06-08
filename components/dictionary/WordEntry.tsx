import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { WordData } from '@/types/dictionary';

interface WordEntryProps {
  entry: WordData;
  index: number;
  onPlayAudio: (url: string) => void;
  onSearchWord: (word: string) => void;
}

const WordEntry = ({ entry, index, onPlayAudio, onSearchWord }: WordEntryProps) => {
  const phoneticText = entry.phonetics.find(p => p.text)?.text;
  const audioUrl = entry.phonetics.find(p => p.audio)?.audio;

  return (
    <View className={index > 0 ? "mt-8 border-t-2 border-gray-200 dark:border-gray-800 pt-8" : ""}>
      {/* Word Heading */}
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 capitalize">{entry.word}</Text>
          {phoneticText && (
            <Text className="text-indigo-600 dark:text-indigo-400 text-lg mt-1">{phoneticText}</Text>
          )}
        </View>
        {audioUrl && (
          <TouchableOpacity 
            onPress={() => onPlayAudio(audioUrl)}
            className="bg-indigo-100 dark:bg-indigo-900/50 p-4 rounded-full"
          >
            <MaterialIcons name="volume-up" size={30} color="#4f46e5" />
          </TouchableOpacity>
        )}
      </View>

      {/* Meanings */}
      {entry.meanings.map((meaning, idx) => (
        <View key={idx} className="mb-6 bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <View className="flex-row items-center mb-3">
            <Text className="text-indigo-600 dark:text-indigo-400 font-bold italic text-lg">{meaning.partOfSpeech}</Text>
            <View className="flex-1 h-[1px] bg-gray-200 dark:bg-gray-800 ml-4" />
          </View>
          
          {meaning.definitions.map((def, dIdx) => (
            <View key={dIdx} className="mb-4">
              <View className="flex-row">
                <Text className="text-indigo-600 dark:text-indigo-400 mr-2 font-bold">•</Text>
                <Text className="text-gray-800 dark:text-gray-200 text-base leading-6 flex-1">
                  {def.definition}
                </Text>
              </View>
              {def.example && (
                <Text className="text-gray-500 dark:text-gray-400 italic mt-2 ml-4">
                  " {def.example} "
                </Text>
              )}
              {def.synonyms && def.synonyms.length > 0 && (
                <View className="flex-row flex-wrap mt-2 ml-4">
                  <Text className="text-gray-500 dark:text-gray-400 font-semibold mr-1">Synonyms:</Text>
                  {def.synonyms.map((syn, sIdx) => (
                    <Text key={sIdx} className="text-indigo-500 dark:text-indigo-300 italic mr-1">
                      {syn}{sIdx < (def.synonyms?.length ?? 0) - 1 ? ',' : ''}
                    </Text>
                  ))}
                </View>
              )}
              {def.antonyms && def.antonyms.length > 0 && (
                <View className="flex-row flex-wrap mt-1 ml-4">
                  <Text className="text-gray-500 dark:text-gray-400 font-semibold mr-1">Antonyms:</Text>
                  {def.antonyms.map((ant, aIdx) => (
                    <Text key={aIdx} className="text-rose-500 dark:text-rose-400 italic mr-1">
                      {ant}{aIdx < (def.antonyms?.length ?? 0) - 1 ? ',' : ''}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}

          {meaning.synonyms && meaning.synonyms.length > 0 && (
            <View className="mt-2 pt-2 border-t border-gray-50 dark:border-gray-800">
              <Text className="text-gray-600 dark:text-gray-400 font-bold mb-1">Synonyms</Text>
              <View className="flex-row flex-wrap">
                {meaning.synonyms.map((syn, sIdx) => (
                  <TouchableOpacity 
                    key={sIdx} 
                    onPress={() => onSearchWord(syn)}
                    className="bg-indigo-50 dark:bg-indigo-900/50 px-2 py-1 rounded-md mr-2 mb-2"
                  >
                    <Text className="text-indigo-600 dark:text-indigo-300 text-sm">{syn}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {meaning.antonyms && meaning.antonyms.length > 0 && (
            <View className="mt-1">
              <Text className="text-gray-600 dark:text-gray-400 font-bold mb-1">Antonyms</Text>
              <View className="flex-row flex-wrap">
                {meaning.antonyms.map((ant, aIdx) => (
                  <TouchableOpacity 
                    key={aIdx} 
                    onPress={() => onSearchWord(ant)}
                    className="bg-rose-50 dark:bg-rose-900/50 px-2 py-1 rounded-md mr-2 mb-2"
                  >
                    <Text className="text-rose-600 dark:text-rose-300 text-sm">{ant}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default WordEntry;
