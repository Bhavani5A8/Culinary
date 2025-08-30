// Complete Recipe Data with enhanced details
export const southIndianBreakfast = [
  {
    id: "south-1",
    title: "Masala Dosa",
    description: "Crispy golden crepe made from fermented rice and lentil batter, filled with spiced potato curry",
    image: "/images/masaladosa.webp",
    prepTime: "25 mins",
    servings: 4,
    rating: 4.8,
    reviews: 324,
    tags: ["Traditional", "Vegetarian", "Fermented"],
    difficulty: "Medium",
    chef: "Lakshmi Iyer",
    premium: false,
    category: "breakfast",
    calories: 168,
    heatLevel: 2,
    ingredients: [
      '2 cups Rice (preferably parboiled)',
      '1/2 cup Urad dal (black gram)',
      '1/2 tsp Fenugreek seeds',
      '3 medium Potatoes (boiled and cubed)',
      '2 tbsp Oil',
      '1 tsp Mustard seeds',
      '1 tsp Cumin seeds',
      '2 Green chilies (slit)',
      '1 inch Ginger (minced)',
      '10-12 Curry leaves',
      '1 large Onion (sliced)',
      '1/2 tsp Turmeric powder',
      'Salt to taste'
    ],
    instructions: [
      'Soak rice and urad dal separately for 4-5 hours with fenugreek seeds.',
      'Grind both to a smooth paste, mix and ferment overnight for 8-12 hours.',
      'For filling: heat oil, add mustard seeds, cumin, curry leaves, and chilies.',
      'Add onions, cook until golden, then add ginger and potatoes.',
      'Season with turmeric and salt, mash lightly and cook for 5 minutes.',
      'Heat a non-stick pan, pour batter and spread thin in circular motion.',
      'Drizzle oil around edges, cook until golden and crispy.',
      'Place potato filling on one half, fold and serve hot with chutney.'
    ],
    nutrition: { calories: 168, protein: '6g', carbs: '32g', fat: '2g', fiber: '2g', sugar: '1g' }
  },
  {
    id: "south-2",
    title: "Idli Sambar",
    description: "Steamed rice cakes served with aromatic lentil curry and coconut chutney",
    image: "/images/idly.webp",
    prepTime: "30 mins",
    servings: 6,
    rating: 4.9,
    reviews: 287,
    tags: ["Healthy", "Vegetarian", "Protein-Rich"],
    difficulty: "Easy",
    chef: "Meera Nair",
    premium: false,
    category: "breakfast",
    calories: 142,
    heatLevel: 1,
    ingredients: [
      '2 cups Rice',
      '1/2 cup Urad dal',
      '1/2 tsp Fenugreek seeds',
      '1/2 cup Toor dal (pigeon pea)',
      '1 large Tomato (chopped)',
      '1 medium Onion (chopped)',
      '2 tbsp Tamarind paste',
      '1 tsp Sambar powder',
      '1/2 tsp Turmeric powder',
      '2 Green chilies',
      '10 Curry leaves',
      '1 tbsp Oil',
      '1/2 tsp Mustard seeds',
      'Salt to taste',
      'Fresh coriander for garnish'
    ],
    instructions: [
      "Soak rice and urad dal separately for 4-5 hours.",
      "Grind both to a smooth paste, mix and ferment overnight for 8-12 hours.",
      "Grease idli moulds, pour batter and steam for 10-12 minutes until fluffy.",
      "For sambar: cook toor dal with turmeric until soft, mash lightly.",
      "Heat oil, add mustard seeds, curry leaves, dried chilies, and hing.",
      "Add chopped onions, tomatoes, tamarind pulp, sambar powder, and salt.",
      "Add cooked dal, mix well, and simmer for 10 minutes.",
      "Serve hot idlis with sambar and coconut chutney."
    ],
    nutrition: { calories: 142, protein: '5g', carbs: '28g', fat: '1g', fiber: '3g', sugar: '2g' }
  },
  {
    id: "south-3",
    title: "Uttapam",
    description: "Thick savory pancakes topped with fresh vegetables like onions, tomatoes, and chilies",
    image: "/images/uttapam.webp",
    prepTime: "20 mins",
    servings: 4,
    rating: 4.7,
    reviews: 156,
    tags: ["Healthy", "Vegetarian", "Customizable"],
    difficulty: "Easy",
    chef: "Radha Krishnan",
    premium: false,
    category: "breakfast",
    calories: 185,
    heatLevel: 2,
    ingredients: [
      '2 cups Dosa batter',
      '1 medium Onion (finely chopped)',
      '1 medium Tomato (finely chopped)',
      '2 Green chilies (finely chopped)',
      '1/4 cup Bell pepper (chopped)',
      '2 tbsp Fresh coriander (chopped)',
      '1/2 tsp Ginger (minced)',
      'Oil for cooking',
      'Salt to taste'
    ],
    instructions: [
      'Mix all chopped vegetables with salt and let sit for 5 minutes.',
      'Heat a non-stick pan and lightly grease with oil.',
      'Pour thick layer of dosa batter to form 6-inch circle.',
      'Sprinkle vegetable mixture evenly on top and press gently.',
      'Drizzle oil around edges and cook on medium heat for 3-4 minutes.',
      'Flip carefully and cook for 2-3 minutes until golden.',
      'Serve hot with coconut chutney and sambar.'
    ],
    nutrition: { calories: 185, protein: '4g', carbs: '35g', fat: '3g', fiber: '2g', sugar: '2g' }
  }
];

