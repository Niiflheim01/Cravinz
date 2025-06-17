import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import FoodCard from '@/components/food/FoodCard';
import { Database } from '@/types/database';
import { FaCog } from 'react-icons/fa';

type LikedFoodItem = {
  food_item: {
    id: number;
    name: string;
    description: string;
    image_url: string;
    category: string;
  };
};

export default async function ProfilePage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: likedFoodItems } = await supabase
    .from('user_likes')
    .select(`
      food_item:food_items (
        id,
        name,
        description,
        image_url,
        category
      )
    `)
    .eq('user_id', user.id)
    .eq('liked', true);

  const { data: savedFoodItems } = await supabase
    .from('user_likes')
    .select(`
      food_item:food_items (
        id,
        name,
        description,
        image_url,
        category
      )
    `)
    .eq('user_id', user.id)
    .eq('saved', true);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6 mb-8 flex flex-col sm:flex-row items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-primary/10 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-3xl text-primary dark:text-gray-300 font-semibold">
              {profile?.username?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
            </span>
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {profile?.username || user.email}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          </div>
        </div>
        <button className="mt-4 sm:mt-0 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center">
          <FaCog className="mr-2" /> Edit Profile
        </button>
      </div>

      {/* Liked Food Items */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Liked Food Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(likedFoodItems as LikedFoodItem[] | null)?.map(({ food_item }) => (
            <FoodCard
              key={String(food_item.id)}
              id={String(food_item.id)}
              title={food_item.name}
              description={food_item.description}
              imageUrl={food_item.image_url}
              category={food_item.category}
              isLiked={true}
            />
          ))}
        </div>

        {(!likedFoodItems || likedFoodItems.length === 0) && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6">
            <p className="text-gray-500 dark:text-gray-400">You haven't liked any food items yet.</p>
            <a
              href="/discover"
              className="inline-block mt-4 text-primary hover:text-primary-dark dark:text-cravinz-orange-primary dark:hover:text-cravinz-orange-dark"
            >
              Start discovering food →
            </a>
          </div>
        )}
      </section>

      {/* Saved Food Items (New Section) */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Saved Food Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(savedFoodItems as LikedFoodItem[] | null)?.map(({ food_item }) => (
            <FoodCard
              key={String(food_item.id)}
              id={String(food_item.id)}
              title={food_item.name}
              description={food_item.description}
              imageUrl={food_item.image_url}
              category={food_item.category}
              isSaved={true}
            />
          ))}
        </div>

        {(!savedFoodItems || savedFoodItems.length === 0) && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6">
            <p className="text-gray-500 dark:text-gray-400">You haven't saved any food items yet.</p>
            <a
              href="/discover"
              className="inline-block mt-4 text-primary hover:text-primary-dark dark:text-cravinz-orange-primary dark:hover:text-cravinz-orange-dark"
            >
              Start discovering food →
            </a>
          </div>
        )}
      </section>

      {/* My Posts (Placeholder) */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Posts</h2>
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6">
          <p className="text-gray-500 dark:text-gray-400">You haven't posted any food items yet.</p>
          <a
            href="/add"
            className="inline-block mt-4 bg-cravinz-orange-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-cravinz-orange-dark transition-colors"
          >
            Add your first post!
          </a>
        </div>
      </section>
    </div>
  );
} 