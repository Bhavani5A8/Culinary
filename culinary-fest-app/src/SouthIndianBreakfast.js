import React, { useState, useEffect } from 'react';
import { 
  Utensils, Filter, SortAsc, Grid3X3, List, 
  MapPin, Clock, TrendingUp, Award, Sparkles,
  ChefHat, Heart, Star, Search, Play, Book
} from 'lucide-react';
import RecipeCard from './RecipeCard';
import RecipeModal from './RecipeModal';
import { Button, Input, Loading } from './ui';
import { southIndianBreakfast, featuredRecipes } from './recipeData';

const SouthIndianBreakfast = ({ onRecipeClick }) => {
  // FIXED: Combine both recipe arrays for complete data access
  const allAvailableRecipes = [...(southIndianBreakfast || []), ...(featuredRecipes || [])];
  
  // Core state (unchanged for backward compatibility)
  const [recipes, setRecipes] = useState(allAvailableRecipes);

  // FIXED: Enhanced modal state management with better logging
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Enhanced state layers (additive only)
  const [filteredRecipes, setFilteredRecipes] = useState(allAvailableRecipes);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [filterBy, setFilterBy] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTime, setSelectedTime] = useState('all');
  const [selectedDiet, setSelectedDiet] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [regionalStats, setRegionalStats] = useState({
    totalRecipes: allAvailableRecipes.length,
    avgRating: 4.8,
    popularTime: 'Morning',
    topChef: 'Lakshmi Iyer'
  });
  const [featuredTip, setFeaturedTip] = useState(null);
  const [userPreferences, setUserPreferences] = useState({
    favoriteRegion: 'Tamil Nadu',
    skillLevel: 'intermediate',
    dietaryRestrictions: []
  });

  // Enhanced initialization
  useEffect(() => {
    try {
      initializeEnhancedFeatures();
    } catch (error) {
      console.error('Error initializing South Indian Breakfast section:', error);
    }
  }, []);

  // Enhanced filtering and sorting
  useEffect(() => {
    try {
      applyFiltersAndSort();
    } catch (error) {
      console.error('Error applying filters:', error);
      setFilteredRecipes(recipes);
    }
  }, [recipes, sortBy, filterBy, searchQuery, selectedDifficulty, selectedTime, selectedDiet]);

  const initializeEnhancedFeatures = async () => {
    try {
      setLoading(true);
      
      // Enhanced: Load regional statistics
      await loadRegionalStats();
      
      // Enhanced: Generate cooking tip based on time/weather
      generateContextualTip();
      
      // Enhanced: Load user preferences
      loadUserPreferences();
      
      setLoading(false);
    } catch (error) {
      console.error('Error initializing enhanced features:', error);
      setLoading(false);
    }
  };

  const loadRegionalStats = async () => {
    try {
      // Simulate API call for real-time stats
      const stats = {
        totalRecipes: recipes.length,
        avgRating: recipes.reduce((acc, recipe) => acc + recipe.rating, 0) / recipes.length,
        popularTime: new Date().getHours() < 10 ? 'Morning' : 'All Day',
        topChef: recipes.reduce((acc, recipe) => {
          acc[recipe.chef] = (acc[recipe.chef] || 0) + 1;
          return acc;
        }, {}),
      };
      
      stats.topChef = Object.entries(stats.topChef).reduce((a, b) => 
        stats.topChef[a[0]] > stats.topChef[b[0]] ? a : b
      )[0];
      
      setRegionalStats(stats);
    } catch (error) {
      console.error('Error loading regional stats:', error);
    }
  };

  const generateContextualTip = () => {
    try {
      const hour = new Date().getHours();
      const tips = {
        morning: {
          title: "Perfect Morning Choice!",
          content: "South Indian breakfast is traditionally eaten fresh and warm. These recipes are perfect for starting your day with authentic flavors.",
          icon: "☀️"
        },
        afternoon: {
          title: "Brunch Time!",
          content: "These breakfast recipes make excellent brunch options. Try the dosa with extra chutneys for a satisfying meal.",
          icon: "🥞"
        },
        evening: {
          title: "Light Evening Meal",
          content: "South Indian breakfast items are perfect for light dinners too. They're easy to digest and nutritious.",
          icon: "🌙"
        }
      };
      
      const timeOfDay = hour < 11 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
      setFeaturedTip(tips[timeOfDay]);
    } catch (error) {
      console.error('Error generating contextual tip:', error);
    }
  };

  const loadUserPreferences = () => {
    try {
      // Mock user preferences loading
      setUserPreferences({
        favoriteRegion: 'Tamil Nadu',
        skillLevel: 'intermediate',
        dietaryRestrictions: ['vegetarian']
      });
    } catch (error) {
      console.error('Error loading user preferences:', error);
    }
  };

  const applyFiltersAndSort = () => {
    try {
      let filtered = [...recipes];

      // Enhanced search with multiple criteria
      if (searchQuery) {
        filtered = filtered.filter(recipe =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          recipe.chef.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Enhanced difficulty filter
      if (selectedDifficulty !== 'all') {
        filtered = filtered.filter(recipe => recipe.difficulty === selectedDifficulty);
      }

      // Enhanced time filter
      if (selectedTime !== 'all') {
        filtered = filtered.filter(recipe => {
          const prepTime = parseInt(recipe.prepTime);
          switch (selectedTime) {
            case 'quick': return prepTime <= 30;
            case 'medium': return prepTime > 30 && prepTime <= 60;
            case 'long': return prepTime > 60;
            default: return true;
          }
        });
      }

      // Enhanced dietary filter
      if (selectedDiet !== 'all') {
        filtered = filtered.filter(recipe =>
          recipe.tags?.some(tag => tag.toLowerCase().includes(selectedDiet.toLowerCase()))
        );
      }

      // Enhanced sorting with multiple options
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'rating':
            return b.rating - a.rating;
          case 'time':
            return parseInt(a.prepTime) - parseInt(b.prepTime);
          case 'difficulty':
            const diffOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
            return diffOrder[a.difficulty] - diffOrder[b.difficulty];
          case 'name':
            return a.title.localeCompare(b.title);
          case 'chef':
            return a.chef.localeCompare(b.chef);
          case 'popular':
          default:
            return (b.reviews || 0) - (a.reviews || 0);
        }
      });

      setFilteredRecipes(filtered);
    } catch (error) {
      console.error('Error applying filters and sort:', error);
      setFilteredRecipes(recipes);
    }
  };

  // FIXED: Complete recipe click handler with comprehensive state management
  const handleRecipeClick = (recipeId) => {
    try {
      console.log('🎯 SouthIndianBreakfast - handleRecipeClick called with ID:', recipeId);
      console.log('📊 SouthIndianBreakfast - Current modal state:', { selectedRecipeId, isModalOpen });
      
      if (recipeId) {
        // FIXED: Verify recipe exists in our available recipes
        const recipeExists = allAvailableRecipes.find(r => r.id === recipeId);
        if (recipeExists) {
          console.log('✅ SouthIndianBreakfast - Recipe found, opening modal for:', recipeExists.title);
          
          setSelectedRecipeId(recipeId);
          setIsModalOpen(true);
          
          // FIXED: Also call parent handler if provided
          if (onRecipeClick) {
            onRecipeClick(recipeId);
          }
          
        } else {
          console.error('❌ SouthIndianBreakfast - Recipe not found in available recipes:', recipeId);
          console.log('📋 SouthIndianBreakfast - Available recipe IDs:', allAvailableRecipes.map(r => r.id));
        }
      } else {
        console.error('❌ SouthIndianBreakfast - No recipe ID provided');
      }
    } catch (error) {
      console.error('💥 Error handling recipe click in SouthIndianBreakfast:', error);
    }
  };

  // FIXED: Enhanced modal close handler with complete state cleanup
  const handleModalClose = () => {
    try {
      console.log('🚪 SouthIndianBreakfast - handleModalClose called');
      console.log('📊 SouthIndianBreakfast - Current state before close:', { selectedRecipeId, isModalOpen });
      
      // FIXED: Immediate and complete state cleanup
      setIsModalOpen(false);
      setSelectedRecipeId(null);
      
      console.log('✅ SouthIndianBreakfast - Modal state cleaned up');
    } catch (error) {
      console.error('💥 Error closing modal in SouthIndianBreakfast:', error);
    }
  };

  const handleSearchChange = (e) => {
    try {
      setSearchQuery(e.target.value);
    } catch (error) {
      console.error('Error handling search change:', error);
    }
  };

  const handleSortChange = (newSortBy) => {
    try {
      setSortBy(newSortBy);
    } catch (error) {
      console.error('Error handling sort change:', error);
    }
  };

  const toggleFilters = () => {
    try {
      setShowFilters(!showFilters);
    } catch (error) {
      console.error('Error toggling filters:', error);
    }
  };

  const resetFilters = () => {
    try {
      setSearchQuery('');
      setSelectedDifficulty('all');
      setSelectedTime('all');
      setSelectedDiet('all');
      setSortBy('popular');
      setFilterBy('all');
    } catch (error) {
      console.error('Error resetting filters:', error);
    }
  };

  const handleWatchTutorial = () => {
    try {
      console.log('Opening tutorial for South Indian breakfast basics');
      // Enhanced: Open tutorial modal or navigate to tutorial section
    } catch (error) {
      console.error('Error handling tutorial:', error);
    }
  };

  const handleViewRegionalGuide = () => {
    try {
      console.log('Opening regional cooking guide');
      // Enhanced: Open comprehensive regional guide
    } catch (error) {
      console.error('Error handling regional guide:', error);
    }
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Loading size="lg" text="Loading delicious South Indian recipes..." />
        </div>
      </section>
    );
  }

  // FIXED: Get selected recipe for modal rendering
  const selectedRecipe = selectedRecipeId ? allAvailableRecipes.find(r => r.id === selectedRecipeId) : null;

  return (
    <section id="south-breakfast" className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4">
        {/* Enhanced header with regional context */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Utensils className="w-4 h-4" />
            South Indian Specials
            <span className="bg-amber-200 text-amber-800 px-2 py-1 rounded-full text-xs">
              {regionalStats.totalRecipes} Recipes
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Authentic South Indian Breakfast
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Start your day with traditional flavors from the southern states of India
          </p>

          {/* Enhanced stats bar */}
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600 mb-8">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{regionalStats.avgRating.toFixed(1)} Average Rating</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>Best for {regionalStats.popularTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <ChefHat className="w-4 h-4 text-purple-500" />
              <span>Top Chef: {regionalStats.topChef}</span>
            </div>
          </div>

          {/* Enhanced contextual tip */}
          {featuredTip && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 max-w-2xl mx-auto mb-8">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{featuredTip.icon}</div>
                <div className="text-left">
                  <h4 className="font-bold text-blue-800 mb-2">{featuredTip.title}</h4>
                  <p className="text-blue-700 text-sm leading-relaxed">{featuredTip.content}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced search and filter controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Enhanced search */}
            <div className="flex-1 w-full lg:w-auto">
              <Input
                type="text"
                placeholder="Search recipes, ingredients, chefs..."
                value={searchQuery}
                onChange={handleSearchChange}
                icon={Search}
                className="w-full"
              />
            </div>

            {/* Enhanced controls */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Sort dropdown */}
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:border-gray-400 focus:border-orange-500 focus:outline-none transition-colors"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="time">Quickest First</option>
                <option value="difficulty">Easiest First</option>
                <option value="name">A to Z</option>
                <option value="chef">By Chef</option>
              </select>

              {/* Filter toggle */}
              <Button
                variant="outline"
                onClick={toggleFilters}
                className={`flex items-center gap-2 ${showFilters ? 'bg-orange-50 border-orange-300' : ''}`}
              >
                <Filter className="w-4 h-4" />
                Filters
                {(selectedDifficulty !== 'all' || selectedTime !== 'all' || selectedDiet !== 'all') && (
                  <span className="bg-orange-500 text-white text-xs rounded-full w-2 h-2"></span>
                )}
              </Button>

              {/* View mode toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced filter panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white hover:border-gray-400 focus:border-orange-500 focus:outline-none transition-colors"
                >
                  <option value="all">All Levels</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prep Time</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white hover:border-gray-400 focus:border-orange-500 focus:outline-none transition-colors"
                >
                  <option value="all">Any Time</option>
                  <option value="quick">Under 30 min</option>
                  <option value="medium">30-60 min</option>
                  <option value="long">Over 1 hour</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dietary</label>
                <select
                  value={selectedDiet}
                  onChange={(e) => setSelectedDiet(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white hover:border-gray-400 focus:border-orange-500 focus:outline-none transition-colors"
                >
                  <option value="all">All Diets</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten-free">Gluten Free</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="w-full"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          )}

          {/* Enhanced results summary */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {filteredRecipes.length} of {recipes.length} recipes
              {searchQuery && (
                <span className="font-medium text-orange-600"> for "{searchQuery}"</span>
              )}
            </span>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWatchTutorial}
                className="flex items-center gap-2 text-green-600 hover:text-green-800"
              >
                <Book className="w-4 h-4" />
                Regional Guide
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced recipe grid with responsive layout */}
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-16 bg-white/50 rounded-2xl">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No recipes found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or filters to find more recipes.
            </p>
            <Button onClick={resetFilters} variant="primary">
              Reset All Filters
            </Button>
          </div>
        ) : (
          <>
            {/* Enhanced: Featured/recommended recipes section */}
            {!searchQuery && (
              <>
                {/* Today's recommendations */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Recommended for You</h3>
                      <p className="text-gray-600 text-sm">Based on your preferences and cooking history</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {filteredRecipes
                      .filter(recipe => 
                        userPreferences.skillLevel === 'beginner' ? recipe.difficulty === 'Easy' :
                        userPreferences.skillLevel === 'advanced' ? recipe.difficulty === 'Hard' :
                        recipe.difficulty === 'Medium'
                      )
                      .slice(0, 2)
                      .map((recipe) => (
                        <RecipeCard 
                          key={recipe.id} 
                          recipe={recipe} 
                          onClick={handleRecipeClick}
                          enhanced={true}
                          variant="featured"
                        />
                      ))
                    }
                  </div>
                </div>

                {/* Trending recipes */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Trending This Week</h3>
                      <p className="text-gray-600 text-sm">Most popular recipes among our community</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {filteredRecipes
                      .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
                      .slice(0, 3)
                      .map((recipe) => (
                        <RecipeCard 
                          key={recipe.id} 
                          recipe={{ ...recipe, trending: true }} 
                          onClick={handleRecipeClick}
                          enhanced={true}
                          variant="compact"
                        />
                      ))
                    }
                  </div>
                </div>
              </>
            )}

            {/* Main recipe grid */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {searchQuery ? 'Search Results' : 'All Available Recipes'}
                  </h3>
                  <p className="text-gray-600 text-sm">Authentic flavors from across India</p>
                </div>
              </div>

              <div className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1 lg:grid-cols-2'
              }`}>
                {filteredRecipes.map((recipe) => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onClick={handleRecipeClick}
                    enhanced={true}
                    variant={viewMode === 'list' ? 'compact' : 'default'}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Enhanced: Additional resources section */}
        {!searchQuery && filteredRecipes.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">
                Master South Indian Cooking
              </h3>
              <p className="text-purple-700 max-w-2xl mx-auto">
                Take your South Indian cooking skills to the next level with our comprehensive resources
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/90 transition-colors cursor-pointer group">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Play className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Video Tutorials</h4>
                <p className="text-gray-600 text-sm mb-4">Step-by-step cooking demonstrations</p>
                <Button variant="outline" size="sm" onClick={handleWatchTutorial}>
                  Start Learning
                </Button>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/90 transition-colors cursor-pointer group">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Book className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Cooking Guide</h4>
                <p className="text-gray-600 text-sm mb-4">Complete guide to South Indian techniques</p>
                <Button variant="outline" size="sm" onClick={handleViewRegionalGuide}>
                  Download Guide
                </Button>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/90 transition-colors cursor-pointer group">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Regional Specialties</h4>
                <p className="text-gray-600 text-sm mb-4">Explore dishes from different states</p>
                <Button variant="outline" size="sm">
                  Explore Regions
                </Button>
              </div>
            </div>

            {/* Enhanced: Community stats */}
            <div className="mt-8 pt-8 border-t border-purple-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-700">{regionalStats.totalRecipes}</div>
                  <div className="text-sm text-purple-600">Authentic Recipes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-700">50K+</div>
                  <div className="text-sm text-purple-600">Happy Cooks</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-700">{regionalStats.avgRating.toFixed(1)}⭐</div>
                  <div className="text-sm text-purple-600">Average Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-700">4 States</div>
                  <div className="text-sm text-purple-600">Regions Covered</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced: Load more functionality */}
        {filteredRecipes.length >= 10 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="group">
              Load More Recipes
              <TrendingUp className="w-4 h-4 ml-2 transition-transform group-hover:translate-y-1" />
            </Button>
          </div>
        )}
      </div>

      {/* FIXED: RecipeModal with enhanced state management */}
      {isModalOpen && selectedRecipeId && selectedRecipe && (
        <RecipeModal
          selectedRecipeId={selectedRecipeId}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </section>
  );
};

export default SouthIndianBreakfast;