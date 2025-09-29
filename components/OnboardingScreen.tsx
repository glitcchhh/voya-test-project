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
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Find Your Perfect Stay,\nAnytime, Anywhere',
    description: 'Lorem ipsum dolor sit amet consectetur.\nLectus dictum ut nunc sodales a. Nibh\ntortor malesuada amet',
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    ],
  },

  {
    id: '2',
    title: 'Book Your Dream Hotel in Just a Tap',
    description: 'Lorem ipsum dolor sit amet consectetur.\nLectus dictum ut nunc sodales a. Nibh\ntortor malesuada amet',
    images: [
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400',
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    ],
  },

  {
    id: '3',
    title: 'Relax and enjoy your trip with Voya',
    description: 'Lorem ipsum dolor sit amet consectetur.\nLectus dictum ut nunc sodales a. Nibh\ntortor malesuada amet',
    images: [
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400',
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    ],
  },
  // Add more slides here if needed
];

const OnboardingScreen = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      router.replace('/(tabs)');
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <View style={styles.imagesContainer}>
        {(item.images ?? []).map((img: string, index: number) => (
          <View
            key={index}
            style={[
              styles.imageWrapper,
              index === 1 && styles.centerImage,
            ]}
          >
            <Image source={{ uri: img }} style={styles.image} />
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
        keyExtractor={(item) => item.id}
      />

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.activeDot,
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
    backgroundColor: '#ffffff',
  },
  slide: {
    width,
    flex: 1,
    paddingTop: 60,
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
    gap: 12,
  },
  imageWrapper: {
    width: width * 0.27,
    height: 320,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  centerImage: {
    marginTop: -20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    marginBottom: 16,
    lineHeight: 32,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  skipText: {
    fontSize: 16,
    color: '#666',
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 30,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
  },
  activeDot: {
    backgroundColor: '#4169E1',
  },
  nextButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4169E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
  },
});

export default OnboardingScreen;