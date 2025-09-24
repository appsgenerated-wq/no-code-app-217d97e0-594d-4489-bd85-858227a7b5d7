import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import Input from '../components/Input';
import Button from '../components/Button';
import { PhotoIcon } from '@heroicons/react/24/solid';

const CreateRecipePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('ingredients', JSON.stringify(ingredients.split('\n').filter(i => i.trim() !== '')));
    formData.append('instructions', instructions);
    formData.append('prepTime', prepTime);
    if (imageFile) {
      formData.append('imageUrl', imageFile);
    }

    try {
      const newRecipe = await apiService.request('/recipes', { method: 'POST', body: formData, headers: { 'Content-Type': null } });
      navigate(`/recipes/${newRecipe.id}`);
    } catch (err) {
      setError('Failed to create recipe. Please check your inputs.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Share Your Recipe</h1>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
          {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Photo</label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-md" />
                ) : (
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                )}
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          <Input label="Recipe Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Input label="Short Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients (one per line)</label>
            <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} rows={5} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
            <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} rows={8} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <Input label="Prep Time (minutes)" type="number" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} required />
          
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Recipe'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipePage;
