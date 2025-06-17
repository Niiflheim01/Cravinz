# Cravinz - React Native Food Discovery App

A mobile food discovery platform built with React Native, featuring Tinder-style swiping, Instagram-like feeds, and social food sharing.

## Features

### 🔐 Authentication
- Email/password login and registration
- Social login integration (Google, Facebook)
- Secure user session management
- Password reset functionality

### 📱 Core Screens
- **Feed Screen**: Instagram-style scrollable feed with stories
- **Discovery Screen**: Tinder-style swipeable food cards
- **Search Screen**: Pinterest-style grid search with filters
- **Post Screen**: Create and share food posts
- **Profile Screen**: User profile with posts grid

### 🎯 Discovery Features
- Swipe-based food discovery (like/dislike/save)
- Personalized recommendations
- Advanced filtering (cuisine, dietary, price, location)
- Match animations and feedback

### 👥 Social Features
- Follow/unfollow users
- Like, comment, and share posts
- Stories functionality
- Activity feed
- User profiles and stats

### 🍽️ Food Features
- Restaurant profiles and information
- Menu browsing
- Reviews and ratings
- Food categorization and tagging
- Dietary restriction filtering

### 📍 Location Features
- Location-based restaurant discovery
- Map integration
- Nearby recommendations
- Location tagging for posts

### 🎨 UI/UX Features
- Modern, mobile-first design
- Smooth animations and transitions
- Gesture-based interactions
- Dark/light mode support
- Responsive design

## Tech Stack

- **Framework**: React Native 0.72+
- **Language**: TypeScript
- **Navigation**: React Navigation 6
- **State Management**: Redux Toolkit
- **Persistence**: Redux Persist
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Maps**: React Native Maps
- **Images**: React Native Fast Image
- **Animations**: React Native Reanimated
- **Gestures**: React Native Gesture Handler
- **Icons**: React Native Vector Icons

## Project Structure

```
src/
├── components/          # Reusable UI components
├── navigation/          # Navigation configuration
├── screens/            # Screen components
│   ├── auth/           # Authentication screens
│   ├── onboarding/     # Onboarding flow
│   └── main/           # Main app screens
├── store/              # Redux store and slices
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── services/           # API and external services
```

## Getting Started

### Prerequisites

- Node.js 16+
- React Native CLI
- Android Studio (for Android)
- Xcode (for iOS)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cravinz-app.git
cd cravinz-app
```

2. Install dependencies:
```bash
npm install
```

3. Install iOS dependencies (iOS only):
```bash
cd ios && pod install && cd ..
```

4. Set up environment variables:
```bash
# Create .env file with your Firebase configuration
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
# ... other Firebase config
```

### Running the App

#### Android
```bash
npm run android
```

#### iOS
```bash
npm run ios
```

#### Start Metro Bundler
```bash
npm start
```

## Features Implementation Status

### ✅ Completed
- Authentication flow (login, signup, forgot password)
- Onboarding with preferences setup
- Feed screen with Instagram-style layout
- Discovery screen with Tinder-style swiping
- Search screen with Pinterest-style grid
- Profile screen with user stats
- Redux store setup with persistence
- Navigation structure
- TypeScript types and interfaces

### 🚧 In Progress
- Firebase integration
- Image upload functionality
- Real-time data synchronization
- Push notifications

### 📋 Planned
- Group swiping feature
- Advanced filtering
- Restaurant reservations
- Payment integration
- Analytics and insights

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspiration from Instagram, Tinder, and Pinterest
- Food images from Pexels
- Icons from Ionicons
- React Native community for excellent libraries