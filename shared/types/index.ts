// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  preferences: UserPreferences;
  locationSettings: LocationSettings;
}

// Location Types
export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface LocationPermission {
  status: 'granted' | 'denied' | 'prompt';
  timestamp: number;
}

export interface LocationSettings {
  userId: string;
  lastKnownLocation?: Location;
  locationPermission: LocationPermission;
  searchRadius: number; // in kilometers
  useCurrentLocation: boolean;
  savedLocations: Location[];
  createdAt: Date;
  updatedAt: Date;
  unit: 'KM' | 'MI';
}

export interface UserPreferences {
  userId: string;
  dietaryRestrictions: string[];
  favoriteCuisines: string[];
  spiceLevel: 'MILD' | 'MEDIUM' | 'SPICY';
  priceRange: 'BUDGET' | 'MODERATE' | 'HIGH_END';
  location?: Location;
  locationSettings?: LocationSettings;
}

// Restaurant Types
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  location: Location;
  cuisine: string[];
  priceRange: 'budget' | 'moderate' | 'expensive';
  images: string[];
  rating: number;
  distance?: number; // in kilometers, calculated based on user's location
  deliveryAvailable: boolean;
  deliveryRadius?: number; // in kilometers
  createdAt: Date;
  updatedAt: Date;
}

// Review Types
export interface Review {
  id: string;
  userId: string;
  restaurantId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Social Types
export interface Post {
  id: string;
  userId: string;
  restaurantId?: string;
  content: string;
  images?: string[];
  likes: number;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Pack Types
export interface Pack {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  restaurants: string[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
} 