import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter, useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get('window');

export default function GuestInfoScreen() {
  const [booksForOthers, setBooksForOthers] = useState(false);

   const {
      id,
      title,
      city,
      img,
      rating,
      checkIn,
      checkOut,
      guests,
      rooms,
    } = useLocalSearchParams();

  // User input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');

  const handleContinue = async () => {
    if (!name || !email || !phone) {
      Alert.alert('Missing Info', 'Please fill all fields');
      return;
    }
    else {
      router.push({
                pathname: "/bookinginfo",
                params: {
                  id,
                  title,
                  city,
                  img,
                  rating,
                  checkIn,
                  checkOut,
                  guests,
                  rooms,   
                  name,
                  email,
                  phone,
                },
              });
    }

  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Guest Info</Text>

      {/* Card with input fields */}
      <View style={styles.infoCard}>
        {/* Name */}
        <View style={styles.fieldRow}>
          <Icon name="user" size={18} color="#B2B2B2" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Full Name"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email */}
        <View style={styles.fieldRow}>
          <MaterialCommunityIcons
            name="email-outline"
            size={18}
            color="#B2B2B2"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Phone */}
        <View style={styles.fieldRow}>
          <TextInput
            style={[styles.input, { flex: 0.25, marginRight: 6 }]}
            placeholder="+91"
            value={countryCode}
            onChangeText={setCountryCode}
          />
          <TextInput
            style={[styles.input, { flex: 0.75 }]}
            placeholder="Enter Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
      </View>

      {/* Switch */}
      <View style={styles.switchRow}>
        <Text style={styles.booksText}>
          Books for <Text style={styles.bold}>Others</Text>
        </Text>
        <Switch
          value={booksForOthers}
          onValueChange={setBooksForOthers}
          thumbColor={booksForOthers ? '#4169E1' : '#cfd0d5'}
          trackColor={{ false: '#ececf0', true: '#d3dfff' }}
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const CARD_RADIUS = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 28,
    alignItems: 'center',
  },
  header: {
    alignSelf: 'center',
    fontSize: 17,
    fontWeight: '700',
    color: '#181818',
    marginBottom: 19,
  },
  infoCard: {
    width: '94%',
    borderRadius: CARD_RADIUS,
    backgroundColor: '#F7F9FE',
    paddingVertical: 7,
    marginBottom: 10,
    marginTop: 8,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 19,
    marginBottom: 1,
    backgroundColor: '#F7F9FE',
  },
  icon: { marginRight: 10 },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#202020',
    fontWeight: '500',
    paddingVertical: 4,
  },
  switchRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '93%',
  },
  booksText: { fontSize: 16, color: '#24262e', fontWeight: '500' },
  bold: { fontWeight: '700' },
  button: {
    backgroundColor: '#4977F9',
    borderRadius: 29,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 31,
    width: width * 0.88,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
