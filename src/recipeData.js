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
    trending: true,
    isNew: false,
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
    trending: false,
    isNew: false,
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
    trending: false,
    isNew: true,
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
  },
  {
    id: "south-4",
    title: "Medu Vada",
    description: "Crispy lentil donuts with a fluffy interior, served with coconut chutney and sambar",
    image: "/images/meduvada.webp",
    prepTime: "40 mins",
    servings: 4,
    rating: 4.6,
    reviews: 198,
    tags: ["Traditional", "Vegetarian", "Crispy"],
    difficulty: "Medium",
    chef: "Anand Raj",
    premium: false,
    category: "breakfast",
    calories: 210,
    heatLevel: 1,
    trending: true,
    isNew: false,
    ingredients: [
      '2 cups Urad dal (soaked 4 hours)',
      '2 Green chilies (finely chopped)',
      '1 tsp Cumin seeds',
      '10 Curry leaves (chopped)',
      '1 inch Ginger (grated)',
      '1/4 cup Onion (finely chopped)',
      'Salt to taste',
      'Oil for deep frying'
    ],
    instructions: [
      'Drain soaked urad dal and grind to a thick, fluffy batter using minimal water.',
      'Add chilies, cumin, curry leaves, ginger, onion, and salt. Mix well.',
      'Wet your hands, take a portion of batter and shape into a ring (donut shape).',
      'Heat oil to 175°C. Gently slide vadas into hot oil.',
      'Fry on medium heat for 3-4 minutes per side until golden and crisp.',
      'Drain on paper towels and serve immediately with chutney and sambar.'
    ],
    nutrition: { calories: 210, protein: '9g', carbs: '28g', fat: '8g', fiber: '4g', sugar: '1g' }
  },
  {
    id: "south-5",
    title: "Pongal",
    description: "Comforting rice and lentil porridge tempered with ghee, cumin, and black pepper",
    image: "/images/pongal.webp",
    prepTime: "25 mins",
    servings: 4,
    rating: 4.7,
    reviews: 143,
    tags: ["Healthy", "Vegetarian", "Comfort Food"],
    difficulty: "Easy",
    chef: "Geetha Sundaram",
    premium: false,
    category: "breakfast",
    calories: 220,
    heatLevel: 1,
    trending: false,
    isNew: false,
    ingredients: [
      '1 cup Rice',
      '1/2 cup Moong dal (split yellow)',
      '3 tbsp Ghee',
      '1 tsp Cumin seeds',
      '1 tsp Black pepper (coarsely ground)',
      '1 inch Ginger (grated)',
      '10 Cashews',
      '10 Curry leaves',
      'Salt to taste',
      '4 cups Water'
    ],
    instructions: [
      'Dry roast moong dal until lightly golden. Rinse rice and dal together.',
      'Pressure cook rice and dal with 4 cups water and salt for 4 whistles.',
      'Mash lightly to a soft, creamy consistency.',
      'Heat ghee in a pan, add cashews and fry until golden. Remove and set aside.',
      'In the same ghee add cumin, pepper, curry leaves, and ginger. Sauté 30 seconds.',
      'Pour tempering over the pongal, add cashews, mix well, and serve hot.'
    ],
    nutrition: { calories: 220, protein: '7g', carbs: '38g', fat: '6g', fiber: '3g', sugar: '1g' }
  },
  {
    id: "south-6",
    title: "Appam with Stew",
    description: "Lacy coconut milk rice hoppers served with a fragrant Kerala vegetable stew",
    image: "/images/appam.webp",
    prepTime: "35 mins",
    servings: 4,
    rating: 4.8,
    reviews: 112,
    tags: ["Traditional", "Vegetarian", "Kerala"],
    difficulty: "Medium",
    chef: "Latha Menon",
    premium: false,
    category: "breakfast",
    calories: 195,
    heatLevel: 1,
    trending: false,
    isNew: true,
    ingredients: [
      '2 cups Raw rice (soaked overnight)',
      '1/2 cup Cooked rice',
      '1 cup Coconut milk',
      '1 tsp Yeast',
      '1 tsp Sugar',
      '1/2 tsp Salt',
      'For stew: 2 cups Mixed vegetables',
      '1 can Coconut milk',
      'Whole spices (cardamom, cloves, cinnamon)',
      '1 tbsp Coconut oil'
    ],
    instructions: [
      'Grind soaked and cooked rice with coconut milk to a smooth batter.',
      'Add yeast, sugar, salt. Let ferment for 6-8 hours.',
      'For stew: heat coconut oil, sauté whole spices, add vegetables.',
      'Add coconut milk, simmer until vegetables are cooked. Season with salt.',
      'Heat appam pan (appa chatti), pour a ladle of batter and swirl.',
      'Cover and cook 2 minutes until edges are crisp and centre is soft.',
      'Serve appam with warm vegetable stew.'
    ],
    nutrition: { calories: 195, protein: '4g', carbs: '34g', fat: '5g', fiber: '2g', sugar: '3g' }
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
  },
  {
    id: "featured-5",
    title: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato-based sauce with aromatic spices",
    image: "/images/butter-chicken.webp",
    prepTime: "1 hour",
    cookTime: "30 mins",
    servings: 4,
    rating: 4.9,
    reviews: 512,
    tags: ["Popular", "Non-Vegetarian", "Creamy"],
    difficulty: "Medium",
    chef: "Rajan Kapoor",
    premium: false,
    category: "main",
    calories: 380,
    heatLevel: 2,
    trending: true,
    isNew: false,
    ingredients: [
      '750g Chicken (boneless, cubed)',
      '1 cup Yogurt',
      '2 tsp Tandoori masala',
      '3 tbsp Butter',
      '1 large Onion (pureed)',
      '2 tsp Ginger-garlic paste',
      '1 cup Tomato puree',
      '1/2 cup Heavy cream',
      '1 tsp Kashmiri red chili powder',
      '1 tsp Garam masala',
      '1 tsp Kasuri methi',
      'Salt to taste'
    ],
    instructions: [
      'Marinate chicken with yogurt and tandoori masala for 1 hour. Grill or pan-fry until charred.',
      'In a pan, melt butter and sauté pureed onion until golden.',
      'Add ginger-garlic paste, cook 2 minutes until raw smell leaves.',
      'Add tomato puree, chili powder, salt. Simmer 15 minutes until oil separates.',
      'Add grilled chicken pieces, stir to coat with sauce.',
      'Pour in cream, add garam masala and kasuri methi.',
      'Simmer on low heat 5 minutes. Adjust seasoning.',
      'Serve hot with naan or steamed rice.'
    ],
    nutrition: { calories: 380, protein: '35g', carbs: '12g', fat: '22g', fiber: '2g', sugar: '6g' }
  },
  {
    id: "featured-6",
    title: "Dal Makhani",
    description: "Slow-cooked black lentils in a buttery, smoky tomato gravy — a North Indian classic",
    image: "/images/dal-makhani.webp",
    prepTime: "8 hours",
    cookTime: "45 mins",
    servings: 6,
    rating: 4.8,
    reviews: 341,
    tags: ["Vegetarian", "Comfort Food", "North Indian"],
    difficulty: "Easy",
    chef: "Kavita Malhotra",
    premium: false,
    category: "main",
    calories: 290,
    heatLevel: 2,
    trending: false,
    isNew: false,
    ingredients: [
      '1 cup Whole black lentils (urad dal, soaked overnight)',
      '1/4 cup Rajma (kidney beans, soaked overnight)',
      '3 tbsp Butter',
      '1 tbsp Oil',
      '1 large Onion (finely chopped)',
      '2 tsp Ginger-garlic paste',
      '1 cup Tomato puree',
      '1 tsp Red chili powder',
      '1/2 cup Cream',
      'Salt to taste'
    ],
    instructions: [
      'Pressure cook soaked lentils and rajma with salt for 8-10 whistles until very soft.',
      'Mash lightly — about 1/3 of the lentils should be mashed.',
      'Heat butter and oil, sauté onion until deep golden.',
      'Add ginger-garlic paste, cook 2 minutes.',
      'Add tomato puree, chili powder. Simmer 10 minutes until oil separates.',
      'Add cooked lentils, stir well. Simmer on low heat 20-30 minutes.',
      'Stir in cream, adjust salt. Serve with a dollop of butter on top.'
    ],
    nutrition: { calories: 290, protein: '14g', carbs: '38g', fat: '10g', fiber: '8g', sugar: '5g' }
  },
  {
    id: "featured-7",
    title: "Palak Paneer",
    description: "Fresh cottage cheese cubes in a vibrant, spiced spinach sauce",
    image: "/images/palak-paneer.webp",
    prepTime: "30 mins",
    servings: 4,
    rating: 4.7,
    reviews: 267,
    tags: ["Vegetarian", "Healthy", "North Indian"],
    difficulty: "Easy",
    chef: "Anita Verma",
    premium: false,
    category: "main",
    calories: 245,
    heatLevel: 2,
    trending: false,
    isNew: false,
    ingredients: [
      '400g Fresh spinach (blanched)',
      '250g Paneer (cubed)',
      '2 tbsp Oil',
      '1 Onion (chopped)',
      '2 tsp Ginger-garlic paste',
      '2 Tomatoes (chopped)',
      '1 tsp Cumin seeds',
      '1 tsp Coriander powder',
      '1/2 tsp Garam masala',
      '2 tbsp Cream',
      'Salt to taste'
    ],
    instructions: [
      'Blanch spinach in boiling salted water for 2 minutes. Transfer to ice water, then blend smooth.',
      'Heat oil, add cumin seeds. When they splutter, add onion and cook until golden.',
      'Add ginger-garlic paste and tomatoes. Cook until oil separates.',
      'Add all spices, stir 1 minute.',
      'Pour in spinach puree, mix well. Simmer 5 minutes.',
      'Add paneer cubes, gently stir. Simmer 3-4 minutes.',
      'Finish with cream, adjust seasoning. Serve with roti.'
    ],
    nutrition: { calories: 245, protein: '16g', carbs: '14g', fat: '15g', fiber: '4g', sugar: '4g' }
  },
  {
    id: "featured-8",
    title: "Chole Bhature",
    description: "Spicy chickpea curry served with deep-fried, fluffy leavened bread",
    image: "/images/chole-bhature.webp",
    prepTime: "45 mins",
    servings: 4,
    rating: 4.8,
    reviews: 389,
    tags: ["Popular", "Vegetarian", "Street Food"],
    difficulty: "Medium",
    chef: "Harpreet Singh",
    premium: false,
    category: "main",
    calories: 520,
    heatLevel: 3,
    trending: true,
    isNew: false,
    ingredients: [
      '2 cups Chickpeas (soaked overnight)',
      '2 Onions (finely chopped)',
      '2 Tomatoes (pureed)',
      '2 tsp Ginger-garlic paste',
      '2 tsp Chole masala',
      '1 tsp Amchur (dry mango powder)',
      'For bhature: 2 cups Maida',
      '1/4 cup Yogurt',
      '1 tsp Baking powder',
      'Oil for frying'
    ],
    instructions: [
      'Pressure cook soaked chickpeas with tea bags for dark color, 5-6 whistles.',
      'Sauté onions golden, add ginger-garlic paste and tomato puree.',
      'Add chole masala, amchur, salt. Cook until oil separates.',
      'Add boiled chickpeas with water. Simmer 15 minutes until thick.',
      'For bhature: mix maida, yogurt, baking powder, salt and warm water into soft dough.',
      'Rest 30 minutes. Roll into oval shapes and deep fry until puffed and golden.',
      'Serve chole topped with onion, lemon, and green chili alongside bhature.'
    ],
    nutrition: { calories: 520, protein: '18g', carbs: '72g', fat: '18g', fiber: '12g', sugar: '8g' }
  },
  {
    id: "featured-9",
    title: "Mango Lassi",
    description: "Chilled blended drink of ripe alphonso mangoes, yogurt, and cardamom",
    image: "/images/mango-lassi.webp",
    prepTime: "10 mins",
    servings: 2,
    rating: 4.9,
    reviews: 445,
    tags: ["Vegetarian", "Drink", "Summer", "Quick"],
    difficulty: "Easy",
    chef: "Pooja Gupta",
    premium: false,
    category: "drink",
    calories: 185,
    heatLevel: 0,
    trending: true,
    isNew: false,
    ingredients: [
      '2 large Ripe mangoes (peeled and diced)',
      '1 cup Thick yogurt',
      '1/2 cup Milk',
      '2 tbsp Sugar (adjust to taste)',
      '1/4 tsp Cardamom powder',
      'Ice cubes',
      'Pinch of saffron (optional)'
    ],
    instructions: [
      'Add diced mango, yogurt, milk, sugar, and cardamom to a blender.',
      'Blend on high until completely smooth and frothy.',
      'Taste and adjust sweetness.',
      'Add ice cubes and blend briefly for a chilled version.',
      'Pour into tall glasses and garnish with a pinch of cardamom and saffron strands.'
    ],
    nutrition: { calories: 185, protein: '6g', carbs: '38g', fat: '3g', fiber: '2g', sugar: '34g' }
  },
  {
    id: "featured-10",
    title: "Chicken Tikka",
    description: "Chargrilled boneless chicken marinated in yogurt and aromatic spices",
    image: "/images/chicken-tikka.webp",
    prepTime: "2 hours",
    cookTime: "20 mins",
    servings: 4,
    rating: 4.8,
    reviews: 298,
    tags: ["Popular", "Non-Vegetarian", "Grilled"],
    difficulty: "Medium",
    chef: "Sameer Khan",
    premium: true,
    category: "starter",
    calories: 220,
    heatLevel: 3,
    trending: false,
    isNew: true,
    ingredients: [
      '600g Boneless chicken (cut into chunks)',
      '1 cup Yogurt',
      '2 tbsp Lemon juice',
      '2 tsp Kashmiri red chili powder',
      '1 tsp Turmeric',
      '2 tsp Garam masala',
      '2 tsp Ginger-garlic paste',
      '1 tbsp Oil',
      'Salt to taste',
      'Chat masala for serving'
    ],
    instructions: [
      'Make slits on chicken pieces for marinade to penetrate.',
      'Mix all marinade ingredients, coat chicken thoroughly.',
      'Marinate in fridge for at least 2 hours (overnight for best results).',
      'Thread onto skewers and grill at high heat, turning every 3-4 minutes.',
      'Baste with butter midway for extra flavour and colour.',
      'Grill until charred on edges and cooked through, about 15-20 minutes.',
      'Sprinkle chat masala, serve with mint chutney and lemon wedges.'
    ],
    nutrition: { calories: 220, protein: '32g', carbs: '6g', fat: '8g', fiber: '1g', sugar: '3g' }
  }
];

