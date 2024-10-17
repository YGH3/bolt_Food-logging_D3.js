import React, { useState } from 'react';
import { FoodEntry } from './types';
import FoodForm from './components/FoodForm';
import BubbleChart from './components/BubbleChart';
import ElasticityPieChart from './components/ElasticityPieChart';
import { format } from 'date-fns';
import { Utensils } from 'lucide-react';

function App() {
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);

  const handleAddFood = (food: FoodEntry) => {
    setFoodEntries([...foodEntries, food]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-cyan-500 rounded-full flex items-center justify-center">
                <Utensils size={30} color="white" />
              </div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Food Logger</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">Log your meals and visualize your diet</p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <FoodForm onAddFood={handleAddFood} />
              </div>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <p>Food Entries Visualization</p>
                <div className="h-96">
                  <BubbleChart data={foodEntries} />
                </div>
              </div>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <p>Elasticity Distribution</p>
                <div className="h-72">
                  <ElasticityPieChart data={foodEntries} />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Recent Entries</h3>
              <ul className="space-y-2">
                {foodEntries.slice(-5).reverse().map((entry) => (
                  <li key={entry.id} className="bg-gray-50 p-2 rounded">
                    <span className="font-medium">{entry.name}</span> - {entry.weight}g ({entry.taste})
                    <span className="text-xs text-gray-500 ml-2">
                      Elasticity: {entry.elasticity}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {format(entry.date, 'MMM d, yyyy HH:mm')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;