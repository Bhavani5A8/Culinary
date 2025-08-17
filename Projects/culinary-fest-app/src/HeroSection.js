import React, { useState, useEffect } from 'react';
import { 
  ChefHat, Search, Gift, Play, ArrowRight, 
  Sparkles, TrendingUp, Users, Award, Clock,
  MapPin, Calendar, Star, Heart, Zap
} from 'lucide-react';
import { OptimizedImage, Button } from './ui';

const HeroSection = ({ onShowNewsletter }) => {
  // Core state (unchanged for backward compatibility)
  const [isVisible, setIsVisible] = useState(false);

  // Enhanced UI state layers (additive only)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [personalizedGreeting, setPersonalizedGreeting] = useState('');
  const [dynamicStats, setDynamicStats] = useState({
    recipes: 500,
    festivals: 50,
    users: 100000,
    trending: []
  });
  const [featuredContent, setFeaturedContent] = useState([]);
  const [weatherBasedSuggestions, setWeatherBasedSuggestions] = useState([]);

  // Enhanced hero slides for dynamic content
  const heroSlides = [
    {
      id: 1,
      title: "Discover Delicious Recipes",
      subtitle: "for Every Occasion",
      description: "Explore global flavors, festival treats, and health-conscious creations",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop",
      cta: { text: "Explore Recipes", icon: Search, action: "explore" },
      theme: "gradient-to-br from-orange-500 via-red-500 to-pink-600"
    },
    {
      id: 2,
      title: "Festival Special Recipes",
      subtitle: "Celebrate with Authentic Flavors",
      description: "Traditional recipes for Diwali, Eid, Christmas, and more",
      image: "https://images.unsplash.com/photo-1571167435887-b0969d891419?w=1200&h=600&fit=crop",
      cta: { text: "Festival Collection", icon: Gift, action: "festival" },
      theme: "gradient-to-br from-purple-500 via-pink-500 to-red-600"
    },
    {
      id: 3,
      title: "Quick & Healthy Meals",
      subtitle: "Ready in 30 Minutes",
      description: "Perfect recipes for busy weekdays and healthy lifestyle",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1200&h=600&fit=crop",
      cta: { text: "Quick Recipes", icon: Zap, action: "quick" },
      theme: "gradient-to-br from-green-500 via-teal-500 to-blue-600"
    }
  ];

  const currentSlideData = heroSlides[currentSlide];

  useEffect(() => {
    try {
      setIsVisible(true);
      // Enhanced: Initialize dynamic features
      initializeEnhancedFeatures();
      
      // Enhanced: Auto-rotate slides
      const slideInterval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % heroSlides.length);
      }, 8000);

      return () => clearInterval(slideInterval);
    } catch (error) {
      console.error('Error setting hero visibility:', error);
    }
  }, []);

  // Enhanced initialization with error handling
  const initializeEnhancedFeatures = async () => {
    try {
      // Enhanced: Get user location for personalized content
      await getUserLocation();
      
      // Enhanced: Load dynamic stats
      await loadDynamicStats();
      
      // Enhanced: Generate personalized greeting
      generatePersonalizedGreeting();
      
      // Enhanced: Load featured content
      await loadFeaturedContent();
    } catch (error) {
      console.error('Error initializing enhanced features:', error);
      // Graceful degradation - core functionality still works
    }
  };

  // Enhanced geolocation with privacy controls
  const getUserLocation = async () => {
    try {
      if (!navigator.geolocation) {
        console.warn('Geolocation not supported');
        return;
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 5000,
          maximumAge: 300000 // Cache for 5 minutes
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Enhanced: Get weather-based suggestions
      await getWeatherBasedSuggestions(latitude, longitude);
      
      // Enhanced: Get location name (fallback to default)
      const locationName = await getLocationName(latitude, longitude);
      setUserLocation(locationName);
    } catch (error) {
      console.error('Error getting user location:', error);
      // Fallback: Use default location
      setUserLocation('Global');
    }
  };

  // Enhanced weather-based recipe suggestions
  const getWeatherBasedSuggestions = async (lat, lon) => {
    try {
      // Mock weather API call with error handling
      const suggestions = [
        { weather: 'cold', recipes: ['Hot Soup', 'Warm Curry', 'Hot Chocolate'] },
        { weather: 'hot', recipes: ['Cold Salads', 'Smoothies', 'Ice Cream'] },
        { weather: 'rainy', recipes: ['Pakoras', 'Hot Tea', 'Comfort Food'] }
      ];
      
      // Simulate weather detection
      const currentWeather = 'cold'; // This would come from weather API
      const weatherSuggestions = suggestions.find(s => s.weather === currentWeather);
      
      if (weatherSuggestions) {
        setWeatherBasedSuggestions(weatherSuggestions.recipes);
      }
    } catch (error) {
      console.error('Error getting weather suggestions:', error);
      // Fallback to popular recipes
      setWeatherBasedSuggestions(['Popular Recipes', 'Trending Dishes']);
    }
  };

  // Enhanced location name resolution
  const getLocationName = async (lat, lon) => {
    try {
      // Mock reverse geocoding (would use real API)
      return 'Your City'; // Fallback
    } catch (error) {
      console.error('Error getting location name:', error);
      return 'Global';
    }
  };

  // Enhanced dynamic stats loading
  const loadDynamicStats = async () => {
    try {
      // Simulate API call for real-time stats
      const stats = {
        recipes: Math.floor(Math.random() * 100) + 500,
        festivals: Math.floor(Math.random() * 10) + 50,
        users: Math.floor(Math.random() * 10000) + 100000,
        trending: ['Diwali Sweets', 'Vegan Curry', 'Quick Breakfast']
      };
      
      setDynamicStats(stats);
    } catch (error) {
      console.error('Error loading dynamic stats:', error);
      // Keep default stats on error
    }
  };

  // Enhanced personalized greeting
  const generatePersonalizedGreeting = () => {
    try {
      const hour = new Date().getHours();
      const timeGreeting = 
        hour < 12 ? 'Good Morning' :
        hour < 18 ? 'Good Afternoon' :
        'Good Evening';
      
      const personalizedMessages = [
        `${timeGreeting}! Ready to cook something amazing?`,
        `${timeGreeting}! What's cooking today?`,
        `${timeGreeting}! Time for culinary adventures!`,
        `${timeGreeting}! Let's create delicious memories!`
      ];
      
      const randomMessage = personalizedMessages[Math.floor(Math.random() * personalizedMessages.length)];
      setPersonalizedGreeting(randomMessage);
    } catch (error) {
      console.error('Error generating personalized greeting:', error);
      setPersonalizedGreeting('Welcome to CulinaryFest!');
    }
  };

  // Enhanced featured content loading
  const loadFeaturedContent = async () => {
    try {
      const featured = [
        { 
          type: 'recipe', 
          title: 'Trending: Fusion Biryani',
          image: 'https://images.unsplash.com/photo-1563379091553-7f5ba2d2d6d6?w=300&h=200&fit=crop',
          badge: 'Hot'
        },
        { 
          type: 'chef', 
          title: 'Chef Spotlight: Maria Rodriguez',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=200&fit=crop',
          badge: 'Featured'
        },
        { 
          type: 'course', 
          title: 'Free Course: Indian Spices 101',
          image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop',
          badge: 'Free'
        }
      ];
      
      setFeaturedContent(featured);
    } catch (error) {
      console.error('Error loading featured content:', error);
      // Continue without featured content
    }
  };

  // Core functionality (unchanged for compatibility)
  const handleNewsletterClick = () => {
    try {
      if (onShowNewsletter) {
        onShowNewsletter();
      }
    } catch (error) {
      console.error('Error handling newsletter click:', error);
    }
  };

  // Enhanced video functionality
  const handleVideoPlay = () => {
    try {
      setIsVideoPlaying(true);
      // Enhanced: Track video engagement
      console.log('Video started - tracking engagement');
    } catch (error) {
      console.error('Error starting video:', error);
    }
  };

  // Enhanced slide navigation
  const nextSlide = () => {
    try {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    } catch (error) {
      console.error('Error navigating to next slide:', error);
    }
  };

  const prevSlide = () => {
    try {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    } catch (error) {
      console.error('Error navigating to previous slide:', error);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Enhanced Dynamic Background */}
      <OptimizedImage
        src={currentSlideData.image}
        alt={`${currentSlideData.title} background`}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
      />
      <div className={`absolute inset-0 bg-${currentSlideData.theme} opacity-70 transition-all duration-1000`} />
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
      
      {/* Enhanced floating elements with better positioning */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-16 w-32 h-32 bg-orange-500/15 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-pink-500/15 rounded-full blur-xl animate-pulse delay-300"></div>
        <div className="absolute top-20 right-1/4 w-24 h-24 bg-orange-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        
        {/* Enhanced: Animated particles */}
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className={`absolute w-2 h-2 bg-white/20 rounded-full animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Enhanced personalized greeting bar */}
      {personalizedGreeting && userLocation && (
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-2 border border-white/30">
            <div className="flex items-center gap-3 text-white text-sm">
              <MapPin className="w-4 h-4" />
              <span>{personalizedGreeting}</span>
              {userLocation && <span className="opacity-75">• {userLocation}</span>}
            </div>
          </div>
        </div>
      )}

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={`transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Enhanced hero icon */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-4 rounded-full shadow-2xl animate-bounce hover:scale-110 transition-transform cursor-pointer">
              <ChefHat className="w-16 h-16 text-white" />
            </div>
          </div>
          
          {/* Enhanced dynamic title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-center">
            {currentSlideData.title}
            <span className="block text-3xl md:text-5xl lg:text-6xl bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent mt-2">
              {currentSlideData.subtitle}
            </span>
          </h1>
          
          {/* Enhanced dynamic description */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-light leading-relaxed text-center">
            {currentSlideData.description}
          </p>

          {/* Enhanced weather-based suggestions */}
          {weatherBasedSuggestions.length > 0 && (
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm rounded-full px-4 py-2 text-blue-200 text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Perfect for today's weather: {weatherBasedSuggestions.slice(0, 2).join(', ')}</span>
              </div>
            </div>
          )}

          {/* Enhanced action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 px-4">
            <Button 
              variant="cta" 
              size="xl" 
              className="w-full sm:w-auto min-w-[200px] transform hover:scale-105 transition-all group"
            >
              <currentSlideData.cta.icon className="w-5 h-5 mr-3" />
              {currentSlideData.cta.text}
              <Sparkles className="w-4 h-4 ml-2 animate-pulse" />
            </Button>
            
            <Button 
              variant="outline" 
              size="xl"
              className="w-full sm:w-auto min-w-[200px] text-white border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 transform hover:scale-105 transition-all group"
              onClick={handleNewsletterClick}
            >
              <Gift className="w-5 h-5 mr-3" />
              Free Recipe Book
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            
            {/* Enhanced: Video tutorial button */}
            <Button 
              variant="ghost" 
              size="xl"
              className="w-full sm:w-auto min-w-[200px] text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm group"
              onClick={handleVideoPlay}
            >
              <Play className="w-5 h-5 mr-3" />
              Watch Tutorial
            </Button>
          </div>

          {/* Enhanced dynamic stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto mb-8">
            <div className="text-center group hover:scale-105 transition-transform cursor-pointer">
              <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent mb-3 animate-pulse">
                {dynamicStats.recipes}+
              </div>
              <div className="text-gray-300 text-lg">Authentic Recipes</div>
              <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Updated daily
              </div>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform cursor-pointer">
              <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent mb-3 animate-pulse delay-300">
                {dynamicStats.festivals}+
              </div>
              <div className="text-gray-300 text-lg">Cultural Festivals</div>
              <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Seasonal updates
              </div>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform cursor-pointer">
              <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent mb-3 animate-pulse delay-700">
                {Math.floor(dynamicStats.users / 1000)}K+
              </div>
              <div className="text-gray-300 text-lg">Happy Cooks</div>
              <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Growing community
              </div>
            </div>
          </div>

          {/* Enhanced: Featured content carousel */}
          {featuredContent.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 justify-center mb-4 text-white/80 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>Featured Today</span>
              </div>
              <div className="flex gap-4 justify-center overflow-x-auto pb-4">
                {featuredContent.map((item, index) => (
                  <div key={index} className="flex-shrink-0 w-48 bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all cursor-pointer group">
                    <div className="relative mb-2">
                      <OptimizedImage
                        src={item.image}
                        alt={item.title}
                        className="w-full h-24 rounded object-cover"
                      />
                      <span className="absolute top-1 right-1 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-white text-sm font-medium truncate group-hover:text-orange-200 transition-colors">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced: Slide navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
          <button 
            onClick={prevSlide}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
          
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
          
          <button 
            onClick={nextSlide}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Enhanced: Video overlay modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative max-w-4xl w-full mx-4">
            <button 
              onClick={() => setIsVideoPlaying(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <div className="w-8 h-8" />
            </button>
            <div className="bg-gray-800 rounded-lg p-8 text-center text-white">
              <Play className="w-16 h-16 mx-auto mb-4 text-orange-500" />
              <h3 className="text-2xl font-bold mb-4">Video Tutorial Coming Soon!</h3>
              <p className="text-gray-300 mb-6">
                We're preparing amazing video content to help you master these recipes step by step.
              </p>
              <Button variant="primary" onClick={() => setIsVideoPlaying(false)}>
                <div className="w-4 h-4 mr-2" />
                Notify Me When Ready
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;