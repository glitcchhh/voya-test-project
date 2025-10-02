import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, 
  TextInput, Alert, ActivityIndicator 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:3000"; 

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
    
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Login successful!");
        try {
          await AsyncStorage.setItem("userId", data.user.id.toString());
          await AsyncStorage.setItem("username", data.user.username);
          await AsyncStorage.setItem("email", data.user.email);
        } catch (e) {
          console.error("Error saving user data:", e);
        }
        router.push('/home');
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backArrow} onPress={() => router.replace('/register')}>
        <Icon name="arrow-left" size={22} color="#232323" />
      </TouchableOpacity>

      <Text style={styles.header}>Welcome Back!</Text>
      <Text style={styles.subheader}>Log in to continue.</Text>

      <View style={styles.inputBox}>
        <Icon name="mail" size={18} color="#B2B2B2" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#B2B2B2"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputBox}>
        <Icon name="lock" size={18} color="#B2B2B2" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#B2B2B2"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? "eye" : "eye-off"} size={18} color="#B2B2B2" />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Checkbox
          value={remember}
          onValueChange={setRemember}
          color={remember ? '#4B75E9': undefined}
          style={styles.checkbox}
        />
        <Text style={styles.rememberText}>Remember Me</Text>
        <TouchableOpacity style={styles.forgotLink}>
          <Text style={styles.forgotText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Log In</Text>
        )}
      </TouchableOpacity>

      <View style={styles.orRow}>
        <View style={styles.divider} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={21} color="#891409ff" />
          <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={21} color="#4B75E9" />
          <Text style={styles.socialText}>Facebook</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.bottomText}>
        Don’t have an account?{' '}
        <Text style={styles.loginLink} onPress={() => router.replace('/register')}>
          Register
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 56,
    backgroundColor: '#fff',
  },
  backArrow: {
    position: 'absolute',
    left: 15,
    top: 40,
    zIndex: 2,
  },
  header: {
    fontSize: 23,
    fontWeight: '700',
    color: '#181818',
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  subheader: {
    fontSize: 14,
    color: '#A2A5AD',
    marginBottom: 19,
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F7FF',
    borderRadius: 15,
    paddingHorizontal: 16,
    marginBottom: 17,
    height: 48,
    width: '100%',
    fontFamily: 'Inter',
  },
  inputIcon: {
    marginRight: 9,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#181818',
    fontFamily: 'Inter',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 21,
    justifyContent: 'space-between',
    width: '100%',
  },
  checkbox: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  rememberText: {
    fontSize: 12,
    color: '#181818',
    marginLeft: -3,
    flex: 1,
    fontFamily: 'Inter',
  },
  forgotLink: {
    marginLeft: 'auto',
  },
  forgotText: {
    color: '#4B75E9',
    textDecorationLine: 'underline',
    fontWeight: '700',
    fontSize: 12,
    fontFamily: 'Inter',
  },
  loginButton: {
    backgroundColor: '#4B75E9',
    borderRadius: 25,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    marginTop: 1,
    width: '100%',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 17,
    marginBottom: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ededed',
  },
  orText: {
    marginHorizontal: 12,
    fontSize: 15,
    color: '#b2b2b2',
    fontWeight: '500',
    fontFamily: 'Inter',
    fontSize: 10,
    
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    gap: 14,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F7FF',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 7,
    gap: 7,
    marginHorizontal: 5,
    minWidth: 98,
    justifyContent: 'center',
  },
  socialText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#232323',
    marginLeft: 6,
    fontFamily: 'Inter',
  },
  bottomText: {
    textAlign: 'center',
    color: '#232323',
    fontSize: 14,
    marginTop: 38,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  loginLink: {
    color: '#4B75E9',
    fontWeight: '500',
    textDecorationLine: 'underline',
    fontFamily: 'Inter',
  },
});
