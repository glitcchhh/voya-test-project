import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native'; // <-- Import navigation
import { usePathname } from 'expo-router';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const hotels = [
  { id: '1', title: 'Elysium Gardens', city: 'London, England', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400', rating: 4.5 },
  { id: '2', title: 'California, USA', city: 'London, England', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400', rating: 4.5 },
];

export default function HomeScreen() {
  const router = useRouter(); // <-- Hook for navigation

  const [location, setLocation] = useState('London, England');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState('1');
  const [rooms, setRooms] = useState('1');
  
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const handleHotelPress = () => {
    router.push('/hoteldetails'); 
};




  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatar} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.locText}>Find events near</Text>
          <Text style={styles.locRegion}>{location}</Text>
        </View>
        <TouchableOpacity>
          <Icon name="bell" size={22} color="#373737" />
        </TouchableOpacity>
      </View>

      {/* Search card */}
      <View style={styles.searchCard}>
        <View style={styles.inputBox}>
          <Icon name="map-pin" size={18} color="#B2B2B2" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Location"
            placeholderTextColor="#B2B2B2"
          />
        </View>

        <View style={styles.gridRow}>
          <TouchableOpacity
            style={styles.smallInputBox}
            onPress={() => setShowCheckInPicker(true)}
          >
            <Icon name="calendar" size={17} color="#B2B2B2" style={styles.inputIcon} />
            <Text style={styles.input}>{checkIn ? formatDate(checkIn) : 'Check in'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.smallInputBox}
            onPress={() => setShowCheckOutPicker(true)}
          >
            <Icon name="calendar" size={17} color="#B2B2B2" style={styles.inputIcon} />
            <Text style={styles.input}>{checkOut ? formatDate(checkOut) : 'Check out'}</Text>
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={showCheckInPicker}
          mode="date"
          onConfirm={(date) => { setCheckIn(date); setShowCheckInPicker(false); }}
          onCancel={() => setShowCheckInPicker(false)}
        />
        <DateTimePickerModal
          isVisible={showCheckOutPicker}
          mode="date"
          onConfirm={(date) => { setCheckOut(date); setShowCheckOutPicker(false); }}
          onCancel={() => setShowCheckOutPicker(false)}
        />

        <View style={styles.gridRow}>
          <View style={styles.smallInputBox}>
            <Icon name="user" size={17} color="#B2B2B2" style={styles.inputIcon} />
            <RNPickerSelect
              onValueChange={setGuests}
              value={guests}
              style={{ inputAndroid: { color: '#232323', fontSize: 15 }, inputIOS: { color: '#232323', fontSize: 15 } }}
              items={Array.from({ length: 10 }, (_, i) => ({ label: `${i + 1} Guest`, value: `${i + 1}` }))}
              placeholder={{}}
            />
          </View>
          <View style={styles.smallInputBox}>
            <MaterialCommunityIcons name="bed-empty" size={17} color="#B2B2B2" style={styles.inputIcon} />
            <RNPickerSelect
              onValueChange={setRooms}
              value={rooms}
              style={{ inputAndroid: { color: '#232323', fontSize: 15 }, inputIOS: { color: '#232323', fontSize: 15 } }}
              items={Array.from({ length: 20 }, (_, i) => ({ label: `${i + 1} Room`, value: `${i + 1}` }))}
              placeholder={{}}
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
        data={hotels}
        horizontal
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hotelList}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.hotelCard} onPress={() => handleHotelPress(item)}>
            <Image source={{ uri: item.img }} style={styles.hotelImg} />
            <View style={styles.starBox}>
              <FontAwesome name="star" size={15} color="#FFD600" />
              <Text style={styles.starLabel}>{item.rating}</Text>
            </View>
            <Text style={styles.hotelTitle}>{item.title}</Text>
            <Text style={styles.hotelSubtitle}>{item.city}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabBarItem}>
          <Icon name="home" size={20} color="#4169E1" />
          <Text style={styles.tabLabelActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBarItem}>
          <Icon name="calendar" size={20} color="#C7C7C7" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBarItem}>
          <Icon name="heart" size={20} color="#C7C7C7" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBarItem}>
          <Icon name="user" size={20} color="#C7C7C7" />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const CARD_RADIUS = 18;
const INPUT_HEIGHT = 44;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 9,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eaeaea',
    marginRight: 5,
  },
  locText: {
    fontSize: 13,
    color: '#818181',
    marginBottom: 1,
    letterSpacing: 0.1
  },
  locRegion: {
    fontSize: 16,
    fontWeight: '700',
    color: '#232323',
  },
  searchCard: {
    backgroundColor: '#F6F8FC',
    borderRadius: CARD_RADIUS,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 18,
    elevation: 2,
    shadowColor: '#c2cdf7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: CARD_RADIUS,
    height: INPUT_HEIGHT,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  smallInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: CARD_RADIUS,
    height: INPUT_HEIGHT,
    paddingHorizontal: 14,
    marginRight: 6,
    marginBottom: 0,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#232323',
    padding: 0,
  },
  gridRow: {
    flexDirection: 'row',
    marginBottom: 13,
  },
  findButton: {
    backgroundColor: '#4169E1',
    borderRadius: 24,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
    marginBottom: 1,
  },
  findButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
  popularHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    alignItems: 'center',
    marginBottom: 6,
  },
  popularText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#202020',
  },
  viewAllText: {
    fontSize: 15,
    color: '#4169E1',
    fontWeight: '600',
  },
  hotelList: {
    paddingLeft: 17,
    paddingRight: 1,
    marginBottom: 6,
  },
  hotelCard: {
    width: 151,
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#ccc',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 6,
    elevation: 1,
    paddingBottom: 7,
    paddingHorizontal: 7,
    marginBottom: 4,
  },
  hotelImg: {
    width: '100%',
    height: 87,
    borderRadius: 12,
    marginBottom: 8,
    marginTop: 8,
  },
  starBox: {
    position: 'absolute',
    top: 16,
    left: 13,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  starLabel: {
    marginLeft: 4,
    fontWeight: '700',
    fontSize: 13,
    color: '#202020',
  },
  hotelTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222',
    marginTop: 8,
    marginBottom: 2,
    letterSpacing: 0.1,
  },
  hotelSubtitle: {
    fontSize: 13,
    color: '#919191',
  },
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
    color: '#4169E1',
    fontWeight: '600',
    marginTop: 2,
  },
});
