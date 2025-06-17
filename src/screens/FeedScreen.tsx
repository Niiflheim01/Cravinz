import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

import { AppDispatch, RootState } from '../store';
import { fetchFeed, fetchStories, likePost, savePost, setRefreshing } from '../store/slices/feedSlice';
import { Post, Story } from '../types';

const { width } = Dimensions.get('window');

const FeedScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, stories, isLoading, isRefreshing, error } = useSelector(
    (state: RootState) => state.feed
  );

  useEffect(() => {
    dispatch(fetchFeed());
    dispatch(fetchStories());
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    dispatch(setRefreshing(true));
    dispatch(fetchFeed({ refresh: true }));
    dispatch(fetchStories());
  }, [dispatch]);

  const handleLike = (postId: string, isLiked: boolean) => {
    dispatch(likePost({ postId, isLiked }));
  };

  const handleSave = (postId: string, isSaved: boolean) => {
    dispatch(savePost({ postId, isSaved }));
  };

  const renderStoryItem = ({ item }: { item: Story }) => (
    <TouchableOpacity style={styles.storyItem}>
      <View style={[styles.storyBorder, item.isViewed && styles.storyViewed]}>
        <FastImage source={{ uri: item.user.avatar }} style={styles.storyAvatar} />
      </View>
      <Text style={styles.storyUsername} numberOfLines={1}>
        {item.user.username}
      </Text>
    </TouchableOpacity>
  );

  const renderPostItem = ({ item }: { item: Post }) => (
    <View style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <View style={styles.postUserInfo}>
          <FastImage source={{ uri: item.user.avatar }} style={styles.postAvatar} />
          <View>
            <Text style={styles.postUsername}>{item.user.username}</Text>
            <Text style={styles.postLocation}>{item.foodItem.restaurant.name}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Icon name="ellipsis-horizontal" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <FastImage source={{ uri: item.images[0] }} style={styles.postImage} />

      {/* Post Actions */}
      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <TouchableOpacity
            onPress={() => handleLike(item.id, item.isLiked)}
            style={styles.actionButton}
          >
            <Icon
              name={item.isLiked ? 'heart' : 'heart-outline'}
              size={24}
              color={item.isLiked ? '#ff3040' : '#333'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="chatbubble-outline" size={22} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="paper-plane-outline" size={22} color="#333" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleSave(item.id, item.isSaved)}>
          <Icon
            name={item.isSaved ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color={item.isSaved ? '#333' : '#333'}
          />
        </TouchableOpacity>
      </View>

      {/* Post Info */}
      <View style={styles.postInfo}>
        <Text style={styles.postLikes}>{item.likes} likes</Text>
        <View style={styles.postCaption}>
          <Text style={styles.postUsername}>{item.user.username}</Text>
          <Text style={styles.postCaptionText}> {item.caption}</Text>
        </View>
        {item.comments > 0 && (
          <TouchableOpacity>
            <Text style={styles.postComments}>View all {item.comments} comments</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.postTime}>2 hours ago</Text>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.storiesContainer}>
      <FlatList
        data={stories}
        renderItem={renderStoryItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storiesList}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🍽️ Cravinz</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="heart-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="chatbubble-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Feed */}
      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={styles.feed}
      />
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f06a25',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 16,
  },
  feed: {
    flex: 1,
  },
  storiesContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  storiesList: {
    paddingHorizontal: 16,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 70,
  },
  storyBorder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#f06a25',
    padding: 2,
    marginBottom: 4,
  },
  storyViewed: {
    borderColor: '#ccc',
  },
  storyAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 26,
  },
  storyUsername: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  postContainer: {
    marginBottom: 24,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  postUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  postUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  postLocation: {
    fontSize: 12,
    color: '#666',
  },
  postImage: {
    width: width,
    height: width,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  postActionsLeft: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 16,
  },
  postInfo: {
    paddingHorizontal: 16,
  },
  postLikes: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  postCaption: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  postCaptionText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  postComments: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  postTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default FeedScreen;