import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChefHat, Search, User, Heart, 
  Bell, Gift, Globe, Zap, ChevronDown, Mail,
  Award, Clock, Users, Star, Bookmark, Share2, 
  Utensils, BookOpen, Eye, ArrowRight, CheckCircle,
  Crown, TrendingUp, Flame, MapPin, Calendar,
  Play, Download, ShoppingCart, Filter, Sparkles,
  Coffee, Leaf, Fish, Wheat
} from 'lucide-react';

// UI Components
const OptimizedImage = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={className} loading="lazy" />
);

const Button = ({ children, variant = 'primary', size = 'md', className = '', onClick, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 shadow-sm',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
    outline: 'border border-orange-500 text-orange-600 hover:bg-orange-50',
    cta: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg',
    xl: 'px-8 py-4 text-lg rounded-xl',
    icon: 'p-2 rounded-lg'
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ icon: Icon, className = '', ...props }) => (
  <div className="relative">
    {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />}
    <input
      className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${className}`}
      {...props}
    />
  </div>
);

const Modal = ({ isOpen, onClose, title, children, size = 'lg' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />
        
        <div className={`inline-block w-full ${sizeClasses[size]} my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl`}>
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Recipe Card Component
const RecipeCard = ({ recipe, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [loved, setLoved] = useState(false);

  if (!recipe) return null;

  const handleLoveClick = (e) => {
    e.stopPropagation();
    setLoved(!loved);
  };

  const handleCardClick = () => {
    if (onClick && recipe.id) {
      onClick(recipe.id);
    }
  };

  let difficultyClasses = 'px-3 py-1 rounded-full text-xs font-semibold ';
  if (recipe.difficulty === 'Hard') {
    difficultyClasses += 'bg-red-500 text-white';
  } else if (recipe.difficulty === 'Medium') {
    difficultyClasses += 'bg-amber-500 text-white';
  } else {
    difficultyClasses += 'bg-green-500 text-white';
  }

  return (
    <div
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative h-64 overflow-hidden">
        <OptimizedImage
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-60"}`} />
        
        <button
          onClick={handleLoveClick}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white hover:scale-110 z-10"
        >
          <Heart className={loved ? "w-5 h-5 fill-red-500 text-red-500" : "w-5 h-5 text-gray-600"} />
        </button>
        
        {recipe.premium && (
          <div className="absolute top-4 left-4">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Crown className="w-3 h-3" />
              Premium
            </div>
          </div>
        )}

        {recipe.trending && (
          <div className="absolute top-16 left-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Trending
            </div>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <div className={difficultyClasses}>
              {recipe.difficulty}
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold">{recipe.rating || '4.5'}</span>
            </div>
          </div>
        </div>

        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Button onClick={(e) => { e.stopPropagation(); onClick && onClick(recipe.id); }} variant="primary" className="transform scale-110 shadow-2xl">
              <Eye className="w-4 h-4 mr-2" />
              Quick Preview
            </Button>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {recipe.tags && recipe.tags.slice(0, 2).map((tag) => (
            <div
              key={tag}
              className="px-2 py-1 bg-gradient-to-r from-amber-50 to-orange-50 text-orange-700 rounded-lg text-xs font-medium border border-orange-200"
            >
              {tag}
            </div>
          ))}
          {recipe.tags && recipe.tags.length > 2 && (
            <div className="px-2 py-1 bg-gradient-to-r from-amber-50 to-orange-50 text-orange-700 rounded-lg text-xs font-medium border border-orange-200">
              +{recipe.tags.length - 2}
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {recipe.title}
        </h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-orange-500" />
            <span>{recipe.prepTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-blue-500" />
            <span>{recipe.servings}</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-red-500" />
            <span className="text-xs">{recipe.calories} cal</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">
                {recipe.chef && recipe.chef.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <span className="text-sm text-gray-600 truncate">by {recipe.chef}</span>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Eye className="w-3 h-3" />
            <span>{recipe.reviews || '125'}</span>
          </div>
        </div>

        <Button onClick={(e) => { e.stopPropagation(); onClick && onClick(recipe.id); }} className="w-full group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
          View Full Recipe
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

// Recipe Modal Component
const RecipeModal = ({ selectedRecipeId, isOpen, onClose, getRecipeDetails }) => {
  const [activeTab, setActiveTab] = useState('ingredients');
  const [saved, setSaved] = useState(false);

  const recipe = selectedRecipeId ? getRecipeDetails(selectedRecipeId) : null;
  
  if (!recipe) return null;

  const tabs = [
    { id: 'ingredients', label: 'Ingredients', icon: Utensils },
    { id: 'instructions', label: 'Instructions', icon: BookOpen },
    { id: 'nutrition', label: 'Nutrition', icon: Heart }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={recipe.title} size="xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <OptimizedImage
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 rounded-xl object-cover shadow-lg"
          />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>{recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span>{recipe.servings} servings</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{recipe.rating || '4.5'}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSaved(!saved)}
                  className="flex-shrink-0"
                >
                  <Bookmark className={saved ? "w-4 h-4 fill-blue-600 text-blue-600" : "w-4 h-4"} />
                </Button>
                <Button variant="outline" size="sm" className="flex-shrink-0">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-0 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-4">
            {activeTab === 'ingredients' && (
              <div>
                <h4 className="font-semibold text-lg mb-4">Ingredients</h4>
                <ul className="space-y-2 max-h-80 overflow-y-auto">
                  {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 rounded flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'instructions' && (
              <div>
                <h4 className="font-semibold text-lg mb-4">Instructions</h4>
                <ol className="space-y-4 max-h-80 overflow-y-auto">
                  {recipe.instructions && recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-relaxed">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div>
                <h4 className="font-semibold text-lg mb-4">Nutrition Facts (Per Serving)</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {recipe.nutrition ? Object.entries(recipe.nutrition).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize">{key}</span>
                        <span className="font-semibold">{value}</span>
                      </div>
                    )) : (
                      <div className="col-span-2 text-gray-500 text-center">Nutrition information not available</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Comprehensive Recipe Data (including original data from first file)
const recipeData = [
  {
    id: 1,
    title: 'Idli Sambar',
    description: 'A classic South Indian breakfast combo. Soft, fluffy steamed rice cakes served with a savory, tangy lentil and vegetable stew.',
    prepTime: '25 min',
    servings: 4,
    calories: 250,
    difficulty: 'Easy',
    image: 'https://images.pexels.com/photos/16603013/pexels-photo-16603013/free-photo-of-idli-sambar-with-chutney.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    chef: 'Chef Rahul',
    rating: 4.7,
    reviews: 189,
    tags: ['South Indian', 'Breakfast', 'Vegetarian'],
    trending: true,
    ingredients: ['Rice batter', 'Lentils', 'Vegetables', 'Spices'],
    instructions: ['Steam the idlis.', 'Prepare the sambar.'],
    nutrition: { calories: 250, protein: '8g', carbs: '45g', fat: '3g', fiber: '6g', sugar: '4g' }
  },
  // Additional recipes merged from second file data structure
];

const indianStateRecipes = {
  "Tamil Nadu": [
    {
      id: "tn-1",
      title: "Chettinad Chicken",
      description: "Fiery and aromatic chicken curry with traditional Chettinad spices and fresh coconut",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
      prepTime: "45 mins",
      servings: 4,
      rating: 4.8,
      reviews: 234,
      tags: ["Spicy", "Non-Vegetarian", "Traditional"],
      difficulty: "Medium",
      chef: "Meera Rajesh",
      premium: false,
      category: "main",
      calories: 320,
      heatLevel: 4,
      trending: true,
      ingredients: ['1 kg Chicken', '2 tbsp Chettinad masala', '1 cup Coconut milk', '2 tbsp Coconut oil'],
      instructions: [
        'Marinate chicken with spices for 30 minutes.',
        'Heat oil and add spices.',
        'Cook chicken until tender.',
        'Add coconut milk and simmer.'
      ],
      nutrition: { calories: 320, protein: '35g', carbs: '8g', fat: '18g', fiber: '2g', sugar: '3g' }
    },
    {
      id: "tn-2",
      title: "Masala Dosa",
      description: "Crispy fermented crepe with spiced potato filling",
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
      prepTime: "12 hours",
      servings: 6,
      rating: 4.9,
      reviews: 456,
      tags: ["Vegetarian", "Breakfast", "South Indian"],
      difficulty: "Hard",
      chef: "Kamala Devi",
      premium: true,
      category: "breakfast",
      calories: 285,
      heatLevel: 2,
      trending: true,
      ingredients: ['3 cups Rice', '1 cup Urad dal', 'Potato filling', 'Coconut chutney'],
      instructions: [
        'Soak rice and dal overnight.',
        'Grind to smooth batter.',
        'Ferment for 8-12 hours.',
        'Make dosa and serve with filling.'
      ],
      nutrition: { calories: 285, protein: '8g', carbs: '52g', fat: '4g', fiber: '6g', sugar: '3g' }
    },
    // Include the original Idli Sambar recipe in Tamil Nadu section
    {
      id: "tn-3",
      title: 'Idli Sambar',
      description: 'A classic South Indian breakfast combo. Soft, fluffy steamed rice cakes served with a savory, tangy lentil and vegetable stew.',
      prepTime: '25 min',
      servings: 4,
      calories: 250,
      difficulty: 'Easy',
      image: 'https://images.pexels.com/photos/16603013/pexels-photo-16603013/free-photo-of-idli-sambar-with-chutney.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      chef: 'Chef Rahul',
      rating: 4.7,
      reviews: 189,
      tags: ['South Indian', 'Breakfast', 'Vegetarian'],
      trending: true,
      ingredients: ['Rice batter', 'Lentils', 'Vegetables', 'Spices'],
      instructions: ['Steam the idlis.', 'Prepare the sambar.'],
      nutrition: { calories: 250, protein: '8g', carbs: '45g', fat: '3g', fiber: '6g', sugar: '4g' }
    }
  ],
  "Kerala": [
    {
      id: "kl-1",
      title: "Fish Curry",
      description: "Coconut-based fish curry with aromatic spices",
      image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=400&h=300&fit=crop",
      prepTime: "35 mins",
      servings: 4,
      rating: 4.9,
      reviews: 298,
      tags: ["Coastal", "Non-Vegetarian", "Coconut"],
      difficulty: "Medium",
      chef: "Suma Nair",
      premium: true,
      category: "main",
      calories: 285,
      heatLevel: 3,
      trending: true,
      ingredients: ['500g Fish', '2 cups Coconut milk', '2 tbsp Coconut oil', 'Curry leaves'],
      instructions: [
        'Marinate fish with turmeric.',
        'Heat coconut oil in clay pot.',
        'Add spices and fish.',
        'Pour coconut milk and simmer.'
      ],
      nutrition: { calories: 285, protein: '28g', carbs: '6g', fat: '16g', fiber: '1g', sugar: '4g' }
    }
  ],
  "Punjab": [
    {
      id: "pb-1",
      title: "Butter Chicken",
      description: "Creamy tomato-based chicken curry",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
      prepTime: "1 hour",
      servings: 4,
      rating: 4.9,
      reviews: 456,
      tags: ["Rich", "Non-Vegetarian", "Popular"],
      difficulty: "Medium",
      chef: "Harpreet Singh",
      premium: true,
      category: "main",
      calories: 420,
      heatLevel: 2,
      trending: true,
      ingredients: ['1 kg Chicken', '1 cup Heavy cream', '2 tbsp Butter', 'Tomato puree'],
      instructions: [
        'Marinate chicken with yogurt.',
        'Grill chicken until cooked.',
        'Make tomato gravy.',
        'Combine and finish with cream.'
      ],
      nutrition: { calories: 420, protein: '32g', carbs: '12g', fat: '28g', fiber: '2g', sugar: '8g' }
    }
  ],
  "Maharashtra": [
    {
      id: "mh-1",
      title: "Vada Pav",
      description: "Mumbai's iconic street food",
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop",
      prepTime: "30 mins",
      servings: 4,
      rating: 4.7,
      reviews: 892,
      tags: ["Street Food", "Vegetarian", "Mumbai"],
      difficulty: "Medium",
      chef: "Asha Patil",
      premium: false,
      category: "snack",
      calories: 320,
      heatLevel: 3,
      trending: true,
      ingredients: ['4 Pav buns', '4 Potatoes', '1 cup Gram flour', 'Chutneys'],
      instructions: [
        'Prepare spiced potato balls.',
        'Make gram flour batter.',
        'Deep fry vadas.',
        'Serve in pav with chutneys.'
      ],
      nutrition: { calories: 320, protein: '8g', carbs: '52g', fat: '12g', fiber: '4g', sugar: '8g' }
    }
  ],
  "Rajasthan": [
    {
      id: "rj-1",
      title: "Dal Baati Churma",
      description: "Traditional trio of dal, baati and churma",
      image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop",
      prepTime: "2 hours",
      servings: 6,
      rating: 4.8,
      reviews: 245,
      tags: ["Traditional", "Vegetarian", "Royal"],
      difficulty: "Hard",
      chef: "Geeta Rajput",
      premium: false,
      category: "main",
      calories: 520,
      heatLevel: 2,
      trending: true,
      ingredients: ['2 cups Wheat flour', '1 cup Mixed dal', '1/2 cup Jaggery', 'Ghee'],
      instructions: [
        'Make baati dough and shape.',
        'Bake until golden.',
        'Cook dal with spices.',
        'Prepare churma with jaggery.'
      ],
      nutrition: { calories: 520, protein: '15g', carbs: '68g', fat: '22g', fiber: '8g', sugar: '18g' }
    }
  ],
  "West Bengal": [
    {
      id: "wb-1",
      title: "Machher Jhol",
      description: "Traditional Bengali fish curry",
      image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=400&h=300&fit=crop",
      prepTime: "40 mins",
      servings: 4,
      rating: 4.8,
      reviews: 189,
      tags: ["Fish", "Traditional", "Bengali"],
      difficulty: "Medium",
      chef: "Sharmila Banerjee",
      premium: false,
      category: "main",
      calories: 265,
      heatLevel: 2,
      ingredients: ['500g Fish', '2 Potatoes', '1 tsp Panch phoron', 'Mustard oil'],
      instructions: [
        'Marinate and fry fish.',
        'Fry potato pieces.',
        'Make spiced gravy.',
        'Add fish and simmer.'
      ],
      nutrition: { calories: 265, protein: '25g', carbs: '15g', fat: '12g', fiber: '2g', sugar: '3g' }
    }
  ],
  "Gujarat": [
    {
      id: "gj-1",
      title: "Dhokla",
      description: "Steamed savory cake from gram flour",
      image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop",
      prepTime: "30 mins",
      servings: 6,
      rating: 4.7,
      reviews: 234,
      tags: ["Snack", "Vegetarian", "Steamed"],
      difficulty: "Medium",
      chef: "Kiran Shah",
      premium: false,
      category: "snack",
      calories: 145,
      heatLevel: 1,
      ingredients: ['2 cups Gram flour', '1 tbsp Semolina', 'Ginger-chili paste', 'Eno'],
      instructions: [
        'Make batter with gram flour.',
        'Add eno and steam.',
        'Cut into pieces.',
        'Temper and serve.'
      ],
      nutrition: { calories: 145, protein: '6g', carbs: '22g', fat: '4g', fiber: '4g', sugar: '2g' }
    }
  ],
  "Andhra Pradesh": [
    {
      id: "ap-1",
      title: "Hyderabadi Biryani",
      description: "Aromatic rice dish with tender mutton",
      image: "https://images.unsplash.com/photo-1563379091553-7f5ba2d2d6d6?w=400&h=300&fit=crop",
      prepTime: "2.5 hours",
      servings: 8,
      rating: 4.9,
      reviews: 567,
      tags: ["Non-Vegetarian", "Royal", "Aromatic"],
      difficulty: "Hard",
      chef: "Nazeer Ahmed",
      premium: true,
      category: "main",
      calories: 480,
      heatLevel: 3,
      trending: true,
      ingredients: ['1 kg Basmati rice', '1 kg Mutton', 'Saffron', 'Fried onions', 'Yogurt'],
      instructions: [
        'Marinate mutton with yogurt and spices.',
        'Partially cook rice with whole spices.',
        'Layer mutton and rice alternately.',
        'Cook on dum for 45 minutes.'
      ],
      nutrition: { calories: 480, protein: '28g', carbs: '45g', fat: '22g', fiber: '2g', sugar: '4g' }
    }
  ],
  "Karnataka": [
    {
      id: "ka-1",
      title: "Mysore Pak",
      description: "Traditional sweet made with gram flour and ghee",
      image: "https://images.unsplash.com/photo-1571167435887-b0969d891419?w=400&h=300&fit=crop",
      prepTime: "45 mins",
      servings: 12,
      rating: 4.6,
      reviews: 178,
      tags: ["Sweet", "Traditional", "Festival"],
      difficulty: "Hard",
      chef: "Lakshmi Rao",
      premium: false,
      category: "dessert",
      calories: 420,
      heatLevel: 0,
      ingredients: ['2 cups Gram flour', '2 cups Sugar', '1 cup Ghee', 'Cardamom'],
      instructions: [
        'Roast gram flour until aromatic.',
        'Make sugar syrup of right consistency.',
        'Mix flour with hot ghee.',
        'Pour into greased tray and cut.'
      ],
      nutrition: { calories: 420, protein: '8g', carbs: '52g', fat: '20g', fiber: '4g', sugar: '45g' }
    }
  ]
};

// State Card Component
const StateCard = ({ stateName, recipeCount, onClick, image }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(stateName)}
    >
      <div className="relative h-48 overflow-hidden">
        <OptimizedImage
          src={image}
          alt={stateName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-70"}`} />
        
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-2xl font-bold mb-2">{stateName}</h3>
          <p className="text-sm opacity-90">{recipeCount} Traditional Recipes</p>
        </div>

        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Button variant="primary" className="transform scale-110 shadow-2xl">
              <Utensils className="w-4 h-4 mr-2" />
              Explore Cuisine
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Get recipe details function
const getRecipeDetails = (recipeId) => {
  if (!recipeId) return null;
  
  for (const state in indianStateRecipes) {
    const recipe = indianStateRecipes[state].find(r => r.id === recipeId);
    if (recipe) return recipe;
  }
  return null;
};

// Main App Component
const IndianCuisineApp = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const states = [
    { name: "Tamil Nadu", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop" },
    { name: "Kerala", image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=400&h=300&fit=crop" },
    { name: "Punjab", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop" },
    { name: "Maharashtra", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop" },
    { name: "Rajasthan", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop" },
    { name: "West Bengal", image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=400&h=300&fit=crop" },
    { name: "Gujarat", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop" },
    { name: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1563379091553-7f5ba2d2d6d6?w=400&h=300&fit=crop" },
    { name: "Karnataka", image: "https://images.unsplash.com/photo-1571167435887-b0969d891419?w=400&h=300&fit=crop" }
  ];

  const handleStateClick = (stateName) => {
    setSelectedState(stateName);
  };

  const handleRecipeClick = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setShowRecipeModal(true);
  };

  const handleBackToStates = () => {
    setSelectedState(null);
  };

  const handleCloseRecipeModal = () => {
    setShowRecipeModal(false);
  };

  const filteredRecipes = selectedState ? indianStateRecipes[selectedState] || [] : [];

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 min-w-0">
              <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-2 rounded-xl shadow-lg flex-shrink-0">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Indian Cuisine Explorer
                </h1>
                <p className="text-xs text-gray-600 truncate">Discover authentic flavors from every state</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-700 hover:text-orange-600 relative group"
              >
                <Search className="w-5 h-5 transition-transform group-hover:scale-110" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <OptimizedImage
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop"
          alt="Indian cuisine background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-4 rounded-full shadow-2xl animate-bounce">
              <ChefHat className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Explore Authentic Indian
            <span className="block text-3xl md:text-5xl lg:text-6xl bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent mt-2">
              Regional Cuisines
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Journey through India's diverse culinary landscape, one state at a time
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 px-4">
            <Button variant="cta" size="xl" className="w-full sm:w-auto min-w-[200px] transform hover:scale-105 transition-transform group">
              <Search className="w-5 h-5 mr-3" />
              Start Exploring
              <Sparkles className="w-4 h-4 ml-2 animate-pulse" />
            </Button>
            
            <Button variant="outline" size="xl" className="w-full sm:w-auto min-w-[200px] group">
              <Play className="w-5 h-5 mr-3" />
              Watch Video Tour
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent mb-3">
                28+
              </div>
              <div className="text-gray-300 text-lg">States & UTs</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent mb-3">
                500+
              </div>
              <div className="text-gray-300 text-lg">Traditional Recipes</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent mb-3">
                5000+
              </div>
              <div className="text-gray-300 text-lg">Years of Heritage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Recipes Section */}
      {!selectedState && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <TrendingUp className="w-4 h-4" />
                What's Trending
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Popular Recipes This Month
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover the most loved dishes from across India
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.values(indianStateRecipes).flat().filter(recipe => recipe.trending).slice(0, 6).map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onClick={handleRecipeClick} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <main className="pt-8">
        {!selectedState ? (
          <section id="states" className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <Globe className="w-4 h-4" />
                  Culinary Regions
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Choose Your Culinary Journey
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Select a state to discover its unique flavors, traditional dishes, and cooking techniques
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {states.map((state) => (
                  <StateCard
                    key={state.name}
                    stateName={state.name}
                    recipeCount={indianStateRecipes[state.name] ? indianStateRecipes[state.name].length : 0}
                    onClick={handleStateClick}
                    image={state.image}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section id="recipes" className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <Button
                  variant="outline"
                  onClick={handleBackToStates}
                  className="mb-6 group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180 transition-transform group-hover:-translate-x-1" />
                  Back to States
                </Button>
                
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <Award className="w-4 h-4" />
                  {selectedState} Cuisine
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Traditional {selectedState} Recipes
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Discover authentic flavors and time-honored cooking techniques from {selectedState}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onClick={handleRecipeClick} 
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Gift className="w-4 h-4" />
              Special Offer
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Master Indian Cooking?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join our premium membership for exclusive recipes, video tutorials, and personalized cooking guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="secondary" size="xl" className="group min-w-[200px]">
                <Crown className="w-5 h-5 mr-3" />
                Get Premium Access
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white/20 min-w-[200px]">
                <Download className="w-5 h-5 mr-3" />
                Download App
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recipe Modal */}
      <RecipeModal 
        selectedRecipeId={selectedRecipeId}
        isOpen={showRecipeModal}
        onClose={handleCloseRecipeModal}
        getRecipeDetails={getRecipeDetails}
      />

      {/* Search Modal */}
      <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} title="Search Recipes">
        <div className="space-y-6">
          <Input
            type="text"
            placeholder="Search for recipes, ingredients, cuisines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
            className="text-lg py-4"
          />
          
          <div>
            <h4 className="font-semibold mb-3">Popular Searches</h4>
            <div className="flex flex-wrap gap-2">
              {['Biryani', 'Dosa', 'Butter Chicken', 'Samosa', 'Gulab Jamun', 'Vada Pav'].map(term => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-4 py-2 bg-gradient-to-r from-orange-50 to-pink-50 hover:from-orange-100 hover:to-pink-100 text-orange-700 rounded-lg text-sm transition-all hover:scale-105"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Browse by State</h4>
            <div className="grid grid-cols-2 gap-2">
              {states.map(state => (
                <button
                  key={state.name}
                  onClick={() => {
                    setSelectedState(state.name);
                    setIsSearchOpen(false);
                  }}
                  className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-sm transition-colors text-left hover:scale-105"
                >
                  {state.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-2 rounded-xl">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Indian Cuisine Explorer</h3>
              </div>
              <p className="text-gray-400">
                Your gateway to authentic Indian flavors and traditional recipes from every corner of India.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Popular Recipes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Regional Cuisines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cooking Tips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Video Tutorials</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Vegetarian</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Non-Vegetarian</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Desserts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Street Food</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Mail className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Bell className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
              <div className="mt-4">
                <Input
                  type="email"
                  placeholder="Subscribe to our newsletter"
                  className="mb-2 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
                <Button variant="primary" size="sm" className="w-full">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Indian Cuisine Explorer. All rights reserved. Made with ❤️ for food lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndianCuisineApp