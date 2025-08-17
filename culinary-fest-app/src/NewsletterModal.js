import React, { useState, useEffect } from 'react';
import { 
  Bell, Mail, CheckCircle, Gift, Star, Users, 
  TrendingUp, Heart, Sparkles, Clock, Award,
  Download, BookOpen, Video, Calendar
} from 'lucide-react';
import { Modal, Button, Input } from './ui';

const NewsletterModal = ({ isOpen, onClose }) => {
  // Core state (unchanged for backward compatibility)
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Enhanced state layers (additive only)
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [preferredFrequency, setPreferredFrequency] = useState('weekly');
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [bonusContent, setBonusContent] = useState([]);
  const [communityStats, setCommunityStats] = useState({
    subscribers: 50000,
    recipes: 500,
    rating: 4.9
  });
  const [testimonials, setTestimonials] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [emailValidation, setEmailValidation] = useState({ isValid: true, message: '' });

  // Enhanced interest categories
  const interestCategories = [
    { id: 'indian', name: 'Indian Cuisine', icon: '🍛', popular: true },
    { id: 'quick', name: 'Quick Meals', icon: '⚡', popular: true },
    { id: 'healthy', name: 'Healthy Recipes', icon: '🥗', popular: false },
    { id: 'desserts', name: 'Desserts', icon: '🍰', popular: false },
    { id: 'vegetarian', name: 'Vegetarian', icon: '🌱', popular: true },
    { id: 'festival', name: 'Festival Specials', icon: '🎉', popular: true },
    { id: 'baking', name: 'Baking', icon: '🥖', popular: false },
    { id: 'international', name: 'World Cuisine', icon: '🌍', popular: false }
  ];

  // Enhanced bonus content offerings
  const bonusContentItems = [
    {
      id: 'ebook',
      title: '25 Festival Recipes eBook',
      description: 'Traditional recipes for all major Indian festivals',
      icon: BookOpen,
      value: '$12.99',
      badge: 'Instant Download'
    },
    {
      id: 'video',
      title: 'Spice Mastery Video Course',
      description: '2-hour comprehensive guide to Indian spices',
      icon: Video,
      value: '$29.99',
      badge: 'Exclusive'
    },
    {
      id: 'planner',
      title: 'Monthly Meal Planner',
      description: 'Customizable meal planning templates',
      icon: Calendar,
      value: '$8.99',
      badge: 'Premium'
    },
    {
      id: 'community',
      title: 'VIP Community Access',
      description: 'Join our exclusive cooking community',
      icon: Users,
      value: 'Priceless',
      badge: 'Limited'
    }
  ];

  // Enhanced testimonials
  const userTestimonials = [
    {
      name: 'Priya Sharma',
      image: '👩‍🍳',
      text: "The weekly recipes have transformed my cooking! My family loves every dish I make now.",
      rating: 5,
      location: 'Mumbai'
    },
    {
      name: 'David Chen',
      image: '👨‍🍳',
      text: "Amazing authentic recipes with clear instructions. The festival specials are my favorite!",
      rating: 5,
      location: 'New York'
    },
    {
      name: 'Sarah Johnson',
      image: '👩‍🍳',
      text: "Perfect for busy weeknights. Quick recipes that don't compromise on taste!",
      rating: 5,
      location: 'London'
    }
  ];

  useEffect(() => {
    try {
      if (isOpen) {
        // Enhanced: Load dynamic content
        loadCommunityStats();
        loadTestimonials();
        initializeBonusContent();
      }
    } catch (error) {
      console.error('Error initializing newsletter modal:', error);
    }
  }, [isOpen]);

  // Enhanced initialization functions
  const loadCommunityStats = async () => {
    try {
      // Simulate API call for real-time stats
      const stats = {
        subscribers: Math.floor(Math.random() * 5000) + 50000,
        recipes: Math.floor(Math.random() * 50) + 500,
        rating: 4.9 + (Math.random() * 0.1)
      };
      setCommunityStats(stats);
    } catch (error) {
      console.error('Error loading community stats:', error);
      // Keep default stats
    }
  };

  const loadTestimonials = () => {
    try {
      setTestimonials(userTestimonials);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    }
  };

  const initializeBonusContent = () => {
    try {
      setBonusContent(bonusContentItems);
    } catch (error) {
      console.error('Error initializing bonus content:', error);
    }
  };

  // Enhanced email validation
  const validateEmail = (emailValue) => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(emailValue);
      
      if (!emailValue) {
        setEmailValidation({ isValid: false, message: 'Email is required' });
      } else if (!isValid) {
        setEmailValidation({ isValid: false, message: 'Please enter a valid email address' });
      } else {
        setEmailValidation({ isValid: true, message: '' });
      }
      
      return isValid;
    } catch (error) {
      console.error('Error validating email:', error);
      return false;
    }
  };

  // Enhanced form submission with multi-step process
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (!email || !agreed) {
        console.warn('Email and agreement are required');
        return;
      }

      if (!validateEmail(email)) {
        return;
      }
      
      setLoading(true);
      
      // Enhanced: Multi-step submission process
      for (let step = 1; step <= 3; step++) {
        setCurrentStep(step);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      // Simulate successful subscription
      setSubscribed(true);
      setLoading(false);
      
      // Enhanced: Auto-close after success with delay
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting newsletter form:', error);
      setLoading(false);
      setCurrentStep(1);
    }
  };

  // Enhanced interest selection
  const toggleInterest = (interestId) => {
    try {
      setSelectedInterests(prev => 
        prev.includes(interestId)
          ? prev.filter(id => id !== interestId)
          : [...prev, interestId]
      );
    } catch (error) {
      console.error('Error toggling interest:', error);
    }
  };

  // Enhanced close handler with state reset
  const handleClose = () => {
    try {
      if (onClose) {
        onClose();
      }
      // Enhanced: Reset form state with delay for smooth animation
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
        setAgreed(false);
        setSelectedInterests([]);
        setShowPersonalization(false);
        setCurrentStep(1);
        setEmailValidation({ isValid: true, message: '' });
      }, 300);
    } catch (error) {
      console.error('Error closing newsletter modal:', error);
    }
  };

  const handleEmailChange = (e) => {
    try {
      const emailValue = e.target.value;
      setEmail(emailValue);
      
      // Enhanced: Real-time validation
      if (emailValue) {
        validateEmail(emailValue);
      } else {
        setEmailValidation({ isValid: true, message: '' });
      }
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  const handleAgreementChange = (e) => {
    try {
      setAgreed(e.target.checked);
    } catch (error) {
      console.error('Error updating agreement:', error);
    }
  };

  const handleMaybeLater = () => {
    try {
      handleClose();
    } catch (error) {
      console.error('Error handling maybe later:', error);
    }
  };

  const handlePersonalizationToggle = () => {
    try {
      setShowPersonalization(!showPersonalization);
    } catch (error) {
      console.error('Error toggling personalization:', error);
    }
  };

  // Enhanced loading states for different steps
  const getLoadingMessage = () => {
    switch (currentStep) {
      case 1: return 'Validating email...';
      case 2: return 'Setting up your preferences...';
      case 3: return 'Preparing your welcome package...';
      default: return 'Processing...';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Join Our Culinary Community!" size="lg">
      {!subscribed ? (
        <div className="space-y-8">
          {/* Enhanced community stats banner */}
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-6 border border-orange-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-orange-600">{communityStats.subscribers.toLocaleString()}+</div>
                <div className="text-sm text-gray-600">Happy Subscribers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{communityStats.recipes}+</div>
                <div className="text-sm text-gray-600">Weekly Recipes</div>
              </div>
              <div className="flex items-center justify-center gap-1">
                <div className="text-2xl font-bold text-orange-600">{communityStats.rating}</div>
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-orange-100 to-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform hover:scale-110">
                <Bell className="w-10 h-10 text-orange-600 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Weekly Recipe Magic!</h3>
              <p className="text-gray-600">Join food enthusiasts receiving exclusive recipes, cooking tips, and festival specials.</p>
            </div>

            {/* Enhanced email input with validation */}
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
                required
                icon={Mail}
                className={`${!emailValidation.isValid ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {!emailValidation.isValid && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span>⚠️</span>
                  {emailValidation.message}
                </p>
              )}
            </div>

            {/* Enhanced personalization section */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={handlePersonalizationToggle}
                className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Personalize Your Experience</span>
                  <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">Recommended</span>
                </div>
                <span className="text-blue-600">{showPersonalization ? '−' : '+'}</span>
              </button>

              {showPersonalization && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h5 className="font-medium mb-3">What interests you most? (Select all that apply)</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {interestCategories.map((interest) => (
                        <button
                          key={interest.id}
                          type="button"
                          onClick={() => toggleInterest(interest.id)}
                          className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                            selectedInterests.includes(interest.id)
                              ? 'border-orange-500 bg-orange-50 text-orange-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          } ${interest.popular ? 'ring-2 ring-blue-200' : ''}`}
                        >
                          <span className="text-lg">{interest.icon}</span>
                          <span className="text-sm font-medium">{interest.name}</span>
                          {interest.popular && <span className="text-xs text-blue-600">Popular</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-3">How often would you like to hear from us?</h5>
                    <div className="space-y-2">
                      {[
                        { value: 'daily', label: 'Daily - Recipe of the day', icon: '📅' },
                        { value: 'weekly', label: 'Weekly - Curated collection', icon: '📬', recommended: true },
                        { value: 'monthly', label: 'Monthly - Special occasions only', icon: '📮' }
                      ].map((freq) => (
                        <button
                          key={freq.value}
                          type="button"
                          onClick={() => setPreferredFrequency(freq.value)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                            preferredFrequency === freq.value
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <span className="text-lg">{freq.icon}</span>
                          <span className="flex-1 text-left text-sm">{freq.label}</span>
                          {freq.recommended && (
                            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                              Recommended
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced bonus content showcase */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
              <h4 className="font-bold text-purple-800 mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5" />
                Your Welcome Package (Worth $50+)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {bonusContent.slice(0, 4).map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <Icon className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-800 truncate">{item.title}</div>
                        <div className="text-xs text-gray-600">{item.value}</div>
                      </div>
                      <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full shrink-0">
                        {item.badge}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Enhanced testimonials section */}
            {testimonials.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-center flex items-center justify-center gap-2">
                  <Users className="w-4 h-4" />
                  What Our Community Says
                </h4>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-2xl">{testimonial.image}</div>
                        <div>
                          <div className="font-medium text-sm">{testimonial.name}</div>
                          <div className="text-xs text-gray-500">{testimonial.location}</div>
                        </div>
                        <div className="flex gap-1 ml-auto">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 italic">"{testimonial.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                required 
                className="mt-1 rounded" 
                checked={agreed}
                onChange={handleAgreementChange}
              />
              <p className="text-sm text-gray-600">
                I agree to receive marketing emails and understand I can unsubscribe at any time. 
                By subscribing, I also accept the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> 
                and <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>.
              </p>
            </div>

            {/* Enhanced loading state */}
            {loading && (
              <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                  <span className="text-blue-800 font-medium">{getLoadingMessage()}</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-800"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleMaybeLater} 
                className="flex-1"
                disabled={loading}
              >
                Maybe Later
              </Button>
              <Button 
                type="submit" 
                variant="primary" 
                loading={loading} 
                className="flex-1"
                disabled={!email || !agreed || !emailValidation.isValid}
              >
                {loading ? getLoadingMessage() : 'Join Community Now'}
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                <span>Get your free welcome package instantly!</span>
                <Sparkles className="w-4 h-4 animate-pulse" />
              </p>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <div className="space-y-4 mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Welcome to the Family! 🎉</h3>
            <p className="text-gray-600">
              Check your email for your welcome package and first recipe collection!
            </p>
          </div>

          {/* Enhanced success content */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200 mb-6">
            <h4 className="font-semibold mb-4 text-green-800">What happens next?</h4>
            <div className="space-y-3 text-left text-sm">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <span>Welcome email with your free eBook (within 2 minutes)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <span>First recipe collection tomorrow morning</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <span>Access to VIP community and exclusive content</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="primary" onClick={handleClose} className="group">
              <Heart className="w-4 h-4 mr-2" />
              Start Cooking!
              <div className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default NewsletterModal;