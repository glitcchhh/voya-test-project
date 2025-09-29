import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  CheckBox,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);

  // Funct to register 
  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.8:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', `User registered with ID: ${data.id}`);
        router.replace('/home'); // Nav to home 
      } else {
        Alert.alert('Error', data.error || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not connect to server');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backArrow} onPress={() => router.back()}>
        <Icon name="arrow-left" size={22} color="#373737" />
      </TouchableOpacity>
      <Text style={styles.header}>Let’s Get Started</Text>
      <Text style={styles.subheader}>Create an account to continue.</Text>

      {/* Username */}
      <View style={styles.inputBox}>
        <Icon name="user" size={18} color="#B2B2B2" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Wade Warren"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#B2B2B2"
        />
      </View>

      {/* Email */}
      <View style={styles.inputBox}>
        <Icon name="mail" size={18} color="#B2B2B2" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="wadewarren123@gmail.com"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#B2B2B2"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password */}
      <View style={styles.inputBox}>
        <Icon name="lock" size={18} color="#B2B2B2" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#B2B2B2"
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!isPasswordVisible)}
          style={styles.visibilityIcon}
        >
          <Icon
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={18}
            color="#B2B2B2"
          />
        </TouchableOpacity>
      </View>

      {/* Terms */}
      <View style={styles.checkboxRow}>
        <CheckBox
          value={accepted}
          onValueChange={setAccepted}
          tintColors={{ true: '#456EFF', false: '#bbb' }}
        />
        <Text style={styles.agreeText}>
          I agree to the{' '}
          <Text style={styles.linkText}>Terms</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>

      {/* Register Button */}
      <TouchableOpacity
        style={[styles.registerButton, { opacity: accepted ? 1 : 0.6 }]}
        disabled={!accepted}
        onPress={handleRegister}
      >
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      {/* Social login & bottom text remain unchanged */}
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
          <FontAwesome name="facebook" size={21} color="#3B5998" />
          <Text style={styles.socialText}>Facebook</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bottomText}>
        Already have an account?{' '}
        <Text style={styles.loginLink} onPress={() => router.replace('/home')}>
          Log In
        </Text>
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 54,
    backgroundColor: '#fff',
  },
  backArrow: {
    position: 'absolute',
    left: 16,
    top: 38,
    zIndex: 1,
  },
  header: {
    fontSize: 23,
    fontWeight: '700',
    color: '#232323',
    marginBottom: 6,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 14,
    color: '#b2b2b2',
    marginBottom: 26,
    textAlign: 'center',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F8FC',
    borderRadius: 15,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 48,
    width: '100%',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#232323',
  },
  visibilityIcon: {
    marginLeft: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 4,
  },
  agreeText: {
    fontSize: 13,
    color: '#232323',
    marginLeft: 6,
  },
  linkText: {
    color: '#456EFF',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  registerButton: {
    backgroundColor: '#456EFF',
    borderRadius: 25,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    marginTop: 1,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 7,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ededed',
  },
  orText: {
    marginHorizontal: 13,
    fontSize: 15,
    color: '#b2b2b2',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
    gap: 14,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F8FC',
    borderRadius: 15,
    paddingHorizontal: 17,
    paddingVertical: 6,
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
  },
  bottomText: {
    textAlign: 'center',
    color: '#232323',
    fontSize: 14,
    marginTop: 8,
  },
  loginLink: {
    color: '#456EFF',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
