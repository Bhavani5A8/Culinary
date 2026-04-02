import React, { useState, useEffect } from 'react';
import { Clock, Users, Star, Bookmark, Share2, Utensils, BookOpen, Heart, Eye, X } from 'lucide-react';
import { getRecipeDetails } from './recipeData';

const RecipeModal = ({ selectedRecipeId, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('ingredients');
  const [saved, setSaved] = useState(false);

  const recipe = selectedRecipeId ? getRecipeDetails(selectedRecipeId) : null;

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Reset tabs when a new recipe opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab('ingredients');
      setSaved(false);
    }
  }, [selectedRecipeId, isOpen]);

  // Not open or no recipe — render nothing
  if (!isOpen || !recipe) return null;

  const difficultyColor =
    recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
    recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
    'bg-red-100 text-red-800';

  const heatLabel = ['None', 'Mild', 'Medium', 'Hot', 'Very Hot', 'Extreme'];

  return (
    // Backdrop — clicking the gray area closes the modal
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center overflow-y-auto p-4"
      onClick={onClose}
    >
      {/* Modal box — clicks inside do NOT close the modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Header ── */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{recipe.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{recipe.description}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 flex-shrink-0 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left column */}
          <div className="space-y-5">
            {/* Image */}
            <img
              src={recipe.image}
              alt={recipe.title}
              loading="lazy"
              className="w-full h-56 object-cover rounded-xl shadow"
            />

            {/* Quick stats */}
            <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {recipe.prepTime}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" /> {recipe.servings} servings
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {recipe.rating}
              </span>
              <span className="text-gray-500">{recipe.calories} cal</span>
            </div>

            {/* Meta grid */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Difficulty</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${difficultyColor}`}>
                  {recipe.difficulty}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Heat</span>
                <span className="font-medium text-gray-700">{heatLabel[recipe.heatLevel || 0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Chef</span>
                <span className="font-medium text-gray-700">{recipe.chef}</span>
              </div>
            </div>

            {/* Tags */}
            {recipe.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {recipe.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setSaved(!saved)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  saved ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Bookmark className={saved ? 'w-4 h-4 fill-blue-500' : 'w-4 h-4'} />
                {saved ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: recipe.title, url: window.location.href });
                  } else {
                    navigator.clipboard?.writeText(window.location.href);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>

          {/* Right column */}
          <div>
            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-5">
              {[
                { id: 'ingredients', label: 'Ingredients', icon: Utensils },
                { id: 'instructions', label: 'Instructions', icon: BookOpen },
                { id: 'nutrition', label: 'Nutrition', icon: Heart },
                { id: 'reviews', label: 'Reviews', icon: Star },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-md text-xs font-medium transition-all ${
                    activeTab === id ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="max-h-80 overflow-y-auto pr-1">

              {activeTab === 'ingredients' && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-400 mb-3">
                    {recipe.servings} servings · {recipe.prepTime} · {recipe.calories} cal/serving
                  </p>
                  {recipe.ingredients?.map((item, i) => (
                    <label key={i} className="flex items-start gap-3 cursor-pointer group">
                      <input type="checkbox" className="mt-0.5 rounded flex-shrink-0 accent-orange-500" />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">{item}</span>
                    </label>
                  ))}
                </div>
              )}

              {activeTab === 'instructions' && (
                <ol className="space-y-4">
                  {recipe.instructions?.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed pt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>
              )}

              {activeTab === 'nutrition' && (
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(recipe.nutrition || {}).map(([key, val]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                      <span className="text-xs text-gray-500 capitalize">{key}</span>
                      <span className="text-sm font-semibold text-gray-800">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <p className="text-xs text-gray-400">{recipe.reviews} reviews</p>
                  {[
                    { name: 'John D.', initials: 'JD', color: 'bg-blue-100 text-blue-600', stars: 5, text: 'Amazing recipe! The flavors were perfectly balanced and my family loved it.' },
                    { name: 'Anita S.', initials: 'AS', color: 'bg-green-100 text-green-600', stars: 5, text: 'Perfect for festivals! Made this for Diwali and everyone asked for the recipe.' },
                    { name: 'Maria K.', initials: 'MK', color: 'bg-purple-100 text-purple-600', stars: 4, text: 'Good recipe, took a bit longer than expected but the taste was authentic.' },
                  ].map((review, i) => (
                    <div key={i} className="border border-gray-100 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${review.color}`}>
                            {review.initials}
                          </div>
                          <span className="text-sm font-medium text-gray-800">{review.name}</span>
                        </div>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} className={`w-3.5 h-3.5 ${s <= review.stars ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{review.text}</p>
                    </div>
                  ))}
                  <button className="w-full py-2 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                    <Eye className="w-4 h-4" /> Load more reviews
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
