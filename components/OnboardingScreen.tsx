import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Stack } from "expo-router";
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Find Your Perfect Stay,\nAnytime , Anywhere',
    description: 'Lorem ipsum dolor sit amet consectetur.\nLectus dictum ut nunc sodales a. Nibh tortor malesuada amet',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
    ],
  },
  {
    id: '2',
    title: 'Book Your Dream Hotel in Just a Tap',
    description: 'Lorem ipsum dolor sit amet consectetur.\nLectus dictum ut nunc sodales a. Nibh tortor malesuada amet',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600',
      'https://images.unsplash.com/photo-1468071174046-657d9d351a40?w=600',
    ],
  },
  {
    id: '3',
    title: 'Relax and enjoy your trip with Voya',
    description: 'Lorem ipsum dolor sit amet consectetur.\nLectus dictum ut nunc sodales a. Nibh tortor malesuada amet',
    images: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?w=600',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
    ],
  },
];

const IMAGE_HEIGHT = height * 0.31;
const PILL_WIDTH = (width * 0.78) / 3;
const PILL_SPACING = 13;

const OnboardingScreen = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null); 


  const handleSkip = () => {
    router.replace('/register');
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      router.replace('/register');
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <View style={styles.pillImageRow}>
        {item.images.map((img: string, idx: number) => (
          <View
            key={idx}
            style={[
              styles.pillWrapper,
              idx === 1 && styles.middlePill,
            ]}
          >
            <Image source={{ uri: img }} style={styles.pillImage} />
          </View>
        ))}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 55 }}
        keyExtractor={item => item.id}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        style={styles.flatList}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <View style={styles.pagination}>
          {onboardingData.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                currentIndex === idx && styles.activeDot,
              ]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9', },
  flatList: { flexGrow: 0 },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'web' ? 64 : 44,
  },
  pillImageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 44,
    marginBottom: 33,
    gap: PILL_SPACING,
  },
  pillWrapper: {
    width: PILL_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#eef2f5',
    marginHorizontal: PILL_SPACING / 5,
  },
  middlePill: {
    marginTop: -13,
  },
  pillImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 17,
  },
  title: {
    fontSize: width > 400 ? 20 : 19,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    color: '#181818',
    fontFamily : 'Inter',
    lineHeight: width > 400 ? 30 : 28,
  },
  description: {
    fontSize: width > 400 ? 15 : 13,
    textAlign: 'center',
    color: '#b7bac0',
    lineHeight: width > 400 ? 23 : 19,
    fontWeight: '500',
    fontFamily : 'Inter',
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    marginTop : 12,
    paddingBottom: Platform.OS === 'web' ? 39 : 28,
  },
  skipText: {
    fontSize: width > 400 ? 16 : 14,
    color: '#858aad',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 22,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#e3e9f4',
  },
  activeDot: {
    backgroundColor: '#4B75E9',
  },
  nextButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4B75E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 23,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: -2,
  },
});

export default OnboardingScreen;
