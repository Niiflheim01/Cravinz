"use client";

import React, { useState } from 'react';

export default function AddFoodPage() {
  const [name, setName] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState(''); // Storing as comma-separated string for now
  const [dietaryRestrictions, setDietaryRestrictions] = useState(''); // Storing as comma-separated string for now

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      name,
      restaurantName,
      imageUrl,
      description,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      dietaryRestrictions: dietaryRestrictions.split(',').map(dr => dr.trim()).filter(dr => dr !== ''),
    });
    // In a real application, you would send this data to your backend API
    alert('Food item added (check console for data)! This is a placeholder.');
    // Clear form fields
    setName('');
    setRestaurantName('');
    setImageUrl('');
    setDescription('');
    setTags('');
    setDietaryRestrictions('');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16 pb-16 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Add New Food Item</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Food Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-dark focus:border-primary-dark
              dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Restaurant Name</label>
            <input
              type="text"
              id="restaurantName"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-dark focus:border-primary-dark
              dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-dark focus:border-primary-dark
              dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">e.g., /placeholders/your_food_image.jpg</p>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-dark focus:border-primary-dark
              dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-dark focus:border-primary-dark
              dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">e.g., Italian, Pasta, Dinner</p>
          </div>
          <div>
            <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Dietary Restrictions (comma-separated)</label>
            <input
              type="text"
              id="dietaryRestrictions"
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-dark focus:border-primary-dark
              dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">e.g., Vegetarian, Gluten-Free</p>
          </div>
          <button
            type="submit"
            className="w-full bg-cravinz-orange-primary text-white font-semibold py-3 px-4 rounded-md hover:bg-cravinz-orange-dark transition-colors shadow-lg"
          >
            Add Food Item
          </button>
        </form>
      </div>
    </div>
  );
} 