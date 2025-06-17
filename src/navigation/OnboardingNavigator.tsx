import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import AllergiesScreen from '../screens/onboarding/AllergiesScreen';
import DietaryScreen from '../screens/onboarding/DietaryScreen';
import CuisineScreen from '../screens/onboarding/CuisineScreen';
import LocationScreen from '../screens/onboarding/LocationScreen';

const Stack = createStackNavigator();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Allergies" component={AllergiesScreen} />
      <Stack.Screen name="Dietary" component={DietaryScreen} />
      <Stack.Screen name="Cuisine" component={CuisineScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;