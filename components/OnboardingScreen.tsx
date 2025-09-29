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
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Find Your Perfect Stay,\nAnytime, Anywhere',
    description: 'Lorem ipsum dolor sit amet consectetur.\nLectus dictum ut nunc sodales a. Nibh\ntortor malesuada amet',
    images: [
      'https://images.unsplash.com/photo-1509130446498-104dcb6e2b88?w=600',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
    ],
  },
  {
    id: '2',
    title: 'Book Your Dream Hotel in Just a Tap',
    description: 'Lorem ipsum dolor sit amet consectetur.\nLectus dictum ut nunc sodales a. Nibh\ntortor malesuada amet',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600',
      'https://images.unsplash.com/photo-1468071174046-657d9d351a40?w=600',
    ],
  },
  {
    id: '3',
    title: 'Relax and enjoy your trip with Voya',
    description: 'Lorem ipsum dolor sit amet consectetur.\nLectus dictum ut nunc sodales a. Nibh\ntortor malesuada amet',
    images: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?w=600',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
    ],
  },
];

const IMAGE_HEIGHT = height * 0.33;
const PILL_WIDTH = (width * 0.75) / 3;
const PILL_SPACING = 16;

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
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatList: {
    flexGrow: 0,
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'web' ? 56 : 44,
  },
  pillImageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 12,
    marginBottom: 32,
    gap: PILL_SPACING,
  },
  pillWrapper: {
    width: PILL_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#eef2f5',
  },
  middlePill: {
    marginTop: -12,
  },
  pillImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  title: {
    fontSize: width > 400 ? 22 : 19,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#181818',
    lineHeight: width > 400 ? 32 : 28,
  },
  description: {
    fontSize: width > 400 ? 15 : 13,
    textAlign: 'center',
    color: '#888',
    lineHeight: width > 400 ? 23 : 19,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingBottom: Platform.OS === 'web' ? 36 : 28,
    marginTop: 0,
  },
  skipText: {
    fontSize: width > 400 ? 16 : 14,
    color: '#888',
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
    backgroundColor: '#4169E1',
  },
  nextButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4169E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 23,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: -3,
  },
});

export default OnboardingScreen;
