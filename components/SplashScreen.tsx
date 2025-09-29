import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>
            <Text style={styles.vText}>V</Text>
            <Text style={styles.oyaText}>oya</Text>
          </Text>
        </View>
        
        <Text style={styles.tagline}>Check-in to comfort</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 8,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '600',
    letterSpacing: -1,
  },
  vText: {
    color: '#4169E1',
  },
  oyaText: {
    color: '#000000',
  },
  tagline: {
    fontSize: 16,
    color: '#333333',
    letterSpacing: 0.5,
  },
});

export default SplashScreen;