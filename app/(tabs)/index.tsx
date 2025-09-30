import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import SplashScreen from '../../components/SplashScreen';
import OnboardingScreen from '@/components/OnboardingScreen';

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Start fully visible
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Start fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800, // fade duration (ms)
        useNativeDriver: true,
      }).start(() => {
        // After fade out, hide splash + navigate
        setShowSplash(false);
        router.replace('/(tabs)');
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim]);

  if (showSplash) {
    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim, backgroundColor: 'white' }]}>
        <SplashScreen />
      </Animated.View>

    );
  }

  return <OnboardingScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
