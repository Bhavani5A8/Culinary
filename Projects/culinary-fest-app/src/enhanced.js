import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search, Mic, MicOff, Camera, Filter, Grid, List, Eye, Heart, Bookmark,
  Clock, Users, Star, Trophy, Calendar, ShoppingCart, Play, Pause,
  Volume2, VolumeX, Download, Wifi, WifiOff, Settings, User, Bell,
  ChefHat, Zap, TrendingUp, Share2, MessageCircle, Award,
  // New icons for missing components
  BarChart3, Globe, Mail, RefreshCw, ThumbsUp, Image, CheckCircle,
  Facebook, Twitter, Instagram, Copy, Layers, RotateCcw, Languages,
  X, Send, Loader, AlertCircle, Plus, Minus, ArrowUp, ArrowDown, ArrowLeft, ArrowRight
} from 'lucide-react';
import { OptimizedImage, Tooltip, Input, Button, Modal, Loading, Progress, Badge } from './ui';
import { validateRecipe, getTrendingRecipes } from './recipeData';

/* --- 1. Error Boundary Wrapper --- */
// Wraps a component to catch and display UI errors gracefully.
export class ErrorBoundaryWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center p-8 bg-red-50 text-red-800 rounded-lg shadow-inner">
          <AlertCircle className="w-6 h-6 mr-3" />
          <div className="text-sm">
            <h2 className="font-semibold text-base">Something went wrong.</h2>
            <p>We're working to fix the issue. Please try again later.</p>
            {this.state.error && <p className="mt-2 text-xs opacity-70">{this.state.error.toString()}</p>}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* --- 2. Enhanced Recipe Card --- */
