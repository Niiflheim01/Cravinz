import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import { updateUserPreferences } from '../../store/slices/authSlice';

const CUISINES = [
  'Chinese',
  'Japanese',
  'Korean',
  'Thai',
  'Vietnamese',
  'Indian',
  'Italian',
  'French',
  'Mexican',
  'American',
  'Local',
  'Western',
];

const CuisineScreen = ({ navigation }: any) => {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const dispatch = useDispatch();

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines(prev => {
      if (prev.includes(cuisine)) {
        return prev.filter(item => item !== cuisine);
      } else {
        return [...prev, cuisine];
      }
    });
  };

  const handleContinue = () => {
    dispatch(updateUserPreferences({ favoriteCuisines: selectedCuisines }));
    navigation.navigate('Location');
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
          <View style={styles.progressDot} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>What are your favorite cuisines?</Text>
        <Text style={styles.subtitle}>Select all that apply</Text>

        <View style={styles.optionsContainer}>
          {CUISINES.map((cuisine) => (
            <TouchableOpacity
              key={cuisine}
              style={[
                styles.optionButton,
                selectedCuisines.includes(cuisine) && styles.optionButtonSelected,
              ]}
              onPress={() => toggleCuisine(cuisine)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedCuisines.includes(cuisine) && styles.optionTextSelected,
                ]}
              >
                {cuisine}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleBack} style={styles.backFooterButton}>
          <Text style={styles.backFooterButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <LinearGradient
            colors={['#4ade80', '#22c55e']}
            style={styles.gradientButton}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: '48%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
    marginBottom: 12,
    alignItems: 'center',
  },
  optionButtonSelected: {
    borderColor: '#f06a25',
    backgroundColor: '#fff7f0',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  optionTextSelected: {
    color: '#f06a25',
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
  continueButton: {
    flex: 1,
    marginLeft: 12,
  },
  gradientButton: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CuisineScreen;