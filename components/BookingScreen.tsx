import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useLocalSearchParams } from 'expo-router';
import CalendarModal from './ui/CalenderModal';
import PaymentMethodModal from './ui/PaymentmethodModal';

const { width } = Dimensions.get('window');
const CARD_RADIUS = 18;

export default function BookingScreen() {
  const params = useLocalSearchParams();

  const hotel = {
    image: params.img as string,
    title: params.title as string,
    location: params.city as string,
    rating: params.rating ? Number(params.rating) : 0,
    price: '$1500.00',
  };

  const [checkIn, setCheckIn] = useState(params.checkIn as string || '');
  const [checkOut, setCheckOut] = useState(params.checkOut as string || '');
  const [guests, setGuests] = useState(Number(params.guests) || 1);
  const [rooms, setRooms] = useState(Number(params.rooms) || 1);
  const [roomType, setRoomType] = useState('Economy Room');
  const [paymentMethod, setPaymentMethod] = useState('MasterCard');

  // Modal states
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toDateString();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Booking Info</Text>

      {/* Hotel Info */}
      <View style={styles.hotelRow}>
        <Image source={{ uri: hotel.image }} style={styles.hotelImg} />
        <View style={{ flex: 1, marginLeft: 13 }}>
          <Text style={styles.hotelTitle}>{hotel.title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.hotelLocation}>{hotel.location}</Text>
            <FontAwesome name="star" color="#FFD600" size={13} style={{ marginLeft: 6 }} />
            <Text style={styles.hotelRating}>{hotel.rating}</Text>
          </View>
          <Text style={styles.hotelPrice}>
            {hotel.price}
            <Text style={styles.hotelMonth}>/month</Text>
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Booking Form */}
      <View style={styles.card}>
        {/* Dates */}
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.inputIconBox} onPress={() => setShowCheckInModal(true)}>
            <Icon name="calendar" color="#4169E1" size={18} />
            <Text style={styles.inputText}>{checkIn ? formatDate(checkIn) : 'Select Check-in'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputIconBox} onPress={() => setShowCheckOutModal(true)}>
            <Icon name="calendar" color="#4169E1" size={18} />
            <Text style={styles.inputText}>{checkOut ? formatDate(checkOut) : 'Select Check-out'}</Text>
          </TouchableOpacity>
        </View>

        {/* Guests / Rooms */}
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.inputIconBox}>
            <Icon name="user" color="#4169E1" size={18} />
            <Text style={styles.inputText}>{guests} Guest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputIconBox}>
            <MaterialCommunityIcons name="bed-empty" color="#4169E1" size={18} />
            <Text style={styles.inputText}>{rooms} Room</Text>
          </TouchableOpacity>
        </View>

        {/* Room Type */}
        <TouchableOpacity style={styles.inputSelectRow}>
          <Icon name="home" color="#4169E1" size={18} />
          <Text style={styles.inputText}>{roomType}</Text>
          <Icon name="chevron-down" color="#B1B5BB" size={20} style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        {/* Payment */}
        <TouchableOpacity style={styles.inputSelectRow} onPress={() => setShowPaymentModal(true)}>
          <FontAwesome name="cc-mastercard" size={20} color="#F77F3B" />
          <Text style={styles.cardNumber}>{paymentMethod === 'MasterCard' ? '5698 •••• •••• •••• 2317' : paymentMethod}</Text>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueBtn}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      {/* Modals */}
      <CalendarModal
        visible={showCheckInModal}
        selectedDate={checkIn}
        onDateSelect={(date) => setCheckIn(date)}
        onClose={() => setShowCheckInModal(false)}
        title="Select Check-in"
      />
      <CalendarModal
        visible={showCheckOutModal}
        selectedDate={checkOut}
        onDateSelect={(date) => setCheckOut(date)}
        onClose={() => setShowCheckOutModal(false)}
        title="Select Check-out"
      />
      <PaymentMethodModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSelect={(method) => setPaymentMethod(method)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 18, paddingTop: 36 },
  header: { fontSize: 20, fontWeight: '700', color: '#222', marginBottom: 18, alignSelf: 'center' },
  hotelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 11 },
  hotelImg: { height: 52, width: 58, borderRadius: 11 },
  hotelTitle: { fontSize: 16, fontWeight: '700', color: '#232323', marginBottom: 3 },
  hotelLocation: { fontSize: 13, color: '#818181', marginRight: 4 },
  hotelRating: { fontSize: 13, color: '#232323', fontWeight: '600', marginLeft: 3 },
  hotelPrice: { fontSize: 17, color: '#222', fontWeight: '700', marginTop: 5 },
  hotelMonth: { fontSize: 13, color: '#817D97', fontWeight: '500', marginLeft: 2 },
  divider: { height: 1, backgroundColor: '#ECECEC', marginVertical: 14, marginHorizontal: -11 },
  card: {
    backgroundColor: '#F5F8FE',
    borderRadius: CARD_RADIUS,
    padding: 18,
    marginBottom: 25,
    elevation: 2,
    shadowColor: '#B1B5BB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 13 },
  inputIconBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 7,
    marginRight: 10,
    minHeight: 38,
  },
  inputText: { fontSize: 15, color: '#283753', fontWeight: '500', marginLeft: 8 },
  inputSelectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 7,
    marginBottom: 11,
    minHeight: 38,
  },
  cardNumber: { fontSize: 15, marginLeft: 8, color: '#283753', fontWeight: '500' },
  continueBtn: { backgroundColor: '#4977F9', borderRadius: 30, paddingVertical: 15, marginTop: 12, alignItems: 'center' },
  continueText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
