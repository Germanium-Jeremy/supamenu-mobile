import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colorScheme as nativewindColorScheme } from "nativewind";

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceColorScheme = useDeviceColorScheme();
  const [theme, setThemeState] = useState<ThemeMode>('system');

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    applyTheme();
  }, [theme, deviceColorScheme]);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('user-theme');
      if (savedTheme) {
        setThemeState(savedTheme as ThemeMode);
      }
    } catch (error) {
      console.error('Failed to load theme', error);
    }
  };

  const applyTheme = () => {
    const effectiveTheme = theme === 'system' ? deviceColorScheme : theme;
    nativewindColorScheme.set(effectiveTheme === 'dark' ? 'dark' : 'light');
  };

  const setTheme = async (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      await AsyncStorage.setItem('user-theme', newTheme);
    } catch (error) {
      console.error('Failed to save theme', error);
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  const isDark = theme === 'system' ? deviceColorScheme === 'dark' : theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
