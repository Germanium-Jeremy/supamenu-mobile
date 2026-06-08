import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

type HistoryContextType = {
  history: string[];
  addWordToHistory: (word: string) => void;
  clearHistory: () => void;
};

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const initHistory = async () => {
      await loadHistory();
    };
    initHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('searchHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error('Failed to load history', e);
    }
  };

  const addWordToHistory = async (word: string) => {
    const trimmedWord = word.trim().toLowerCase();
    if (!trimmedWord) return;

    const storedHistory = await AsyncStorage.getItem('searchHistory');
    let prevHistory: string[] = [];
    if (storedHistory) {
      prevHistory = JSON.parse(storedHistory);
    }

    const filtered = prevHistory.filter((item) => item !== trimmedWord);
    const newHistory = [trimmedWord, ...filtered];
    
    await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const clearHistory = async () => {
    setHistory([]);
    await AsyncStorage.removeItem('searchHistory');
  };

  return (
    <HistoryContext.Provider value={{ history, addWordToHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};