export const featuredRecipes = [
  {
    id: "featured-1",
    title: "Traditional Diwali Laddus",
    description: "Melt-in-the-mouth festive sweets made with gram flour, ghee, and aromatic cardamom",
    image: "/images/diwali laddu.webp",
    prepTime: "30 mins",
    servings: 20,
    rating: 4.9,
    reviews: 156,
    tags: ["Festive", "Vegetarian", "Traditional"],
    difficulty: "Medium",
    chef: "Priya Sharma",
    premium: false,
    category: "dessert",
    calories: 145,
    heatLevel: 0,
    trending: true,
    isNew: false,
    ingredients: [
      '2 cups Besan (gram flour)',
      '1 cup Powdered sugar',
      '1/2 cup Ghee (clarified butter)',
      '1 tsp Cardamom powder',
      '2 tbsp Mixed nuts (almonds, cashews)',
      '1 tbsp Raisins',
      '2 tbsp Milk (if needed)',
      'A pinch of salt'
    ],
    instructions: [
      'Dry roast besan in a heavy-bottomed pan on low heat for 8-10 minutes.',
      'Stir continuously until it turns golden and aromatic.',
      'Add ghee gradually and mix well, cook for 2-3 minutes more.',
      'Remove from heat and let it cool for 5 minutes.',
      'Add powdered sugar, cardamom powder, and chopped nuts.',
      'Mix everything well, add milk if mixture seems too dry.',
      'While still warm, shape into small balls with your palms.',
      'Let them cool completely before storing in airtight containers.'
    ],
    nutrition: { calories: 145, protein: '4g', carbs: '18g', fat: '7g', fiber: '2g', sugar: '12g' }
  },
  {
    id: "featured-2",
    title: "Authentic Eid Biryani",
    description: "Aromatic basmati rice layered with tender marinated mutton and fragrant whole spices",
    image: "/images/dum biryani.webp",
    prepTime: "2 hours",
    cookTime: "45 mins",
    servings: 8,
    rating: 4.8,
    reviews: 203,
    tags: ["Festive", "Non-Vegetarian", "Spiced"],
    difficulty: "Hard",
    chef: "Ahmed Ali",
    premium: true,
    category: "main",
    calories: 485,
    heatLevel: 4,
    trending: true,
    isNew: false,
    ingredients: [
      '3 cups Basmati rice (soaked for 30 mins)',
      '1 kg Mutton (cut into pieces)',
      '1 cup Yogurt',
      '2 tbsp Ginger-garlic paste',
      '2 tsp Red chili powder',
      '1 tsp Turmeric powder',
      '2 tsp Garam masala',
      'Saffron soaked in 1/2 cup warm milk',
      '3 tbsp Ghee',
      'Fresh mint leaves',
      'Salt to taste'
    ],
    instructions: [
      'Marinate mutton with yogurt, ginger-garlic paste, spices, and salt for 2 hours.',
      'In a heavy-bottomed pot, heat ghee and add whole spices.',
      'Add marinated mutton and cook on high heat for 5 minutes.',
      'Reduce heat, cover and cook for 45 minutes until meat is 70% done.',
      'In another pot, boil water with whole spices and salt.',
      'Add soaked rice and cook until 70% done, then drain.',
      'Layer the rice over mutton, sprinkle fried onions and saffron milk.',
      'Cover with aluminum foil, then lid, cook on high for 2 mins, then low for 45 mins.',
      'Turn off heat, let it rest for 10 minutes before opening.',
      'Garnish with fresh mint and serve with raita.'
    ],
    nutrition: { calories: 485, protein: '32g', carbs: '52g', fat: '18g', fiber: '2g', sugar: '4g' }
  },
  {
    id: "featured-3",
    title: "Christmas Plum Cake",
    description: "Rich, moist cake loaded with rum-soaked dried fruits and warm festive spices",
    image: "/images/plum cake.webp",
    prepTime: "4 hours",
    cookTime: "2-3 hours",
    servings: 12,
    rating: 4.7,
    reviews: 89,
    tags: ["Festive", "Dessert", "Baked"],
    difficulty: "Medium",
    chef: "Maria Rodriguez",
    premium: false,
    category: "dessert",
    calories: 285,
    heatLevel: 0,
    trending: false,
    isNew: true,
    ingredients: [
      '2 cups Mixed dried fruits',
      '1/2 cup Dark rum',
      '2 cups All-purpose flour',
      '1 cup Brown sugar',
      '1/2 cup Butter',
      '4 large Eggs',
      '1 tsp Vanilla extract',
      '1 tsp Mixed spice powder',
      '1/2 tsp Baking powder'
    ],
    instructions: [
      'Soak dried fruits in rum overnight.',
      'Preheat oven to 325°F and grease a cake pan.',
      'Cream butter and sugar until light and fluffy.',
      'Add eggs one at a time, then vanilla.',
      'Fold in flour, spices, and baking powder.',
      'Add soaked fruits with any remaining rum.',
      'Pour into prepared pan and bake for 2-3 hours.',
      'Cool completely before removing from pan.'
    ],
    nutrition: { calories: 285, protein: '5g', carbs: '45g', fat: '8g', fiber: '3g', sugar: '35g' }
  },
  {
    id: "featured-4",
    title: "Festive Gulab Jamun",
    description: "Soft, spongy milk dumplings soaked in aromatic rose-cardamom syrup",
    image: "/images/gulabjamun.webp",
    prepTime: "45 mins",
    cookTime: "30 mins",
    servings: 15,
    rating: 4.9,
    reviews: 278,
    tags: ["Festive", "Vegetarian", "Traditional", "Sweet"],
    difficulty: "Medium",
    chef: "Sunita Devi",
    premium: false,
    category: "dessert",
    calories: 195,
    heatLevel: 0,
    trending: false,
    isNew: false,
    ingredients: [
      '1 cup Khoya/Mawa (milk solids)',
      '1/4 cup All-purpose flour',
      '1 tbsp Semolina',
      '1/4 tsp Baking soda',
      '2-3 tbsp Milk',
      '2 cups Sugar',
      '2 cups Water',
      '1/2 tsp Rose water',
      '4-5 Green cardamom pods',
      'Oil for deep frying'
    ],
    instructions: [
      'Crumble khoya and mix with flour, semolina, and baking soda.',
      'Add milk gradually to form a soft dough, rest for 15 minutes.',
      'Make sugar syrup by boiling sugar, water, cardamom until sticky.',
      'Add rose water to syrup and keep warm.',
      'Shape dough into small smooth balls without cracks.',
      'Heat oil to medium temperature and fry balls until golden brown.',
      'Immediately transfer hot gulab jamuns to warm syrup.',
      'Let them soak for at least 2 hours before serving.'
    ],
    nutrition: { calories: 195, protein: '3g', carbs: '35g', fat: '6g', fiber: '0g', sugar: '32g' }
  }
];

