import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter, useLocalSearchParams } from "expo-router";

const BookingInfoScreen = () => {
  const router = useRouter();
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
    name,
    email,
    phone,
    price
  } = useLocalSearchParams();

  // Calculate number of days
  const startDate = checkIn ? new Date(checkIn as string) : null;
  const endDate = checkOut ? new Date(checkOut as string) : null;
  const numDays =
    startDate && endDate
      ? Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
        )
      : 0;

  return (
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
        <Image
          source={{ uri: img as string }}
          style={styles.propertyImage}
        />
        <View style={styles.propertyDetails}>
          <Text style={styles.propertyName}>{title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
            <Text style={styles.city}>{city}  </Text>
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
      <DetailRow label="Amount" value={`$${Number(price) * numDays}`} />
      <DetailRow label="Payment Method" value="Cash" valueStyle={styles.cashMethod} />

      {/* Pay Button */}
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Pay ${Number(price) * numDays}</Text>
      </TouchableOpacity>
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
  headerTitle: { flex: 1, textAlign: 'center', fontWeight: '600', fontSize: 18, color: '#222' },
  propertyInfo: { flexDirection: 'row', marginVertical: 16 },
  propertyImage: { width: 70, height: 70, borderRadius: 8, marginRight: 12, backgroundColor: '#d3d3d3' },
  propertyDetails: { flex: 1, justifyContent: 'center' },
  propertyName: { fontWeight: '600', fontSize: 17, marginBottom: 2, color: '#222' },
  city: { fontSize: 14, color: '#888' },
  rating: { marginLeft: 3, fontWeight: '500', color: '#222', fontSize: 14 },
  price: { fontSize: 15, fontWeight: '600', marginTop: 3, color: '#222' },
  monthText: { fontSize: 13, color: '#999', fontWeight: '400' },
  sectionTitle: { marginTop: 18, marginBottom: 6, fontWeight: '700', fontSize: 15, color: '#222' },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2, marginVertical: 2 },
  detailLabel: { fontSize: 14, color: '#666', fontWeight: '500' },
  detailValue: { fontSize: 14, color: '#222', fontWeight: '500' },
  cashMethod: { color: '#0d6efd', fontWeight: '600' },
  payButton: { backgroundColor: '#5A7BF4', borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginVertical: 28, paddingVertical: 15 },
  payButtonText: { color: '#fff', fontWeight: '700', fontSize: 18 },
});

export default BookingInfoScreen;
