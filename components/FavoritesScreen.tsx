import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchFavorites();
  }, []);

  async function fetchFavorites() {
    setLoading(true);
    try {
      // Try both methods of getting userId
      let uid = await AsyncStorage.getItem("userId");
      
      if (!uid) {
        // Fallback: try getting from user object
        const userStr = await AsyncStorage.getItem("user");
        if (userStr) {
          const user = JSON.parse(userStr);
          uid = user.id?.toString();
        }
      }

      console.log("Fetching favorites for userId:", uid);

      if (!uid) {
        console.log("No userId found - user may not be logged in");
        setFavorites([]);
        setLoading(false);
        return;
      }

      setUserId(uid);

      const response = await fetch(`http://localhost:3000/favorites/${uid}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Favorites received:", data);
      setFavorites(data || []);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      const response = await fetch(`http://localhost:3000/favorites/${favoriteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove from local state
        setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
        Alert.alert("Success", "Removed from favorites");
      } else {
        Alert.alert("Error", "Failed to remove favorite");
      }
    } catch (error) {
      console.error("Remove favorite error:", error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  const handleCardPress = (item) => {
    router.push({
      pathname: "/hoteldetails",
      params: {
        id: item.hotelId,
        title: item.title,
        city: item.city,
        img: item.img,
        rating: item.rating,
        checkIn: item.checkIn || "",
        checkOut: item.checkOut || "",
        guests: item.guests || "1",
        rooms: item.rooms || "1",
      },
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={{ marginTop: 100 }} size="large" color="#4B75E9" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.replace('/home')}>
          <Icon name="arrow-left" size={20} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorite</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Empty State */}
      {favorites.length === 0 && !loading && (
        <View style={styles.emptyContainer}>
          <Icon name="heart-o" size={60} color="#ccc" />
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubtext}>
            Start adding hotels to your favorites!
          </Text>
        </View>
      )}

      {/* Grid cards */}
      {favorites.length > 0 && (
        <FlatList
          data={favorites}
          numColumns={2}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 8 }}
          renderItem={({ item }) => (
            <FavoriteCard
              item={item}
              onPress={() => handleCardPress(item)}
              onRemove={() => handleRemoveFavorite(item.id)}
            />
          )}
        />
      )}

      {/* Bottom Tab Bar */}
            <View style={styles.tabBar}>
              <TouchableOpacity style={styles.tabBarItem} onPress={() => router.replace('/home')}>
                <Icon name="home" size={20} color="#C7C7C7" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabBarItem} onPress={() => router.replace('/mybookings')}>
                <Icon name="calendar" size={20} color="#C7C7C7" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabBarItem} onPress={() => router.replace('/favorites')}>
                <Icon name="heart" size={20} color="#4B75E9" />
                <Text style={styles.tabLabelActive}>Favorites</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabBarItem} onPress={() => router.replace('/profile')}>
                <Icon name="user" size={20} color="#C7C7C7" />
              </TouchableOpacity>
            </View>
    </View>
  );
}

function FavoriteCard({ item, onPress, onRemove }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.imageBox}>
        <Image source={{ uri: item.img }} style={styles.img} />
        <View style={styles.ratingBadge}>
          <Icon name="star" color="#FFD700" size={12} />
          <Text style={styles.rating}>{item.rating ?? "4.5"}</Text>
        </View>
      </View>
      <Text style={styles.hotelTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.hotelSub} numberOfLines={1}>
        {item.city}
      </Text>
      <View style={styles.cardBottom}>
        <Text style={styles.price}>
          $1,500 <Text style={styles.priceMonth}>/night</Text>
        </Text>
        <TouchableOpacity onPress={onRemove} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Icon name="heart" size={20} color="#FF4444" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
    paddingTop: 18,
    paddingBottom: 12,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
    color: "#222",
    fontFamily: "Inter",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#232323",
    marginTop: 20,
    fontFamily: "Inter",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#888",
    marginTop: 8,
    textAlign: "center",
    fontFamily: "Inter",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 6,
    borderRadius: 14,
    elevation: 2,
    shadowColor: "#e8e8e8",
    padding: 7,
    maxWidth: "47%",
  },
  imageBox: {
    position: "relative",
    width: "100%",
    aspectRatio: 1.36,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 9,
    backgroundColor: "#eaeaea",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  ratingBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7,
    paddingVertical: 2,
    elevation: 2,
    shadowColor: "#e4e4e4",
  },
  rating: {
    marginLeft: 4,
    color: "#232323",
    fontWeight: "700",
    fontSize: 12,
    fontFamily: "Inter",
  },
  hotelTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#232323",
    fontFamily: "Inter",
    marginLeft: 3,
    marginBottom: 1,
  },
  hotelSub: {
    color: "#888",
    fontSize: 13,
    marginLeft: 3,
    marginBottom: 3,
    fontFamily: "Inter",
  },
  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 3,
    marginTop: 8,
    justifyContent: "space-between",
    marginBottom: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: "#232323",
    fontFamily: "Inter",
  },
  priceMonth: {
    fontSize: 11,
    color: "#888",
    fontWeight: "500",
    fontFamily: "Inter",
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
    color: '#4B75E9',
    fontWeight: '600',
    marginTop: 2,
    fontFamily: 'Inter',
  },
});