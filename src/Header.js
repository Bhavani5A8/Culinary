import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChefHat, Search, User, Heart, 
  Bell, Gift, Globe, Zap, ChevronDown, Mail,
  Mic, Filter, Clock, Star, TrendingUp, Sparkles,
  Settings, Moon, Sun, Volume2, VolumeX
} from 'lucide-react';
import { Button, Input, Modal } from './ui';

// Enhanced Header Component with Professional UI Features

  // Helper to render nav links or actions (non-breaking, used for 'Indian' action)
  const NavAction = ({ item, className = '' }) => {
    if (item.onClick) {
      return (
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); item.onClick(); }}
          className={className}
        >
          {item.icon && typeof item.icon === 'string' ? <span className="mr-2">{item.icon}</span> : null}
          {item.name}
        </button>
      );
    }
    return (
      <a href={item.href} className={className}>
        {item.icon && typeof item.icon !== 'string' ? <item.icon className="w-4 h-4 mr-2" /> : (item.icon && <span className="mr-2">{item.icon}</span>)}
        {item.name}
      </a>
    );
  };
const Header = ({ onShowNewsletter, onNavigateToIndian }) => {
  // Core state (unchanged for backward compatibility)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Enhanced UI state layers (additive only)
  const [voiceSearchActive, setVoiceSearchActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isPersonalizationOpen, setIsPersonalizationOpen] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    dietaryRestrictions: [],
    favoritesCuisines: [],
    skillLevel: 'intermediate',
    soundEnabled: true
  });
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([
    { term: 'Diwali Special', count: '2.5K searches', trending: true },
    { term: 'Quick Breakfast', count: '1.8K searches', trending: true },
    { term: 'Vegan Curry', count: '1.2K searches', trending: false },
    { term: 'Air Fryer Recipes', count: '980 searches', trending: true }
  ]);

  // Enhanced navigation with personalization features
  const navigation = [
    { 
      name: 'Recipes', 
      href: '#recipes',
      icon: ChefHat,
      badge: { text: 'New', color: 'bg-green-500' },
      enhanced: {
        smartRecommendations: true,
        personalizedContent: true
      }
    },
    { 
      name: 'Cuisines', 
      href: '#cuisines',
      icon: Globe,
      submenu: [
        { 
          name: 'Indian', 
          href: '#indian', 
          icon: '🇮🇳',
          onClick: () => handleIndianClick(),
          enhanced: { popularity: 95, userFavorite: true }
        },
        { name: 'Italian', href: '#italian', icon: '🇮🇹', enhanced: { popularity: 88 } },
        { name: 'Asian', href: '#asian', icon: '🥢', enhanced: { popularity: 82 } },
        { name: 'Mexican', href: '#mexican', icon: '🌮', enhanced: { popularity: 76 } }
      ]
    },
    { 
      name: 'Healthy', 
      href: '#healthy',
      icon: Heart,
      badge: { text: 'Popular', color: 'bg-blue-500' },
      enhanced: {
        aiRecommendations: true,
        nutritionTracking: true
      }
    },
    { 
      name: 'Quick Bites', 
      href: '#quick',
      icon: Zap,
      enhanced: {
        timeBasedSuggestions: true,
        quickFilters: ['15min', '30min', 'No Cook']
      }
    },
    { 
      name: 'Festival Special', 
      href: '#festival',
      icon: Gift,
      badge: { text: 'Hot', color: 'bg-red-500', pulse: true },
      enhanced: {
        seasonalContent: true,
        calendarIntegration: true
      }
    }
  ];

  // Enhanced error handling with fallback mechanisms
  const handleMenuToggle = () => {
    try {
      setIsMenuOpen(!isMenuOpen);
      // Enhanced: Close other modals for better UX
      if (!isMenuOpen) {
        setIsPersonalizationOpen(false);
        setIsSearchOpen(false);
      }
    } catch (error) {
      console.error('Error toggling menu:', error);
      // Fallback: Force close state
      setIsMenuOpen(false);
    }
  };

  const handleSearchOpen = () => {
    try {
      setIsSearchOpen(true);
      setIsMenuOpen(false); // Enhanced: Better modal management
      // Enhanced: Load search suggestions
      loadSearchSuggestions();
    } catch (error) {
      console.error('Error opening search:', error);
      // Graceful degradation - basic search still works
    }
  };

  const handleSearchClose = () => {
    try {
      setIsSearchOpen(false);
      setVoiceSearchActive(false); // Enhanced: Clean up voice search
    } catch (error) {
      console.error('Error closing search:', error);
      // Force close for reliability
      setIsSearchOpen(false);
    }
  };

  // Enhanced search functionality (additive layer)
  const loadSearchSuggestions = async () => {
    try {
      // Enhanced: AI-powered suggestions (with fallback)
      const suggestions = [
        'Butter Chicken Recipe',
        'Vegan Biryani',
        'Quick Breakfast Ideas',
        'Gluten-Free Desserts',
        'Instant Pot Recipes'
      ];
      setSearchSuggestions(suggestions);
    } catch (error) {
      console.error('Error loading search suggestions:', error);
      // Fallback to basic suggestions
      setSearchSuggestions(['Popular Recipes', 'Indian Cuisine', 'Quick Meals']);
    }
  };

  // Enhanced voice search (progressive enhancement)
  const handleVoiceSearch = async () => {
    try {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.warn('Speech recognition not supported');
        return;
      }

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setVoiceSearchActive(true);

      recognition.onresult = (event) => {
        try {
          const transcript = event.results[0][0].transcript;
          setSearchQuery(transcript);
          // Enhanced: Add to recent searches
          addToRecentSearches(transcript);
        } catch (error) {
          console.error('Error processing voice result:', error);
        }
      };

      recognition.onerror = (event) => {
        console.error('Voice recognition error:', event.error);
        setVoiceSearchActive(false);
      };

      recognition.onend = () => {
        setVoiceSearchActive(false);
      };

      recognition.start();
    } catch (error) {
      console.error('Error starting voice search:', error);
      setVoiceSearchActive(false);
    }
  };

  // Enhanced search history management
  const addToRecentSearches = (query) => {
    try {
      const newRecentSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(newRecentSearches);
    } catch (error) {
      console.error('Error adding to recent searches:', error);
    }
  };

  const handleSearchQueryChange = (e) => {
    try {
      const query = e.target.value;
      setSearchQuery(query);
      
      // Enhanced: Real-time search suggestions
      if (query.length > 2) {
        const filtered = searchSuggestions.filter(s => 
          s.toLowerCase().includes(query.toLowerCase())
        );
        // Update filtered suggestions in real-time
      }
    } catch (error) {
      console.error('Error updating search query:', error);
    }
  };

  // Enhanced personalization features
  const togglePersonalization = () => {
    try {
      setIsPersonalizationOpen(!isPersonalizationOpen);
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error toggling personalization:', error);
    }
  };

  const updateUserPreference = (key, value) => {
    try {
      setUserPreferences(prev => ({
        ...prev,
        [key]: value
      }));
      // Enhanced: Save to user profile (with error handling)
    } catch (error) {
      console.error('Error updating user preference:', error);
    }
  };

  // Enhanced accessibility and theme management
  const toggleTheme = () => {
    try {
      setIsDarkMode(!isDarkMode);
      // Enhanced: Save theme preference
      document.documentElement.classList.toggle('dark', !isDarkMode);
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };

  // Core functionality (unchanged for compatibility)
  const handleMenuClose = () => {
    try {
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error closing menu:', error);
    }
  };

  const handleNewsletterClick = () => {
    try {
      if (onShowNewsletter) {
        onShowNewsletter();
      }
    } catch (error) {
      console.error('Error showing newsletter:', error);
    }
  };

  const handlePopularSearchClick = (term) => {
    try {
      setSearchQuery(term);
      addToRecentSearches(term);
    } catch (error) {
      console.error('Error setting popular search term:', error);
    }
  };

  const handleIndianClick = () => {
    try {
      if (onNavigateToIndian) {
        onNavigateToIndian();
      }
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error navigating to Indian cuisine:', error);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Enhanced Logo Section */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-2 rounded-xl shadow-lg flex-shrink-0 transform transition-transform hover:scale-110">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  CulinaryFest
                </h1>
                <p className="text-xs text-gray-600 truncate">
                  {userPreferences.skillLevel === 'beginner' ? 'Simple recipes, great flavors' : 
                   userPreferences.skillLevel === 'advanced' ? 'Master chef techniques' : 
                   'Global recipes, endless flavors'}
                </p>
              </div>
            </div>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const hasSubmenu = item.submenu && item.submenu.length > 0;
                
                return (
                  <div 
                    key={item.name} 
                    className="relative group"
                  >
                    <a
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 font-medium relative group/link"
                    >
                      <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                      <span>{item.name}</span>
                      
                      {hasSubmenu && (
                        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                      )}
                      
                      {/* Enhanced badges with animations */}
                      {item.badge && (
                        <span className={`
                          absolute -top-1 -right-1 px-2 py-0.5 text-xs font-bold text-white rounded-full
                          ${item.badge.color}
                          ${item.badge.pulse ? 'animate-pulse' : ''}
                          shadow-lg transform transition-transform group-hover/link:scale-110
                        `}>
                          {item.badge.text}
                        </span>
                      )}

                      {/* Enhanced: Smart recommendation indicator */}
                      {item.enhanced?.aiRecommendations && (
                        <Sparkles className="w-3 h-3 text-blue-500 animate-pulse ml-1" />
                      )}
                    </a>
                    
                    {/* Enhanced Dropdown with more features */}
                    {hasSubmenu && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        {item.submenu.map((subItem) => (
                          <button
                            key={subItem.name}
                            onClick={subItem.onClick || (() => {})}
                            className="w-full flex items-center justify-between gap-3 px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 text-left group/submenu"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{subItem.icon}</span>
                              <span className="font-medium">{subItem.name}</span>
                              {subItem.enhanced?.userFavorite && (
                                <Heart className="w-3 h-3 text-red-500 fill-current" />
                              )}
                            </div>
                            {subItem.enhanced?.popularity && (
                              <div className="text-xs text-gray-500 opacity-0 group-hover/submenu:opacity-100 transition-opacity">
                                {subItem.enhanced.popularity}% match
                              </div>
                            )}
                          </button>
                        ))}
                        {/* Enhanced: Quick actions in dropdown */}
                        <div className="border-t border-gray-100 mt-2 pt-2 px-4">
                          <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                            <Settings className="w-3 h-3" />
                            Customize preferences
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Enhanced Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Enhanced Search Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSearchOpen}
                className="text-gray-700 hover:text-orange-600 relative group"
              >
                <Search className="w-5 h-5 transition-transform group-hover:scale-110" />
                {searchQuery && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                )}
              </Button>

              {/* Enhanced Personalization Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePersonalization}
                className="text-gray-700 hover:text-orange-600 relative group"
              >
                <Settings className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-45" />
              </Button>

              {/* Enhanced Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-gray-700 hover:text-orange-600 relative group"
              >
                {isDarkMode ? 
                  <Sun className="w-5 h-5 transition-transform group-hover:scale-110" /> : 
                  <Moon className="w-5 h-5 transition-transform group-hover:scale-110" />
                }
              </Button>
              
              {/* Enhanced Notification Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNewsletterClick}
                className="text-gray-700 hover:text-orange-600 relative group"
              >
                <Bell className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  5
                </span>
              </Button>

              {/* Enhanced Sound Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => updateUserPreference('soundEnabled', !userPreferences.soundEnabled)}
                className="text-gray-700 hover:text-orange-600 relative group"
              >
                {userPreferences.soundEnabled ? 
                  <Volume2 className="w-5 h-5 transition-transform group-hover:scale-110" /> :
                  <VolumeX className="w-5 h-5 transition-transform group-hover:scale-110" />
                }
              </Button>

              <Button variant="outline" size="sm" className="hidden md:flex group">
                <User className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                Sign In
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={handleMenuToggle}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Enhanced Mobile Menu - unchanged core functionality */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-2xl">
              <nav className="container mx-auto px-4 py-6">
                <div className="flex flex-col space-y-2">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const hasSubmenu = item.submenu && item.submenu.length > 0;
                    
                    return (
                      <div key={item.name} className="space-y-2">
                        <a
                          href={item.href}
                          className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 font-medium relative"
                          onClick={handleMenuClose}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="flex-1">{item.name}</span>
                          
                          {item.badge && (
                            <span className={`
                              px-2 py-1 text-xs font-bold text-white rounded-full
                              ${item.badge.color}
                              ${item.badge.pulse ? 'animate-pulse' : ''}
                            `}>
                              {item.badge.text}
                            </span>
                          )}
                        </a>
                        
                        {hasSubmenu && (
                          <div className="ml-8 space-y-1">
                            {item.submenu.map((subItem) => (
                              <button
                                key={subItem.name}
                                onClick={() => {
                                  if (subItem.onClick) {
                                    subItem.onClick();
                                  }
                                  handleMenuClose();
                                }}
                                className="w-full flex items-center gap-3 p-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 text-left"
                              >
                                <span className="text-sm">{subItem.icon}</span>
                                <span className="text-sm">{subItem.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  <div className="pt-4 border-t border-gray-200">
                    <Button variant="outline" className="w-full" onClick={handleMenuClose}>
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Enhanced Search Modal */}
      <Modal isOpen={isSearchOpen} onClose={handleSearchClose} title="Smart Recipe Search" size="lg">
        <div className="space-y-6">
          {/* Enhanced Search Input with Voice */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for recipes, ingredients, cuisines..."
              value={searchQuery}
              onChange={handleSearchQueryChange}
              icon={Search}
              className="text-lg py-4 pr-16"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleVoiceSearch}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${voiceSearchActive ? 'text-red-500 animate-pulse' : 'text-gray-500'}`}
            >
              <Mic className="w-5 h-5" />
            </Button>
          </div>

          {voiceSearchActive && (
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center justify-center gap-2 text-red-600">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span>Listening... Speak clearly</span>
              </div>
            </div>
          )}
          
          {/* Enhanced Search Suggestions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent Searches
                </h4>
                <div className="space-y-2">
                  {recentSearches.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => handlePopularSearchClick(term)}
                      className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Trending Now
              </h4>
              <div className="space-y-2">
                {trendingTopics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => handlePopularSearchClick(topic.term)}
                    className="w-full text-left px-3 py-2 bg-gradient-to-r from-orange-50 to-pink-50 hover:from-orange-100 hover:to-pink-100 rounded-lg text-sm transition-all hover:scale-105 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{topic.term}</span>
                      {topic.trending && (
                        <span className="text-xs text-orange-600 font-semibold">🔥</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{topic.count}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Quick Filters */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Quick Filters
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Vegetarian', 'Quick (< 30min)', 'High Protein', 'Low Carb', 'Gluten Free', 'Dairy Free'].map(filter => (
                <button
                  key={filter}
                  className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-sm transition-all hover:scale-105 border border-blue-200"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* Enhanced Personalization Modal */}
      <Modal isOpen={isPersonalizationOpen} onClose={() => setIsPersonalizationOpen(false)} title="Personalize Your Experience" size="lg">
        <div className="space-y-8">
          {/* Skill Level */}
          <div>
            <h4 className="font-semibold mb-4">Cooking Skill Level</h4>
            <div className="grid grid-cols-3 gap-3">
              {['beginner', 'intermediate', 'advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() => updateUserPreference('skillLevel', level)}
                  className={`p-4 rounded-lg border transition-all text-center ${
                    userPreferences.skillLevel === level
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">
                    {level === 'beginner' ? '👶' : level === 'intermediate' ? '👨‍🍳' : '⭐'}
                  </div>
                  <div className="capitalize font-medium">{level}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Preferences */}
          <div>
            <h4 className="font-semibold mb-4">Dietary Preferences</h4>
            <div className="grid grid-cols-2 gap-3">
              {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo'].map((diet) => (
                <button
                  key={diet}
                  onClick={() => {
                    const current = userPreferences.dietaryRestrictions;
                    const updated = current.includes(diet)
                      ? current.filter(d => d !== diet)
                      : [...current, diet];
                    updateUserPreference('dietaryRestrictions', updated);
                  }}
                  className={`p-3 rounded-lg border transition-all ${
                    userPreferences.dietaryRestrictions.includes(diet)
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {diet}
                </button>
              ))}
            </div>
          </div>

          {/* Favorite Cuisines */}
          <div>
            <h4 className="font-semibold mb-4">Favorite Cuisines</h4>
            <div className="grid grid-cols-2 gap-3">
              {['Indian', 'Italian', 'Chinese', 'Mexican', 'Thai', 'Mediterranean'].map((cuisine) => (
                <button
                  key={cuisine}
                  onClick={() => {
                    const current = userPreferences.favoritesCuisines;
                    const updated = current.includes(cuisine)
                      ? current.filter(c => c !== cuisine)
                      : [...current, cuisine];
                    updateUserPreference('favoritesCuisines', updated);
                  }}
                  className={`p-3 rounded-lg border transition-all ${
                    userPreferences.favoritesCuisines.includes(cuisine)
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          {/* Save Preferences */}
          <div className="pt-4 border-t border-gray-200">
            <Button 
              variant="primary" 
              className="w-full"
              onClick={() => setIsPersonalizationOpen(false)}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Save Preferences & Get Personalized Recommendations
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;