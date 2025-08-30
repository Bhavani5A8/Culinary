import React, { useState, useEffect } from 'react';
import { 
  ChefHat, Mail, Bell, Heart, 
  // NEW ENHANCEMENT ICONS
  Share2, MessageCircle, Users, Trophy, Calendar, 
  Download, Wifi, Settings, HelpCircle, Shield,
  TrendingUp, BookOpen, Star, Award
} from 'lucide-react';
import { Button, Input } from './ui';

// NEW ENHANCEMENT COMPONENTS - Additive layers
// In Footer.js
import { 
  SocialMediaLinks, 
  NewsletterPreferences, 
  CommunityStats, 
  LanguageSelector 
} from './enhanced.js';

const Footer = ({ 
  // NEW PROPS - Enhanced features (backward compatible)
  enhancedFeatures = {},
  userStats = {},
  communityData = {}
}) => {
  // EXISTING STATE - Preserved
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('');

  // NEW ENHANCEMENT STATE - Additive layer
  const [newsletterPrefs, setNewsletterPrefs] = useState({
    recipes: true,
    tips: false,
    community: false,
    promotions: false
  });
  const [showPreferences, setShowPreferences] = useState(false);
  const [socialConnections, setSocialConnections] = useState({
    facebook: false,
    instagram: false,
    twitter: false,
    youtube: false
  });
  const [appStats, setAppStats] = useState({
    totalUsers: 50000,
    totalRecipes: 2500,
    totalReviews: 25000,
    activeToday: 1200
  });

  // NEW ENHANCEMENT EFFECT - Load user preferences
  useEffect(() => {
    try {
      // Load newsletter preferences (new functionality)
      const savedPrefs = sessionStorage.getItem('newsletterPreferences');
      if (savedPrefs) {
        setNewsletterPrefs(JSON.parse(savedPrefs));
      }

      // Load social connections (new functionality)
      const savedConnections = sessionStorage.getItem('socialConnections');
      if (savedConnections) {
        setSocialConnections(JSON.parse(savedConnections));
      }

      // Load community stats (new functionality)
      const savedStats = sessionStorage.getItem('communityStats');
      if (savedStats) {
        setAppStats({ ...appStats, ...JSON.parse(savedStats) });
      }
    } catch (error) {
      console.error('Error loading footer preferences:', error);
      // Graceful fallback - continue with defaults
    }
  }, []);

  // EXISTING HANDLER - Enhanced with new functionality
  const handleSubscribe = async (e) => {
    try {
      e.preventDefault();
      setSubscriptionStatus('loading');

      // NEW ENHANCEMENT - Advanced subscription with preferences
      if (enhancedFeatures.personalizedNewsletter) {
        // Save newsletter preferences
        sessionStorage.setItem('newsletterPreferences', JSON.stringify(newsletterPrefs));
        
        // Simulate API call with preferences
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSubscriptionStatus('success');
        setEmail('');
        
        // Show success message with preferences
        setTimeout(() => setSubscriptionStatus(''), 3000);
      } else {
        // ORIGINAL FUNCTIONALITY - Preserved exactly as is
        console.log('Newsletter subscription');
        setSubscriptionStatus('success');
        setTimeout(() => setSubscriptionStatus(''), 3000);
      }
    } catch (error) {
      console.error('Error handling newsletter subscription:', error);
      setSubscriptionStatus('error');
      setTimeout(() => setSubscriptionStatus(''), 3000);
    }
  };

  // EXISTING HANDLER - Preserved exactly as is
  const handleSocialClick = (platform) => {
    try {
      console.log(`Navigating to ${platform}`);
      // Handle social media navigation
    } catch (error) {
      console.error(`Error navigating to ${platform}:`, error);
    }
  };

  // NEW ENHANCED HANDLERS - Additive functionality
  const handleSocialConnect = (platform) => {
    try {
      const newConnections = {
        ...socialConnections,
        [platform]: !socialConnections[platform]
      };
      setSocialConnections(newConnections);
      sessionStorage.setItem('socialConnections', JSON.stringify(newConnections));
    } catch (error) {
      console.error('Error connecting social account:', error);
    }
  };

  const handlePreferenceChange = (prefType, value) => {
    try {
      const newPrefs = { ...newsletterPrefs, [prefType]: value };
      setNewsletterPrefs(newPrefs);
      sessionStorage.setItem('newsletterPreferences', JSON.stringify(newPrefs));
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  const handleDownloadApp = () => {
    try {
      // Progressive Web App installation
      if ('serviceWorker' in navigator) {
        console.log('Initiating PWA installation');
        // Handle PWA installation
      } else {
        // Fallback to app store links
        window.open('https://apps.apple.com/app/culinaryfest', '_blank');
      }
    } catch (error) {
      console.error('Error downloading app:', error);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
      {/* NEW ENHANCEMENT - Background Pattern */}
      {enhancedFeatures.modernDesign && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-pink-600/20"></div>
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl"></div>
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        {/* NEW ENHANCEMENT - Community Stats Bar */}
        {enhancedFeatures.communityFeatures && (
          <div className="mb-12 p-6 bg-gradient-to-r from-orange-600/20 to-pink-600/20 rounded-2xl backdrop-blur-sm border border-white/10">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-400" />
              Our Growing Community
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{appStats.totalUsers.toLocaleString()}</div>
                <div className="text-sm text-gray-300">Food Lovers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">{appStats.totalRecipes.toLocaleString()}</div>
                <div className="text-sm text-gray-300">Recipes Shared</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{appStats.totalReviews.toLocaleString()}</div>
                <div className="text-sm text-gray-300">Reviews Posted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{appStats.activeToday.toLocaleString()}</div>
                <div className="text-sm text-gray-300">Cooking Today</div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* EXISTING BRAND SECTION - Enhanced with new features */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-2 rounded-xl">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">CulinaryFest</h3>
            </div>
            <p className="text-gray-400">
              Your gateway to authentic flavors and traditional recipes from around the world.
            </p>

            {/* NEW ENHANCEMENT - App Download Section */}
            {enhancedFeatures.mobileApp && (
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Get Our App</h4>
                <button 
                  onClick={handleDownloadApp}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg text-sm hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download PWA
                </button>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Wifi className="w-3 h-3" />
                  Works offline • Install to home screen
                </div>
              </div>
            )}
          </div>
          
          {/* EXISTING QUICK LINKS - Enhanced with new categories */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#recipes" className="hover:text-white transition-colors">Popular Recipes</a></li>
              <li><a href="#cuisines" className="hover:text-white transition-colors">Regional Cuisines</a></li>
              <li><a href="#cooking-tips" className="hover:text-white transition-colors">Cooking Tips</a></li>
              <li><a href="#video-tutorials" className="hover:text-white transition-colors">Video Tutorials</a></li>
              
              {/* NEW ENHANCEMENT - Additional links for enhanced features */}
              {enhancedFeatures.communityFeatures && (
                <>
                  <li><a href="#challenges" className="hover:text-white transition-colors flex items-center gap-1">
                    <Trophy className="w-3 h-3" /> Cooking Challenges
                  </a></li>
                  <li><a href="#leaderboard" className="hover:text-white transition-colors flex items-center gap-1">
                    <Award className="w-3 h-3" /> Chef Leaderboard
                  </a></li>
                </>
              )}
              
              {enhancedFeatures.personalizedContent && (
                <>
                  <li><a href="#meal-planner" className="hover:text-white transition-colors flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Meal Planner
                  </a></li>
                  <li><a href="#shopping-lists" className="hover:text-white transition-colors flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> Shopping Lists
                  </a></li>
                </>
              )}
            </ul>
          </div>
          
          {/* EXISTING CATEGORIES - Preserved exactly as is */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#vegetarian" className="hover:text-white transition-colors">Vegetarian</a></li>
              <li><a href="#non-vegetarian" className="hover:text-white transition-colors">Non-Vegetarian</a></li>
              <li><a href="#desserts" className="hover:text-white transition-colors">Desserts</a></li>
              <li><a href="#street-food" className="hover:text-white transition-colors">Street Food</a></li>
            </ul>
          </div>
          
          {/* EXISTING CONNECT SECTION - Enhanced with advanced features */}
          <div>
            <h4 className="font-semibold mb-4">Connect & Subscribe</h4>
            
            {/* Enhanced Social Media Section */}
            <div className="flex space-x-4 mb-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-400 hover:text-white"
                onClick={() => handleSocialClick('email')}
              >
                <Mail className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-400 hover:text-white"
                onClick={() => handleSocialClick('notifications')}
              >
                <Bell className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-400 hover:text-white"
                onClick={() => handleSocialClick('favorites')}
              >
                <Heart className="w-5 h-5" />
              </Button>

              {/* NEW ENHANCEMENT - Additional social features */}
              {enhancedFeatures.socialFeatures && (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-gray-400 hover:text-white"
                    onClick={() => handleSocialClick('community')}
                  >
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-gray-400 hover:text-white"
                    onClick={() => handleSocialClick('share')}
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </>
              )}
            </div>

            {/* Enhanced Newsletter Subscription */}
            <div className="mt-4">
              <form onSubmit={handleSubscribe} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Subscribe to our newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-2 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                  required
                />

                {/* NEW ENHANCEMENT - Newsletter Preferences */}
                {enhancedFeatures.personalizedNewsletter && (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setShowPreferences(!showPreferences)}
                      className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                    >
                      <Settings className="w-3 h-3" />
                      {showPreferences ? 'Hide' : 'Show'} preferences
                    </button>

                    {showPreferences && (
                      <div className="bg-gray-800 p-3 rounded-lg space-y-2">
                        <div className="text-xs font-medium text-gray-300 mb-2">What would you like to receive?</div>
                        {Object.entries(newsletterPrefs).map(([key, value]) => (
                          <label key={key} className="flex items-center gap-2 text-xs">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => handlePreferenceChange(key, e.target.checked)}
                              className="rounded bg-gray-700 border-gray-600 text-orange-500 focus:ring-orange-500 focus:ring-offset-gray-800"
                            />
                            <span className="text-gray-300 capitalize">
                              {key === 'tips' ? 'Cooking Tips' : 
                               key === 'community' ? 'Community Updates' :
                               key === 'promotions' ? 'Special Offers' : key}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <Button 
                  variant="primary" 
                  size="sm" 
                  className="w-full" 
                  type="submit"
                  disabled={subscriptionStatus === 'loading'}
                >
                  {subscriptionStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </Button>

                {/* Subscription Status Messages */}
                {subscriptionStatus === 'success' && (
                  <div className="text-green-400 text-xs flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Thank you for subscribing!
                  </div>
                )}
                {subscriptionStatus === 'error' && (
                  <div className="text-red-400 text-xs">
                    Something went wrong. Please try again.
                  </div>
                )}
              </form>
            </div>

            {/* NEW ENHANCEMENT - Language Selector */}
            {enhancedFeatures.multiLanguage && (
              <div className="mt-4 pt-4 border-t border-gray-800">
                <LanguageSelector />
              </div>
            )}
          </div>
        </div>

        {/* NEW ENHANCEMENT - Additional Footer Section */}
        {enhancedFeatures.extendedFooter && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div>
                <h5 className="font-semibold text-sm mb-3">For Home Cooks</h5>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li><a href="#beginner-guides" className="hover:text-white">Beginner Guides</a></li>
                  <li><a href="#kitchen-tools" className="hover:text-white">Kitchen Tools</a></li>
                  <li><a href="#meal-prep" className="hover:text-white">Meal Prep Tips</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-3">For Professionals</h5>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li><a href="#chef-tools" className="hover:text-white">Chef Tools</a></li>
                  <li><a href="#bulk-recipes" className="hover:text-white">Bulk Recipes</a></li>
                  <li><a href="#restaurant-tips" className="hover:text-white">Restaurant Tips</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-3">Support</h5>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li><a href="#help" className="hover:text-white flex items-center gap-1">
                    <HelpCircle className="w-3 h-3" /> Help Center
                  </a></li>
                  <li><a href="#contact" className="hover:text-white">Contact Us</a></li>
                  <li><a href="#feedback" className="hover:text-white">Feedback</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-3">Legal</h5>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li><a href="#privacy" className="hover:text-white flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Privacy Policy
                  </a></li>
                  <li><a href="#terms" className="hover:text-white">Terms of Service</a></li>
                  <li><a href="#cookies" className="hover:text-white">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* EXISTING COPYRIGHT - Enhanced with additional info */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p>&copy; 2024 CulinaryFest. All rights reserved. Made with ❤️ for food lovers.</p>
            
            {/* NEW ENHANCEMENT - Additional footer info */}
            {enhancedFeatures.enhancedFooter && (
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {appStats.activeToday} cooking now
                </span>
                <span>•</span>
                <span>Version 2.1.0</span>
                <span>•</span>
                <a href="#status" className="hover:text-white flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  All systems operational
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;