// Utility: get a single recipe by ID
export const getRecipeDetails = (recipeId) => {
  if (!recipeId) return null;
  const allRecipes = [...southIndianBreakfast, ...featuredRecipes];
  return allRecipes.find(r => r.id === recipeId) || null;
};

// Utility: filter recipes by category
export const getRecipesByCategory = (category) => {
  const allRecipes = [...southIndianBreakfast, ...featuredRecipes];
  return allRecipes.filter(recipe => recipe.category === category);
};

// Utility: full-text search across title, description, tags, chef
export const searchRecipes = (query) => {
  const allRecipes = [...southIndianBreakfast, ...featuredRecipes];
  if (!query) return allRecipes;
  const searchTerm = query.toLowerCase();
  return allRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm) ||
    recipe.description.toLowerCase().includes(searchTerm) ||
    recipe.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    recipe.chef.toLowerCase().includes(searchTerm)
  );
};

// Utility: trending recipes
export const getTrendingRecipes = () => {
  const allRecipes = [...southIndianBreakfast, ...featuredRecipes];
  return allRecipes.filter(recipe => recipe.trending);
};

// Utility: new recipes
export const getNewRecipes = () => {
  const allRecipes = [...southIndianBreakfast, ...featuredRecipes];
  return allRecipes.filter(recipe => recipe.isNew);
};

// Utility: all recipes combined
export const getAllRecipes = () => [...southIndianBreakfast, ...featuredRecipes];

// Utility: validate required recipe fields
export const validateRecipe = (recipe) => {
  if (!recipe) return false;
  const required = ['id', 'title', 'description', 'image'];
  return required.every(field => !!recipe[field]);
};
