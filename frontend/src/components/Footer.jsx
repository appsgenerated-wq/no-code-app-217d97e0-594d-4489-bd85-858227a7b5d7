import React from 'react';
import { Link } from 'react-router-dom';
import { Squares2X2Icon } from '@heroicons/react/24/solid';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-white flex items-center mb-4">
              <Squares2X2Icon className="h-6 w-6 mr-2"/>
              FoodieApp
            </Link>
            <p className="text-gray-400 text-sm">
              Discover and share recipes.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 tracking-wider uppercase text-sm">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/recipes" className="text-gray-400 hover:text-white transition-colors">Recipes</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-white transition-colors">Sign Up</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Log In</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 tracking-wider uppercase text-sm">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 tracking-wider uppercase text-sm">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 FoodieApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
