import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../services/apiService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ClockIcon, UserIcon } from '@heroicons/react/24/outline';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const fetchedRecipe = await apiService.get(`/recipes/${id}?include=author`);
        setRecipe(fetchedRecipe);
      } catch (err) {
        setError('Failed to fetch recipe details.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading recipe...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
  if (!recipe) return <p className="text-center py-20">Recipe not found.</p>;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-96 object-cover" />
            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-900">{recipe.title}</h1>
              <p className="mt-4 text-lg text-gray-600">{recipe.description}</p>
              <div className="mt-6 flex items-center space-x-6 text-gray-500">
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  <span>{recipe.prepTime} minutes</span>
                </div>
                {recipe.author && (
                  <div className="flex items-center">
                    <UserIcon className="h-5 w-5 mr-2" />
                    <span>By {recipe.author.name}</span>
                  </div>
                )}
              </div>
              <div className="mt-10 border-t pt-8">
                <h2 className="text-2xl font-semibold text-gray-900">Ingredients</h2>
                <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 border-t pt-8">
                <h2 className="text-2xl font-semibold text-gray-900">Instructions</h2>
                <div className="mt-4 prose max-w-none text-gray-700">
                  {recipe.instructions.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecipeDetailPage;
