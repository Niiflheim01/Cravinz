import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UserState {
  profile: User | null;
  following: string[];
  followers: string[];
  savedItems: string[];
  likedItems: string[];
}

const initialState: UserState = {
  profile: null,
  following: [],
  followers: [],
  savedItems: [],
  likedItems: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    followUser: (state, action: PayloadAction<string>) => {
      if (!state.following.includes(action.payload)) {
        state.following.push(action.payload);
      }
    },
    unfollowUser: (state, action: PayloadAction<string>) => {
      state.following = state.following.filter(id => id !== action.payload);
    },
    saveItem: (state, action: PayloadAction<string>) => {
      if (!state.savedItems.includes(action.payload)) {
        state.savedItems.push(action.payload);
      }
    },
    unsaveItem: (state, action: PayloadAction<string>) => {
      state.savedItems = state.savedItems.filter(id => id !== action.payload);
    },
    likeItem: (state, action: PayloadAction<string>) => {
      if (!state.likedItems.includes(action.payload)) {
        state.likedItems.push(action.payload);
      }
    },
    unlikeItem: (state, action: PayloadAction<string>) => {
      state.likedItems = state.likedItems.filter(id => id !== action.payload);
    },
  },
});

export const {
  setProfile,
  updateProfile,
  followUser,
  unfollowUser,
  saveItem,
  unsaveItem,
  likeItem,
  unlikeItem,
} = userSlice.actions;

export default userSlice.reducer;