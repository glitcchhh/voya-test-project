import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useFonts, Poppins_600SemiBold , Poppins_400Regular } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
const SplashScreen = () => {

  const[fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if(!fontsLoaded){
    return<AppLoading />;
  }
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
    fontFamily: 'Poppins_600SemiBold',
  },
  vText: {
    color: '#4B75E9',
    fontFamily: "Poppins_600SemiBold",
  },
  oyaText: {
    color: '#000000',
    fontFamily: "Poppins_600SemiBold",
  },
  tagline: {
    fontSize: 16,
    color: '#000000',
    letterSpacing: 0.5,
    fontFamily: "Poppins_600SemiBold",
  },
});

export default SplashScreen;