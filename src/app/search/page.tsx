import React from 'react';
import FoodCard from '@/components/food/FoodCard';
import { getDummyFoodItems, FoodItem } from '@/server/data/foodItems';

const SearchPage = () => {
  const foodItems = getDummyFoodItems();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16 pb-16">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white text-center py-8">Discover & Search</h1>
      {/* Placeholder for Search Input */}
      <div className="px-4 py-2 mb-8">
        <input
          type="text"
          placeholder="Search for food, restaurants, or cuisines..."
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-dark shadow-sm
          dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {foodItems.map((item: FoodItem) => (
          <FoodCard
            key={item.id}
            id={item.id}
            title={item.name}
            description={item.description}
            imageUrl={item.imageUrl}
            category={item.tags[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage; 