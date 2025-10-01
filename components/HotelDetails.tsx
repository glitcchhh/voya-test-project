import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HotelDetails() {
  const [descMore, setDescMore] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    id,
    hotelId, // Add this to handle both parameter names
    title,
    city,
    img,
    rating,
    checkIn,
    checkOut,
    guests,
    rooms,
  } = useLocalSearchParams();

  // Use whichever parameter is provided
  const actualId = id || hotelId;

  // Check if hotel is already favorited on component mount
  useEffect(() => {
    checkIfFavorited();
  }, [actualId]);

  const checkIfFavorited = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId || !actualId) return;

      const response = await fetch(
        `http://localhost:3000/favorites/${userId}/${actualId}`
      );
      const data = await response.json();

      if (data.isFavorite) {
        setIsFavorite(true);
        setFavoriteId(data.favorite.id);
      }
    } catch (error) {
      console.error("Check favorite error:", error);
    }
  };

  // Handle saving/removing hotel from favorites
  const handleToggleFavorite = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        Alert.alert("Error", "User not logged in");
        setIsLoading(false);
        return;
      }

      if (isFavorite && favoriteId) {
        // Remove from favorites
        const response = await fetch(
          `http://localhost:3000/favorites/${favoriteId}`,
          { method: "DELETE" }
        );

        if (response.ok) {
          setIsFavorite(false);
          setFavoriteId(null);
          Alert.alert("Success", "Hotel removed from favorites");
        } else {
          Alert.alert("Error", "Failed to remove favorite");
        }
      } else {
        // Add to favorites
        const hotelData = {
          id: actualId, // Use actualId instead of id
          title,
          city,
          img,
          rating,
          checkIn,
          checkOut,
          guests,
          rooms,
        };

        const response = await fetch("http://localhost:3000/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, hotel: hotelData }),
        });

        if (response.ok) {
          const data = await response.json();
          setIsFavorite(true);
          setFavoriteId(data.id);
          Alert.alert("Success", "Hotel added to favorites");
        } else {
          const errorData = await response.json();
          Alert.alert("Error", errorData.error || "Failed to save favorite");
        }
      }
    } catch (error) {
      console.error("Toggle favorite error:", error);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Image & Back */}
      <View style={styles.imageBox}>
        <Image source={{ uri: img as string }} style={styles.hotelImg} />
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <View style={styles.backInnerBtn}>
            <Icon name="arrow-left" size={22} color="#232323" />
          </View>
        </TouchableOpacity>
        <Text style={styles.detailsTitle}>Details</Text>

        {/* Heart Button - Now toggles */}
        <TouchableOpacity
          style={styles.heartBox}
          onPress={handleToggleFavorite}
          disabled={isLoading}
        >
          <Icon
            name="heart"
            size={22}
            color={isFavorite ? "#FF4444" : "#4B75E9"}
            style={{ opacity: isLoading ? 0.5 : 1 }}
          />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.scroller}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.hotelTitle}>{title}</Text>
        <Text style={styles.hotelSub}>{city}</Text>
        <View style={styles.reviewRow}>
          <FontAwesome name="star" color="#FFD600" size={13} />
          <Text style={styles.starScore}>{rating}</Text>
          <Text style={styles.reviewBase}>(1,092 Reviews)</Text>
        </View>

        {/* Facilities */}
        <Text style={styles.sectionLabel}>Facilities</Text>
        <View style={styles.facilityRow}>
          <View style={styles.facItem}>
            <MaterialIcons name="wifi" size={22} color="#232323" />
            <Text style={styles.facLabel}>Wi-Fi</Text>
          </View>
          <View style={styles.facItem}>
            <MaterialCommunityIcons
              name="silverware-variant"
              size={22}
              color="#232323"
            />
            <Text style={styles.facLabel}>Restaurant</Text>
          </View>
          <View style={styles.facItem}>
            <MaterialCommunityIcons
              name="coffee-outline"
              size={22}
              color="#232323"
            />
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

        {/* Dates */}
        <Text style={styles.sectionLabel}>Your Stay</Text>
        <Text style={styles.descText}>
          Check-in: <Text style={{ fontWeight: "600" }}>{checkIn || "Not selected"}</Text>
        </Text>
        <Text style={styles.descText}>
          Check-out: <Text style={{ fontWeight: "600" }}>{checkOut || "Not selected"}</Text>
        </Text>
        <Text style={styles.descText}>
          Guests: <Text style={{ fontWeight: "600" }}>{guests}</Text> | Rooms:{" "}
          <Text style={{ fontWeight: "600" }}>{rooms}</Text>
        </Text>

        {/* Description */}
        <Text style={styles.sectionLabel}>Description</Text>
        <Text style={styles.descText}>
          Lorem ipsum dolor sit amet consectetur. Lectus dictum ut nunc sodales a.
          Nibh tortor malesuada amet malesuada
          {!descMore && "..."}
          {descMore &&
            " elit. Nullam euismod, nisi vel consectetur ornare, orci mauris dictum nulla, at consequat massa neque a lorem."}
          <Text style={styles.readMore} onPress={() => setDescMore((v) => !v)}>
            {descMore ? " Read Less" : " Read More"}
          </Text>
        </Text>

        {/* Price and Button */}
        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.priceText}>Price</Text>
            <Text style={styles.mainPrice}>
              ₹1,500 <Text style={styles.priceNight}>/Night</Text>
            </Text>
          </View>
          <TouchableOpacity
            style={styles.bookBtn}
            onPress={() =>
              router.push({
                pathname: "/booking",
                params: {
                  id: actualId, // Use actualId
                  title,
                  city,
                  img,
                  rating,
                  checkIn,
                  checkOut,
                  guests,
                  rooms,
                },
              })
            }
          >
            <Text style={styles.bookLabel}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  imageBox: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#f0f0f0",
  },
  hotelImg: { width: "100%", height: "100%", resizeMode: "cover" },
  backBtn: { position: "absolute", top: 18, left: 15, zIndex: 5 },
  backInnerBtn: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    borderColor: "#eee",
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 30,
    textAlign: "center",
    zIndex: 2,
    fontSize: 18,
    fontWeight: "700",
    color: "#232323",
    letterSpacing: 0.2,
    fontFamily: "Inter",
  },
  heartBox: {
    position: "absolute",
    top: 22,
    right: 18,
    backgroundColor: "transparent",
    zIndex: 2,
  },
  scroller: { padding: 22, paddingBottom: 34 },
  hotelTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#232323",
    fontFamily: "Inter",
  },
  hotelSub: {
    color: "#666",
    fontSize: 13,
    marginTop: 3,
    marginBottom: 5,
    fontFamily: "Inter",
  },
  reviewRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  starScore: {
    fontSize: 14,
    color: "#232323",
    fontWeight: "700",
    marginLeft: 5,
    fontFamily: "Inter",
  },
  reviewBase: { color: "#b2b2b2", fontSize: 13, marginLeft: 4, fontFamily: "Inter" },
  sectionLabel: {
    fontWeight: "700",
    color: "#232323",
    fontSize: 15,
    marginTop: 15,
    marginBottom: 7,
    fontFamily: "Inter",
  },
  facilityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    marginBottom: 19,
    flexWrap: "wrap",
  },
  facItem: { alignItems: "center", width: 55, marginBottom: 10 },
  facLabel: { marginTop: 5, color: "#232323", fontSize: 13, fontFamily: "Inter" },
  descText: {
    color: "#7d7d7d",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 11,
  },
  readMore: {
    color: "#4B75E9",
    fontWeight: "600",
    fontSize: 14,
    textDecorationLine: "underline",
    fontFamily: "Inter",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 13,
    borderTopWidth: 1,
    borderTopColor: "#efefef",
    paddingTop: 17,
  },
  priceText: { fontSize: 14, color: "#888", marginBottom: 1, fontFamily: "Inter" },
  mainPrice: { fontSize: 18, fontWeight: "700", color: "#232323", fontFamily: "Inter" },
  priceNight: { fontSize: 13, color: "#888", fontWeight: "400", fontFamily: "Inter" },
  bookBtn: {
    backgroundColor: "#4B75E9",
    paddingHorizontal: 33,
    paddingVertical: 13,
    borderRadius: 22,
    alignItems: "center",
  },
  bookLabel: { color: "#fff", fontSize: 16, fontWeight: "700", fontFamily: "Inter" },
});