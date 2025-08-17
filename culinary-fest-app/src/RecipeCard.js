import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Heart, Star, Crown, Clock, Users, Eye, ArrowRight,
  Bookmark, Share2, Award, TrendingUp, Flame, Zap,
  ChefHat, Calendar, Play, Sparkles
} from 'lucide-react';
import { OptimizedImage, Button, Tooltip } from './ui';

const RecipeCard = ({ recipe, onClick, enhanced = true, variant = 'default' }) => {
  // Core state with proper initialization
  const [isHovered, setIsHovered] = useState(false);
  const [loved, setLoved] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Enhanced state with fallbacks
  const [viewCount, setViewCount] = useState(() => recipe?.views || Math.floor(Math.random() * 1000) + 100);
  const [socialStats, setSocialStats] = useState(() => ({
    likes: recipe?.likes || Math.floor(Math.random() * 500) + 50,
    shares: recipe?.shares || Math.floor(Math.random() * 100) + 10,
    saves: recipe?.saves || Math.floor(Math.random() * 200) + 20
  }));
  const [personalizedScore, setPersonalizedScore] = useState(null);

  // Refs for cleanup
  const observerRef = useRef(null);
  const cardRef = useRef(null);

  // Enhanced personalization with error handling
  const calculatePersonalizedScore = useCallback(() => {
    try {
      const userPreferences = {
        skillLevel: 'intermediate',
        dietaryRestrictions: ['vegetarian'],
        favoritesCuisines: ['indian', 'italian'],
        cookingTime: 'quick'
      };

      let score = 0;

      // Safe property access with fallbacks
      if (recipe?.difficulty) {
        if (recipe.difficulty === 'Easy' && userPreferences.skillLevel === 'beginner') score += 30;
        if (recipe.difficulty === 'Medium' && userPreferences.skillLevel === 'intermediate') score += 30;
        if (recipe.difficulty === 'Hard' && userPreferences.skillLevel === 'advanced') score += 30;
      }

      if (recipe?.tags && Array.isArray(recipe.tags)) {
        if (recipe.tags.some(tag =>
          userPreferences.dietaryRestrictions.includes(tag.toLowerCase())
        )) score += 25;
      }

      if (userPreferences.cookingTime === 'quick' && recipe?.prepTime) {
        const prepTimeNum = parseInt(recipe.prepTime);
        if (!isNaN(prepTimeNum) && prepTimeNum <= 30) score += 20;
      }

      if (recipe?.rating && recipe.rating >= 4.5) score += 15;
      if (recipe?.trending) score += 10;

      setPersonalizedScore(Math.min(100, Math.max(0, score)));
    } catch (error) {
      console.error('Error calculating personalized score:', error);
      setPersonalizedScore(null);
    }
  }, [recipe]);

  // Enhanced view tracking with proper cleanup
  const initializeViewTracking = useCallback(() => {
    try {
      if (!cardRef.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            // Debounced view count increment
            const timeoutId = setTimeout(() => {
              setViewCount(prev => prev + 1);
            }, 1000);

            // Cleanup timeout on unmount
            return () => clearTimeout(timeoutId);
          }
        },
        {
          threshold: 0.5,
          rootMargin: '0px'
        }
      );

      observer.observe(cardRef.current);
      observerRef.current = observer;

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
      };
    } catch (error) {
      console.error('Error setting up view tracking:', error);
    }
  }, []);

  // Enhanced interaction handlers with proper error handling and rollback
  const handleLoveClick = useCallback(async (e) => {
    e.stopPropagation();

    if (isLoading) return;

    try {
      setIsLoading(true);
      setError(null);

      const previousLoved = loved;
      const previousStats = socialStats;

      // Optimistic update
      setLoved(!previousLoved);
      setSocialStats(prev => ({
        ...prev,
        likes: prev.likes + (!previousLoved ? 1 : -1)
      }));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

    } catch (error) {
      console.error('Error handling love click:', error);
      setError('Failed to update favorite status');

      // Rollback on error
      setLoved(loved);
      setSocialStats(socialStats);
    } finally {
      setIsLoading(false);
    }
  }, [loved, socialStats, isLoading]);

  const handleBookmarkClick = useCallback(async (e) => {
    e.stopPropagation();

    try {
      setError(null);
      const newBookmarked = !bookmarked;
      setBookmarked(newBookmarked);

      setSocialStats(prev => ({
        ...prev,
        saves: prev.saves + (newBookmarked ? 1 : -1)
      }));

    } catch (error) {
      console.error('Error handling bookmark click:', error);
      setError('Failed to bookmark recipe');
    }
  }, [bookmarked]);

  const handleShareClick = useCallback(async (e) => {
    e.stopPropagation();

    try {
      setError(null);
      const shareData = {
        title: recipe.title,
        text: recipe.description,
        url: `${window.location.origin}/recipe/${recipe.id}`
      };

      if (navigator.share && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        console.log('Recipe link copied to clipboard!');
      }

      setSocialStats(prev => ({
        ...prev,
        shares: prev.shares + 1
      }));
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error handling share:', error);
        setError('Failed to share recipe');
      }
    }
  }, [recipe]);

  const handleCardClick = useCallback(() => {
    try {
      if (onClick && recipe && recipe.id) {
        onClick(recipe.id);
      } else {
        const recipeDetails = `
🍽️ RECIPE DETAILS 🍽️
═══════════════════════════════════════════════════════════════
📝 ${recipe?.title || 'Unknown Recipe'}
📖 Description: ${recipe?.description || 'No description available'}
⏰ Details: • Prep Time: ${recipe?.prepTime || 'N/A'} • Servings: ${recipe?.servings || 'N/A'} people
• Difficulty: ${recipe?.difficulty || 'N/A'} • Rating: ${recipe?.rating || 'N/A'}/5 ⭐
• Chef: ${recipe?.chef || 'Unknown Chef'}
${recipe?.tags ? `🏷️ Tags: ${recipe.tags.join(', ')}` : ''}
${recipe?.calories ? `🔥 Calories: ${recipe.calories} per serving` : ''}
${recipe?.heatLevel ? `🌶️ Spice Level: ${recipe.heatLevel}/5` : ''}
${recipe?.ingredients ? ` 📝 INGREDIENTS (${recipe.ingredients.length} items):
${recipe.ingredients.slice(0, 8).map((ing, i) => `${i + 1}. ${ing}`).join('\n')}${recipe.ingredients.length > 8 ? `\n...and ${recipe.ingredients.length - 8} more ingredients` : ''} ` : ''}
${recipe?.instructions ? ` 👩‍🍳 COOKING STEPS:
${recipe.instructions.slice(0, 3).map((step, i) => `${i + 1}. ${step.slice(0, 100)}${step.length > 100 ? '...' : ''}`).join('\n\n')}${recipe.instructions.length > 3 ? `\n\n...and ${recipe.instructions.length - 3} more steps` : ''} ` : ''}
${recipe?.nutrition ? ` 📊 NUTRITION (per serving):
• Protein: ${recipe.nutrition.protein || 'N/A'}
• Carbs: ${recipe.nutrition.carbs || 'N/A'}
• Fat: ${recipe.nutrition.fat || 'N/A'}
• Fiber: ${recipe.nutrition.fiber || 'N/A'} ` : ''}
═══════════════════════════════════════════════════════════════
`;
        alert(recipeDetails);
      }
    } catch (error) {
      console.error('💥 RecipeCard.js - Error in handleCardClick:', error);
      setError('Failed to open recipe details');
    }
  }, [onClick, recipe]);

  const handleQuickAction = useCallback((action, e) => {
    e.stopPropagation();
    try {
      switch (action) {
        case 'love':
          handleLoveClick(e);
          break;
        case 'bookmark':
          handleBookmarkClick(e);
          break;
        case 'share':
          handleShareClick(e);
          break;
        case 'quickView':
          handleCardClick();
          break;
        default:
          console.warn('Unknown quick action:', action);
      }
    } catch (error) {
      console.error('Error handling quick action:', error);
    }
  }, [handleLoveClick, handleBookmarkClick, handleShareClick, handleCardClick]);

  useEffect(() => {
    // Run score calculation on mount or when recipe changes
    if (enhanced && recipe) {
      calculatePersonalizedScore();
    }
  }, [enhanced, recipe, calculatePersonalizedScore]);

  useEffect(() => {
    // Run view tracking on mount
    if (enhanced && recipe && variant !== 'compact') {
      const cleanup = initializeViewTracking();
      return cleanup;
    }
  }, [enhanced, recipe, initializeViewTracking, variant]);

  if (!recipe) return null;

  const cardClasses = `
    group relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 ease-in-out
    ${isHovered ? 'transform scale-[1.02] shadow-xl' : ''}
    ${variant === 'list' ? 'flex flex-row items-start gap-4 p-4' : 'flex flex-col'}
    ${variant === 'compact' ? 'flex flex-row items-center gap-2 p-2' : ''}
  `;

  const imageClasses = `
    transition-transform duration-500 ease-in-out
    ${isHovered ? 'transform scale-105' : ''}
    ${variant === 'list' ? 'w-40 h-28 rounded-md' : 'w-full h-48 rounded-t-xl'}
    ${variant === 'compact' ? 'w-16 h-16 rounded-lg' : ''}
    object-cover
  `;

  return (
    <div
      className={cardClasses}
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* ERROR MESSAGE DISPLAY */}
      {error && (
        <div className="absolute top-0 left-0 right-0 p-2 bg-red-500 text-white text-sm text-center z-20">
          {error}
        </div>
      )}

      {/* Top right buttons (conditional) */}
      <div className={`
        absolute top-2 right-2 flex gap-2 z-10
        transition-opacity duration-300
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `}>
        <Tooltip content="Quick View">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800"
            onClick={(e) => handleQuickAction('quickView', e)}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </Tooltip>
        {/* Share Button */}
        <Tooltip content="Share Recipe">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800"
            onClick={(e) => handleQuickAction('share', e)}
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </Tooltip>
        {/* Save/Bookmark Button */}
        <Tooltip content={bookmarked ? "Remove from Saved" : "Save Recipe"}>
          <Button
            variant="ghost"
            size="icon"
            className={`
              bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800
              ${bookmarked ? 'text-orange-500' : ''}
            `}
            onClick={(e) => handleQuickAction('bookmark', e)}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </Button>
        </Tooltip>
        {/* Love Button */}
        <Tooltip content={loved ? "Unlike" : "Like"}>
          <Button
            variant="ghost"
            size="icon"
            className={`
              bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800
              ${loved ? 'text-red-500' : ''}
            `}
            onClick={(e) => handleQuickAction('love', e)}
          >
            <Heart className="w-4 h-4 fill-current" />
          </Button>
        </Tooltip>
      </div>

      {/* Image with overlay */}
      <div className="relative overflow-hidden">
        <OptimizedImage
          src={recipe.image}
          alt={recipe.title}
          className={imageClasses}
        />
        {/* Image overlay (conditional) */}
        {isHovered && variant !== 'compact' && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            <Button variant="outline" size="lg" className="text-white border-white">
              <Play className="w-5 h-5 mr-2" />
              View Recipe
            </Button>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className={`
        p-4 flex-grow
        ${variant === 'list' ? 'space-y-2' : 'space-y-3'}
        ${variant === 'compact' ? 'p-0 flex-grow' : ''}
      `}>
        <div className={`
          flex items-start justify-between
          ${variant === 'compact' ? 'flex-col' : ''}
        `}>
          <h3 className={`
            font-semibold transition-colors duration-300
            ${isHovered ? 'text-orange-600' : 'text-gray-900'}
            ${variant === 'list' ? 'text-xl' : 'text-lg'}
            ${variant === 'compact' ? 'text-base font-medium' : ''}
          `}>
            {recipe.title}
          </h3>
          <div className="flex-shrink-0 flex items-center gap-1 mt-1">
            <Star className={`w-4 h-4 ${recipe.rating >= 4.5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            <span className={`text-sm ${recipe.rating >= 4.5 ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
              {recipe.rating}
            </span>
          </div>
        </div>

        {/* Description/metadata */}
        {variant !== 'compact' && (
          <p className="text-sm text-gray-600">
            {recipe.description}
          </p>
        )}

        {/* Recipe stats (conditional) */}
        {enhanced && variant !== 'compact' && (
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{recipe.prepTime || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-gray-400" />
              <span>{recipe.servings || 'N/A'} Servings</span>
            </div>
          </div>
        )}

        {/* Badges/Tags (conditional) */}
        {enhanced && variant !== 'compact' && (
          <div className="flex items-center gap-2 flex-wrap">
            {recipe.premium && (
              <span className="px-2 py-1 bg-yellow-400/20 text-yellow-800 text-xs font-semibold rounded-full flex items-center gap-1">
                <Crown className="w-3 h-3" /> Premium
              </span>
            )}
            {recipe.trending && (
              <span className="px-2 py-1 bg-blue-400/20 text-blue-800 text-xs font-semibold rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Trending
              </span>
            )}
            {recipe.isNew && (
              <span className="px-2 py-1 bg-green-400/20 text-green-800 text-xs font-semibold rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> New
              </span>
            )}
            {recipe.awardWinning && (
              <span className="px-2 py-1 bg-purple-400/20 text-purple-800 text-xs font-semibold rounded-full flex items-center gap-1">
                <Award className="w-3 h-3" /> Award
              </span>
            )}
            {recipe.fast && (
              <span className="px-2 py-1 bg-cyan-400/20 text-cyan-800 text-xs font-semibold rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3" /> Fast
              </span>
            )}
            {recipe.spicy && (
              <span className="px-2 py-1 bg-red-400/20 text-red-800 text-xs font-semibold rounded-full flex items-center gap-1">
                <Flame className="w-3 h-3" /> Spicy
              </span>
            )}
          </div>
        )}

        {/* Enhanced: Quick nutrition info and personalized score */}
        {enhanced && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
            {recipe.nutrition && (
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="text-xs">
                  <div className="font-semibold text-orange-600">{recipe.nutrition.protein || 'N/A'}</div>
                  <div className="text-gray-500">Protein</div>
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-blue-600">{recipe.nutrition.carbs || 'N/A'}</div>
                  <div className="text-gray-500">Carbs</div>
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-green-600">{recipe.nutrition.fat || 'N/A'}</div>
                  <div className="text-gray-500">Fat</div>
                </div>
              </div>
            )}
            {personalizedScore !== null && (
              <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                <ChefHat className="w-4 h-4 text-green-600" />
                <span className="font-semibold">Personalized Score:</span>
                <span>{personalizedScore}/100</span>
              </div>
            )}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>
                **{viewCount}** views
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;