// A highly interactive and data-rich recipe card.
export const EnhancedRecipeCard = ({ recipe, onClick, onView, isPremium, kitchenMode = false, enhancedFeatures = {} }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [socialStats, setSocialStats] = useState(() => ({
    likes: recipe?.likes || Math.floor(Math.random() * 500) + 50,
    shares: recipe?.shares || Math.floor(Math.random() * 100) + 10,
    saves: recipe?.saves || Math.floor(Math.random() * 200) + 20
  }));
  const [personalizedScore, setPersonalizedScore] = useState(null);

  // Validate recipe data on component mount
  useEffect(() => {
    if (!validateRecipe(recipe)) {
      console.warn('Invalid recipe data passed to EnhancedRecipeCard:', recipe);
    }
    if (enhancedFeatures.personalization && recipe?.personalizationScore) {
      setPersonalizedScore(recipe.personalizationScore);
    }
  }, [recipe, enhancedFeatures]);

  if (!recipe) return null;

  const handleSaveClick = (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    setSocialStats(prev => ({
      ...prev,
      saves: isSaved ? prev.saves - 1 : prev.saves + 1
    }));
  };

  const difficultyClasses = {
    'Easy': 'bg-green-100 text-green-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'Hard': 'bg-red-100 text-red-800'
  };

  const cardClasses = `
    group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out
    ${isHovered ? 'scale-[1.02]' : ''}
    ${kitchenMode ? 'bg-gray-800 text-white shadow-none border border-gray-700' : 'bg-white text-gray-900'}
    ${isPremium && 'border-4 border-yellow-400'}
  `;

  return (
    <ErrorBoundaryWrapper>
      <div
        className={cardClasses}
        onClick={() => onClick?.(recipe.id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isPremium && (
          <Badge
            variant="premium"
            className="absolute top-2 left-2 z-10"
          >
            <Crown className="w-3 h-3 mr-1" /> Premium
          </Badge>
        )}
        <div className="relative">
          {/* CORRECTED: Image wrapper with fixed aspect ratio to prevent layout shift */}
          <div className="w-full h-48 overflow-hidden rounded-t-lg">
            <OptimizedImage
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className={`absolute top-2 right-2 flex gap-2 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Tooltip content={isSaved ? "Unsave" : "Save Recipe"}>
              <button
                onClick={handleSaveClick}
                className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 hover:text-orange-500 transition-colors"
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-orange-500 text-orange-500' : ''}`} />
              </button>
            </Tooltip>
            <Tooltip content="Quick View">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onView) onView(recipe); else onClick?.(recipe.id);
                }}
                className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 hover:text-orange-500 transition-colors"
              >
                <Eye className="w-5 h-5" />
              </button>
            </Tooltip>
          </div>
        </div>

        <div className={`p-4 ${kitchenMode ? 'text-white' : 'text-gray-900'}`}>
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{recipe.title}</h3>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span>{recipe.rating} ({recipe.reviews} reviews)</span>
          </div>
          <div className="flex items-center flex-wrap gap-2 text-xs mb-3">
            <Badge variant="time">
              <Clock className="w-3 h-3 mr-1" /> {recipe.prepTime}
            </Badge>
            <Badge variant="difficulty" className={difficultyClasses[recipe.difficulty]}>
              <Award className="w-3 h-3 mr-1" /> {recipe.difficulty}
            </Badge>
            <Badge variant="servings">
              <Users className="w-3 h-3 mr-1" /> {recipe.servings} Servings
            </Badge>
          </div>

          <p className={`text-sm mb-4 line-clamp-3 ${kitchenMode ? 'text-gray-300' : 'text-gray-600'}`}>{recipe.description}</p>

          {/* NEW: Enhanced features UI */}
          {enhancedFeatures.socialProof && (
            <div className={`mt-2 pt-2 border-t ${kitchenMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-red-500" /> {socialStats.likes} Likes
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" /> {recipe.views || 0} Views
                </span>
                <span className="flex items-center gap-1">
                  <Bookmark className="w-3 h-3" /> {socialStats.saves} Saves
                </span>
              </div>
            </div>
          )}

          {enhancedFeatures.aiRecommendations && personalizedScore !== null && (
            <div className="mt-2 p-2 bg-purple-50 rounded-lg flex items-center gap-2 text-xs font-medium text-purple-700">
              <Sparkles className="w-4 h-4" />
              <span>Personal Match: {(personalizedScore * 100).toFixed(0)}%</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={(e) => { e.stopPropagation(); if (onView) onView(recipe); else onClick?.(recipe.id); }}
              className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors ${kitchenMode ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}
            >
              View Recipe
            </button>
            <Tooltip content="Add to Meal Plan">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Mock add to meal plan functionality
                  console.log('Added to meal plan:', recipe.title);
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${kitchenMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                <Calendar className="w-4 h-4" />
              </button>
            </Tooltip>
            <Tooltip content="Add to Shopping List">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Mock add to shopping list functionality
                  console.log('Added to shopping list:', recipe.title);
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${kitchenMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </ErrorBoundaryWrapper>
  );
};

/* --- 3. Smart Filter Panel --- */
// A filter component with advanced options and search.
export const SmartFilterPanel = ({
  filters,
  onFilterChange,
  kitchenMode = false,
  enhancedFeatures = {}
}) => {
  const [activeFilters, setActiveFilters] = useState(filters);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    setActiveFilters(filters);
  }, [filters]);

  const handleFilterClick = (group, value) => {
    const newFilters = { ...activeFilters };
    if (newFilters[group] === value) {
      newFilters[group] = '';
    } else {
      newFilters[group] = value;
    }
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = Object.keys(activeFilters).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});
    setActiveFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const filteredCuisines = enhancedFeatures.smartSearch
    ? ['Indian', 'Italian', 'Mexican', 'Thai', 'Chinese', 'Mediterranean', 'American']
    : ['Indian', 'Italian', 'Mexican'];

  const filterOptions = {
    cuisine: filteredCuisines,
    difficulty: ['Easy', 'Medium', 'Hard'],
    time: ['<30 mins', '30-60 mins', '>60 mins'],
    dietary: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto'],
    allergens: ['Nuts', 'Dairy', 'Soy']
  };

  return (
    <ErrorBoundaryWrapper>
      <div className={`p-4 rounded-lg transition-colors ${kitchenMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${kitchenMode ? 'text-white' : 'text-gray-800'}`}>
            <Filter className="inline w-5 h-5 mr-2 text-orange-500" />
            Filters
          </h3>
          <div className="flex gap-2">
            <button
              onClick={clearAllFilters}
              className={`text-sm font-medium transition-colors ${kitchenMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-800'}`}
            >
              Clear All
            </button>
            <button
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className={`text-sm font-medium transition-colors ${kitchenMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-800'}`}
            >
              <X className={`w-4 h-4 transition-transform ${isPanelOpen ? 'rotate-90' : 'rotate-0'}`} />
            </button>
          </div>
        </div>

        {/* Search Bar for filtering */}
        {enhancedFeatures.smartSearch && (
          <div className="mb-4">
            <Input
              type="search"
              placeholder="Search recipes, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4 text-gray-400" />}
              className={`w-full ${kitchenMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : ''}`}
            />
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(filterOptions).map(([group, options]) => (
            <div key={group}>
              <h4 className={`text-sm font-semibold mb-2 capitalize ${kitchenMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {group.replace(/-/g, ' ')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {options.map(option => (
                  <button
                    key={option}
                    onClick={() => handleFilterClick(group, option)}
                    className={`
                      px-3 py-1 rounded-full text-xs font-medium transition-colors
                      ${activeFilters[group] === option
                        ? 'bg-orange-500 text-white'
                        : `${kitchenMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
                      }
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ErrorBoundaryWrapper>
  );
};

/* --- 4. Live Kitchen Mode Overlay --- */
// An immersive, hands-free cooking mode.
export const KitchenModeOverlay = ({ recipe, isVisible, onClose, enhancedFeatures = {} }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const utteranceRef = useRef(null);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);

  const steps = recipe?.instructions || [];

  const speakStep = useCallback((text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
    }
  }, []);

  const listenForCommands = useCallback(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        console.log('Listening for commands...');
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log('Transcript:', transcript);

        if (transcript.includes('next') || transcript.includes('continue')) {
          handleNextStep();
        } else if (transcript.includes('previous') || transcript.includes('go back')) {
          handlePreviousStep();
        } else if (transcript.includes('repeat')) {
          speakStep(steps[currentStepIndex]);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    }
  }, [steps, currentStepIndex]);

  useEffect(() => {
    if (isVisible && enhancedFeatures.handsFree) {
      listenForCommands();
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isVisible, enhancedFeatures.handsFree, listenForCommands]);

  if (!isVisible || !recipe) return null;

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleTextToSpeech = () => {
    speakStep(steps[currentStepIndex]);
  };

  const handleToggleVoiceControl = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      listenForCommands();
    }
  };

  const handleStartTimer = () => {
    if (timerRef.current) return;
    const duration = 60 * 5; // 5 minutes for demo
    let time = duration;
    timerRef.current = setInterval(() => {
      time -= 1;
      if (time <= 0) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        console.log('Timer finished!');
      }
    }, 1000);
  };

  return (
    <ErrorBoundaryWrapper>
      <Modal isOpen={isVisible} onClose={onClose} className="bg-gray-900 text-white">
        <div className="relative p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-orange-400 mb-2">{recipe.title}</h2>
            <h3 className="text-xl font-medium text-gray-300">Live Kitchen Mode</h3>
          </div>

          <div className="mt-8">
            <Progress
              value={(currentStepIndex / (steps.length - 1)) * 100}
              className="mb-4"
              color="bg-orange-500"
            />
            <p className="text-sm text-gray-400 text-center mb-6">
              Step {currentStepIndex + 1} of {steps.length}
            </p>

            <div className="p-6 bg-gray-800 rounded-lg shadow-lg min-h-[200px] flex items-center justify-center">
              <p className="text-lg font-light leading-relaxed">
                {steps[currentStepIndex] || 'Recipe instructions not available.'}
              </p>
            </div>
          </div>

          {/* Hands-free Controls */}
          {enhancedFeatures.handsFree && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Tooltip content={isListening ? "Listening..." : "Start Voice Control"}>
                <button
                  onClick={handleToggleVoiceControl}
                  className={`p-3 rounded-full transition-colors ${isListening ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                  {isListening ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                </button>
              </Tooltip>
              <Tooltip content={isSpeaking ? "Speaking..." : "Repeat Step"}>
                <button
                  onClick={handleTextToSpeech}
                  disabled={isSpeaking}
                  className={`p-3 rounded-full transition-colors ${isSpeaking ? 'bg-orange-500 text-white animate-pulse' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </Tooltip>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
            <Button
              onClick={handlePreviousStep}
              disabled={currentStepIndex === 0}
              variant="outline"
              className="text-gray-300 border-gray-700 hover:bg-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={currentStepIndex === steps.length - 1}
              variant="primary"
              className="bg-orange-500 hover:bg-orange-600"
            >
              {currentStepIndex === steps.length - 1 ? 'Finish' : 'Next Step'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Modal>
    </ErrorBoundaryWrapper>
  );
};

/* --- 5. Personalized Recommendations --- */
// A component that fetches and displays personalized recipe suggestions.
export const PersonalizedRecommendations = ({ userProfile, kitchenMode = false, onRecipeClick }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecommendations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock API call to get personalized recipes
      // In a real app, this would use userProfile data (dietary, favorite cuisines)
      // and an AI model to return a list of relevant recipes.
      const trending = getTrendingRecipes();
      const filtered = trending.filter(r => {
        if (userProfile?.dietary && r.tags) {
          return r.tags.some(tag => tag.toLowerCase() === userProfile.dietary.toLowerCase());
        }
        return true;
      });
      setRecommendations(filtered);
    } catch (err) {
      setError('Failed to fetch recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [userProfile]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return (
    <ErrorBoundaryWrapper>
      <div className={`p-4 rounded-lg transition-colors ${kitchenMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${kitchenMode ? 'text-white' : 'text-gray-800'}`}>
          <Sparkles className="inline w-5 h-5 mr-2 text-purple-500" />
          Personalized Picks
        </h3>

        {isLoading && (
          <div className="flex justify-center py-8">
            <Loading className="w-8 h-8 text-orange-500" />
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center p-4 text-red-700 bg-red-100 rounded">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {!isLoading && !error && recommendations.length === 0 && (
          <div className={`text-center py-8 ${kitchenMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>No recommendations found based on your preferences.</p>
          </div>
        )}

        {!isLoading && !error && recommendations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map(recipe => (
              <EnhancedRecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={onRecipeClick}
                kitchenMode={kitchenMode}
                enhancedFeatures={{ aiRecommendations: true }}
              />
            ))}
          </div>
        )}
      </div>
    </ErrorBoundaryWrapper>
  );
};

// 6. SocialMediaLinks - Dynamic social sharing
export const SocialMediaLinks = ({ shareUrl = window.location.href, title = 'Check out this recipe!', description = 'Amazing recipe I found', image }) => {
  const [shareCount, setShareCount] = useState({});
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(title)}`,
      customMessage: `${title} - ${description}`
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      shareUrl: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`${title} - ${description}`)}`,
      customMessage: `${title} 🍳 ${description} #recipe #cooking`
    },
    {
      name: 'Pinterest',
      icon: Image,
      color: 'bg-red-600 hover:bg-red-700',
      shareUrl: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(title)}&media=${encodeURIComponent(image || '')}`,
      customMessage: title
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      shareUrl: `https://wa.me/?text=${encodeURIComponent(`${title} - ${shareUrl}`)}`,
      customMessage: `Check out this recipe: ${title}\n${shareUrl}`
    }
  ];

  const handleShare = async (platform) => {
    setSharing(true);

    try {
      // Try native share API first (mobile)
      if (navigator.share && platform.name === 'Native') {
        await navigator.share({
          title,
          text: description,
          url: shareUrl
        });
        return;
      }

      // Open social platform share dialog
      const width = 600;
      const height = 400;
      const left = (window.screen.width - width) / 2;
      const top = (window.screen.height - height) / 2;

      window.open(
        platform.shareUrl,
        'share',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
      );

      // Track share analytics (mock)
      console.log(`Shared via ${platform.name}:`, { title, url: shareUrl });

    } catch (error) {
      console.error('Share failed:', error);
    } finally {
      setSharing(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <ErrorBoundaryWrapper>
      <div className="bg-white rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Share this recipe
        </h4>

        <div className="flex flex-wrap gap-2 mb-3">
          {socialPlatforms.map(platform => {
            const Icon = platform.icon;
            return (
              <button
                key={platform.name}
                onClick={() => handleShare(platform)}
                disabled={sharing}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-white text-sm font-medium transition-colors ${platform.color} disabled:opacity-50 disabled:cursor-not-allowed`}
                title={`Share on ${platform.name}`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{platform.name}</span>
              </button>
            );
          })}

          {/* Native Share (Mobile) */}
          {navigator.share && (
            <button
              onClick={() => handleShare({ name: 'Native' })}
              className="flex items-center gap-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          )}
        </div>

        {/* Copy Link */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm text-gray-600"
          />
          <button
            onClick={copyToClipboard}
            className={`px-3 py-2 rounded text-sm font-medium transition-colors flex items-center gap-1 ${
              copied ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copy
              </>
            )}
          </button>
        </div>

        {/* Share Stats (if available) */}
        {Object.keys(shareCount).length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Share Stats:</span>
              <div className="flex gap-3">
                {Object.entries(shareCount).map(([platform, count]) => (
                  <span key={platform}>{platform}: {count}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundaryWrapper>
  );
};

// 7. NewsletterPreferences - Subscription management
export const NewsletterPreferences = ({ currentPreferences = {}, onUpdate }) => {
  const [preferences, setPreferences] = useState({
    email: '',
    frequency: 'weekly',
    topics: [],
    formats: ['html'],
    ...currentPreferences
  });
  const [saving, setSaving] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [subscribed, setSubscribed] = useState(!!currentPreferences.email);

  const frequencyOptions = [
    { value: 'daily', label: 'Daily', description: 'Get fresh recipes every day' },
    { value: 'weekly', label: 'Weekly', description: 'Weekly recipe roundup' },
    { value: 'monthly', label: 'Monthly', description: 'Monthly featured recipes' }
  ];

  const topicOptions = [
    { value: 'quick-meals', label: 'Quick Meals', icon: '⚡' },
    { value: 'healthy', label: 'Healthy Recipes', icon: '🥗' },
    { value: 'desserts', label: 'Desserts', icon: '🍰' },
    { value: 'traditional', label: 'Traditional', icon: '👵' },
    { value: 'plant-based', label: 'Plant-Based', icon: '🌱' },
    { value: 'global', label: 'Global Cuisine', icon: '🌍' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const handleTopicToggle = (topic) => {
    const updatedTopics = preferences.topics.includes(topic)
      ? preferences.topics.filter(t => t !== topic)
      : [...preferences.topics, topic];
    setPreferences(prev => ({ ...prev, topics: updatedTopics }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!preferences.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(preferences.email)) {
      setEmailValid(false);
      return;
    }
    setEmailValid(true);
    setSaving(true);
    try {
      // Mock API call to save preferences
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdate(preferences);
      setSubscribed(true);
      console.log('Newsletter preferences updated:', preferences);
    } catch (error) {
      console.error('Failed to save preferences:', error);
    } finally {
      setSaving(false);
    }
  };

  const unsubscribe = () => {
    setSubscribed(false);
    setPreferences(prev => ({ ...prev, email: '', topics: [] }));
    onUpdate({ email: '', topics: [] });
  };

  return (
    <ErrorBoundaryWrapper>
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center gap-3 text-sm font-medium text-gray-700 mb-4">
          <Mail className="w-5 h-5 text-orange-500" />
          <h4 className="font-semibold">Newsletter Preferences</h4>
        </div>

        {!subscribed ? (
          <form onSubmit={handleUpdate}>
            <p className="text-sm text-gray-500 mb-4">
              Subscribe to get the latest recipes and cooking tips sent straight to your inbox.
            </p>
            <div className="mb-4">
              <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
              <Input
                type="email"
                id="email"
                name="email"
                value={preferences.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                required
                className="w-full"
                error={!emailValid && "Please enter a valid email address."}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="frequency" className="block text-xs font-medium text-gray-600 mb-1">Frequency</label>
              <select
                id="frequency"
                name="frequency"
                value={preferences.frequency}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700"
              >
                {frequencyOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <h5 className="text-xs font-medium text-gray-600 mb-2">Topics of Interest</h5>
              <div className="flex flex-wrap gap-2">
                {topicOptions.map(topic => (
                  <button
                    type="button"
                    key={topic.value}
                    onClick={() => handleTopicToggle(topic.value)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-1
                      ${preferences.topics.includes(topic.value)
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }
                    `}
                  >
                    <span>{topic.icon}</span>
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={saving}
            >
              {saving ? <Loader className="w-4 h-4 animate-spin mr-2" /> : null}
              {saving ? 'Saving...' : 'Subscribe'}
            </Button>
          </form>
        ) : (
          <div className="text-center py-4">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h5 className="text-lg font-semibold text-gray-800">You're Subscribed!</h5>
            <p className="text-sm text-gray-500 mb-4">Your preferences have been saved.</p>
            <Button variant="outline" onClick={unsubscribe} className="text-gray-600 hover:text-red-600 hover:border-red-600">
              Unsubscribe
            </Button>
          </div>
        )}
      </div>
    </ErrorBoundaryWrapper>
  );
};

// 8. CommunityStats - Displays live app metrics
export const CommunityStats = ({ data }) => {
  const [stats, setStats] = useState(data);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock API fetch
    const fetchStats = setTimeout(() => {
      setStats({
        totalRecipes: 1500,
        activeUsers: 2500,
        newRecipesThisWeek: 12,
        mostPopular: 'Masala Dosa'
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(fetchStats);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6">
        <Loading className="w-8 h-8 text-orange-500" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-orange-50 rounded-lg shadow">
      <h3 className="flex items-center gap-2 text-xl font-bold text-orange-800 mb-4">
        <Trophy className="w-6 h-6" />
        Community Highlights
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
          <span className="text-3xl font-bold text-orange-600">{stats.totalRecipes}+</span>
          <span className="text-sm text-gray-500">Total Recipes</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
          <span className="text-3xl font-bold text-orange-600">{stats.activeUsers}</span>
          <span className="text-sm text-gray-500">Active Cooks</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
          <span className="text-3xl font-bold text-orange-600">{stats.newRecipesThisWeek}</span>
          <span className="text-sm text-gray-500">New this Week</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
          <span className="text-lg font-bold text-orange-600 text-center">{stats.mostPopular}</span>
          <span className="text-sm text-gray-500 text-center">Most Popular</span>
        </div>
      </div>
    </div>
  );
};

// 9. LanguageSelector - Allows changing app language
export const LanguageSelector = ({ currentLanguage, onChange }) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' }
  ];

  return (
    <div className="relative inline-block">
      <select
        value={currentLanguage}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>{lang.name}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  );
};