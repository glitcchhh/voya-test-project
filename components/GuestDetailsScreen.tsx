import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');

  const handleContinue = async () => {
    if (!name || !email || !phone) {
      Alert.alert('Missing Info', 'Please fill all fields');
      return;
    } else {
      router.push({
        pathname: '/bookinginfo',
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
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Guest Info</Text>

      {/* Card with input fields */}
      <View style={styles.infoCard}>
        {/* Name */}
        <View style={styles.fieldRow}>
          <Icon name="user" size={width * 0.045} color="#B2B2B2" style={styles.icon} />
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
            size={width * 0.045}
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
          thumbColor={booksForOthers ? '#4B75E9' : '#cfd0d5'}
          trackColor={{ false: '#ececf0', true: '#d3dfff' }}
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const CARD_RADIUS = 16;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingTop: height * 0.035,
    alignItems: 'center',
    paddingBottom: height * 0.05,
  },
  header: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#181818',
    marginBottom: height * 0.025,
    fontFamily:'Inter',
  },
  infoCard: {
    width: '94%',
    borderRadius: CARD_RADIUS,
    backgroundColor: '#F7F9FE',
    paddingVertical: height * 0.01,
    marginBottom: height * 0.02,
    marginTop: height * 0.01,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.045,
    marginBottom: 1,
    backgroundColor: '#F7F9FE',
  },
  icon: { marginRight: width * 0.03 },
  input: {
    flex: 1,
    fontSize: width * 0.04,
    color: '#202020',
    fontWeight: '500',
    paddingVertical: 4,
    fontFamily:'Inter',
  
  },  
  
    button: {
  position: 'absolute',
  bottom: height * 0.03, // 3% from bottom
  backgroundColor: '#4977F9',
  borderRadius: 29,
  height: height * 0.065,
  alignItems: 'center',
  justifyContent: 'center',
  width: width * 0.88,
  alignSelf: 'center',
},

  switchRow: {
    marginTop: height * 0.015,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '93%',
  },
  booksText: { fontSize: width * 0.042, color: '#24262e', fontWeight: '500',fontFamily:'Inter', },
  bold: { fontWeight: '700',fontFamily:'Inter',},
  button: {
  position: 'absolute',
  bottom: height * 0.03, // 3% from bottom
  backgroundColor: '#4977F9',
  borderRadius: 29,
  height: height * 0.065,
  alignItems: 'center',
  justifyContent: 'center',
  width: width * 0.88,
  alignSelf: 'center',
},
  buttonText: { color: '#fff', fontSize: width * 0.045, fontWeight: '700',fontFamily:'Inter', },
});