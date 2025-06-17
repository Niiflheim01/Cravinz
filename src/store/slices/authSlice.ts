import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  onboardingCompleted: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  onboardingCompleted: false,
};

// Async thunks for Firebase auth
export const signInWithEmail = createAsyncThunk(
  'auth/signInWithEmail',
  async ({ email, password }: { email: string; password: string }) => {
    // Firebase auth logic here
    // For now, return mock user
    return {
      id: '1',
      email,
      username: email.split('@')[0],
      displayName: email.split('@')[0],
      preferences: {
        allergies: [],
        dietaryRestrictions: [],
        favoriteCuisines: [],
        cravingTypes: [],
        searchRadius: 5,
        priceRange: [1, 4] as [number, number],
      },
      stats: {
        totalSwipes: 0,
        totalLikes: 0,
        totalSaves: 0,
        followersCount: 0,
        followingCount: 0,
        postsCount: 0,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User;
  }
);

export const signUpWithEmail = createAsyncThunk(
  'auth/signUpWithEmail',
  async ({ email, password, username }: { email: string; password: string; username: string }) => {
    // Firebase auth logic here
    return {
      id: '1',
      email,
      username,
      displayName: username,
      preferences: {
        allergies: [],
        dietaryRestrictions: [],
        favoriteCuisines: [],
        cravingTypes: [],
        searchRadius: 5,
        priceRange: [1, 4] as [number, number],
      },
      stats: {
        totalSwipes: 0,
        totalLikes: 0,
        totalSaves: 0,
        followersCount: 0,
        followingCount: 0,
        postsCount: 0,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User;
  }
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
  // Firebase sign out logic here
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    completeOnboarding: (state) => {
      state.onboardingCompleted = true;
    },
    updateUserPreferences: (state, action: PayloadAction<Partial<User['preferences']>>) => {
      if (state.user) {
        state.user.preferences = { ...state.user.preferences, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInWithEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signInWithEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Sign in failed';
      })
      .addCase(signUpWithEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpWithEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signUpWithEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Sign up failed';
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.onboardingCompleted = false;
      });
  },
});

export const { clearError, completeOnboarding, updateUserPreferences } = authSlice.actions;
export default authSlice.reducer;