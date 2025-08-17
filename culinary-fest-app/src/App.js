import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import HeroSection from './HeroSection.js';
import SouthIndianBreakfast from './SouthIndianBreakfast.js';
import FeaturedRecipes from './FeaturedRecipes.js';
import NewsletterModal from './NewsletterModal.js';
import RecipeModal from './RecipeModal.js';
import IndianCuisineApp from './IndianCuisineApp.js';
import Footer from './Footer.js';

// NEW ENHANCEMENT LAYERS - Additive only, no existing code modification
import {
  KitchenModeOverlay,
  ErrorBoundaryWrapper,
} from './enhanced.js';

// NEW: Import the recipe data helper function
import { getRecipeDetails } from './recipeData.js';

const CulinaryFest = () => {
  // EXISTING STATE - Preserved exactly as is
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'indian'

  // NEW ENHANCEMENT STATE - Additive layer, doesn't interfere with existing
  const [enhancedFeatures, setEnhancedFeatures] = useState({
    smartSearch: false,
    kitchenMode: false,
    personalization: false,
    offlineMode: false,
    aiRecommendations: false
  });
  const [userPreferences, setUserPreferences] = useState(null);
  const [searchFilters, setSearchFilters] = useState({});
  const [kitchenModeActive, setKitchenModeActive] = useState(false);

  // EXISTING EFFECT - Preserved for existing functionality
  useEffect(() => {
    // Logic for initial load or data fetching for the main app
    console.log('CulinaryFest app has loaded.');
  }, []);

  // NEW ENHANCEMENT EFFECT - Manages state based on enhanced features
  useEffect(() => {
    // This effect runs whenever enhancedFeatures or userPreferences change
    // It can trigger side effects like fetching recommendations or enabling offline mode
    if (enhancedFeatures.personalization) {
      console.log('Personalization is enabled. Loading user preferences...');
      // Mock loading preferences
      setTimeout(() => {
        setUserPreferences({
          dietary: 'Vegetarian',
          cuisine: 'South Indian',
          spiciness: 'Medium',
          favorites: ['masala-dosa'],
          searchHistory: ['dosa', 'idli']
        });
      }, 500);
    }
  }, [enhancedFeatures.personalization]);

  // Handler functions for existing components
  const handleRecipeClick = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setShowRecipeModal(true);
  };

  const handleCloseRecipeModal = () => {
    setShowRecipeModal(false);
    setSelectedRecipeId(null);
  };

  const handleNavigateToIndian = () => {
    setCurrentView('indian');
  };

  // NEW HANDLER - Toggles enhanced features
  const handleToggleEnhancedFeature = (featureName) => {
    setEnhancedFeatures(prev => ({
      ...prev,
      [featureName]: !prev[featureName]
    }));
  };

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    setSearchFilters(prev => ({ ...prev, query }));
    // This would trigger a re-render of FeaturedRecipes, which would then filter its content.
  };

  const handleApplyFilters = (filters) => {
    setSearchFilters(prev => ({ ...prev, ...filters }));
  };

  const handleKitchenModeToggle = () => {
    setKitchenModeActive(prev => !prev);
  };


  // CONDITIONAL RENDERING
  if (currentView === 'indian') {
    return <IndianCuisineApp onRecipeClick={handleRecipeClick} />;
  }

  return (
    <ErrorBoundaryWrapper>
      <div className="flex flex-col min-h-screen bg-white font-sans text-gray-900">
        <Header
          onShowNewsletter={() => setShowNewsletter(true)}
          onNavigateToIndian={handleNavigateToIndian}
        />
        <main className="flex-1">
          <HeroSection onShowNewsletter={() => setShowNewsletter(true)} />
          <div className="container mx-auto px-4 py-8">
            <SouthIndianBreakfast onRecipeClick={handleRecipeClick} />
            <FeaturedRecipes
              onRecipeClick={handleRecipeClick}
              searchFilters={searchFilters}
              enhancedFeatures={enhancedFeatures}
            />
          </div>
        </main>
        <Footer />
        <NewsletterModal
          isOpen={showNewsletter}
          onClose={() => setShowNewsletter(false)}
        />
        <RecipeModal
          selectedRecipeId={selectedRecipeId}
          isOpen={showRecipeModal}
          onClose={handleCloseRecipeModal}
        />

        {/* NEW ENHANCEMENT LAYERS */}
        {enhancedFeatures.kitchenMode && (
          <KitchenModeOverlay
            isActive={kitchenModeActive}
            onToggle={handleKitchenModeToggle}
          />
        )}
 
        {/* DEBUGGING/DEV UI FOR ENHANCEMENTS */}
        <div className="fixed bottom-4 right-4 z-50 p-4 bg-gray-900 text-white rounded-xl shadow-lg border border-gray-700">
          <h4 className="font-semibold mb-2">Toggle Enhancements</h4>
          <div className="flex flex-col gap-2 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={enhancedFeatures.smartSearch}
                  onChange={() => handleToggleEnhancedFeature('smartSearch')}
                  className="rounded"
                />
                Smart Search
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={enhancedFeatures.aiRecommendations}
                  onChange={() => handleToggleEnhancedFeature('aiRecommendations')}
                  className="rounded"
                />
                AI Recommendations
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={enhancedFeatures.personalization}
                  onChange={() => handleToggleEnhancedFeature('personalization')}
                  className="rounded"
                />
                Personalization
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={enhancedFeatures.offlineMode}
                  onChange={() => handleToggleEnhancedFeature('offlineMode')}
                  className="rounded"
                />
                Offline Mode
              </label>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundaryWrapper>
  );
};

export default CulinaryFest;
