import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

import { RootState } from '../store';
import { signOut } from '../store/slices/authSlice';

const { width } = Dimensions.get('window');
const imageSize = (width - 48) / 3; // 3 columns with padding

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  // Mock user posts
  const userPosts = [
    'https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="menu-outline" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{user?.username || 'Profile'}</Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Icon name="log-out-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <FastImage
              source={{
                uri: user?.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
              }}
              style={styles.profileAvatar}
            />
            <View style={styles.profileStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{user?.stats?.postsCount || 12}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{user?.stats?.followersCount || 1.2}k</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{user?.stats?.followingCount || 345}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.displayName || 'Food Lover'}</Text>
            <Text style={styles.profileBio}>
              🍜 Food enthusiast | 📍 Singapore{'\n'}
              Discovering the best eats in the city ✨{'\n'}
              #foodie #singapore #cravinz
            </Text>
          </View>

          <View style={styles.profileActions}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Icon name="share-outline" size={16} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Highlights */}
        <View style={styles.highlightsSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.highlightItem}>
              <View style={styles.highlightCircle}>
                <Icon name="add" size={24} color="#ccc" />
              </View>
              <Text style={styles.highlightText}>New</Text>
            </View>
            <View style={styles.highlightItem}>
              <FastImage
                source={{ uri: 'https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=100' }}
                style={styles.highlightCircle}
              />
              <Text style={styles.highlightText}>Local</Text>
            </View>
            <View style={styles.highlightItem}>
              <FastImage
                source={{ uri: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=100' }}
                style={styles.highlightCircle}
              />
              <Text style={styles.highlightText}>Desserts</Text>
            </View>
            <View style={styles.highlightItem}>
              <FastImage
                source={{ uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=100' }}
                style={styles.highlightCircle}
              />
              <Text style={styles.highlightText}>Ramen</Text>
            </View>
          </ScrollView>
        </View>

        {/* Content Tabs */}
        <View style={styles.tabsSection}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Icon name="grid-outline" size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Icon name="bookmark-outline" size={20} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Icon name="heart-outline" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Posts Grid */}
        <View style={styles.postsGrid}>
          {userPosts.map((imageUrl, index) => (
            <TouchableOpacity key={index} style={styles.postItem}>
              <FastImage source={{ uri: imageUrl }} style={styles.postImage} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
  },
  profileSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileStats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  profileInfo: {
    marginBottom: 16,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  profileBio: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  profileActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  shareButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
  },
  highlightsSection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  highlightItem: {
    alignItems: 'center',
    marginLeft: 16,
  },
  highlightCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  highlightText: {
    fontSize: 12,
    color: '#333',
  },
  tabsSection: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#333',
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  postItem: {
    marginRight: 8,
    marginBottom: 8,
  },
  postImage: {
    width: imageSize,
    height: imageSize,
    borderRadius: 4,
  },
});

export default ProfileScreen;