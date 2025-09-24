import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/apiService';
import Card from '../components/Card';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/solid';

const DashboardScreen = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserRecipes = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const userRecipes = await apiService.get(`/recipes?authorId=${user.id}`);
        setRecipes(userRecipes);
      } catch (err) {
        setError('Failed to fetch your recipes.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserRecipes();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">My Recipes</h1>
                <Button href="/create-recipe">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    New Recipe
                </Button>
            </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {loading && <p>Loading your recipes...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && recipes.length === 0 && (
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900">No recipes yet!</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating your first recipe.</p>
                    <div className="mt-6">
                        <Button href="/create-recipe">
                           <PlusIcon className="h-5 w-5 mr-2" />
                           Create Recipe
                        </Button>
                    </div>
                </div>
            )}
            {!loading && recipes.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map(recipe => (
                        <Card key={recipe.id} className="overflow-hidden">
                            <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900">{recipe.title}</h3>
                                <p className="mt-2 text-sm text-gray-600 truncate">{recipe.description}</p>
                                <div className="mt-4">
                                    <Link to={`/recipes/${recipe.id}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm">View Recipe &rarr;</Link>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </main>
    </div>
  );
};

export default DashboardScreen;
