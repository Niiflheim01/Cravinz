import Image from 'next/image'
import Link from 'next/link'
import { FaHeart, FaRegHeart, FaTimes, FaBookmark, FaRegComment, FaShare } from 'react-icons/fa'
import { BsThreeDots } from 'react-icons/bs'

interface FoodCardProps {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  username: string
  userProfileImageUrl: string
  isLiked?: boolean
  isSaved?: boolean
  isSwipeable?: boolean
  onLike?: () => void
  onDislike?: () => void
  onSave?: () => void
}

export default function FoodCard({
  id,
  title,
  description,
  imageUrl,
  category,
  username,
  userProfileImageUrl,
  isLiked = false,
  isSaved = false,
  isSwipeable = false,
  onLike,
  onDislike,
  onSave,
}: FoodCardProps) {
  const isInstagramFeed = !isSwipeable;

  return (
    <div className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-soft overflow-hidden ${
      isSwipeable ? 'w-full aspect-[9/16]' : 'w-full'
    }`}>
      {isInstagramFeed && (
        <div className="flex items-center p-4">
          <Image
            src={userProfileImageUrl}
            alt={username}
            width={32}
            height={32}
            className="rounded-full object-cover mr-3"
          />
          <Link href={`/profile/${username}`} className="font-semibold text-gray-900 dark:text-white flex-grow">
            {username}
          </Link>
          <BsThreeDots className="text-gray-500 dark:text-gray-400 cursor-pointer" size={20} />
        </div>
      )}

      <Link href={`/food/${id}`} className={isSwipeable ? "pointer-events-none" : ""}>
        <div className="relative w-full aspect-square">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {isSwipeable && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-16 text-white">
              <h3 className="text-2xl font-bold mb-1">{title}</h3>
              <p className="text-sm line-clamp-3">{description}</p>
            </div>
          )}
        </div>
      </Link>

      {!isSwipeable && (
        <div className="p-4">
          <div className="flex items-center space-x-4 mb-3">
            <button
              onClick={onLike}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
            >
              {isLiked ? (
                <FaHeart className="w-6 h-6 text-primary" />
              ) : (
                <FaRegHeart className="w-6 h-6" />
              )}
            </button>
            <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
              <FaRegComment className="w-6 h-6" />
            </button>
            <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
              <FaShare className="w-6 h-6" />
            </button>
            <span className="flex-grow" />
            <button
              onClick={onSave}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-yellow-500 transition-colors"
            >
              <FaBookmark className="w-6 h-6" />
            </button>
          </div>

          <div className="text-gray-900 dark:text-white text-sm mb-1">
            <span className="font-semibold">4,646 likes</span>
          </div>
          <p className="text-gray-900 dark:text-white text-sm mb-1">
            <span className="font-semibold mr-1">{username}</span>
            {description}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">3 days ago</p>
        </div>
      )}

      {isSwipeable && (
        <div className="absolute -bottom-16 left-0 right-0 flex justify-center space-x-6">
          <button
            onClick={onDislike}
            className="p-4 rounded-full bg-white shadow-md text-red-500 hover:scale-110 transition-transform"
            aria-label="Dislike"
          >
            <FaTimes className="w-6 h-6" />
          </button>
          <button
            onClick={onSave}
            className="p-4 rounded-full bg-white shadow-md text-yellow-500 hover:scale-110 transition-transform"
            aria-label="Save"
          >
            <FaBookmark className="w-6 h-6" />
          </button>
          <button
            onClick={onLike}
            className="p-4 rounded-full bg-white shadow-md text-primary hover:scale-110 transition-transform"
            aria-label="Like"
          >
            <FaHeart className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  )
} 