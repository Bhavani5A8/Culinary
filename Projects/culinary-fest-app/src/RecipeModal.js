import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { 
  Clock, Users, Star, Bookmark, Share2, 
  Utensils, BookOpen, Heart, Eye, X,
  ChefHat, Award, Calendar, Download,
  CheckCircle, Circle, ArrowLeft, ArrowRight
} from 'lucide-react';
import { Modal, Button, OptimizedImage } from './ui';
import { getRecipeDetails } from './recipeData';

const RecipeModal = ({ selectedRecipeId, isOpen, onClose }) => {
  // State management with proper initialization - ALL HOOKS CALLED UNCONDITIONALLY
  const [activeTab, setActiveTab] = useState('ingredients');
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkedIngredients, setCheckedIngredients] = useState(new Set());
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [servingMultiplier, setServingMultiplier] = useState(1);
  const [cookingTimer, setCookingTimer] = useState(null);
  const [showNutritionDetails, setShowNutritionDetails] = useState(false);

  // Refs for cleanup and scroll management - ALWAYS CALLED
  const modalRef = useRef(null);
  const timerRef = useRef(null);

  // FIXED: Get recipe with proper error handling - moved condition inside effect
  const recipe = useMemo(() => {
  if (!selectedRecipeId) return null;
  
  try {
    return getRecipeDetails(selectedRecipeId);
  } catch (error) {
    console.error('Error loading recipe details:', error);
    return null;
  }
}, [selectedRecipeId]);

  // FIXED: Enhanced initialization - condition moved inside useEffect
  useEffect(() => {
    // Early return if conditions not met, but hook is always called
    if (!selectedRecipeId || !isOpen) return;
    
    try {
      // Reset state when modal opens with new recipe
      setActiveTab('ingredients');
      setSaved(false);
      setError(null);
      setCheckedIngredients(new Set());
      setCompletedSteps(new Set());
      setServingMultiplier(1);
      setCookingTimer(null);
      setShowNutritionDetails(false);
      setIsLoading(false);

      // Scroll to top
      if (modalRef.current) {
        modalRef.current.scrollTop = 0;
      }
    } catch (error) {
      console.error('Error initializing recipe modal:', error);
      setError('Failed to load recipe details');
    }
  }, [selectedRecipeId, isOpen]);

  // FIXED: Cleanup timers - always called, condition inside
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Enhanced tabs with better organization
  const tabs = [
    { id: 'ingredients', label: 'Ingredients', icon: Utensils },
    { id: 'instructions', label: 'Instructions', icon: BookOpen },
    { id: 'nutrition', label: 'Nutrition', icon: Heart },
    { id: 'reviews', label: 'Reviews', icon: Star }
  ];

  // FIXED: Enhanced heat level renderer - always declared, condition inside
  const renderHeatLevel = useCallback((level) => {
    if (typeof level !== 'number' || level < 0) return null;
    
    try {
      const heatLabels = ['None', 'Mild', 'Medium', 'Hot', 'Very Hot', 'Extreme'];
      
      return (
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-4 rounded-full transition-colors ${
                i < level ? 'bg-red-500' : 'bg-gray-200'
              }`}
              aria-hidden="true"
            />
          ))}
          <span className="text-xs text-gray-600 ml-1">
            {heatLabels[Math.min(level, 5)] || 'Unknown'}
          </span>
        </div>
      );
    } catch (error) {
      console.error('Error rendering heat level:', error);
      return <span className="text-xs text-gray-500">Heat level unavailable</span>;
    }
  }, []);

  // Enhanced tab change with error handling - always declared
  const handleTabChange = useCallback((tabId) => {
    try {
      setActiveTab(tabId);
      setError(null);
      
      // Scroll to top of tab content
      const tabContent = document.querySelector('.tab-content');
      if (tabContent) {
        tabContent.scrollTop = 0;
      }
    } catch (error) {
      console.error('Error changing tab:', error);
      setError('Failed to switch tab');
    }
  }, []);

  // Enhanced save toggle with API simulation - always declared
  const handleSaveToggle = useCallback(async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const newSaved = !saved;
      setSaved(newSaved);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Could add actual API call here
      // await api.toggleSaveRecipe(recipe.id);
      
      console.log(`Recipe ${newSaved ? 'saved' : 'removed from saved'}`);
    } catch (error) {
      console.error('Error toggling save state:', error);
      setError('Failed to save recipe');
      setSaved(saved); // Rollback on error
    } finally {
      setIsLoading(false);
    }
  }, [saved, isLoading]);

  // Enhanced share functionality - always declared
  const handleShare = useCallback(async () => {
    // Condition moved inside the callback
    if (!recipe) return;
    
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
        // Could show success toast here
        console.log('Recipe link copied to clipboard!');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing recipe:', error);
        setError('Failed to share recipe');
      }
    }
  }, [recipe]);

  // Enhanced ingredient checking - always declared
  const handleIngredientCheck = useCallback((index) => {
    try {
      setCheckedIngredients(prev => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
    } catch (error) {
      console.error('Error checking ingredient:', error);
    }
  }, []);

  // Enhanced step completion - always declared
  const handleStepComplete = useCallback((index) => {
    try {
      setCompletedSteps(prev => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
    } catch (error) {
      console.error('Error completing step:', error);
    }
  }, []);

  // Enhanced serving size adjustment - always declared
  const handleServingChange = useCallback((multiplier) => {
    try {
      if (multiplier <= 0 || multiplier > 10) return;
      setServingMultiplier(multiplier);
    } catch (error) {
      console.error('Error changing serving size:', error);
    }
  }, []);

  // Cooking timer functionality - always declared
  const startCookingTimer = useCallback((minutes) => {
    try {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      let timeLeft = minutes * 60;
      setCookingTimer(timeLeft);
      
      timerRef.current = setInterval(() => {
        timeLeft -= 1;
        setCookingTimer(timeLeft);
        
        if (timeLeft <= 0) {
          clearInterval(timerRef.current);
          setCookingTimer(null);
          // Could show notification here
          console.log('Cooking timer finished!');
        }
      }, 1000);
    } catch (error) {
      console.error('Error starting cooking timer:', error);
    }
  }, []);

  // Format time display - always declared
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Enhanced close handler - always declared
  const handleClose = useCallback(() => {
    try {
      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        setCookingTimer(null);
      }
      
      // Reset error state
      setError(null);
      
      onClose();
    } catch (error) {
      console.error('Error closing modal:', error);
      onClose(); // Still close even if cleanup fails
    }
  }, [onClose]);

  // FIXED: Early returns moved after all hooks
  // Handle missing recipe case after all hooks are declared
  if (!recipe && isOpen) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Recipe Not Found" size="md">
        <div className="p-6 text-center">
          <div className="text-gray-500 mb-4">
            Sorry, we couldn't find the recipe you're looking for.
            {selectedRecipeId && (
              <div className="text-sm mt-2 text-gray-400">
                Recipe ID: {selectedRecipeId}
              </div>
            )}
          </div>
          <Button onClick={onClose} variant="primary">
            Close
          </Button>
        </div>
      </Modal>
    );
  }

  if (!recipe) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={recipe.title} size="xl">
      <div ref={modalRef} className="max-h-[90vh] overflow-y-auto">
        {/* Error banner */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <X className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Left Column - Recipe Info */}
          <div className="space-y-6">
            <div className="relative">
              <OptimizedImage
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 rounded-xl object-cover shadow-lg"
              />
              
              {/* Cooking timer overlay */}
              {cookingTimer && (
                <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-2 rounded-lg">
                  <div className="text-sm font-semibold">Cooking Timer</div>
                  <div className="text-lg font-mono">{formatTime(cookingTimer)}</div>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {/* Enhanced recipe stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span>{recipe.prepTime || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span>{Math.round((recipe.servings || 1) * servingMultiplier)} servings</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{recipe.rating || 'N/A'}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSaveToggle}
                    disabled={isLoading}
                    className="flex-shrink-0"
                  >
                    <Bookmark className={saved ? "w-4 h-4 fill-blue-600 text-blue-600" : "w-4 h-4"} />
                    {isLoading && <span className="ml-1">...</span>}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-shrink-0" 
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-shrink-0"
                    onClick={() => window.print()}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Enhanced serving size adjuster */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Serving Size:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleServingChange(servingMultiplier - 0.5)}
                    disabled={servingMultiplier <= 0.5}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-semibold">
                    {servingMultiplier}x
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleServingChange(servingMultiplier + 0.5)}
                    disabled={servingMultiplier >= 10}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Enhanced recipe details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Heat Level:</span>
                  {renderHeatLevel(recipe.heatLevel)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Difficulty:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {recipe.difficulty || 'Unknown'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Chef:</span>
                  <span className="text-sm font-medium">{recipe.chef || 'Unknown Chef'}</span>
                </div>
                {recipe.cookTime && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cook Time:</span>
                    <span className="text-sm font-medium">{recipe.cookTime}</span>
                  </div>
                )}
                {recipe.category && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Category:</span>
                    <span className="text-sm font-medium capitalize">{recipe.category}</span>
                  </div>
                )}
              </div>

              {/* Recipe description */}
              {recipe.description && (
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-sm text-orange-800 leading-relaxed">
                    {recipe.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Recipe Content */}
          <div>
            {/* Enhanced tab navigation */}
            <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1 overflow-x-auto">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex-1 min-w-0 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id 
                        ? 'bg-white text-blue-600 shadow-sm ring-2 ring-blue-100' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Enhanced tab content */}
            <div className="space-y-4 tab-content" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {activeTab === 'ingredients' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-lg">Ingredients</h4>
                    <div className="text-sm text-gray-600">
                      {checkedIngredients.size} of {recipe.ingredients?.length || 0} checked
                    </div>
                  </div>
                  
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-800">
                        Servings: {Math.round((recipe.servings || 1) * servingMultiplier)}
                      </span>
                      <span className="text-blue-800">
                        Prep: {recipe.prepTime || 'N/A'}
                      </span>
                      <span className="text-blue-800">
                        {Math.round((recipe.calories || 0) * servingMultiplier)} cal per serving
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-3 group">
                        <button
                          onClick={() => handleIngredientCheck(index)}
                          className="mt-1 flex-shrink-0 transition-colors"
                        >
                          {checkedIngredients.has(index) ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                          )}
                        </button>
                        <span className={`text-sm leading-relaxed ${
                          checkedIngredients.has(index) 
                            ? 'text-gray-500 line-through' 
                            : 'text-gray-900'
                        }`}>
                          {ingredient}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Shopping list export */}
                  <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-800">
                        Need to shop? Export your list!
                      </span>
                      <Button variant="outline" size="sm">
                        Export List
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'instructions' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-lg">Instructions</h4>
                    <div className="flex items-center gap-2">
                      {recipe.prepTime && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startCookingTimer(parseInt(recipe.prepTime))}
                        >
                          Start Timer
                        </Button>
                      )}
                      <div className="text-sm text-gray-600">
                        {completedSteps.size} of {recipe.instructions?.length || 0} completed
                      </div>
                    </div>
                  </div>

                  <ol className="space-y-6">
                    {recipe.instructions && recipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-4 group">
                        <button
                          onClick={() => handleStepComplete(index)}
                          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all"
                          style={{
                            backgroundColor: completedSteps.has(index) ? '#10b981' : '#e5e7eb',
                            color: completedSteps.has(index) ? 'white' : '#6b7280'
                          }}
                        >
                          {completedSteps.has(index) ? '✓' : index + 1}
                        </button>
                        <div className="flex-1">
                          <p className={`text-sm leading-relaxed ${
                            completedSteps.has(index)
                              ? 'text-gray-500 line-through'
                              : 'text-gray-900'
                          }`}>
                            {instruction}
                          </p>
                          
                          {/* Step timer for common cooking times */}
                          {instruction.toLowerCase().includes('minutes') && (
                            <div className="mt-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const timeMatch = instruction.match(/(\d+)\s*minutes?/i);
                                  if (timeMatch) {
                                    startCookingTimer(parseInt(timeMatch[1]));
                                  }
                                }}
                                className="text-xs text-blue-600 hover:text-blue-800"
                              >
                                Set Timer
                              </Button>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>

                  {/* Progress indicator */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between text-sm text-blue-800 mb-2">
                      <span>Cooking Progress</span>
                      <span>{Math.round((completedSteps.size / (recipe.instructions?.length || 1)) * 100)}%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(completedSteps.size / (recipe.instructions?.length || 1)) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div>
                  <h4 className="font-semibold text-lg mb-4">
                    Nutrition Facts (Per Serving)
                  </h4>
                  
                  {/* Main nutrition display */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-gray-900">
                        {Math.round((recipe.calories || 0) * servingMultiplier)} Calories
                      </div>
                      <div className="text-sm text-gray-600">
                        per serving (adjusted for {servingMultiplier}x servings)
                      </div>
                    </div>
                    
                    {recipe.nutrition && (
                      <div className="grid grid-cols-2 gap-4 text-sm border-t pt-4">
                        {Object.entries(recipe.nutrition).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-1 border-b border-gray-100">
                            <span className="capitalize font-medium">{key}</span>
                            <span className="font-semibold text-gray-900">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Detailed nutrition toggle */}
                  <div className="text-center mb-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowNutritionDetails(!showNutritionDetails)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {showNutritionDetails ? 'Hide' : 'Show'} Detailed Nutrition
                    </Button>
                  </div>

                  {/* Detailed nutrition info */}
                  {showNutritionDetails && (
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-semibold mb-3">Dietary Information</h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span>Vegetarian</span>
                            <span>{recipe.tags?.includes('Vegetarian') ? '✓' : '✗'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Gluten-Free</span>
                            <span>{recipe.tags?.includes('Gluten-Free') ? '✓' : '✗'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Dairy-Free</span>
                            <span>{recipe.tags?.includes('Dairy-Free') ? '✓' : '✗'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Low Sodium</span>
                            <span>{recipe.tags?.includes('Low Sodium') ? '✓' : '✗'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4">
                        <h5 className="font-semibold mb-3 text-blue-900">Health Benefits</h5>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Rich in essential nutrients</li>
                          <li>• Balanced macronutrient profile</li>
                          <li>• Contains beneficial antioxidants</li>
                          <li>• Supports healthy cooking practices</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-lg">Reviews ({recipe.reviews || 0})</h4>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{recipe.rating || 'N/A'}</span>
                    </div>
                  </div>
                  
                  {/* Write review section */}
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium text-blue-900">Share your experience!</h5>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button key={star} className="text-gray-300 hover:text-yellow-400 transition-colors">
                            <Star className="w-4 h-4" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <Button variant="primary" size="sm" className="w-full sm:w-auto">
                      <Star className="w-4 h-4 mr-2" />
                      Write a Review
                    </Button>
                  </div>
                  
                  {/* Enhanced review list */}
                  <div className="space-y-4">
                    {/* Sample reviews with better styling */}
                    {[
                      { name: "John Doe", initials: "JD", rating: 5, text: "Amazing recipe! The flavors were perfectly balanced and my family loved it. Will definitely make this again.", date: "2 days ago", verified: true },
                      { name: "Anita Sharma", initials: "AS", rating: 5, text: "Perfect for festivals! Made this for Diwali and everyone couldn't stop asking for the recipe.", date: "1 week ago", verified: true },
                      { name: "Maria Krishnan", initials: "MK", rating: 4, text: "Good recipe but took a bit longer than expected. The taste was authentic though. Great for special occasions.", date: "2 weeks ago", verified: false },
                      { name: "Rajesh Patel", initials: "RP", rating: 5, text: "Excellent step-by-step instructions! Even as a beginner cook, I was able to make this successfully. Highly recommended!", date: "3 weeks ago", verified: true }
                    ].map((review, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-sm font-semibold">{review.initials}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">{review.name}</span>
                                {review.verified && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Verified
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500">{review.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star 
                                key={star} 
                                className={`w-4 h-4 ${
                                  star <= review.rating 
                                    ? 'fill-yellow-400 text-yellow-400' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {review.text}
                        </p>
                        
                        {/* Review actions */}
                        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                          <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            Helpful ({Math.floor(Math.random() * 20) + 1})
                          </button>
                          <button className="text-xs text-gray-500 hover:text-gray-700">
                            Reply
                          </button>
                          <button className="text-xs text-gray-500 hover:text-gray-700">
                            Report
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Load more reviews */}
                  <div className="mt-6 text-center">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <Eye className="w-4 h-4 mr-2" />
                      Load More Reviews
                    </Button>
                  </div>

                  {/* Review summary */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-semibold mb-3">Review Summary</h5>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map(stars => {
                        const count = Math.floor(Math.random() * 50) + (stars === 5 ? 80 : stars === 4 ? 60 : 20);
                        const percentage = (count / 200) * 100;
                        return (
                          <div key={stars} className="flex items-center gap-2 text-sm">
                            <span className="w-8">{stars} ★</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="w-12 text-right text-gray-600">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced modal footer with cooking controls */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {cookingTimer && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="font-mono font-semibold">
                    Timer: {formatTime(cookingTimer)}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      clearInterval(timerRef.current);
                      setCookingTimer(null);
                    }}
                  >
                    Stop
                  </Button>
                </div>
              )}
              
              {activeTab === 'ingredients' && (
                <div className="text-sm text-gray-600">
                  Progress: {Math.round((checkedIngredients.size / (recipe.ingredients?.length || 1)) * 100)}% ingredients checked
                </div>
              )}
              
              {activeTab === 'instructions' && (
                <div className="text-sm text-gray-600">
                  Progress: {Math.round((completedSteps.size / (recipe.instructions?.length || 1)) * 100)}% steps completed
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {activeTab !== 'ingredients' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTabChange('ingredients')}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Ingredients
                </Button>
              )}
              
              {activeTab === 'ingredients' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleTabChange('instructions')}
                >
                  Start Cooking
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              )}
              
              {activeTab === 'instructions' && completedSteps.size === (recipe.instructions?.length || 0) && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleTabChange('reviews')}
                >
                  Recipe Complete! Rate It
                  <Star className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RecipeModal;