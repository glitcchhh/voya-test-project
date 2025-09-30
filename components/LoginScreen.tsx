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
      <TouchableOpacity style={styles.backArrow} onPress={() => router.back()}>
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
          color={remember ? '#456EFF': undefined}
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
          <FontAwesome name="google" size={21} color="#EA4335" />
          <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={21} color="#1877F3" />
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
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 56, backgroundColor: '#fff' },
  backArrow: { position: 'absolute', left: 15, top: 40, zIndex: 2 },
  header: { fontSize: 23, fontWeight: '700', color: '#232323', marginBottom: 5, textAlign: 'center' },
  subheader: { fontSize: 14, color: '#b2b2b2', marginBottom: 19, textAlign: 'center' },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F6F8FC', borderRadius: 15, paddingHorizontal: 16, marginBottom: 17, height: 48, width: '100%' },
  inputIcon: { marginRight: 9 },
  input: { flex: 1, fontSize: 15, color: '#232323' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 21, justifyContent: 'space-between', width: '100%' },
  checkbox: { width: 21, height: 21, marginRight: 8 },
  rememberText: { fontSize: 13, color: '#232323', marginLeft: -3, flex: 1 },
  forgotLink: { marginLeft: 'auto' },
  forgotText: { color: '#456EFF', textDecorationLine: 'underline', fontWeight: '500', fontSize: 13 },
  loginButton: { backgroundColor: '#456EFF', borderRadius: 25, height: 48, alignItems: 'center', justifyContent: 'center', marginBottom: 18, marginTop: 1, width: '100%' },
  loginButtonText: { color: '#fff', fontSize: 17, fontWeight: '600' },
  orRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 7 },
  divider: { flex: 1, height: 1, backgroundColor: '#ededed' },
  orText: { marginHorizontal: 12, fontSize: 15, color: '#b2b2b2', fontWeight: '500' },
  socialRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 15, gap: 14 },
  socialButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F6F8FC', borderRadius: 15, paddingHorizontal: 20, paddingVertical: 7, gap: 7, marginHorizontal: 5, minWidth: 98, justifyContent: 'center' },
  socialText: { fontSize: 15, fontWeight: '500', color: '#232323', marginLeft: 6 },
  bottomText: { textAlign: 'center', color: '#232323', fontSize: 14, marginTop: 7 },
  loginLink: { color: '#456EFF', fontWeight: '600', textDecorationLine: 'underline' },
});
