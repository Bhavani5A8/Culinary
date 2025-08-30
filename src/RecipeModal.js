import React, { useState, useEffect } from 'react';
import { 
  Clock, Users, Star, Bookmark, Share2, 
  Utensils, BookOpen, Heart, Eye, X
} from 'lucide-react';
import { getRecipeDetails } from './recipeData';

// UI Components (extracted from main app)
const Button = ({ children, variant = 'primary', size = 'md', className = '', onClick, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 shadow-sm',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
    outline: 'border border-orange-500 text-orange-600 hover:bg-orange-50',
    cta: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg',
    xl: 'px-8 py-4 text-lg rounded-xl',
    icon: 'p-2 rounded-lg'
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const OptimizedImage = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={className} loading="lazy" />
);

// Fixed Modal Component with proper event handling
const Modal = ({ isOpen, onClose, title, children, size = 'lg' }) => {
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  // FIXED: Simple backdrop click handler - only closes when clicking the backdrop itself
  const handleBackdropClick = (e) => {
    // Only close if clicking directly on the backdrop element
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* FIXED: Single container with backdrop click handler */}
      <div 
        className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        {/* FIXED: Backdrop overlay with click handler */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 cursor-pointer"
          onClick={handleBackdropClick}
        />
        
        {/* FIXED: Modal content - no click handlers, just content */}
        <div 
          className={`inline-block w-full ${sizeClasses[size]} my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl relative z-10`}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            {/* FIXED: Direct close button handler */}
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:scale-110 transition-transform"
              type="button"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const RecipeModal = ({ selectedRecipeId, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('ingredients');
  const [saved, setSaved] = useState(false);

  const recipe = selectedRecipeId ? getRecipeDetails(selectedRecipeId) : null;
  
  // Reset state when modal opens with new recipe
  useEffect(() => {
    if (selectedRecipeId && isOpen) {
      setActiveTab('ingredients');
      setSaved(false);
    }
  }, [selectedRecipeId, isOpen]);

  if (!recipe) return null;

  const tabs = [
    { id: 'ingredients', label: 'Ingredients', icon: Utensils },
    { id: 'instructions', label: 'Instructions', icon: BookOpen },
    { id: 'nutrition', label: 'Nutrition', icon: Heart },
    { id: 'reviews', label: 'Reviews', icon: Star }
  ];

  const renderHeatLevel = (level) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-4 rounded-full ${
              i < level ? 'bg-red-500' : 'bg-gray-200'
            }`}
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">
          {level === 0 ? 'None' : level === 1 ? 'Mild' : level === 2 ? 'Medium' : level === 3 ? 'Hot' : level === 4 ? 'Very Hot' : 'Extreme'}
        </span>
      </div>
    );
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleSaveToggle = () => {
    setSaved(!saved);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={recipe.title} size="xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <OptimizedImage
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 rounded-xl object-cover shadow-lg"
          />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>{recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span>{recipe.servings} servings</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{recipe.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveToggle}
                  className="flex-shrink-0"
                >
                  <Bookmark className={saved ? "w-4 h-4 fill-blue-600 text-blue-600" : "w-4 h-4"} />
                </Button>
                <Button variant="outline" size="sm" className="flex-shrink-0" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Heat Level:</span>
                {renderHeatLevel(recipe.heatLevel || 0)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Difficulty:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {recipe.difficulty}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Chef:</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-semibold">
                      {recipe.chef && recipe.chef.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{recipe.chef}</span>
                </div>
              </div>
              {recipe.tags && recipe.tags.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tags:</span>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {recipe.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {recipe.tags.length > 3 && (
                      <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium">
                        +{recipe.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex-1 min-w-0 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-4">
            {activeTab === 'ingredients' && (
              <div>
                <h4 className="font-semibold text-lg mb-4">Ingredients</h4>
                <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
                  <span>Servings: {recipe.servings}</span>
                  <span>•</span>
                  <span>Prep: {recipe.prepTime}</span>
                  <span>•</span>
                  <span>{recipe.calories} cal per serving</span>
                </div>
                <ul className="space-y-2 max-h-80 overflow-y-auto">
                  {recipe.ingredients && recipe.ingredients.length > 0 ? (
                    recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1 rounded flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{ingredient}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-500 italic">No ingredients available</li>
                  )}
                </ul>
              </div>
            )}

            {activeTab === 'instructions' && (
              <div>
                <h4 className="font-semibold text-lg mb-4">Instructions</h4>
                <ol className="space-y-4 max-h-80 overflow-y-auto">
                  {recipe.instructions && recipe.instructions.length > 0 ? (
                    recipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <p className="text-sm leading-relaxed">{instruction}</p>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-500 italic">No instructions available</li>
                  )}
                </ol>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div>
                <h4 className="font-semibold text-lg mb-4">Nutrition Facts (Per Serving)</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span>Calories</span>
                      <span className="font-semibold">{recipe.nutrition?.calories || recipe.calories || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Protein</span>
                      <span className="font-semibold">{recipe.nutrition?.protein || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Carbs</span>
                      <span className="font-semibold">{recipe.nutrition?.carbs || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fat</span>
                      <span className="font-semibold">{recipe.nutrition?.fat || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fiber</span>
                      <span className="font-semibold">{recipe.nutrition?.fiber || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sugar</span>
                      <span className="font-semibold">{recipe.nutrition?.sugar || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h4 className="font-semibold text-lg mb-4">Reviews ({recipe.reviews || 0})</h4>
                
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 mb-3">Share your experience with this recipe!</p>
                  <Button variant="primary" size="sm" className="w-full sm:w-auto">
                    <Star className="w-4 h-4 mr-2" />
                    Write a Review
                  </Button>
                </div>
                
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-semibold text-blue-600">JD</span>
                        </div>
                        <span className="font-medium">John Doe</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Amazing recipe! The flavors were perfectly balanced and my family loved it. Will definitely make this again.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-semibold text-green-600">AS</span>
                        </div>
                        <span className="font-medium">Anita Sharma</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Perfect for festivals! Made this for Diwali and everyone couldn't stop asking for the recipe.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-semibold text-purple-600">MK</span>
                        </div>
                        <span className="font-medium">Maria Krishnan</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4].map(star => (
                          <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <Star className="w-4 h-4 text-gray-300" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Good recipe but took a bit longer than expected. The taste was authentic though. Great for special occasions.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-semibold text-orange-600">RP</span>
                        </div>
                        <span className="font-medium">Rajesh Patel</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Excellent step-by-step instructions! Even as a beginner cook, I was able to make this successfully. Highly recommended!
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Load More Reviews
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RecipeModal;