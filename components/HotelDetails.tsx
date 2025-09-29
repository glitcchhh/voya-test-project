import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

export default function DetailsScreen() {
  const [descMore, setDescMore] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Image & Back */}
      <View style={styles.imageBox}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800' }}
          style={styles.hotelImg}
        />
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <View style={styles.backInnerBtn}>
            <Icon name="arrow-left" size={22} color="#232323" />
          </View>
        </TouchableOpacity>
        <Text style={styles.detailsTitle}>Details</Text>
        <TouchableOpacity style={styles.heartBox}>
          <Icon name="heart" size={22} color="#456EFF" />
        </TouchableOpacity>
      </View>
      {/* Content */}
      <ScrollView contentContainerStyle={styles.scroller} showsVerticalScrollIndicator={false}>
        <Text style={styles.hotelTitle}>Elysium Gardens</Text>
        <Text style={styles.hotelSub}>Paris, France</Text>
        <View style={styles.reviewRow}>
          <FontAwesome name="star" color="#FFD600" size={13} />
          <Text style={styles.starScore}>4.5</Text>
          <Text style={styles.reviewBase}>(10,92 Reviews)</Text>
        </View>

        <Text style={styles.sectionLabel}>Facilities</Text>
        <View style={styles.facilityRow}>
          <View style={styles.facItem}>
            <MaterialIcons name="wifi" size={22} color="#232323" />
            <Text style={styles.facLabel}>Wi-Fi</Text>
          </View>
          <View style={styles.facItem}>
            <MaterialCommunityIcons name="silverware-variant" size={22} color="#232323" />
            <Text style={styles.facLabel}>Restaurant</Text>
          </View>
          <View style={styles.facItem}>
            <MaterialCommunityIcons name="coffee-outline" size={22} color="#232323" />
            <Text style={styles.facLabel}>Cafe</Text>
          </View>
          <View style={styles.facItem}>
            <MaterialIcons name="park" size={22} color="#232323" />
            <Text style={styles.facLabel}>Garden</Text>
          </View>
          <View style={styles.facItem}>
            <MaterialCommunityIcons name="dumbbell" size={22} color="#232323" />
            <Text style={styles.facLabel}>Gym</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.sectionLabel}>Description</Text>
        <Text style={styles.descText}>
          Lorem ipsum dolor sit amet consectetur. Lectus dictum ut nunc sodales a. Nibh tortor malesuada amet malesuada{!descMore && '...'}
          {descMore && ' elit. Nullam euismod, nisi vel consectetur ornare, orci mauris dictum nulla, at consequat massa neque a lorem.'}
          <Text
            style={styles.readMore}
            onPress={() => setDescMore(v => !v)}
          >{descMore ? ' Read Less' : ' Read More'}</Text>
        </Text>
        {/* Price and Button */}
        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.priceText}>Price</Text>
            <Text style={styles.mainPrice}>$1,500 <Text style={styles.priceNight}>/Night</Text></Text>
          </View>
          <TouchableOpacity style={styles.bookBtn}>
            <Text style={styles.bookLabel}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imageBox: {
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f0f0f0',
  },
  hotelImg: { width: '100%', height: '100%', resizeMode: 'cover' },
  backBtn: { position: 'absolute', top: 18, left: 15, zIndex: 5 },
  backInnerBtn: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    borderColor: '#eee',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsTitle: {
    position: 'absolute',
    left: 0, right: 0, top: 30,
    textAlign: 'center',
    zIndex: 2,
    fontSize: 18,
    fontWeight: '700',
    color: '#232323',
    letterSpacing: 0.2,
  },
  heartBox: { position: 'absolute', top: 22, right: 18, backgroundColor: 'transparent', zIndex: 2 },
  scroller: { padding: 22, paddingBottom: 34 },
  hotelTitle: { fontSize: 19, fontWeight: '700', color: '#232323' },
  hotelSub: { color: '#cdcdbb', fontSize: 13, marginTop: 3, marginBottom: 5 },
  reviewRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  starScore: { fontSize: 14, color: '#232323', fontWeight: '700', marginLeft: 5 },
  reviewBase: { color: '#b2b2b2', fontSize: 13, marginLeft: 4 },
  sectionLabel: { fontWeight: '700', color: '#232323', fontSize: 15, marginTop: 15, marginBottom: 7 },
  facilityRow: { flexDirection: 'row', alignItems: 'center', gap: 13, marginBottom: 19 },
  facItem: { alignItems: 'center', width: 55 },
  facLabel: { marginTop: 5, color: '#232323', fontSize: 13 },
  descText: { color: '#7d7d7d', fontSize: 14, lineHeight: 20, marginBottom: 11 },
  readMore: { color: '#4169E1', fontWeight: '600', fontSize: 14, textDecorationLine: 'underline' },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 13,
    borderTopWidth: 1,
    borderTopColor: '#efefef',
    paddingTop: 17,
  },
  priceText: { fontSize: 14, color: '#888', marginBottom: 1 },
  mainPrice: { fontSize: 18, fontWeight: '700', color: '#232323' },
  priceNight: { fontSize: 13, color: '#888', fontWeight: '400' },
  bookBtn: {
    backgroundColor: '#4169E1',
    paddingHorizontal: 33,
    paddingVertical: 13,
    borderRadius: 22,
    alignItems: 'center',
  },
  bookLabel: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
