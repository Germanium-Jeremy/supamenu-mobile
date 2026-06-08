import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { Audio } from 'expo-av';
import { useHistory } from '@/context/HistoryContext';
import { DrawerNavigationProp } from '@react-navigation/drawer';

// Types
import { WordData } from '@/types/dictionary';

// Components
import LoadingState from '@/components/dictionary/LoadingState';
import NotFoundState from '@/components/dictionary/NotFoundState';
import NetworkErrorState from '@/components/dictionary/NetworkErrorState';
import WordEntry from '@/components/dictionary/WordEntry';
import LandingState from '@/components/dictionary/LandingState';

export default function DictionaryScreen() {
  const { searchWord } = useLocalSearchParams<{ searchWord: string }>();
  const [word, setWord] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WordData[] | null>(null);
  const [errorType, setErrorType] = useState<'404' | 'network' | null>(null);
  const [notFoundWord, setNotFoundWord] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [audioState, setAudioState] = useState<'idle' | 'playing' | 'paused'>('idle');
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const { addWordToHistory } = useHistory();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  useEffect(() => {
    if (searchWord) {
      setWord(searchWord);
      handleSearch(searchWord);
    }
  }, [searchWord]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleSearch = async (query: string = word) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      Alert.alert('Error', 'Please enter a word to search');
      return;
    }

    setLoading(true);
    setData(null);
    setErrorType(null);
    setNotFoundWord('');
    setErrorMessage('');
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${trimmedQuery.toLowerCase()}`);
      setData(response.data);
      addWordToHistory(trimmedQuery);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setErrorType('404');
        setNotFoundWord(trimmedQuery);
        setErrorMessage(error.response.data?.message || "");
      } else {
        setErrorType('network');
      }
    } finally {
      setLoading(false);
    }
  };

  const playAudio = async (url: string) => {
    try {
      // If there's an existing sound, clean it up first
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }

      const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
      setSound(newSound);
      setCurrentAudioUrl(url);
      setAudioState('playing');

      // Reset state when playback finishes naturally
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setAudioState('idle');
          setCurrentAudioUrl(null);
          newSound.unloadAsync();
          setSound(null);
        }
      });

      await newSound.playAsync();
    } catch (error) {
      setAudioState('idle');
      setCurrentAudioUrl(null);
      Alert.alert('Playback Error', 'Could not play pronunciation audio.');
    }
  };

  const pauseAudio = async () => {
    try {
      if (sound) {
        await sound.pauseAsync();
        setAudioState('paused');
      }
    } catch (error) {
      Alert.alert('Playback Error', 'Could not pause audio.');
    }
  };

  const resumeAudio = async () => {
    try {
      if (sound) {
        await sound.playAsync();
        setAudioState('playing');
      }
    } catch (error) {
      Alert.alert('Playback Error', 'Could not resume audio.');
    }
  };

  const stopAudio = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }
      setAudioState('idle');
      setCurrentAudioUrl(null);
    } catch (error) {
      Alert.alert('Playback Error', 'Could not stop audio.');
    }
  };

  const suggestedWords = ['knowledge', 'adventure', 'curiosity', 'brilliant', 'serendipity', 'vibrant', 'epiphany', 'resilient'];

  const handleSelectWord = (selectedWord: string) => {
    setWord(selectedWord);
    handleSearch(selectedWord);
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <View className="bg-indigo-600 dark:bg-indigo-900 pt-12 pb-6 px-4 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.openDrawer()} className="mr-4">
          <MaterialIcons name="menu" size={28} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold flex-1">LexiDict</Text>
      </View>

      {/* Search Section */}
      <View className="p-4 bg-white dark:bg-gray-900 shadow-sm flex-row items-center">
        <TextInput
          className="flex-1 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mr-2 text-gray-800 dark:text-gray-200"
          placeholder="Search for a word..."
          placeholderTextColor="#9ca3af"
          value={word}
          onChangeText={setWord}
          onSubmitEditing={() => handleSearch()}
          autoCapitalize="none"
        />
        <TouchableOpacity 
          onPress={() => handleSearch()}
          className="bg-indigo-600 dark:bg-indigo-700 p-3 rounded-lg"
        >
          <MaterialIcons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        {loading ? (
          <LoadingState />
        ) : errorType === '404' ? (
          <NotFoundState 
            notFoundWord={notFoundWord}
            errorMessage={errorMessage}
            suggestedWords={suggestedWords}
            onSelectSuggestion={handleSelectWord}
          />
        ) : errorType === 'network' ? (
          <NetworkErrorState onRetry={() => handleSearch()} />
        ) : data ? (
          <View className="pb-10">
            {data.map((entry, eIdx) => (
              <WordEntry 
                key={eIdx}
                entry={entry}
                index={eIdx}
                onPlayAudio={playAudio}
                onPauseAudio={pauseAudio}
                onResumeAudio={resumeAudio}
                onStopAudio={stopAudio}
                onSearchWord={handleSelectWord}
                audioState={audioState}
                currentAudioUrl={currentAudioUrl}
              />
            ))}
          </View>
        ) : (
          <LandingState onSelectSample={handleSelectWord} />
        )}
      </ScrollView>
    </View>
  );
}
