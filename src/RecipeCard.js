import React, { useState } from 'react';
import { 
  Heart, Star, Crown, Clock, Users, Eye, BookOpen 
} from 'lucide-react';
import { OptimizedImage, Button } from './ui';

const RecipeCard = ({ recipe, onClick, enhanced = false, variant = 'default' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [loved, setLoved] = useState(false);

  const handleLoveClick = (e) => {
    try {
      e.stopPropagation(); // Prevent card click
      e.preventDefault();
      setLoved(!loved);
    } catch (error) {
      console.error('Error handling love click:', error);
    }
  };

  // FIXED: Simplified card click handler
  const handleCardClick = (e) => {
    try {
      // Don't trigger if clicking on interactive elements
      if (e.target.closest('button')) {
        return;
      }
      
      if (onClick && recipe.id) {
        console.log('🎯 RecipeCard - Card clicked, calling onClick with ID:', recipe.id);
        onClick(recipe.id);
      }
    } catch (error) {
      console.error('Error handling card click:', error);
    }
  };

  // FIXED: Handle overlay click
  const handleOverlayClick = (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      
      if (onClick && recipe.id) {
        console.log('📖 RecipeCard - Overlay clicked, calling onClick with ID:', recipe.id);
        onClick(recipe.id);
      }
    } catch (error) {
      console.error('Error handling overlay click:', error);
    }
  };

  // FIXED: Handle keyboard events for overlay
  const handleOverlayKeyDown = (e) => {
    try {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        
        if (onClick && recipe.id) {
          console.log('⌨️ RecipeCard - Overlay keyboard activated, calling onClick with ID:', recipe.id);
          onClick(recipe.id);
        }
      }
    } catch (error) {
      console.error('Error handling overlay keyboard event:', error);
    }
  };

  const handleMouseEnter = () => {
    try {
      setIsHovered(true);
    } catch (error) {
      console.error('Error handling mouse enter:', error);
    }
  };

  const handleMouseLeave = () => {
    try {
      setIsHovered(false);
    } catch (error) {
      console.error('Error handling mouse leave:', error);
    }
  };

  if (!recipe) {
    console.error('RecipeCard: recipe prop is required');
    return null;
  }

  let difficultyClasses = 'px-3 py-1 rounded-full text-xs font-semibold ';
  try {
    if (recipe.difficulty === 'Hard') {
      difficultyClasses += 'bg-red-500 text-white';
    } else if (recipe.difficulty === 'Medium') {
      difficultyClasses += 'bg-amber-500 text-white';
    } else {
      difficultyClasses += 'bg-green-500 text-white';
    }
  } catch (error) {
    console.error('Error setting difficulty classes:', error);
    difficultyClasses += 'bg-gray-500 text-white';
  }

  return (
    <div
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-2 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      <div className="relative h-64 overflow-hidden">
        <OptimizedImage
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-60"}`} />
        
        <button
          onClick={handleLoveClick}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white hover:scale-110 z-10"
        >
          <Heart className={loved ? "w-5 h-5 fill-red-500 text-red-500" : "w-5 h-5 text-gray-600"} />
        </button>
        
        {recipe.premium && (
          <div className="absolute top-4 left-4">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Crown className="w-3 h-3" />
              Premium
            </div>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <div className={difficultyClasses}>
              {recipe.difficulty}
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold">{recipe.rating}</span>
            </div>
          </div>
        </div>

        {/* FIXED: Hover overlay for desktop with book icon */}
        {isHovered && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm cursor-pointer"
            onClick={handleOverlayClick}
            onKeyDown={handleOverlayKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`View recipe: ${recipe.title}`}
          >
            <div className="flex flex-col items-center text-white transform scale-110">
              <BookOpen className="w-8 h-8 mb-2" />
              <span className="text-sm font-semibold">View Recipe</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {recipe.tags && recipe.tags.slice(0, 2).map((tag) => (
            <div
              key={tag}
              className="px-2 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium"
            >
              {tag}
            </div>
          ))}
          {recipe.tags && recipe.tags.length > 2 && (
            <div className="px-2 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium">
              +{recipe.tags.length - 2}
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {recipe.title}
        </h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.prepTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings}</span>
          </div>
          <div className="text-xs">
            {recipe.calories} cal
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">
                {recipe.chef && recipe.chef.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <span className="text-sm text-gray-600 truncate">by {recipe.chef}</span>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Eye className="w-3 h-3" />
            <span>{recipe.reviews}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;