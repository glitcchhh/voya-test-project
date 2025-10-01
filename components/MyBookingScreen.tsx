import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import { useRouter } from 'expo-router';

const SAMPLE_IMAGE =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80";

const TABS = ["Upcoming", "Completed", "Cancelled"];

type Booking = {
  id: number;
  propertyName: string;
  location: string;
  price: number;
  startDate: string;
  endDate: string;
  status: string; // must exist in your database
};

const MyBookingsScreen: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUserId = async () => {
      try {
        const idString = await AsyncStorage.getItem('userId');
        if (idString !== null) {
          setUserId(Number(idString));
        }
      } catch (e) {
        console.error('Failed to load userId from AsyncStorage', e);
      }
    };
    loadUserId();
  }, []);

  useEffect(() => {
    if (userId === null) return;
    setLoading(true);
    fetch(`http://localhost:3000/bookings/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  // Only show booked in Upcoming and cancelled in Cancelled
  const filteredBookings = bookings.filter(b =>
    (tab === 0 && b.status === "booked") ||
    (tab === 2 && b.status === "cancelled")
  );

  const cancelBooking = async (bookingId: number) => {
    try {
      const res = await fetch(`http://localhost:3000/booking/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      });
      if (!res.ok) throw new Error("Cancel failed");
      // Update local state
      setBookings(prev => prev.map(b =>
        b.id === bookingId ? { ...b, status: "cancelled" } : b
      ));
      Alert.alert("Cancellation successful");
    } catch {
      Alert.alert("Error", "Could not cancel booking.");
    }
  };

  const renderBooking = ({ item }: { item: Booking }) => (
    <View style={styles.card}>
      <View style={{ flexDirection: "row" }}>
        <Image source={{ uri: SAMPLE_IMAGE }} style={styles.img} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.place}>{item.propertyName}</Text>
          <Text style={styles.location}>{item.location}</Text>
          <View style={{ flexDirection: "row", marginTop: 4 }}>
            <View style={{ marginRight: 15 }}>
              <Text style={styles.dateMain}>{item.startDate}</Text>
              <Text style={styles.dateSub}>Check IN</Text>
            </View>
            <View>
              <Text style={styles.dateMain}>{item.endDate}</Text>
              <Text style={styles.dateSub}>Check Out</Text>
            </View>
          </View>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.perMonth}>/month</Text>
        </View>
      </View>
      {/* Show actions only on upcoming ("booked") */}
      {tab === 0 && (
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => cancelBooking(item.id)}>
            <Text style={styles.cancelTxt}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
  style={styles.ereceiptBtn}
  onPress={() =>
    router.push({
      pathname: '/ereceipt',
      params: {
        title: item.propertyName,
        city: item.location,
        checkIn: item.startDate,
        checkOut: item.endDate,
        guests: '1', // Replace if you have actual guest info
        rooms: '1',  // Replace if you have actual room info
        price: item.price,
        status: item.status,
        userId: userId,
      },
    })
  }
>
  <Text style={styles.ereceiptTxt}>E-Receipt</Text>
</TouchableOpacity>
        </View>
      )}
      {/* Show only E-Receipt in cancelled */}
      {tab === 2 && (
        <View style={styles.actionRow}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.ereceiptBtn}>
            <Text style={styles.ereceiptTxt}>E-Receipt</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  if (userId === null) {
    return (
      <View style={[styles.wrap, styles.centered]}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity>
          <Icon name="arrow-back-ios" size={22} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Booking</Text>
        <View style={{ width: 22 }} />
      </View>
      {/* Tabs */}
      <View style={styles.tabRow}>
        {TABS.map((item, idx) => (
          <TouchableOpacity key={item} onPress={() => setTab(idx)} style={styles.tabBtn}>
            <Text style={[styles.tabTxt, tab === idx && styles.tabTxtActive]}>{item}</Text>
            {tab === idx && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>
      {/* Bookings */}
      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filteredBookings}
          renderItem={renderBooking}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 60 }}
          style={{ flex: 1 }}
        />
      )}
      
      {/* Bottom Tab Bar */}
                  <View style={styles.tabBar}>
                    <TouchableOpacity style={styles.tabBarItem} onPress={() => router.replace('/home')}>
                      <Icon name="home" size={20} color="#C7C7C7" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabBarItem} onPress={() => router.replace('/mybookings')}>
                      <Icon name="calendar" size={20} color="#4B75E9" />
                      <Text style={styles.tabLabelActive}>Calender</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabBarItem} onPress={() => router.replace('/favorites')}>
                      <Icon name="heart" size={20} color="#C7C7C7" />
      
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabBarItem} onPress={() => router.replace('/profile')}>
                      <Icon name="user" size={20} color="#C7C7C7" />
                    </TouchableOpacity>
                  </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#fff" },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 14,
    paddingBottom: 3,
    paddingHorizontal: 18,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f4",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 19,
    color: "#222",
  },
  tabRow: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginTop: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabBtn: { marginRight: 38, alignItems: "center" },
  tabTxt: { color: "#888", fontSize: 15, fontWeight: "600" },
  tabTxtActive: { color: "#5A7BF4" },
  tabUnderline: {
    height: 3,
    borderRadius: 5,
    backgroundColor: "#5A7BF4",
    width: 30,
    marginTop: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 18,
    marginTop: 24,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  img: { width: 58, height: 58, borderRadius: 10, backgroundColor: "#eee" },
  place: { fontWeight: "700", fontSize: 16, marginBottom: 2, color: "#222" },
  location: { color: "#888", fontSize: 13, marginBottom: 2 },
  dateMain: { fontWeight: "600", fontSize: 13, color: "#24282C" },
  dateSub: { fontSize: 11, color: "#a6a6a6", marginTop: 1 },
  price: { fontWeight: "700", fontSize: 15, color: "#222", marginTop: 7 },
  perMonth: { color: "#bababa", fontSize: 11, fontWeight: "400" },
  actionRow: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
  },
  cancelBtn: {
    backgroundColor: "#f5f8ff",
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderRadius: 15,
    marginRight: 8,
  },
  cancelTxt: { color: "#6a7bb6", fontWeight: "600", fontSize: 16 },
  ereceiptBtn: {
    backgroundColor: "#4B75E9",
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderRadius: 15,
  },
  ereceiptTxt: { color: "#fff", fontWeight: "700", fontSize: 16 },
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

export default MyBookingsScreen;
