import FoodCard from '@/components/food/FoodCard';
import { getDummyFoodItems, FoodItem } from '@/server/data/foodItems';

export default function HomePage() {
  const foodItems = getDummyFoodItems();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16 pb-16 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white text-center py-8">Your Feed</h1>
      <div className="w-full max-w-md px-4 space-y-6">
        {foodItems.map((item: FoodItem) => (
          <FoodCard
            key={item.id}
            id={item.id}
            title={item.name}
            description={item.description}
            imageUrl={item.imageUrl}
            category={item.tags[0]} // Assuming the first tag can serve as category
            username={item.restaurantName} // Using restaurantName as dummy username
            userProfileImageUrl="/placeholders/default-profile.png" // Generic placeholder
            isSwipeable={false}
          />
        ))}
      </div>
    </div>
  );
} 