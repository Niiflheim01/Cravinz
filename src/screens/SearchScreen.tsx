import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

import { FoodItem } from '../types';

const { width } = Dimensions.get('window');
const itemWidth = (width - 48) / 2; // 2 columns with padding

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock search data
  const mockSearchResults: FoodItem[] = [
    {
      id: '1',
      name: 'Banana Chocolate Ginger',
      description: 'Sweet and spicy pancake combination',
      images: ['https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400'],
      restaurant: {
        id: '1',
        name: 'Pancake House',
        description: 'Artisanal pancakes',
        images: [],
        location: { latitude: 0, longitude: 0, address: 'Orchard Road' },
        cuisine: ['Western'],
        priceRange: 2,
        rating: 4.2,
        reviewCount: 456,
        hours: [],
        contact: {},
        features: [],
        isFollowed: false,
      },
      price: 12.90,
      currency: 'SGD',
      tags: ['pancake', 'sweet'],
      cuisine: 'Western',
      dietaryInfo: [],
      allergens: [],
      rating: 4.2,
      reviewCount: 456,
      isLiked: false,
      isSaved: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Pepperoni Heart Pressed',
      description: 'Heart-shaped pepperoni pizza',
      images: ['https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400'],
      restaurant: {
        id: '2',
        name: 'Pizzaiolo',
        description: 'Authentic Italian pizza',
        images: [],
        location: { latitude: 0, longitude: 0, address: 'Marina Bay' },
        cuisine: ['Italian'],
        priceRange: 3,
        rating: 4.5,
        reviewCount: 890,
        hours: [],
        contact: {},
        features: [],
        isFollowed: false,
      },
      price: 24.90,
      currency: 'SGD',
      tags: ['pizza', 'pepperoni'],
      cuisine: 'Italian',
      dietaryInfo: [],
      allergens: ['gluten', 'dairy'],
      rating: 4.5,
      reviewCount: 890,
      isLiked: false,
      isSaved: false,
      createdAt: new Date(),
    },
    {
      id: '3',
      name: 'Mozzarella Pizza',
      description: 'Classic margherita with fresh mozzarella',
      images: ['https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400'],
      restaurant: {
        id: '2',
        name: 'Pizzaiolo',
        description: 'Authentic Italian pizza',
        images: [],
        location: { latitude: 0, longitude: 0, address: 'Marina Bay' },
        cuisine: ['Italian'],
        priceRange: 3,
        rating: 4.5,
        reviewCount: 890,
        hours: [],
        contact: {},
        features: [],
        isFollowed: false,
      },
      price: 22.90,
      currency: 'SGD',
      tags: ['pizza', 'mozzarella'],
      cuisine: 'Italian',
      dietaryInfo: [],
      allergens: ['gluten', 'dairy'],
      rating: 4.5,
      reviewCount: 890,
      isLiked: false,
      isSaved: false,
      createdAt: new Date(),
    },
    {
      id: '4',
      name: 'CARBONARA',
      description: 'Creamy pasta with bacon and parmesan',
      images: ['https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400'],
      restaurant: {
        id: '3',
        name: 'Olive Garden',
        description: 'Italian restaurant',
        images: [],
        location: { latitude: 0, longitude: 0, address: 'Sentosa' },
        cuisine: ['Italian'],
        priceRange: 3,
        rating: 4.3,
        reviewCount: 567,
        hours: [],
        contact: {},
        features: [],
        isFollowed: false,
      },
      price: 18.90,
      currency: 'SGD',
      tags: ['pasta', 'carbonara'],
      cuisine: 'Italian',
      dietaryInfo: [],
      allergens: ['gluten', 'dairy', 'egg'],
      rating: 4.3,
      reviewCount: 567,
      isLiked: false,
      isSaved: false,
      createdAt: new Date(),
    },
    {
      id: '5',
      name: 'Churros',
      description: 'Crispy fried dough with cinnamon sugar',
      images: ['https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'],
      restaurant: {
        id: '4',
        name: 'Pancake House',
        description: 'Dessert specialist',
        images: [],
        location: { latitude: 0, longitude: 0, address: 'Orchard Road' },
        cuisine: ['Spanish', 'Dessert'],
        priceRange: 2,
        rating: 4.1,
        reviewCount: 234,
        hours: [],
        contact: {},
        features: [],
        isFollowed: false,
      },
      price: 8.90,
      currency: 'SGD',
      tags: ['churros', 'dessert'],
      cuisine: 'Spanish',
      dietaryInfo: [],
      allergens: ['gluten'],
      rating: 4.1,
      reviewCount: 234,
      isLiked: false,
      isSaved: false,
      createdAt: new Date(),
    },
    {
      id: '6',
      name: 'Nashville Truffle Burger',
      description: 'Spicy Nashville-style chicken burger with truffle',
      images: ['https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400'],
      restaurant: {
        id: '5',
        name: 'Burgerlism',
        description: 'Gourmet burger joint',
        images: [],
        location: { latitude: 0, longitude: 0, address: 'Clarke Quay' },
        cuisine: ['American'],
        priceRange: 3,
        rating: 4.4,
        reviewCount: 678,
        hours: [],
        contact: {},
        features: [],
        isFollowed: false,
      },
      price: 26.90,
      currency: 'SGD',
      tags: ['burger', 'truffle', 'spicy'],
      cuisine: 'American',
      dietaryInfo: [],
      allergens: ['gluten', 'dairy'],
      rating: 4.4,
      reviewCount: 678,
      isLiked: false,
      isSaved: false,
      createdAt: new Date(),
    },
  ];

  useEffect(() => {
    // Simulate search
    if (searchQuery.length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const filtered = mockSearchResults.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setSearchResults(mockSearchResults);
    }
  }, [searchQuery]);

  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <TouchableOpacity style={styles.foodItem}>
      <FastImage source={{ uri: item.images[0] }} style={styles.foodImage} />
      <View style={styles.foodOverlay}>
        <View style={styles.restaurantInfo}>
          <View style={styles.restaurantAvatar}>
            <Icon name="restaurant" size={12} color="white" />
          </View>
          <Text style={styles.restaurantName} numberOfLines={1}>
            {item.restaurant.name}
          </Text>
        </View>
      </View>
      <View style={styles.foodInfo}>
        <Text style={styles.foodName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.foodPrice}>
          ${item.price.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🍽️ Cravinz</Text>
        <TouchableOpacity>
          <Icon name="options-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for food, restaurants..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results Grid */}
      <FlatList
        data={searchResults}
        renderItem={renderFoodItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f06a25',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 44,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  gridContainer: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  foodItem: {
    width: itemWidth,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  foodImage: {
    width: '100%',
    height: itemWidth * 0.8,
  },
  foodOverlay: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  restaurantName: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    flex: 1,
  },
  foodInfo: {
    padding: 12,
  },
  foodName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    lineHeight: 18,
  },
  foodPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#f06a25',
  },
});

export default SearchScreen;