import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const API_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get userId from AsyncStorage
        const storedUserId = await AsyncStorage.getItem('userId');
        if (!storedUserId) return;

        // Fetch user details from backend
        const response = await fetch(`${API_URL}/users/${storedUserId}`);
        const data = await response.json();

        if (response.ok) {
          setUserName(data.name || '');
          setUserEmail(data.email || '');
          
          // Optional: keep them in AsyncStorage for quick access later
          await AsyncStorage.setItem('userName', data.name || '');
          await AsyncStorage.setItem('userEmail', data.email || '');
        } else {
          Alert.alert("Error", data.message || "Failed to fetch user details");
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
        Alert.alert("Error", "Could not fetch user profile");
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header & Profile */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Profile</Text>
        <View style={{ width: 24 }} /> {/* For spacing */}
      </View>

      <View style={styles.profileRow}>
        <Image
          source={{uri: 'https://randomuser.me/api/portraits/men/32.jpg'}}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Preferences */}
      <Text style={styles.sectionTitle}>Preferences</Text>
      <View style={styles.section}>
        <Option icon={<MaterialIcons name="payment" size={20} color="#63686E" />} label="Payment Methods" />
        <Option icon={<Ionicons name="ios-card" size={20} color="#63686E" />} label="Currency" />
        <Option icon={<FontAwesome5 name="globe" size={20} color="#63686E" />} label="Country" />
      </View>

      {/* Help Center */}
      <Text style={styles.sectionTitle}>Help Center</Text>
      <View style={styles.section}>
        <Option icon={<Ionicons name="help-circle-outline" size={20} color="#63686E" />} label="FAQ,s" />
        <Option icon={<MaterialIcons name="support-agent" size={20} color="#63686E" />} label="Help & Support" />
      </View>
    </View>
  );
}

function Option({ icon, label }) {
  return (
    <TouchableOpacity style={styles.option}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.optionLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color="#63686E" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9FB', paddingTop: 45 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 22, marginBottom: 14 },
  profileTitle: { flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 19 },
  profileRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 22, marginVertical: 18 },
  avatar: { width: 56, height: 56, borderRadius: 28, marginRight: 15 },
  userInfo: { flex: 1 },
  userName: { fontWeight: 'bold', fontSize: 16, color: '#222' },
  userEmail: { color: '#616469', fontSize: 13, marginTop: 1 },
  editText: { color: '#066EFF', fontWeight: '500', fontSize: 15 },
  sectionTitle: { color: '#222', fontWeight: 'bold', fontSize: 15, marginLeft: 24, marginTop: 12 },
  section: { marginTop: 3 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FB',
    borderRadius: 14,
    marginHorizontal: 17,
    marginVertical: 6,
    paddingVertical: 14,
    paddingHorizontal: 14,
    shadowColor: '#EFEFEF',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
  },
  icon: { marginRight: 15 },
  optionLabel: { flex: 1, fontSize: 15, color: '#222' },
});
