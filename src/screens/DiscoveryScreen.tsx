import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Animated,
  PanGestureHandler,
  State,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

import { AppDispatch, RootState } from '../store';
import { fetchDiscoveryCards, swipeCard, nextCard } from '../store/slices/discoverySlice';
import { FoodItem } from '../types';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = height * 0.7;
const CARD_WIDTH = width * 0.9;

const DiscoveryScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cards, currentCardIndex, isLoading } = useSelector(
    (state: RootState) => state.discovery
  );

  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    dispatch(fetchDiscoveryCards({}));
  }, [dispatch]);

  const resetCardPosition = () => {
    Animated.parallel([
      Animated.spring(translateX, { toValue: 0, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
      Animated.spring(rotate, { toValue: 0, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  const swipeAnimation = (direction: 'left' | 'right' | 'up') => {
    const toValueX = direction === 'left' ? -width * 2 : direction === 'right' ? width * 2 : 0;
    const toValueY = direction === 'up' ? -height * 2 : 0;

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: toValueX,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: toValueY,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Reset position and move to next card
      translateX.setValue(0);
      translateY.setValue(0);
      rotate.setValue(0);
      scale.setValue(1);
      dispatch(nextCard());
    });
  };

  const handleSwipe = (action: 'like' | 'dislike' | 'save') => {
    if (currentCardIndex < cards.length) {
      const currentCard = cards[currentCardIndex];
      dispatch(swipeCard({ cardId: currentCard.id, action }));

      if (action === 'like') {
        swipeAnimation('right');
      } else if (action === 'dislike') {
        swipeAnimation('left');
      } else if (action === 'save') {
        swipeAnimation('up');
      }
    }
  };

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX, translationY, velocityX } = event.nativeEvent;

      // Determine swipe direction
      if (Math.abs(translationX) > Math.abs(translationY)) {
        // Horizontal swipe
        if (translationX > 120 || velocityX > 500) {
          handleSwipe('like');
        } else if (translationX < -120 || velocityX < -500) {
          handleSwipe('dislike');
        } else {
          resetCardPosition();
        }
      } else {
        // Vertical swipe
        if (translationY < -120) {
          handleSwipe('save');
        } else {
          resetCardPosition();
        }
      }
    }
  };

  const renderCard = (item: FoodItem, index: number) => {
    const isCurrentCard = index === currentCardIndex;
    const isNextCard = index === currentCardIndex + 1;

    if (index < currentCardIndex) return null;

    const cardStyle = {
      transform: [
        {
          translateX: isCurrentCard ? translateX : 0,
        },
        {
          translateY: isCurrentCard ? translateY : 0,
        },
        {
          rotate: isCurrentCard
            ? rotate.interpolate({
                inputRange: [-200, 0, 200],
                outputRange: ['-30deg', '0deg', '30deg'],
              })
            : '0deg',
        },
        {
          scale: isCurrentCard ? scale : isNextCard ? 0.95 : 0.9,
        },
      ],
      zIndex: cards.length - index,
      opacity: isNextCard ? 0.8 : 1,
    };

    return (
      <Animated.View
        key={item.id}
        style={[styles.card, cardStyle]}
      >
        <FastImage source={{ uri: item.images[0] }} style={styles.cardImage} />
        
        {/* Gradient Overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.cardGradient}
        />

        {/* Card Content */}
        <View style={styles.cardContent}>
          <View style={styles.cardTags}>
            {item.tags.slice(0, 3).map((tag, tagIndex) => (
              <View key={tagIndex} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardSubtitle}>From {item.restaurant.name}</Text>
          
          <View style={styles.cardInfo}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={16} color="#f9ae1e" />
              <Text style={styles.rating}>{item.rating}</Text>
            </View>
          </View>
        </View>

        {/* Swipe Indicators */}
        <Animated.View
          style={[
            styles.swipeIndicator,
            styles.likeIndicator,
            {
              opacity: translateX.interpolate({
                inputRange: [0, 150],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
            },
          ]}
        >
          <Text style={styles.indicatorText}>LIKE</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.swipeIndicator,
            styles.dislikeIndicator,
            {
              opacity: translateX.interpolate({
                inputRange: [-150, 0],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
            },
          ]}
        >
          <Text style={styles.indicatorText}>PASS</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.swipeIndicator,
            styles.saveIndicator,
            {
              opacity: translateY.interpolate({
                inputRange: [-150, 0],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
            },
          ]}
        >
          <Text style={styles.indicatorText}>SAVE</Text>
        </Animated.View>
      </Animated.View>
    );
  };

  const currentCard = cards[currentCardIndex];

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading delicious options...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!currentCard) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No more cards!</Text>
          <Text style={styles.emptySubtitle}>Check back later for more food discoveries</Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={() => dispatch(fetchDiscoveryCards({}))}
          >
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="options-outline" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Discovery</Text>
        <TouchableOpacity>
          <Icon name="filter-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Cards Stack */}
      <View style={styles.cardsContainer}>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View style={styles.cardStack}>
            {cards.slice(currentCardIndex, currentCardIndex + 3).map((card, index) =>
              renderCard(card, currentCardIndex + index)
            )}
          </Animated.View>
        </PanGestureHandler>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.dislikeButton]}
          onPress={() => handleSwipe('dislike')}
        >
          <Icon name="close" size={28} color="#ff4458" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.saveButton]}
          onPress={() => handleSwipe('save')}
        >
          <Icon name="star" size={24} color="#f9ae1e" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton]}
          onPress={() => handleSwipe('like')}
        >
          <Icon name="heart" size={24} color="#4ade80" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  refreshButton: {
    backgroundColor: '#f06a25',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardStack: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    backgroundColor: 'white',
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  cardTags: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 12,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  price: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  swipeIndicator: {
    position: 'absolute',
    top: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 3,
  },
  likeIndicator: {
    right: 20,
    borderColor: '#4ade80',
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
  },
  dislikeIndicator: {
    left: 20,
    borderColor: '#ff4458',
    backgroundColor: 'rgba(255, 68, 88, 0.1)',
  },
  saveIndicator: {
    top: 20,
    left: '50%',
    marginLeft: -40,
    borderColor: '#f9ae1e',
    backgroundColor: 'rgba(249, 174, 30, 0.1)',
  },
  indicatorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: 'white',
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dislikeButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#ff4458',
  },
  saveButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#f9ae1e',
  },
  likeButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#4ade80',
  },
});

export default DiscoveryScreen;