import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const PostScreen = ({ navigation }: any) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handleImagePicker = () => {
    Alert.alert(
      'Select Image',
      'Choose how you want to select an image',
      [
        { text: 'Camera', onPress: () => openCamera() },
        { text: 'Gallery', onPress: () => openGallery() },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const openCamera = () => {
    // Implement camera functionality
    Alert.alert('Camera', 'Camera functionality will be implemented');
  };

  const openGallery = () => {
    // Implement gallery functionality
    // For demo, set a placeholder image
    setSelectedImage('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800');
  };

  const handlePost = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image');
      return;
    }

    if (!caption.trim()) {
      Alert.alert('Error', 'Please add a caption');
      return;
    }

    setIsPosting(true);

    // Simulate posting
    setTimeout(() => {
      setIsPosting(false);
      Alert.alert('Success', 'Your post has been shared!', [
        { text: 'OK', onPress: () => navigation.navigate('Feed') }
      ]);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity onPress={handlePost} disabled={isPosting}>
          <Text style={[styles.postButton, isPosting && styles.postButtonDisabled]}>
            {isPosting ? 'Posting...' : 'Share'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image Selection */}
        <TouchableOpacity style={styles.imageContainer} onPress={handleImagePicker}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Icon name="camera" size={48} color="#ccc" />
              <Text style={styles.imagePlaceholderText}>Tap to add photo</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Caption Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Caption</Text>
          <TextInput
            style={styles.captionInput}
            placeholder="Write a caption..."
            value={caption}
            onChangeText={setCaption}
            multiline
            maxLength={500}
          />
          <Text style={styles.characterCount}>{caption.length}/500</Text>
        </View>

        {/* Location Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Location</Text>
          <View style={styles.locationInputContainer}>
            <Icon name="location-outline" size={20} color="#666" style={styles.locationIcon} />
            <TextInput
              style={styles.locationInput}
              placeholder="Add location..."
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>

        {/* Additional Options */}
        <View style={styles.optionsSection}>
          <TouchableOpacity style={styles.optionItem}>
            <Icon name="people-outline" size={20} color="#666" />
            <Text style={styles.optionText}>Tag People</Text>
            <Icon name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Icon name="restaurant-outline" size={20} color="#666" />
            <Text style={styles.optionText}>Tag Restaurant</Text>
            <Icon name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Icon name="pricetag-outline" size={20} color="#666" />
            <Text style={styles.optionText}>Add Tags</Text>
            <Icon name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Privacy Settings */}
        <View style={styles.privacySection}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <TouchableOpacity style={styles.privacyOption}>
            <View style={styles.privacyOptionLeft}>
              <Icon name="globe-outline" size={20} color="#666" />
              <Text style={styles.privacyOptionText}>Public</Text>
            </View>
            <Icon name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Post Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={handlePost}
          disabled={isPosting || !selectedImage || !caption.trim()}
        >
          <LinearGradient
            colors={['#f06a25', '#f9ae1e']}
            style={[
              styles.gradientButton,
              (!selectedImage || !caption.trim()) && styles.disabledButton
            ]}
          >
            <Text style={styles.shareButtonText}>
              {isPosting ? 'Sharing...' : 'Share Post'}
            </Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  postButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f06a25',
  },
  postButtonDisabled: {
    color: '#ccc',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
  },
  selectedImage: {
    width: '100%',
    height: 300,
  },
  imagePlaceholder: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  imagePlaceholderText: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 8,
  },
  inputSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  captionInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 4,
  },
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  locationIcon: {
    marginRight: 12,
  },
  locationInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  optionsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  privacySection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  privacyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  privacyOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  privacyOptionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  shareButton: {
    marginBottom: 16,
  },
  gradientButton: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PostScreen;