import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import path from 'path'

// Load environment variables from scripts/.env
dotenv.config({ path: path.join(__dirname, '.env') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing required environment variables. Please check scripts/.env file.')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const foodItems = [
  {
    name: 'Classic Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella, basil, and olive oil on a crispy crust',
    price: 12.99,
    image_url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3',
    restaurant: 'Pizza Palace',
    category: 'Italian',
    rating: 4.5,
    is_vegetarian: true,
    is_vegan: false,
    is_gluten_free: false,
  },
  {
    name: 'Spicy Chicken Tacos',
    description: 'Three corn tortillas filled with spicy chicken, lettuce, and salsa',
    price: 9.99,
    image_url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47',
    restaurant: 'Taco Fiesta',
    category: 'Mexican',
    rating: 4.3,
    is_vegetarian: false,
    is_vegan: false,
    is_gluten_free: true,
  },
  {
    name: 'Veggie Buddha Bowl',
    description: 'Quinoa, roasted vegetables, avocado, and tahini dressing',
    price: 11.99,
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    restaurant: 'Green Garden',
    category: 'Healthy',
    rating: 4.7,
    is_vegetarian: true,
    is_vegan: true,
    is_gluten_free: true,
  },
]

async function seed() {
  try {
    // Insert food items
    const { data, error } = await supabase
      .from('food_items')
      .insert(foodItems)
      .select()

    if (error) {
      throw error
    }

    console.log('Successfully seeded food items:', data)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seed() 