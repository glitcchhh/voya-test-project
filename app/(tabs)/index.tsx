import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import SplashScreen from '../../components/SplashScreen';
import OnboardingScreen from '@/components/OnboardingScreen';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Show splash screen for 2.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Navigate to your main tab screen
      router.replace('/(tabs)');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return <OnboardingScreen/>;
}