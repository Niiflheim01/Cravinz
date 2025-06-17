import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { Database } from '@/types/database';

type FoodItem = Database['public']['Tables']['food_items']['Row'];

export default async function FoodDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: foodItem, error } = await supabase
    .from('food_items')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !foodItem) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Food Image */}
      <div className="relative h-96 w-full rounded-xl overflow-hidden mb-8">
        <Image
          src={foodItem.image_url}
          alt={foodItem.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      {/* Food Details */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {foodItem.name}
            </h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <span className="flex items-center">
                <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                {foodItem.location}
              </span>
              <span className="flex items-center">
                <FaClock className="w-4 h-4 mr-1" />
                {foodItem.preparation_time} mins
              </span>
            </div>
          </div>
          <button className="p-2 text-gray-600 hover:text-primary transition-colors">
            <FaRegHeart className="w-6 h-6" />
          </button>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-600 mb-6">{foodItem.description}</p>

          {/* Ingredients */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Ingredients
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              {(foodItem.ingredients as string[]).map((ingredient: string, index: number) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Instructions
            </h2>
            <ol className="list-decimal list-inside text-gray-600">
              {(foodItem.instructions as string[]).map((instruction: string, index: number) => (
                <li key={index} className="mb-2">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
} 