import Image from 'next/image';
import Link from 'next/link';

interface FoodCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  restaurant: string;
}

export default function FoodCard({ id, name, description, imageUrl, price, restaurant }: FoodCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>
        <p className="mt-1 text-sm text-gray-500">{restaurant}</p>
        <p className="mt-2 text-gray-600 line-clamp-2">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-orange-600">${price.toFixed(2)}</span>
          <Link
            href={`/food/${id}`}
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
} 