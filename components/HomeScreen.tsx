import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const dummyHotels = [
  {
    id: '1',
    title: 'Elysium Gardens',
    city: 'London, England',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
    rating: 4.5,
  },
  {
    id: '2',
    title: 'California, USA',
    city: 'London, England',
    img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400',
    rating: 4.5,
  },
];

export default function HomeScreen() {
  const [location, setLocation] = useState('London, England');
  const [checkIn, setCheckIn] = useState('20/07/25');
  const [checkOut, setCheckOut] = useState('26/07/25');
  const [guests, setGuests] = useState('1 Guest');
  const [rooms, setRooms] = useState('1 Room');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.avatar}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.locText}>Find events near</Text>
          <Text style={styles.locRegion}>California, USA</Text>
        </View>
        <TouchableOpacity>
          <Icon name="bell" size={22} color="#373737" />
        </TouchableOpacity>
      </View>

      {/* Search Card */}
      <View style={styles.searchCard}>
        <View style={styles.inputRow}>
          <Icon name="mail" size={18} color="#B2B2B2" />
          <TextInput
            style={styles.inputText}
            value={location}
            onChangeText={setLocation}
            placeholder="Location"
            placeholderTextColor="#B2B2B2"
          />
        </View>
        <View style={styles.inputDuoRow}>
          <View style={styles.duoInput}>
            <Icon name="calendar" size={17} color="#B2B2B2" />
            <TextInput
              style={styles.inputText}
              value={checkIn}
              onChangeText={setCheckIn}
              placeholder="Check in"
              placeholderTextColor="#B2B2B2"
            />
          </View>
          <View style={styles.duoInput}>
            <Icon name="calendar" size={17} color="#B2B2B2" />
            <TextInput
              style={styles.inputText}
              value={checkOut}
              onChangeText={setCheckOut}
              placeholder="Check out"
              placeholderTextColor="#B2B2B2"
            />
          </View>
        </View>
        <View style={styles.inputDuoRow}>
          <View style={styles.duoInput}>
            <Icon name="user" size={17} color="#B2B2B2" />
            <TextInput
              style={styles.inputText}
              value={guests}
              onChangeText={setGuests}
              placeholder="Guest"
              placeholderTextColor="#B2B2B2"
            />
          </View>
          <View style={styles.duoInput}>
            <MaterialIcons name="meeting-room" size={17} color="#B2B2B2" />
            <TextInput
              style={styles.inputText}
              value={rooms}
              onChangeText={setRooms}
              placeholder="Room"
              placeholderTextColor="#B2B2B2"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.findButton}>
          <Text style={styles.findButtonText}>Find Hotel</Text>
        </TouchableOpacity>
      </View>

      {/* Popular Hotel Section */}
      <View style={styles.popularHeader}>
        <Text style={styles.popularText}>Popular Hotel</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={dummyHotels}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 7 }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => (
          <View style={styles.hotelCard}>
            <Image
              source={{ uri: item.img }}
              style={styles.hotelImg}
            />
            <View style={styles.ratingBox}>
              <FontAwesome name="star" color="#F5C443" size={14} />
              <Text style={styles.hotelRating}>{item.rating}</Text>
            </View>
            <Text style={styles.hotelTitle}>{item.title}</Text>
            <Text style={styles.hotelCity}>{item.city}</Text>
          </View>
        )}
      />

      {/* Bottom Tab Bar (demo, remove if handled by your router/layout) */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabBarBtn}>
          <Icon name="home" size={22} color="#4169E1" />
          <Text style={styles.tabLabelActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBarBtn}>
          <Icon name="calendar" size={22} color="#B2B2B2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBarBtn}>
          <Icon name="heart" size={22} color="#B2B2B2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBarBtn}>
          <Icon name="user" size={22} color="#B2B2B2" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const S = 15;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 38,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: '#eee',
    borderWidth: 1,
    marginRight: 3,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  locText: {
    fontSize: 13,
    color: '#7C7C7C',
  },
  locRegion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  searchCard: {
    backgroundColor: '#fbfbfd',
    borderRadius: 20,
    marginHorizontal: 14,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 15,
    shadowColor: '#edf2f9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f8fc',
    borderRadius: 15,
    paddingHorizontal: 13,
    marginBottom: S,
    height: 43,
  },
  inputDuoRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: S,
  },
  duoInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f8fc',
    borderRadius: 15,
    paddingHorizontal: 13,
    flex: 1,
    height: 43,
  },
  inputText: {
    flex: 1,
    fontSize: 15,
    color: '#222',
    marginLeft: 6,
  },
  findButton: {
    backgroundColor: '#456EFF',
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 11,
    marginBottom: 4,
  },
  findButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
  },
  popularHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 19,
    marginBottom: 7,
  },
  popularText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#181818',
  },
  viewAllText: {
    color: '#456EFF',
    fontSize: 15,
    fontWeight: '600',
  },
  hotelCard: {
    width: 170,
    backgroundColor: '#fff',
    borderRadius: 17,
    marginRight: 12,
    padding: 7,
    shadowColor: '#eee',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 1,
  },
  hotelImg: {
    width: '100%',
    height: 95,
    borderRadius: 14,
    marginBottom: 6,
  },
  ratingBox: {
    flexDirection: 'row',
    position: 'absolute',
    top: 12,
    left: 13,
    backgroundColor: '#fff',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 13,
    alignItems: 'center',
    shadowColor: '#eee',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
  },
  hotelRating: {
    marginLeft: 3,
    fontSize: 12,
    color: '#222',
    fontWeight: '700',
  },
  hotelTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#232323',
    marginTop: 9,
  },
  hotelCity: {
    fontSize: 12,
    color: '#A3A3A3',
    marginBottom: 3,
    marginTop: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ededed',
    paddingHorizontal: 32,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 58,
  },
  tabBarBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabLabelActive: {
    fontSize: 11,
    color: '#4169E1',
    fontWeight: '600',
    marginTop: 2,
  }
});
