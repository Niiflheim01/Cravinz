import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Restaurant } from '../../types';

interface RestaurantState {
  restaurants: Restaurant[];
  nearbyRestaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: RestaurantState = {
  restaurants: [],
  nearbyRestaurants: [],
  selectedRestaurant: null,
  isLoading: false,
  error: null,
};

export const fetchNearbyRestaurants = createAsyncThunk(
  'restaurant/fetchNearby',
  async ({ latitude, longitude, radius }: { latitude: number; longitude: number; radius: number }) => {
    // Mock nearby restaurants data
    const mockRestaurants: Restaurant[] = [
      {
        id: '1',
        name: 'Tian Tian Hainanese Chicken Rice',
        description: 'Famous chicken rice stall at Maxwell Food Centre',
        images: ['https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=400'],
        location: {
          latitude: 1.2966,
          longitude: 103.8547,
          address: 'Maxwell Food Centre, 1 Kadayanallur St, Singapore 069184',
        },
        cuisine: ['Chinese', 'Local'],
        priceRange: 1,
        rating: 4.5,
        reviewCount: 1250,
        hours: [
          { day: 'Monday', open: '10:00', close: '20:00', isOpen: true },
          { day: 'Tuesday', open: '10:00', close: '20:00', isOpen: true },
          { day: 'Wednesday', open: '10:00', close: '20:00', isOpen: true },
          { day: 'Thursday', open: '10:00', close: '20:00', isOpen: true },
          { day: 'Friday', open: '10:00', close: '20:00', isOpen: true },
          { day: 'Saturday', open: '10:00', close: '20:00', isOpen: true },
          { day: 'Sunday', open: '10:00', close: '20:00', isOpen: true },
        ],
        contact: {
          phone: '+65 6221 4038',
        },
        features: ['Halal', 'Cash Only', 'Takeaway'],
        isFollowed: false,
      },
      {
        id: '2',
        name: '328 Katong Laksa',
        description: 'Authentic Katong laksa with rich coconut curry broth',
        images: ['https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400'],
        location: {
          latitude: 1.3048,
          longitude: 103.9065,
          address: '51 East Coast Rd, Singapore 428770',
        },
        cuisine: ['Peranakan', 'Local'],
        priceRange: 1,
        rating: 4.3,
        reviewCount: 890,
        hours: [
          { day: 'Monday', open: '09:00', close: '21:00', isOpen: true },
          { day: 'Tuesday', open: '09:00', close: '21:00', isOpen: true },
          { day: 'Wednesday', open: '09:00', close: '21:00', isOpen: true },
          { day: 'Thursday', open: '09:00', close: '21:00', isOpen: true },
          { day: 'Friday', open: '09:00', close: '21:00', isOpen: true },
          { day: 'Saturday', open: '09:00', close: '21:00', isOpen: true },
          { day: 'Sunday', open: '09:00', close: '21:00', isOpen: true },
        ],
        contact: {
          phone: '+65 6345 3628',
        },
        features: ['Spicy', 'Local Favorite', 'Cash Only'],
        isFollowed: false,
      },
    ];

    return mockRestaurants;
  }
);

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setSelectedRestaurant: (state, action) => {
      state.selectedRestaurant = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearbyRestaurants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNearbyRestaurants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nearbyRestaurants = action.payload;
      })
      .addCase(fetchNearbyRestaurants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch nearby restaurants';
      });
  },
});

export const { setSelectedRestaurant, clearError } = restaurantSlice.actions;
export default restaurantSlice.reducer;