import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' }}
        style={styles.headerImage}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.logo}>
          <Text style={{ color: '#456EFF',fontFamily: 'Inter',}}>V</Text><Text style={{ color: '#232323',fontFamily: 'Inter', }}>oya</Text>
        </Text>
        <Text style={styles.title}>Your Perfect Stay is Just a Click Away!</Text>
        <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet consectetur. Lectus dictum ut nunc sodales a. Nibh tortor malesuada amet
        </Text>
        <TouchableOpacity style={styles.registerButton} onPress={() => router.replace('/signup')}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text style={styles.loginText} onPress={() => router.replace('/login')}>Log In</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 230,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    opacity: 0.5,
  },
  content: {
    flex: 1,
    marginTop: 180,
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    color: '#232323',
    fontFamily : 'Inter',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 32,
    textAlign: 'center',
    fontFamily : 'Inter',
    fontWeight: '400',
  },
  registerButton: {
    backgroundColor: '#4B75E9',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 60,
    marginBottom: 14,
    marginTop: 24,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
    fontFamily : 'Inter',
    fontWeight: '500',
  },
  footerText: {
    textAlign: 'center',
    color: '#232323',
    fontSize: 14,
    marginTop: 38,
    fontFamily: 'Inter',
  },
  loginText: {
    color: '#4B75E9',
    fontWeight: 'bold',
  }
});
