import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useHistory } from '@/context/HistoryContext';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

export default function CustomDrawerContent(props: any) {
  const { history, clearHistory } = useHistory();
  const { theme, toggleTheme, isDark } = useTheme();
  const router = useRouter();

  const handleHistoryPress = (word: string) => {
    // Navigate to home and trigger search
    props.navigation.closeDrawer();
    router.push({ pathname: '/', params: { searchWord: word } });
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.header, isDark && styles.headerDark]}>
        <Text style={styles.headerTitle}>LexiDict</Text>
        <Text style={[styles.headerSubtitle, isDark && styles.headerSubtitleDark]}>Search History</Text>
      </View>
      
      <ScrollView style={{ flex: 1 }}>
        {history.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>No recent searches</Text>
          </View>
        ) : (
          history.map((word, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.historyItem, isDark && styles.historyItemDark]}
              onPress={() => handleHistoryPress(word)}
            >
              <MaterialIcons name="history" size={20} color={isDark ? "#9ca3af" : "#666"} />
              <Text style={[styles.historyText, isDark && styles.historyTextDark]}>{word}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {history.length > 0 && (
        <TouchableOpacity 
          style={[styles.clearButton, isDark && styles.clearButtonDark]} 
          onPress={clearHistory}
        >
          <Text style={styles.clearButtonText}>Clear History</Text>
        </TouchableOpacity>
      )}

      {/* Theme Toggle */}
      <View style={[styles.themeToggleContainer, isDark && styles.themeToggleContainerDark]}>
        <View style={styles.themeInfo}>
          <MaterialIcons 
            name={isDark ? "dark-mode" : "light-mode"} 
            size={22} 
            color={isDark ? "#fbbf24" : "#4f46e5"} 
          />
          <Text style={[styles.themeText, isDark && styles.themeTextDark]}>
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </Text>
        </View>
        <TouchableOpacity 
          style={[styles.toggleBtn, isDark && styles.toggleBtnDark]} 
          onPress={toggleTheme}
        >
          <View style={[styles.toggleCircle, isDark && styles.toggleCircleDark]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#111827',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerDark: {
    backgroundColor: '#1f2937',
    borderBottomColor: '#374151',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4f46e5',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  headerSubtitleDark: {
    color: '#9ca3af',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyItemDark: {
    borderBottomColor: '#374151',
  },
  historyText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
    textTransform: 'capitalize',
  },
  historyTextDark: {
    color: '#e5e7eb',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  },
  emptyTextDark: {
    color: '#6b7280',
  },
  clearButton: {
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  clearButtonDark: {
    borderTopColor: '#374151',
  },
  clearButtonText: {
    color: '#ef4444',
    fontWeight: '600',
  },
  themeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  themeToggleContainerDark: {
    backgroundColor: '#1f2937',
    borderTopColor: '#374151',
  },
  themeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  themeTextDark: {
    color: '#f3f4f6',
  },
  toggleBtn: {
    width: 48,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
    padding: 2,
  },
  toggleBtnDark: {
    backgroundColor: '#4f46e5',
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  toggleCircleDark: {
    transform: [{ translateX: 24 }],
  },
});
