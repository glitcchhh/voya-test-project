import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const EreceiptScreen = () => {
  const router = useRouter();

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
    price,
    total: totalParam,
    userId,
  } = useLocalSearchParams();

  const startDate = checkIn ? new Date(checkIn as string) : null;
  const endDate = checkOut ? new Date(checkOut as string) : null;
  const numDays =
    startDate && endDate
      ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
      : 0;

  const total = totalParam ? Number(totalParam) : 150 * numDays;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back-ios" size={22} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>E-Receipt</Text>
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
            ${price} <Text style={styles.monthText}>/month</Text>
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
      <DetailRow label="Amount Paid" value={`$${total}`} />
      <DetailRow label="Payment Method" value="Cash" valueStyle={styles.cashMethod} />

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.leftButton]} onPress={() => router.replace('/home')}>
          <Text style={styles.leftButtonText}>Back to Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={() => { /* Your download logic here */ }}>
          <Text style={styles.rightButtonText}>Download</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  headerTitle: { flex: 1, textAlign: 'center', fontWeight: '600', fontSize: 18, color: '#222', fontFamily: 'Inter' },
  propertyInfo: { flexDirection: 'row', marginVertical: 16 },
  propertyImage: { width: 70, height: 70, borderRadius: 8, marginRight: 12, backgroundColor: '#d3d3d3' },
  propertyDetails: { flex: 1, justifyContent: 'center' },
  propertyName: { fontWeight: '600', fontSize: 17, marginBottom: 2, color: '#222', fontFamily: 'Inter' },
  city: { fontSize: 14, color: '#888', fontFamily: 'Inter' },
  rating: { marginLeft: 3, fontWeight: '500', color: '#222', fontSize: 14, fontFamily: 'Inter' },
  price: { fontSize: 15, fontWeight: '600', marginTop: 3, color: '#222', fontFamily: 'Inter' },
  monthText: { fontSize: 13, color: '#999', fontWeight: '400', fontFamily: 'Inter' },
  sectionTitle: { marginTop: 18, marginBottom: 6, fontWeight: '700', fontSize: 15, color: '#222', fontFamily: 'Inter' },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2, marginVertical: 2 },
  detailLabel: { fontSize: 14, color: '#666', fontWeight: '500', fontFamily: 'Inter' },
  detailValue: { fontSize: 14, color: '#222', fontWeight: '500', fontFamily: 'Inter' },
  cashMethod: { color: '#4B75E9', fontWeight: '600', fontFamily: 'Inter' },
  buttonRow: { flexDirection: 'row', marginTop: 10, marginBottom: 18, justifyContent: 'space-between' },
  button: { flex: 1, height: 40, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginHorizontal: 3 },
  leftButton: { backgroundColor: '#F5F7FB' },
  leftButtonText: { color: '#222', fontWeight: '600', fontSize: 16 },
  rightButton: { backgroundColor: '#4B75E9' },
  rightButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});

export default EreceiptScreen;
