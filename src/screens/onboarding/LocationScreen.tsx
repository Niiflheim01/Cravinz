import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';

import { completeOnboarding } from '../../store/slices/authSlice';

const LocationScreen = ({ navigation }: any) => {
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Cravinz needs access to your location to find nearby restaurants.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        setLocationPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } catch (err) {
        console.warn(err);
        setLocationPermission(false);
      }
    } else {
      // iOS permission handling would go here
      setLocationPermission(true);
    }
  };

  const getCurrentLocation = () => {
    if (locationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          Alert.alert('Success', 'Location detected successfully!');
        },
        (error) => {
          console.log(error);
          Alert.alert('Error', 'Unable to get your location. Please try again.');
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      Alert.alert(
        'Permission Required',
        'Please enable location permission to find nearby restaurants.'
      );
    }
  };

  const handleComplete = () => {
    dispatch(completeOnboarding());
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.progress}>
          <View style={[styles.progressDot, styles.progressActive]} />
          <View style={[styles.progressDot, styles.progressActive]} />
          <View style={[styles.progressDot, styles.progressActive]} />
          <View style={[styles.progressDot, styles.progressActive]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Enable Location</Text>
        <Text style={styles.subtitle}>
          Help us find the best restaurants near you! We'll use your location to show
          personalized recommendations.
        </Text>

        <View style={styles.locationContainer}>
          <Icon name="location" size={80} color="#f06a25" />
          {currentLocation && (
            <Text style={styles.locationText}>
              📍 Location detected: {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.locationButton}
          onPress={getCurrentLocation}
        >
          <View style={styles.locationButtonContent}>
            <Icon name="location-outline" size={20} color="#f06a25" />
            <Text style={styles.locationButtonText}>Get Current Location</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.privacyText}>
          Your location data is kept private and secure. We only use it to show you
          nearby restaurants and food options.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleBack} style={styles.backFooterButton}>
          <Text style={styles.backFooterButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
          <LinearGradient
            colors={['#4ade80', '#22c55e']}
            style={styles.gradientButton}
          >
            <Text style={styles.completeButtonText}>Complete Setup</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 4,
  },
  progressActive: {
    backgroundColor: '#f06a25',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  locationContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  locationButton: {
    borderWidth: 2,
    borderColor: '#f06a25',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 24,
    backgroundColor: '#fff7f0',
  },
  locationButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#f06a25',
    marginLeft: 8,
  },
  privacyText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 20,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  backFooterButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  backFooterButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  completeButton: {
    flex: 1,
    marginLeft: 12,
  },
  gradientButton: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LocationScreen;