import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const OnboardingPage = () => {
  const allergiesList = ['Gluten', 'Peanuts', 'Soy', 'Dairy', 'Shellfish', 'Egg', 'Others', 'None'];
  const dietaryRestrictionsList = ['Vegetarian', 'Vegan', 'Keto', 'Shellfish', 'Kosher', 'Fish', 'Seafood', 'Others'];

  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [selectedDietaryRestrictions, setSelectedDietaryRestrictions] = useState<string[]>([]);
  const router = useRouter();

  const handleSelect = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (item === 'None' && list.includes('None')) {
      setList([]);
    } else if (item === 'None') {
      setList(['None']);
    } else if (list.includes('None')) {
      setList([item]);
    } else if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleContinue = () => {
    // In a real app, you would save these preferences to the database
    console.log('Selected Allergies:', selectedAllergies);
    console.log('Selected Dietary Restrictions:', selectedDietaryRestrictions);
    router.push('/discover'); // Navigate to the discover page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem-4rem)] p-4">
      <div className="w-full max-w-lg bg-white rounded-lg p-6 shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Welcome to Cravinss!
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Let's personalize your experience! Answer a few quick questions about your dietary preferences, allergies, and favorite cuisines.
        </p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Do you have any allergies?</h2>
          <div className="grid grid-cols-3 gap-3">
            {allergiesList.map((allergy) => (
              <button
                key={allergy}
                onClick={() => handleSelect(selectedAllergies, setSelectedAllergies, allergy)}
                className={`px-4 py-2 border rounded-lg transition-colors ${selectedAllergies.includes(allergy)
                  ? 'bg-green-500 text-white border-green-500'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {allergy}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">What is your Dietary Restrictions?</h2>
          <div className="grid grid-cols-3 gap-3">
            {dietaryRestrictionsList.map((restriction) => (
              <button
                key={restriction}
                onClick={() => handleSelect(selectedDietaryRestrictions, setSelectedDietaryRestrictions, restriction)}
                className={`px-4 py-2 border rounded-lg transition-colors ${selectedDietaryRestrictions.includes(restriction)
                  ? 'bg-green-500 text-white border-green-500'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {restriction}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button 
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition-colors"
            onClick={() => router.back()} // Go back to the previous page
          >
            Back
          </button>
          <button 
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition-colors"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage; 