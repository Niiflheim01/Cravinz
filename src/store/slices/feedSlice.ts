import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post, Story } from '../../types';

interface FeedState {
  posts: Post[];
  stories: Story[];
  isLoading: boolean;
  isRefreshing: boolean;
  hasMore: boolean;
  error: string | null;
  lastPostId: string | null;
}

const initialState: FeedState = {
  posts: [],
  stories: [],
  isLoading: false,
  isRefreshing: false,
  hasMore: true,
  error: null,
  lastPostId: null,
};

export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async ({ refresh = false }: { refresh?: boolean } = {}) => {
    // Mock data for now
    const mockPosts: Post[] = [
      {
        id: '1',
        user: {
          id: '2',
          email: 'foodie@example.com',
          username: 'foodie_sg',
          displayName: 'Singapore Foodie',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
          preferences: {} as any,
          stats: {} as any,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        foodItem: {
          id: '1',
          name: 'Hainanese Chicken Rice',
          description: 'Tender poached chicken served with fragrant rice',
          images: ['https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=800'],
          restaurant: {
            id: '1',
            name: 'Tian Tian Hainanese Chicken Rice',
            description: 'Famous chicken rice stall',
            images: [],
            location: {
              latitude: 1.2966,
              longitude: 103.8547,
              address: 'Maxwell Food Centre, Singapore',
            },
            cuisine: ['Chinese', 'Local'],
            priceRange: 1,
            rating: 4.5,
            reviewCount: 1250,
            hours: [],
            contact: {},
            features: [],
            isFollowed: false,
          },
          price: 4.5,
          currency: 'SGD',
          tags: ['chicken', 'rice', 'local'],
          cuisine: 'Chinese',
          dietaryInfo: [],
          allergens: [],
          rating: 4.5,
          reviewCount: 1250,
          isLiked: false,
          isSaved: false,
          createdAt: new Date(),
        },
        caption: 'Best chicken rice in Singapore! 🍗🍚 #chickensrice #singapore #foodie',
        images: ['https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=800'],
        likes: 245,
        comments: 18,
        isLiked: false,
        isSaved: false,
        createdAt: new Date(),
      },
      {
        id: '2',
        user: {
          id: '3',
          email: 'laksa_lover@example.com',
          username: 'laksa_lover',
          displayName: 'Laksa Lover',
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
          preferences: {} as any,
          stats: {} as any,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        foodItem: {
          id: '2',
          name: 'Laksa',
          description: 'Spicy coconut curry noodle soup',
          images: ['https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'],
          restaurant: {
            id: '2',
            name: '328 Katong Laksa',
            description: 'Famous laksa shop',
            images: [],
            location: {
              latitude: 1.3048,
              longitude: 103.9065,
              address: 'Katong, Singapore',
            },
            cuisine: ['Peranakan', 'Local'],
            priceRange: 1,
            rating: 4.3,
            reviewCount: 890,
            hours: [],
            contact: {},
            features: [],
            isFollowed: false,
          },
          price: 6.0,
          currency: 'SGD',
          tags: ['laksa', 'spicy', 'noodles'],
          cuisine: 'Peranakan',
          dietaryInfo: [],
          allergens: ['shellfish'],
          rating: 4.3,
          reviewCount: 890,
          isLiked: true,
          isSaved: false,
          createdAt: new Date(),
        },
        caption: 'Craving satisfied! This laksa hits different 🔥🍜 #laksa #spicy #singapore',
        images: ['https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'],
        likes: 189,
        comments: 12,
        isLiked: true,
        isSaved: false,
        createdAt: new Date(),
      },
    ];

    return { posts: mockPosts, hasMore: true };
  }
);

export const fetchStories = createAsyncThunk('feed/fetchStories', async () => {
  // Mock stories data
  const mockStories: Story[] = [
    {
      id: '1',
      user: {
        id: '2',
        email: 'foodie@example.com',
        username: 'foodie_sg',
        displayName: 'Singapore Foodie',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        preferences: {} as any,
        stats: {} as any,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      content: [
        {
          type: 'image',
          url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
      ],
      isViewed: false,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      createdAt: new Date(),
    },
  ];

  return mockStories;
});

export const likePost = createAsyncThunk(
  'feed/likePost',
  async ({ postId, isLiked }: { postId: string; isLiked: boolean }) => {
    // API call to like/unlike post
    return { postId, isLiked: !isLiked };
  }
);

export const savePost = createAsyncThunk(
  'feed/savePost',
  async ({ postId, isSaved }: { postId: string; isSaved: boolean }) => {
    // API call to save/unsave post
    return { postId, isSaved: !isSaved };
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setRefreshing: (state, action: PayloadAction<boolean>) => {
      state.isRefreshing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.posts = action.payload.posts;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = action.error.message || 'Failed to fetch feed';
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.stories = action.payload;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const post = state.posts.find(p => p.id === action.payload.postId);
        if (post) {
          post.isLiked = action.payload.isLiked;
          post.likes += action.payload.isLiked ? 1 : -1;
        }
      })
      .addCase(savePost.fulfilled, (state, action) => {
        const post = state.posts.find(p => p.id === action.payload.postId);
        if (post) {
          post.isSaved = action.payload.isSaved;
        }
      });
  },
});

export const { clearError, setRefreshing } = feedSlice.actions;
export default feedSlice.reducer;