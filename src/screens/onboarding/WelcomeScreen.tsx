import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>🍽️ Cravinz</Text>
          <Text style={styles.title}>Welcome to Cravinz!</Text>
          <Text style={styles.subtitle}>
            Let's personalize your experience! Answer a few quick questions about
            your dietary preferences, allergies, and favorite cuisines.
          </Text>
        </View>

        <View style={styles.illustration}>
          <Text style={styles.emoji}>🥘🍜🍕🍣🥗</Text>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('Allergies')}
        >
          <LinearGradient
            colors={['#f06a25', '#f9ae1e']}
            style={styles.gradientButton}
          >
            <Text style={styles.continueButtonText}>Let's Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Location')}
          style={styles.skipButton}
        >
          <Text style={styles.skipButtonText}>Skip for now</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f06a25',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  illustration: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emoji: {
    fontSize: 48,
    textAlign: 'center',
  },
  continueButton: {
    marginBottom: 16,
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
  skipButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 20,
  },
  skipButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default WelcomeScreen;