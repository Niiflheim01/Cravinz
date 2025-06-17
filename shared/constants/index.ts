// API Constants
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Auth Constants
export const AUTH_TOKEN_KEY = 'cravinz_auth_token';
export const AUTH_USER_KEY = 'cravinz_user';

// Price Range Constants
export const PRICE_RANGES = {
  BUDGET: 'budget',
  MODERATE: 'moderate',
  EXPENSIVE: 'expensive',
} as const;

// Cuisine Types
export const CUISINE_TYPES = [
  'American',
  'Italian',
  'Japanese',
  'Chinese',
  'Mexican',
  'Indian',
  'Thai',
  'Vietnamese',
  'Korean',
  'Mediterranean',
  'French',
  'Greek',
  'Spanish',
  'German',
  'Brazilian',
] as const;

// Dietary Restrictions
export const DIETARY_RESTRICTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Nut-Free',
  'Halal',
  'Kosher',
  'Pescatarian',
] as const;

// File Upload Constants
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Pagination Constants
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 50;

// Map Constants
export const DEFAULT_MAP_CENTER = {
  lat: 40.7128,
  lng: -74.0060,
};
export const DEFAULT_MAP_ZOOM = 13;

// Location Constants
export const DEFAULT_SEARCH_RADIUS = 5; // 5 kilometers
export const MAX_SEARCH_RADIUS = 50; // 50 kilometers
export const MIN_SEARCH_RADIUS = 1; // 1 kilometer

export const DEFAULT_DELIVERY_RADIUS = 3; // 3 kilometers
export const MAX_DELIVERY_RADIUS = 10; // 10 kilometers

export const LOCATION_PERMISSION_STATUS = {
  GRANTED: 'granted',
  DENIED: 'denied',
  PROMPT: 'prompt',
} as const;

export const LOCATION_ERROR_MESSAGES = {
  PERMISSION_DENIED: 'Location permission is required to find restaurants near you',
  POSITION_UNAVAILABLE: 'Unable to determine your location',
  TIMEOUT: 'Location request timed out',
  UNKNOWN_ERROR: 'An unknown error occurred while getting your location',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'You must be logged in to perform this action',
  FORBIDDEN: 'You do not have permission to perform this action',
  NOT_FOUND: 'The requested resource was not found',
  VALIDATION_ERROR: 'Please check your input and try again',
  SERVER_ERROR: 'An unexpected error occurred. Please try again later',
  EMAIL_EXISTS: 'An account with this email already exists',
  INVALID_CREDENTIALS: 'Invalid email or password',
} as const; 