// ✅ FIXED: Enhanced getRecipeDetails function with better error handling and logging
export const getRecipeDetails = (recipeId) => {
  // 🔒 Normalize ID to avoid type mismatches (e.g., '42' vs 42)
  const _targetId = String(recipeId);

  console.log('🔍 recipeData.js - getRecipeDetails called with ID:', recipeId);
  
  try {
    if (!recipeId) {
      console.error('❌ recipeData.js - No recipeId provided to getRecipeDetails');
      return null;
    }

    // Create combined recipe array
    const allRecipes = [...southIndianBreakfast, ...featuredRecipes];
    console.log('📚 recipeData.js - Total recipes available:', allRecipes.length);
    console.log('📋 recipeData.js - Recipe IDs available:', allRecipes.map(r => r.id));

    // Find recipe by ID
    const foundRecipe = allRecipes.find(r => r.id === recipeId);
    
    if (foundRecipe) {
      console.log('✅ recipeData.js - Recipe found:', foundRecipe.title);
      console.log('📝 recipeData.js - Recipe data complete:', {
        hasTitle: !!foundRecipe.title,
        hasImage: !!foundRecipe.image,
        hasIngredients: !!foundRecipe.ingredients,
        hasInstructions: !!foundRecipe.instructions,
        ingredientsCount: foundRecipe.ingredients?.length || 0,
        instructionsCount: foundRecipe.instructions?.length || 0
      });
    } else {
      console.error('❌ recipeData.js - Recipe not found for ID:', recipeId);
      console.log('🔧 recipeData.js - Available IDs:', allRecipes.map(r => r.id));
    }

    return foundRecipe || null;
    
  } catch (error) {
    console.error('💥 recipeData.js - Error in getRecipeDetails:', error);
    return null;
  }
};

