import React, { useState } from 'react';
import { FoodEntry } from '../types';
import { PlusCircle } from 'lucide-react';

interface FoodFormProps {
  onAddFood: (food: FoodEntry) => void;
}

const FoodForm: React.FC<FoodFormProps> = ({ onAddFood }) => {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [taste, setTaste] = useState<FoodEntry['taste']>('sweet');
  const [elasticity, setElasticity] = useState('50'); // New state for elasticity

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFood: FoodEntry = {
      id: Date.now().toString(),
      name,
      weight: parseFloat(weight),
      taste,
      date: new Date(),
      elasticity: parseInt(elasticity, 10), // Add elasticity to the new food entry
    };
    onAddFood(newFood);
    setName('');
    setWeight('');
    setTaste('sweet');
    setElasticity('50');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Food Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
          Weight (g)
        </label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
          min="0"
          step="0.1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="taste" className="block text-sm font-medium text-gray-700">
          Taste
        </label>
        <select
          id="taste"
          value={taste}
          onChange={(e) => setTaste(e.target.value as FoodEntry['taste'])}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="sweet">Sweet</option>
          <option value="salty">Salty</option>
          <option value="sour">Sour</option>
          <option value="bitter">Bitter</option>
          <option value="umami">Umami</option>
        </select>
      </div>
      <div>
        <label htmlFor="elasticity" className="block text-sm font-medium text-gray-700">
          Elasticity (0-100)
        </label>
        <input
          type="range"
          id="elasticity"
          value={elasticity}
          onChange={(e) => setElasticity(e.target.value)}
          min="0"
          max="100"
          className="mt-1 block w-full"
        />
        <span className="text-sm text-gray-500">{elasticity}</span>
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PlusCircle className="mr-2 h-5 w-5" />
        Add Food
      </button>
    </form>
  );
};

export default FoodForm;