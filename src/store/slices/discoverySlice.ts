import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FoodItem, Filter } from '../../types';

interface DiscoveryState {
  cards: FoodItem[];
  currentCardIndex: number;
  isLoading: boolean;
  error: string | null;
  filters: Filter;
  likedItems: string[];
  savedItems: string[];
}

const initialState: DiscoveryState = {
  cards: [],
  currentCardIndex: 0,
  isLoading: false,
  error: null,
  filters: {
    cuisine: [],
    dietary: [],
    priceRange: [1, 4],
    distance: 5,
    rating: 0,
    allergens: [],
  },
  likedItems: [],
  savedItems: [],
};

export const fetchDiscoveryCards = createAsyncThunk(
  'discovery/fetchCards',
  async (filters: Partial<Filter>) => {
    // Mock data for discovery cards
    const mockCards: FoodItem[] = [
      {
        id: '1',
        name: 'Strawberry Crepe',
        description: 'Fresh strawberries with whipped cream in a delicate crepe',
        images: ['https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800'],
        restaurant: {
          id: '1',
          name: 'Pancake House',
          description: 'Artisanal pancakes and crepes',
          images: [],
          location: {
            latitude: 1.3521,
            longitude: 103.8198,
            address: 'Orchard Road, Singapore',
          },
          cuisine: ['Western', 'Dessert'],
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
        tags: ['crepe', 'sweet', 'strawberry', 'gluten-free', 'pancake house'],
        cuisine: 'Western',
        dietaryInfo: ['Gluten-Free'],
        allergens: ['dairy'],
        rating: 4.2,
        reviewCount: 456,
        isLiked: false,
        isSaved: false,
        createdAt: new Date(),
      },
      {
        id: '2',
        name: 'Char Kway Teow',
        description: 'Wok-fried rice noodles with prawns, Chinese sausage, and bean sprouts',
        images: ['https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800'],
        restaurant: {
          id: '2',
          name: 'Hill Street Char Kway Teow',
          description: 'Traditional char kway teow stall',
          images: [],
          location: {
            latitude: 1.2966,
            longitude: 103.8547,
            address: 'Bedok Food Centre, Singapore',
          },
          cuisine: ['Chinese', 'Local'],
          priceRange: 1,
          rating: 4.6,
          reviewCount: 1890,
          hours: [],
          contact: {},
          features: [],
          isFollowed: false,
        },
        price: 5.50,
        currency: 'SGD',
        tags: ['char kway teow', 'noodles', 'local'],
        cuisine: 'Chinese',
        dietaryInfo: [],
        allergens: ['shellfish', 'soy'],
        rating: 4.6,
        reviewCount: 1890,
        isLiked: false,
        isSaved: false,
        createdAt: new Date(),
      },
      {
        id: '3',
        name: 'Ramen Bowl',
        description: 'Rich tonkotsu broth with chashu pork and soft-boiled egg',
        images: ['https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'],
        restaurant: {
          id: '3',
          name: 'Ippudo Ramen',
          description: 'Authentic Japanese ramen',
          images: [],
          location: {
            latitude: 1.3048,
            longitude: 103.8318,
            address: 'Marina Bay Sands, Singapore',
          },
          cuisine: ['Japanese'],
          priceRange: 3,
          rating: 4.4,
          reviewCount: 2340,
          hours: [],
          contact: {},
          features: [],
          isFollowed: false,
        },
        price: 18.90,
        currency: 'SGD',
        tags: ['ramen', 'japanese', 'pork'],
        cuisine: 'Japanese',
        dietaryInfo: [],
        allergens: ['gluten', 'egg'],
        rating: 4.4,
        reviewCount: 2340,
        isLiked: false,
        isSaved: false,
        createdAt: new Date(),
      },
    ];

    return mockCards;
  }
);

export const swipeCard = createAsyncThunk(
  'discovery/swipeCard',
  async ({ cardId, action }: { cardId: string; action: 'like' | 'dislike' | 'save' }) => {
    // API call to record swipe action
    return { cardId, action };
  }
);

const discoverySlice = createSlice({
  name: 'discovery',
  initialState,
  reducers: {
    nextCard: (state) => {
      if (state.currentCardIndex < state.cards.length - 1) {
        state.currentCardIndex += 1;
      }
    },
    updateFilters: (state, action: PayloadAction<Partial<Filter>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscoveryCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDiscoveryCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cards = action.payload;
        state.currentCardIndex = 0;
      })
      .addCase(fetchDiscoveryCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch discovery cards';
      })
      .addCase(swipeCard.fulfilled, (state, action) => {
        const { cardId, action: swipeAction } = action.payload;
        if (swipeAction === 'like') {
          state.likedItems.push(cardId);
        } else if (swipeAction === 'save') {
          state.savedItems.push(cardId);
        }
        // Move to next card
        if (state.currentCardIndex < state.cards.length - 1) {
          state.currentCardIndex += 1;
        }
      });
  },
});

export const { nextCard, updateFilters, clearError } = discoverySlice.actions;
export default discoverySlice.reducer;