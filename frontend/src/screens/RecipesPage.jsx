import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import Card from '../components/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ClockIcon } from '@heroicons/react/24/outline';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const allRecipes = await apiService.get('/recipes');
        setRecipes(allRecipes);
      } catch (err) {
        setError('Failed to fetch recipes.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Explore Recipes</h1>
          <p className="mt-2 text-lg text-gray-600">Find your next favorite meal from our collection.</p>
        </div>
        <div className="mt-10">
          {loading && <p className="text-center">Loading recipes...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map(recipe => (
                <Card key={recipe.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl">
                  <Link to={`/recipes/${recipe.id}`} className="block">
                    <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-56 object-cover" />
                  </Link>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-900">
                      <Link to={`/recipes/${recipe.id}`} className="hover:text-blue-600">{recipe.title}</Link>
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 flex-grow">{recipe.description}</p>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-1.5" />
                      <span>{recipe.prepTime} minutes</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecipesPage;
