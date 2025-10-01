import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, Pressable, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookingInfoScreen = () => {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const {
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
    price
  } = useLocalSearchParams();

  // Load userId from AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedId = await AsyncStorage.getItem("userId");
        if (storedId) setUserId(Number(storedId));
      } catch (e) {
        console.error("Failed to load userId:", e);
      }
    };
    fetchUserId();
  }, []);

  // Calculate number of days
  const startDate = checkIn ? new Date(checkIn as string) : null;
  const endDate = checkOut ? new Date(checkOut as string) : null;
  const numDays =
    startDate && endDate
      ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
      : 0;
  const total = 1500 * numDays;

  const handlePay = async () => {
    if (!userId) {
      Alert.alert("Error", "User not logged in.");
      return;
    }

    try {
      const bookingData = {
        userId,
        propertyName: title,
        location: city,
        price: total,
        startDate: checkIn,
        endDate: checkOut,
        cardNumber: 'N/A',
        status: 'booked'
      };

      const response = await fetch('http://localhost:3000/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Booking failed');
      }

      // Show success modal
      setShowSuccess(true);

    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleDone = () => {
    setShowSuccess(false);
    router.replace({
      pathname: '/ereceipt',
      params: {
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
        price,
        total,
        userId,
      },
    });
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back-ios" size={22} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Booking Info</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Property Info */}
        <View style={styles.propertyInfo}>
          <Image source={{ uri: img as string }} style={styles.propertyImage} />
          <View style={styles.propertyDetails}>
            <Text style={styles.propertyName}>{title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
              <Text style={styles.city}>{city} </Text>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>{rating}</Text>
            </View>
            <Text style={styles.price}>
              ₹{price} <Text style={styles.monthText}>/month</Text>
            </Text>
          </View>
        </View>

        {/* Booking Details */}
        <Text style={styles.sectionTitle}>Booking Details</Text>
        <DetailRow label="Check In" value={checkIn as string} />
        <DetailRow label="Check Out" value={checkOut as string} />
        <DetailRow label="Total Days" value={`${numDays} days`} />

        {/* Guest Details */}
        <Text style={styles.sectionTitle}>Guest Details</Text>
        <DetailRow label="Guest Name" value={name as string} />
        <DetailRow label="Email" value={email as string} />
        <DetailRow label="Phone" value={phone as string} />
        <DetailRow label="Guests" value={guests as string} />
        <DetailRow label="Rooms" value={rooms as string} />

        {/* Payment Details */}
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <DetailRow label="Amount" value={`₹${total}`} />
        <DetailRow label="Payment Method" value="Cash" valueStyle={styles.cashMethod} />

        {/* Pay Button */}
        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          <Text style={styles.payButtonText}>Pay ₹{total}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Payment Success Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={showSuccess}
        onRequestClose={() => setShowSuccess(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.successIconBox}>
              <Icon name="camera-alt" size={48} color="#5A7BF4" />
            </View>
            <Text style={styles.successText}>Payment Successful</Text>
            <Pressable style={styles.doneButton} onPress={handleDone}>
              <Text style={styles.doneButtonText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

type DetailRowProps = {
  label: string;
  value: string;
  valueStyle?: object;
};

const DetailRow: React.FC<DetailRowProps> = ({ label, value, valueStyle = {} }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={[styles.detailValue, valueStyle]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  header: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, marginBottom: 4 },
  headerTitle: { flex: 1, textAlign: 'center', fontWeight: '600', fontSize: 18, color: '#222', fontFamily:'Inter' },
  propertyInfo: { flexDirection: 'row', marginVertical: 16 },
  propertyImage: { width: 70, height: 70, borderRadius: 8, marginRight: 12, backgroundColor: '#d3d3d3' },
  propertyDetails: { flex: 1, justifyContent: 'center' },
  propertyName: { fontWeight: '600', fontSize: 17, marginBottom: 2, color: '#222', fontFamily:'Inter' },
  city: { fontSize: 14, color: '#888', fontFamily:'Inter' },
  rating: { marginLeft: 3, fontWeight: '500', color: '#222', fontSize: 14, fontFamily:'Inter' },
  price: { fontSize: 15, fontWeight: '600', marginTop: 3, color: '#222', fontFamily:'Inter' },
  monthText: { fontSize: 13, color: '#999', fontWeight: '400', fontFamily:'Inter' },
  sectionTitle: { marginTop: 18, marginBottom: 6, fontWeight: '700', fontSize: 15, color: '#222', fontFamily:'Inter' },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2, marginVertical: 2 },
  detailLabel: { fontSize: 14, color: '#666', fontWeight: '500', fontFamily:'Inter' },
  detailValue: { fontSize: 14, color: '#222', fontWeight: '500', fontFamily:'Inter' },
  cashMethod: { color: '#0d6efd', fontWeight: '600', fontFamily:'Inter' },
  payButton: { backgroundColor: '#5A7BF4', borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginVertical: 28, paddingVertical: 15, height:48 },
  payButtonText: { color: '#fff', fontWeight: '700', fontSize: 18, fontFamily:'Inter' },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.1)' },
  modalContainer: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, alignItems: 'center', paddingBottom: 36, paddingTop: 32, minHeight: 280, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 16, elevation: 8 },
  successIconBox: { backgroundColor: '#F3F5FF', borderRadius: 48, width: 85, height: 85, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  successText: { fontWeight: '700', fontSize: 20, marginTop: 18, marginBottom: 12, color: '#222' },
  doneButton: { backgroundColor: '#5A7BF4', marginTop: 18, borderRadius: 16, width: 200, alignItems: 'center', paddingVertical: 13, opacity: 0.95, height: 48 },
  doneButtonText: { color: '#fff', fontWeight: '700', fontSize: 18, fontFamily:'Inter' },
});

export default BookingInfoScreen;
