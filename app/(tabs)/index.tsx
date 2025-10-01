import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import SplashScreen from '../../components/SplashScreen';
import OnboardingScreen from '@/components/OnboardingScreen';

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current; 
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800, // fade duration 
        useNativeDriver: true,
      }).start(() => {
  
        setShowSplash(false);
        router.replace('/onboard');
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
