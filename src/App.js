import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header.js';
import HeroSection from './HeroSection.js';
import SouthIndianBreakfast from './SouthIndianBreakfast.js';
import FeaturedRecipes from './FeaturedRecipes.js';
import NewsletterModal from './NewsletterModal.js';
import RecipeModal from './RecipeModal.js';
import Footer from './Footer.js';
import { KitchenModeOverlay, ErrorBoundaryWrapper } from './enhanced.js';

// Code-split: IndianCuisineApp is large (45 KB) — load only when navigated to
const IndianCuisineApp = lazy(() => import('./IndianCuisineApp.js'));

// Newsletter shows at most once per browser session
const NEWSLETTER_SESSION_KEY = 'culinary_newsletter_shown';

// ─── Home page ────────────────────────────────────────────────────────────────
const HomePage = ({ onShowNewsletter, onRecipeClick, searchFilters }) => (
  <>
    <HeroSection onShowNewsletter={onShowNewsletter} />
    <div className="container mx-auto px-4 py-8">
      <SouthIndianBreakfast onRecipeClick={onRecipeClick} />
      <FeaturedRecipes
        onRecipeClick={onRecipeClick}
        searchFilters={searchFilters}
      />
    </div>
  </>
);

// ─── Indian cuisine page (lazy) ───────────────────────────────────────────────
const IndianPage = ({ onRecipeClick }) => (
  <Suspense fallback={
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 font-medium">Loading Indian Cuisine...</p>
      </div>
    </div>
  }>
    <IndianCuisineApp onRecipeClick={onRecipeClick} />
  </Suspense>
);

// ─── Root app shell ───────────────────────────────────────────────────────────
const CulinaryFest = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showNewsletter, setShowNewsletter] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [searchFilters, setSearchFilters] = useState({});
  const [kitchenModeActive, setKitchenModeActive] = useState(false);

  // Auto-show newsletter once per session, only on the home page
  useEffect(() => {
    if (location.pathname !== '/') return;
    const alreadyShown = sessionStorage.getItem(NEWSLETTER_SESSION_KEY);
    if (!alreadyShown) {
      const timer = setTimeout(() => setShowNewsletter(true), 8000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleShowNewsletter = () => setShowNewsletter(true);

  const handleCloseNewsletter = () => {
    setShowNewsletter(false);
    sessionStorage.setItem(NEWSLETTER_SESSION_KEY, '1');
  };

  const handleRecipeClick = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setShowRecipeModal(true);
  };

  const handleCloseRecipeModal = () => {
    setShowRecipeModal(false);
    setSelectedRecipeId(null);
  };

  const handleNavigateToIndian = () => navigate('/indian-cuisine');

  const handleSearch = (query) => {
    setSearchFilters(prev => ({ ...prev, query }));
  };

  return (
    <ErrorBoundaryWrapper>
      <div className="flex flex-col min-h-screen bg-white font-sans text-gray-900">
        <Header
          onShowNewsletter={handleShowNewsletter}
          onNavigateToIndian={handleNavigateToIndian}
          onSearch={handleSearch}
        />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onShowNewsletter={handleShowNewsletter}
                  onRecipeClick={handleRecipeClick}
                  searchFilters={searchFilters}
                />
              }
            />
            <Route
              path="/indian-cuisine"
              element={<IndianPage onRecipeClick={handleRecipeClick} />}
            />
            {/* Fallback: redirect unknown paths to home */}
            <Route
              path="*"
              element={
                <HomePage
                  onShowNewsletter={handleShowNewsletter}
                  onRecipeClick={handleRecipeClick}
                  searchFilters={searchFilters}
                />
              }
            />
          </Routes>
        </main>

        <Footer />

        <NewsletterModal
          isOpen={showNewsletter}
          onClose={handleCloseNewsletter}
        />

        <RecipeModal
          selectedRecipeId={selectedRecipeId}
          isOpen={showRecipeModal}
          onClose={handleCloseRecipeModal}
        />

        {kitchenModeActive && (
          <KitchenModeOverlay
            isActive={kitchenModeActive}
            onToggle={() => setKitchenModeActive(prev => !prev)}
          />
        )}
      </div>
    </ErrorBoundaryWrapper>
  );
};

export default CulinaryFest;
