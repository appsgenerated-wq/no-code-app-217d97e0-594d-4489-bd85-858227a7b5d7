import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { SparklesIcon, UsersIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const HomeScreen = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <BookOpenIcon className="h-8 w-8 text-blue-600" />,
      title: 'Discover Recipes',
      description: 'Explore thousands of recipes from a vibrant community of home cooks and professional chefs.'
    },
    {
      icon: <SparklesIcon className="h-8 w-8 text-orange-500" />,
      title: 'Share Your Creations',
      description: 'Easily upload and share your own favorite recipes, complete with photos and detailed instructions.'
    },
    {
      icon: <UsersIcon className="h-8 w-8 text-green-500" />,
      title: 'Join the Community',
      description: 'Connect with fellow food lovers, save your favorite recipes, and build your personal cookbook.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero 
          title="Find & Share Everyday Recipes"
          subtitle="Your ultimate destination for discovering delicious food, sharing your culinary masterpieces, and connecting with a community that loves to cook."
          primaryAction={user ? { text: 'Go to Recipes', href: '/recipes' } : { text: 'Join for Free', href: '/register' }}
          secondaryAction={{ text: 'Browse Recipes', href: '/recipes' }}
        />
        
        <section id="features" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">Everything You Need to Cook Better</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">From meal planning to sharing your creations, we've got you covered.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-blue-600">
          <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to start cooking?</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-blue-100">Sign up today and unlock a world of flavor. It's free forever.</p>
            <Link to={user ? '/create-recipe' : '/register'}>
              <Button variant="secondary" size="lg" className="mt-8">
                {user ? 'Share a Recipe' : 'Create an Account'}
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomeScreen;