// ✅ ENHANCED: Additional utility functions for recipe management
export const getRecipesByCategory = (category) => {
  try {
    const allRecipes = [...southIndianBreakfast, ...featuredRecipes];
    return allRecipes.filter(recipe => recipe.category === category);
  } catch (error) {
    console.error('Error filtering recipes by category:', error);
    return [];
  }
};

export const searchRecipes = (query) => {
  try {
    if (!query) return [...southIndianBreakfast, ...featuredRecipes];
    
    const allRecipes = [...southIndianBreakfast, ...featuredRecipes];
    const searchTerm = query.toLowerCase();
    
    return allRecipes.filter(recipe => 
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.description.toLowerCase().includes(searchTerm) ||
      recipe.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      recipe.chef.toLowerCase().includes(searchTerm)
    );
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
};

export const getTrendingRecipes = () => {
  try {
    const allRecipes = [...southIndianBreakfast, ...featuredRecipes];
    return allRecipes.filter(recipe => recipe.trending);
  } catch (error) {
    console.error('Error getting trending recipes:', error);
    return [];
  }
};

export const getNewRecipes = () => {
  try {
    const allRecipes = [...southIndianBreakfast, ...featuredRecipes];
    return allRecipes.filter(recipe => recipe.isNew);
  } catch (error) {
    console.error('Error getting new recipes:', error);
    return [];
  }
};

// ✅ ENHANCED: Recipe validation function
export const validateRecipe = (recipe) => {
  const required = ['id', 'title', 'description', 'image'];
  const missing = required.filter(field => !recipe[field]);
  
  if (missing.length > 0) {
    console.warn('Recipe validation failed. Missing fields:', missing);
    return false;
  }
  
  return true;
};

// Export all recipes for debugging
export const getAllRecipes = () => {
  return [...southIndianBreakfast, ...featuredRecipes];
};

// FIXED: Ensure consistent data access in SouthIndianBreakfast.js
const handleRecipeClick = (recipeId) => {
  try {
    console.log('🎯 SouthIndianBreakfast - handleRecipeClick called with ID:', recipeId);
    
    // FIXED: Use allAvailableRecipes instead of just recipes for verification
    console.log('📊 SouthIndianBreakfast - Available recipes:', allAvailableRecipes.map(r => ({ id: r.id, title: r.title })));
    
    if (recipeId) {
      // FIXED: Verify recipe exists before opening modal
      const recipeExists = allAvailableRecipes.find(r => r.id === recipeId);
      if (recipeExists) {
        setSelectedRecipeId(recipeId);
        setIsModalOpen(true);
        
        if (onRecipeClick) {
          onRecipeClick(recipeId);
        }
        
        console.log('✅ SouthIndianBreakfast - Modal state set - ID:', recipeId, 'Open:', true);
      } else {
        console.error('❌ SouthIndianBreakfast - Recipe not found in available recipes:', recipeId);
      }
    } else {
      console.error('❌ SouthIndianBreakfast - No recipe ID provided');
    }
  } catch (error) {
    console.error('💥 Error handling recipe click in SouthIndianBreakfast:', error);
  }
};