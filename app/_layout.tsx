import "@/global.css";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { HistoryProvider } from '@/context/HistoryContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import CustomDrawerContent from '@/components/CustomDrawerContent';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { isDark } = useTheme();

  return (
    <HistoryProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
          <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
              headerShown: false,
              drawerType: 'front',
            }}
          >
            <Drawer.Screen
              name="index"
              options={{
                drawerLabel: 'Home',
                title: 'LexiDict',
              }}
            />
          </Drawer>
        </NavThemeProvider>
      </GestureHandlerRootView>
    </HistoryProvider>
  );
}
