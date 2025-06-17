'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'; // No longer needed for dummy data
import FoodCard from '@/components/food/FoodCard';
// import { Database } from '@/types/database'; // No longer needed for dummy data
import { FaRegHeart, FaHeart, FaTimes, FaBookmark } from 'react-icons/fa';
import { getDummyFoodItems, FoodItem } from '@/server/data/foodItems';

export default function DiscoverPage() {
  // const supabase = createClientComponentClient<Database>(); // No longer needed for dummy data
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFoodItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = getDummyFoodItems();
      setFoodItems(data);
    } catch (err) {
      console.error('Error fetching food items:', err);
      setError('Failed to load food items.');
    }
    setIsLoading(false);
  }, []); // Removed supabase from dependencies as it's not used

  useEffect(() => {
    fetchFoodItems();
  }, [fetchFoodItems]);

  const handleSwipeAction = async (action: 'like' | 'dislike' | 'save') => {
    if (currentIndex >= foodItems.length) return;

    // const currentItem = foodItems[currentIndex]; // Supabase related logic commented out
    // const { data: { user } } = await supabase.auth.getUser(); // Supabase related logic commented out

    // if (!user) {
    //   console.log('User not logged in. Cannot record swipe.');
    //   setCurrentIndex((prev) => prev + 1); 
    //   return;
    // }

    // try {
    //   const liked = action === 'like';
    //   const saved = action === 'save';

    //   const { error } = await supabase.from('user_likes').insert({
    //     user_id: user.id,
    //     food_item_id: currentItem.id,
    //     liked: liked,
    //     saved: saved,
    //     swiped_at: new Date().toISOString(),
    //   });

    //   if (error) {
    //     console.error('Error recording swipe action:', error);
    //   }
    // } catch (err) {
    //   console.error('Error processing swipe action:', err);
    // } finally {
      setCurrentIndex((prev) => prev + 1);
    // }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipeAction('dislike'),
    onSwipedRight: () => handleSwipeAction('like'),
    onSwipedUp: () => handleSwipeAction('save'),
    trackMouse: true,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-128px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cravinz-orange-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const currentFoodItem = foodItems[currentIndex];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16 pb-16 flex flex-col items-center justify-center">
      {currentFoodItem ? (
        <div {...handlers} className="relative w-full max-w-md px-4">
          <FoodCard
            id={currentFoodItem.id}
            title={currentFoodItem.name}
            description={currentFoodItem.description}
            imageUrl={currentFoodItem.imageUrl}
            category={currentFoodItem.tags[0]} // Using first tag as category
          />
          <div className="absolute -bottom-16 left-0 right-0 flex justify-center space-x-6">
            <button
              onClick={() => handleSwipeAction('dislike')}
              className="p-4 rounded-full bg-white shadow-soft text-red-500 hover:scale-110 transition-transform"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleSwipeAction('save')}
              className="p-4 rounded-full bg-white shadow-soft text-cravinz-yellow hover:scale-110 transition-transform"
            >
              <FaBookmark className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleSwipeAction('like')}
              className="p-4 rounded-full bg-white shadow-soft text-cravinz-orange-primary hover:scale-110 transition-transform"
            >
              <FaHeart className="w-6 h-6" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-soft max-w-md mx-auto p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No more food items!</h2>
          <p className="text-gray-500">
            You've gone through all the available food items. Check back later for more delicious options!
          </p>
        </div>
      )}
    </div>
  );
} 