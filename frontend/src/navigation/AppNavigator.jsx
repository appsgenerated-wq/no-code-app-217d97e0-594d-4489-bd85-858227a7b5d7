import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterPage from '../screens/RegisterPage';
import DashboardScreen from '../screens/DashboardScreen';
import RecipesPage from '../screens/RecipesPage';
import RecipeDetailPage from '../screens/RecipeDetailPage';
import CreateRecipePage from '../screens/CreateRecipePage';
import PrivateRoute from '../components/PrivateRoute';

const AppNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/recipes/:id" element={<RecipeDetailPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/create-recipe" element={<CreateRecipePage />} />
      </Route>
    </Routes>
  );
};

export default AppNavigator;
