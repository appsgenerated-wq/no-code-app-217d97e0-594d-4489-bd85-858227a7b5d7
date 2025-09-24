import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from './Button';
import { useAuth } from '../context/AuthContext';
import { Squares2X2Icon } from '@heroicons/react/24/solid';

const Header = () => {
  const { user, logout } = useAuth();

  const navLinkClasses = ({ isActive }) => 
    `text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-gray-100 text-blue-600' : ''}`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center">
              <Squares2X2Icon className="h-6 w-6 mr-2"/>
              FoodieApp
            </Link>
            <nav className="hidden md:flex items-center space-x-4">
                <NavLink to="/" className={navLinkClasses} end>Home</NavLink>
                <NavLink to="/recipes" className={navLinkClasses}>Recipes</NavLink>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="secondary" size="sm">My Recipes</Button>
                </Link>
                <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="secondary" size="sm">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
