import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {

  const router = useRouter()  
  const [username, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId , setUserId] = useState('');

 

  useEffect(() => {
  const loadUserData = async () => {
    try {
      const id = await AsyncStorage.getItem('userId')
      const name = await AsyncStorage.getItem('username')
      const email = await AsyncStorage.getItem('email')

      if (id) setUserId(id);
      if (name) setUserName(name);
      if (email) setUserEmail(email);
      console.log(" AsyncStorage Data:", { id, name, email });
        } catch (error) {
            console.error("Error loading user data:", error);
        }
        };

    loadUserData();
}, []);

  return (
    <View style={styles.container}>
      {/* Header & Profile */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/home')}>
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
          <Text style={styles.userName}>{username}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Preferences */}
      <Text style={styles.sectionTitle}>Preferences</Text>
      <View style={styles.section}>
        <Option icon={<MaterialIcons name="payment" size={20} color="#949698ff" />} label="Payment Methods" />
        <Option icon={<Ionicons name="ios-card" size={20} color="#949698ff" />} label="Currency" />
        <Option icon={<FontAwesome5 name="globe" size={20} color="#949698ff" />} label="Country" />
      </View>

      {/* Help Center */}
      <Text style={styles.sectionTitle}>Help Center</Text>
      <View style={styles.section}>
        <Option icon={<Ionicons name="help-circle-outline" size={20} color="#949698ff" />} label="FAQ,s" />
        <Option icon={<MaterialIcons name="support-agent" size={20} color="#949698ff" />} label="Help & Support" />
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabBarItem} onPress={() => router.replace('/home')}>
        <Icon name="home" size={20} color="#C7C7C7" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBarItem} onPress={() => router.replace('/mybookings')}>
        <Icon name="calendar" size={20} color="#C7C7C7" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBarItem} onPress={() => router.replace('/favorites')}>
        <Icon name="heart" size={20} color="#C7C7C7" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBarItem} onPress={() => router.replace('/profile')}>
        <Icon name="user" size={20} color="#4B75E9" />
        <Text style={styles.tabLabelActive}>Profile</Text>
        </TouchableOpacity>
    </View>
    </View>
  );
}

function Option({ icon, label }) {
  return (
    <TouchableOpacity style={styles.option}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.optionLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color="#9da0a2ff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
    paddingTop: 45,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    marginBottom: 14,
  },
  profileTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 19,
    fontFamily:'Inter',
  },

  // Profile Row
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    marginVertical: 18,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 15,
  },
  userInfo: { flex: 1 },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    fontFamily:'Inter',
  },
  userEmail: {
    color: '#616469',
    fontSize: 13,
    marginTop: 1,
    fontFamily:'Inter',
  },
  editText: {
    color: '#066EFF',
    fontWeight: '500',
    fontSize: 15,
    fontFamily:'Inter',
  },

  // Sections
  sectionTitle: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 24,
    marginTop: 12,
    fontFamily:'Inter',
  },
  section: {
    marginTop: 3,
  },

  // Options
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F7FF',
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
  icon: {
    marginRight: 15,
  },
  optionLabel: {
    flex: 1,
    fontSize: 15,
    color: '#222',
    fontFamily:'Inter',
  },

  // Bottom Tab Bar
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ececec',
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 36,
    height: 58,
    alignItems: 'center',
    zIndex: 99,
  },
  tabBarItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabLabelActive: {
    fontSize: 11,
    color: '#4B75E9',
    fontWeight: '600',
    marginTop: 2,
    fontFamily: 'Inter',
  },
});

