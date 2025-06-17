export interface FoodItem {
  id: string;
  name: string;
  restaurantName: string;
  imageUrl: string;
  tags: string[];
  dietaryRestrictions: string[];
  description: string;
}

export const getDummyFoodItems = (): FoodItem[] => {
  return [
    {
      id: '1',
      name: 'Kaya Toast',
      restaurantName: 'Local Coffee Shop',
      imageUrl: '/placeholders/kaya toast.jpg',
      tags: ['Breakfast', 'Sweet', 'Snack', 'Local'],
      dietaryRestrictions: [],
      description: 'A popular Singaporean breakfast of toasted bread with kaya (coconut jam) and butter.',
    },
    {
      id: '2',
      name: 'Hainanese Chicken Rice',
      restaurantName: 'Tian Tian Hainanese Chicken Rice',
      imageUrl: '/placeholders/hainanese chicken.jpg',
      tags: ['Chicken', 'Rice', 'Classic', 'Local'],
      dietaryRestrictions: [],
      description: 'Tender poached chicken and fragrant rice, served with chili and ginger sauces.',
    },
    {
      id: '3',
      name: 'Char Kway Teow',
      restaurantName: 'Hill Street Char Kway Teow',
      imageUrl: '/placeholders/char kway teow.jpg',
      tags: ['Noodles', 'Seafood', 'Fried', 'Hawker'],
      dietaryRestrictions: [],
      description: 'Stir-fried flat rice noodles with prawns, cockles, Chinese sausage, and bean sprouts.',
    },
    {
      id: '4',
      name: 'Chai Tow Kway',
      restaurantName: 'Lau Pa Sat',
      imageUrl: '/placeholders/chai tow kway.jpg',
      tags: ['Radish Cake', 'Fried', 'Savory', 'Snack'],
      dietaryRestrictions: [],
      description: 'Fried carrot cake (radish cake) with eggs, preserved radish, and dark soy sauce.',
    },
    {
      id: '5',
      name: 'Wanton Mee',
      restaurantName: "Eng\'s Char Siew Wanton Mee",
      imageUrl: '/placeholders/wanton mee.jpg',
      tags: ['Noodles', 'Pork', 'Dumplings', 'Soup/Dry'],
      dietaryRestrictions: [],
      description: 'Springy egg noodles with char siew (BBQ pork) and wantons, often served dry with a savory sauce.',
    },
    {
      id: '6',
      name: 'Fish Bee Hoon',
      restaurantName: 'Whampoa Keng Fish Head Steamboat',
      imageUrl: '/placeholders/fish bee hoon.jpg',
      tags: ['Noodles', 'Fish', 'Soup', 'Seafood'],
      dietaryRestrictions: [],
      description: 'Vermicelli noodles in a rich, milky fish broth, usually with sliced fish or fried fish head.',
    },
    {
      id: '7',
      name: 'Bak Chor Mee',
      restaurantName: 'Tai Hwa Pork Noodle',
      imageUrl: '/placeholders/bak chor mee.jpg',
      tags: ['Noodles', 'Pork', 'Minced Meat', 'Vinegar'],
      dietaryRestrictions: [],
      description: 'Minced pork noodles with mushrooms, pork slices, and a tangy vinegar-based sauce.',
    },
    {
      id: '8',
      name: 'Oyster Omelette (Orh Luak)',
      restaurantName: 'Newton Food Centre',
      imageUrl: '/placeholders/oyster omelette(orh luak).jpg',
      tags: ['Oysters', 'Egg', 'Starch', 'Seafood', 'Street Food'],
      dietaryRestrictions: [],
      description: 'A savory omelette fried with fresh oysters and a generous amount of starch for a chewy texture.',
    },
    {
      id: '9',
      name: 'Yong Tau Foo',
      restaurantName: 'Foo Kee Yong Tau Foo',
      imageUrl: '/placeholders/yong-tau-foo.jpg',
      tags: ['Tofu', 'Vegetables', 'Stuffed', 'Soup/Dry'],
      dietaryRestrictions: [],
      description: 'Assortment of tofu and vegetables stuffed with fish paste, served in a clear soup or dry with sauce.',
    },
    {
      id: '10',
      name: 'Cantonese Roast Meat',
      restaurantName: 'Hong Kong Soya Sauce Chicken Rice & Noodle',
      imageUrl: '/placeholders/cantonese roast meat.jpg',
      tags: ['Pork', 'Roast', 'Char Siew', 'Sio Bak'],
      dietaryRestrictions: [],
      description: 'Crispy roasted pork belly (sio bak) and flavorful char siew (BBQ pork), a Cantonese classic.',
    },
  ];
}; 