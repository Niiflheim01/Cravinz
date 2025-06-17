export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  preferences: UserPreferences;
  stats: UserStats;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  allergies: string[];
  dietaryRestrictions: string[];
  favoriteCuisines: string[];
  cravingTypes: string[];
  searchRadius: number; // in kilometers
  priceRange: [number, number];
}

export interface UserStats {
  totalSwipes: number;
  totalLikes: number;
  totalSaves: number;
  followersCount: number;
  followingCount: number;
  postsCount: number;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  images: string[];
  restaurant: Restaurant;
  price: number;
  currency: string;
  tags: string[];
  cuisine: string;
  dietaryInfo: string[];
  allergens: string[];
  rating: number;
  reviewCount: number;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: Date;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  images: string[];
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  cuisine: string[];
  priceRange: number; // 1-4 scale
  rating: number;
  reviewCount: number;
  hours: OpeningHours[];
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  features: string[];
  isFollowed: boolean;
}

export interface OpeningHours {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
}

export interface Post {
  id: string;
  user: User;
  foodItem: FoodItem;
  caption: string;
  images: string[];
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  likes: number;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: Date;
}

export interface Comment {
  id: string;
  user: User;
  post: Post;
  content: string;
  likes: number;
  isLiked: boolean;
  createdAt: Date;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  items: FoodItem[];
  isPublic: boolean;
  tags: string[];
  createdBy: User;
  createdAt: Date;
}

export interface SwipeAction {
  type: 'like' | 'dislike' | 'save';
  foodItemId: string;
  timestamp: Date;
}

export interface Filter {
  cuisine: string[];
  dietary: string[];
  priceRange: [number, number];
  distance: number;
  rating: number;
  allergens: string[];
}

export interface Story {
  id: string;
  user: User;
  content: {
    type: 'image' | 'video';
    url: string;
    duration?: number;
  }[];
  isViewed: boolean;
  expiresAt: Date;
  createdAt: Date;
}