export interface RecipeStep {
  instruction: { en: string; kn: string };
  timeMinutes: number;
}

export interface Ingredient {
  name: { en: string; kn: string };
  ratio: number;
  unit: 'kg' | 'cups'; // kg for solids, cups (200ml) for liquids
}

export interface Accompaniment {
  name: { en: string; kn: string };
  steps: RecipeStep[];
  ingredients?: Ingredient[];
}

export interface Recipe {
  id: number;
  name: { en: string; kn: string };
  time: string;
  image: string;
  video: string;
  category: 'veg' | 'nonveg' | 'coastal';
  origin: string;
  description: { en: string; kn: string };
  steps: RecipeStep[];
  ingredients?: Ingredient[];
  accompaniments?: Accompaniment[];
}

export const recipes: Recipe[] = [
  {
    id: 1,
    name: { en: 'Masala Dosa', kn: 'ಮಸಾಲೆ ದೋಸೆ' },
    time: '45 min',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=600',
    video: 'https://videos.pexels.com/video-files/5765071/5765071-sd_640_360_25fps.mp4',
    category: 'veg',
    origin: 'Udupi, Karnataka, India',
    description: {
      en: 'A crispy fermented rice and lentil crepe filled with spiced potato filling, served with sambar and chutney. An iconic South Indian breakfast.',
      kn: 'ಮಸಾಲೆ ಆಲೂಗಡ್ಡೆ ತುಂಬಿದ ಗರಿಗರಿಯಾದ ಹುದುಗಿದ ಅಕ್ಕಿ ಮತ್ತು ಬೇಳೆ ಕ್ರೆಪ್, ಸಾಂಬಾರ್ ಮತ್ತು ಚಟ್ನಿಯೊಂದಿಗೆ ಬಡಿಸಲಾಗುತ್ತದೆ.'
    },
    ingredients: [
      { name: { en: 'Rice', kn: 'ಅಕ್ಕಿ' }, ratio: 0.15, unit: 'kg' },
      { name: { en: 'Urad Dal', kn: 'ಉದ್ದಿನ ಬೇಳೆ' }, ratio: 0.05, unit: 'kg' },
      { name: { en: 'Potato', kn: 'ಆಲೂಗಡ್ಡೆ' }, ratio: 0.1, unit: 'kg' },
      { name: { en: 'Onion', kn: 'ಈರುಳ್ಳಿ' }, ratio: 0.05, unit: 'kg' },
      { name: { en: 'Oil', kn: 'ಎಣ್ಣೆ' }, ratio: 0.02, unit: 'kg' },
      { name: { en: 'Water', kn: 'ನೀರು' }, ratio: 2, unit: 'cups' },
    ],
    steps: [
      { instruction: { en: 'Soak rice and urad dal for 6 hours, then grind into a smooth batter', kn: 'ಅಕ್ಕಿ ಮತ್ತು ಉದ್ದಿನ ಬೇಳೆಯನ್ನು 6 ಗಂಟೆ ನೆನೆಸಿ, ನಯವಾದ ಹಿಟ್ಟು ರುಬ್ಬಿ' }, timeMinutes: 360 },
      { instruction: { en: 'Let the batter ferment overnight (8-10 hours)', kn: 'ಹಿಟ್ಟನ್ನು ರಾತ್ರಿಯಿಡೀ ಹುದುಗಲು ಬಿಡಿ (8-10 ಗಂಟೆ)' }, timeMinutes: 0 },
      { instruction: { en: 'Boil potatoes, peel and mash them coarsely', kn: 'ಆಲೂಗಡ್ಡೆಯನ್ನು ಬೇಯಿಸಿ, ಸಿಪ್ಪೆ ತೆಗೆದು ಒರಟಾಗಿ ಅರೆಯಿರಿ' }, timeMinutes: 15 },
      { instruction: { en: 'Heat oil, add mustard seeds, curry leaves, onions and sauté till golden', kn: 'ಎಣ್ಣೆ ಕಾಯಿಸಿ, ಸಾಸಿವೆ, ಕರಿಬೇವು, ಈರುಳ್ಳಿ ಹಾಕಿ ಹೊಂಬಣ್ಣ ಬರುವವರೆಗೆ ಹುರಿಯಿರಿ' }, timeMinutes: 5 },
      { instruction: { en: 'Add turmeric, green chilies, and mashed potatoes. Mix well for the filling', kn: 'ಅರಿಶಿನ, ಹಸಿ ಮೆಣಸಿನಕಾಯಿ ಮತ್ತು ಅರೆದ ಆಲೂಗಡ್ಡೆ ಸೇರಿಸಿ. ಚೆನ್ನಾಗಿ ಬೆರೆಸಿ' }, timeMinutes: 3 },
      { instruction: { en: 'Heat a flat pan, spread batter in a thin circle, drizzle oil on edges', kn: 'ಹೆಂಚನ್ನು ಕಾಯಿಸಿ, ಹಿಟ್ಟನ್ನು ತೆಳುವಾಗಿ ವೃತ್ತಾಕಾರದಲ್ಲಿ ಹರಡಿ, ಅಂಚುಗಳಲ್ಲಿ ಎಣ್ಣೆ ಹಾಕಿ' }, timeMinutes: 2 },
      { instruction: { en: 'Place potato filling on one side, fold the dosa and serve hot', kn: 'ಒಂದು ಬದಿಯಲ್ಲಿ ಆಲೂಗಡ್ಡೆ ಮಸಾಲೆ ಇಟ್ಟು, ದೋಸೆ ಮಡಿಸಿ ಬಿಸಿಯಾಗಿ ಬಡಿಸಿ' }, timeMinutes: 2 },
    ],
    accompaniments: [
      {
        name: { en: 'Coconut Chutney', kn: 'ತೆಂಗಿನಕಾಯಿ ಚಟ್ನಿ' },
        ingredients: [
          { name: { en: 'Fresh Coconut', kn: 'ತಾಜಾ ತೆಂಗಿನಕಾಯಿ' }, ratio: 0.05, unit: 'kg' },
          { name: { en: 'Green Chili', kn: 'ಹಸಿ ಮೆಣಸಿನಕಾಯಿ' }, ratio: 0.005, unit: 'kg' },
          { name: { en: 'Roasted Gram', kn: 'ಹುರಿದ ಕಡಲೆ' }, ratio: 0.01, unit: 'kg' },
        ],
        steps: [
          { instruction: { en: 'Grind fresh coconut, green chili, roasted gram with salt and water', kn: 'ತಾಜಾ ತೆಂಗಿನಕಾಯಿ, ಹಸಿ ಮೆಣಸಿನಕಾಯಿ, ಹುರಿದ ಕಡಲೆಯನ್ನು ಉಪ್ಪು ಮತ್ತು ನೀರಿನೊಂದಿಗೆ ಅರೆಯಿರಿ' }, timeMinutes: 3 },
          { instruction: { en: 'Temper with mustard seeds, urad dal and curry leaves in oil', kn: 'ಸಾಸಿವೆ, ಉದ್ದಿನ ಬೇಳೆ ಮತ್ತು ಕರಿಬೇವನ್ನು ಎಣ್ಣೆಯಲ್ಲಿ ಒಗ್ಗರಣೆ ಹಾಕಿ' }, timeMinutes: 2 },
        ]
      },
      {
        name: { en: 'Sambar', kn: 'ಸಾಂಬಾರ್' },
        ingredients: [
          { name: { en: 'Toor Dal', kn: 'ತೊಗರಿ ಬೇಳೆ' }, ratio: 0.04, unit: 'kg' },
          { name: { en: 'Mixed Vegetables', kn: 'ಮಿಶ್ರ ತರಕಾರಿ' }, ratio: 0.06, unit: 'kg' },
          { name: { en: 'Sambar Powder', kn: 'ಸಾಂಬಾರ್ ಪುಡಿ' }, ratio: 0.01, unit: 'kg' },
          { name: { en: 'Tamarind', kn: 'ಹುಣಸೆ' }, ratio: 0.01, unit: 'kg' },
        ],
        steps: [
          { instruction: { en: 'Cook toor dal in pressure cooker until soft', kn: 'ತೊಗರಿ ಬೇಳೆಯನ್ನು ಕುಕ್ಕರ್‌ನಲ್ಲಿ ಮೆದುವಾಗುವವರೆಗೆ ಬೇಯಿಸಿ' }, timeMinutes: 15 },
          { instruction: { en: 'Cook vegetables with tamarind water and sambar powder', kn: 'ತರಕಾರಿಗಳನ್ನು ಹುಣಸೆ ನೀರು ಮತ್ತು ಸಾಂಬಾರ್ ಪುಡಿಯೊಂದಿಗೆ ಬೇಯಿಸಿ' }, timeMinutes: 10 },
          { instruction: { en: 'Add cooked dal, simmer and temper with mustard, curry leaves', kn: 'ಬೇಯಿಸಿದ ಬೇಳೆ ಸೇರಿಸಿ, ಕುದಿಸಿ ಸಾಸಿವೆ, ಕರಿಬೇವಿನಿಂದ ಒಗ್ಗರಣೆ ಹಾಕಿ' }, timeMinutes: 5 },
        ]
      }
    ]
  },
  {
    id: 2,
    name: { en: 'Bisi Bele Bath', kn: 'ಬಿಸಿ ಬೇಳೆ ಬಾತ್' },
    time: '60 min',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600',
    video: 'https://videos.pexels.com/video-files/5765071/5765071-sd_640_360_25fps.mp4',
    category: 'veg',
    origin: 'Mysore, Karnataka, India',
    description: {
      en: 'A spicy, tangy one-pot rice and lentil dish from the royal kitchens of Mysore. Meaning "hot lentil rice," it features a unique spice powder blend.',
      kn: 'ಮೈಸೂರು ರಾಜ ಅಡುಗೆಮನೆಯಿಂದ ಬಂದ ಖಾರ ಮತ್ತು ಹುಳಿಯಾದ ಏಕಪಾತ್ರೆ ಅನ್ನ ಮತ್ತು ಬೇಳೆ ಖಾದ್ಯ.'
    },
    ingredients: [
      { name: { en: 'Rice', kn: 'ಅಕ್ಕಿ' }, ratio: 0.1, unit: 'kg' },
      { name: { en: 'Toor Dal', kn: 'ತೊಗರಿ ಬೇಳೆ' }, ratio: 0.05, unit: 'kg' },
      { name: { en: 'Mixed Vegetables', kn: 'ಮಿಶ್ರ ತರಕಾರಿ' }, ratio: 0.1, unit: 'kg' },
      { name: { en: 'Tamarind', kn: 'ಹುಣಸೆ' }, ratio: 0.01, unit: 'kg' },
      { name: { en: 'BBB Spice Powder', kn: 'ಬಿಬಿಬಿ ಮಸಾಲೆ ಪುಡಿ' }, ratio: 0.02, unit: 'kg' },
      { name: { en: 'Ghee', kn: 'ತುಪ್ಪ' }, ratio: 0.02, unit: 'kg' },
      { name: { en: 'Water', kn: 'ನೀರು' }, ratio: 3, unit: 'cups' },
    ],
    steps: [
      { instruction: { en: 'Cook toor dal and rice separately until soft', kn: 'ತೊಗರಿ ಬೇಳೆ ಮತ್ತು ಅಕ್ಕಿಯನ್ನು ಪ್ರತ್ಯೇಕವಾಗಿ ಮೆದುವಾಗುವವರೆಗೆ ಬೇಯಿಸಿ' }, timeMinutes: 20 },
      { instruction: { en: 'Dry roast and grind BBB spice powder', kn: 'ಬಿಬಿಬಿ ಮಸಾಲೆ ಪುಡಿ ಹುರಿದು ಅರೆಯಿರಿ' }, timeMinutes: 8 },
      { instruction: { en: 'Cook mixed vegetables with tamarind water', kn: 'ಹುಣಸೆ ನೀರಿನೊಂದಿಗೆ ಮಿಶ್ರ ತರಕಾರಿಗಳನ್ನು ಬೇಯಿಸಿ' }, timeMinutes: 12 },
      { instruction: { en: 'Combine rice, dal, vegetables and spice powder. Simmer together', kn: 'ಅನ್ನ, ಬೇಳೆ, ತರಕಾರಿ ಮತ್ತು ಮಸಾಲೆ ಪುಡಿ ಬೆರೆಸಿ. ಒಟ್ಟಿಗೆ ಕುದಿಸಿ' }, timeMinutes: 10 },
      { instruction: { en: 'Prepare tempering with ghee, mustard seeds, curry leaves, cashews', kn: 'ತುಪ್ಪ, ಸಾಸಿವೆ, ಕರಿಬೇವು, ಗೋಡಂಬಿಯೊಂದಿಗೆ ಒಗ್ಗರಣೆ ತಯಾರಿಸಿ' }, timeMinutes: 3 },
      { instruction: { en: 'Garnish with coriander leaves and serve hot with boondi and papad', kn: 'ಕೊತ್ತಂಬರಿ ಎಲೆಗಳಿಂದ ಅಲಂಕರಿಸಿ ಬೂಂದಿ ಮತ್ತು ಹಪ್ಪಳದೊಂದಿಗೆ ಬಡಿಸಿ' }, timeMinutes: 1 },
    ],
    accompaniments: [
      {
        name: { en: 'Boondi Raita', kn: 'ಬೂಂದಿ ರಾಯಿತ' },
        ingredients: [
          { name: { en: 'Curd', kn: 'ಮೊಸರು' }, ratio: 0.1, unit: 'kg' },
          { name: { en: 'Boondi', kn: 'ಬೂಂದಿ' }, ratio: 0.02, unit: 'kg' },
        ],
        steps: [
          { instruction: { en: 'Soak boondi in water for 5 min, squeeze out water', kn: 'ಬೂಂದಿಯನ್ನು 5 ನಿಮಿಷ ನೀರಿನಲ್ಲಿ ನೆನೆಸಿ, ನೀರು ಹಿಂಡಿ' }, timeMinutes: 5 },
          { instruction: { en: 'Mix with beaten curd, add salt and cumin powder', kn: 'ಕಡೆದ ಮೊಸರಿಗೆ ಬೆರೆಸಿ, ಉಪ್ಪು ಮತ್ತು ಜೀರಿಗೆ ಪುಡಿ ಸೇರಿಸಿ' }, timeMinutes: 2 },
        ]
      }
    ]
  },
  {
    id: 3,
    name: { en: 'Kori Rotti', kn: 'ಕೋರಿ ರೊಟ್ಟಿ' },
    time: '50 min',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600',
    video: 'https://videos.pexels.com/video-files/5765071/5765071-sd_640_360_25fps.mp4',
    category: 'coastal',
    origin: 'Mangalore, Karnataka, India',
    description: {
      en: 'A traditional Mangalorean dish of spicy chicken curry served over crispy rice wafers.',
      kn: 'ಗರಿಗರಿಯಾದ ಅಕ್ಕಿ ರೊಟ್ಟಿ ಮೇಲೆ ಬಡಿಸುವ ಖಾರ ಕೋಳಿ ಸಾರಿನ ಸಾಂಪ್ರದಾಯಿಕ ಮಂಗಳೂರು ಖಾದ್ಯ.'
    },
    ingredients: [
      { name: { en: 'Chicken', kn: 'ಕೋಳಿ' }, ratio: 0.25, unit: 'kg' },
      { name: { en: 'Coconut', kn: 'ತೆಂಗಿನಕಾಯಿ' }, ratio: 0.1, unit: 'kg' },
      { name: { en: 'Shallots', kn: 'ಸಣ್ಣ ಈರುಳ್ಳಿ' }, ratio: 0.05, unit: 'kg' },
      { name: { en: 'Kori Rotti (Rice Wafers)', kn: 'ಕೋರಿ ರೊಟ್ಟಿ' }, ratio: 0.1, unit: 'kg' },
      { name: { en: 'Tamarind', kn: 'ಹುಣಸೆ' }, ratio: 0.01, unit: 'kg' },
      { name: { en: 'Oil', kn: 'ಎಣ್ಣೆ' }, ratio: 0.03, unit: 'kg' },
    ],
    steps: [
      { instruction: { en: 'Grind coconut, shallots, garlic, ginger, and spices into a smooth paste', kn: 'ತೆಂಗಿನಕಾಯಿ, ಸಣ್ಣ ಈರುಳ್ಳಿ, ಬೆಳ್ಳುಳ್ಳಿ, ಶುಂಠಿ ಮತ್ತು ಮಸಾಲೆಗಳನ್ನು ನಯವಾದ ಪೇಸ್ಟ್ ಆಗಿ ಅರೆಯಿರಿ' }, timeMinutes: 5 },
      { instruction: { en: 'Marinate chicken pieces with turmeric and salt for 15 minutes', kn: 'ಕೋಳಿ ತುಂಡುಗಳನ್ನು ಅರಿಶಿನ ಮತ್ತು ಉಪ್ಪಿನೊಂದಿಗೆ 15 ನಿಮಿಷ ನೆನೆಸಿ' }, timeMinutes: 15 },
      { instruction: { en: 'Cook the ground paste in oil, add tamarind extract and bring to boil', kn: 'ಅರೆದ ಪೇಸ್ಟ್ ಅನ್ನು ಎಣ್ಣೆಯಲ್ಲಿ ಬೇಯಿಸಿ, ಹುಣಸೆ ಸಾರು ಹಾಕಿ ಕುದಿಸಿ' }, timeMinutes: 8 },
      { instruction: { en: 'Add chicken pieces and cook on medium heat until tender', kn: 'ಕೋಳಿ ತುಂಡುಗಳನ್ನು ಹಾಕಿ ಮೆದುವಾಗುವವರೆಗೆ ಮಧ್ಯಮ ಉರಿಯಲ್ಲಿ ಬೇಯಿಸಿ' }, timeMinutes: 20 },
      { instruction: { en: 'Break Kori Rotti onto a plate, pour hot curry over them and serve', kn: 'ಕೋರಿ ರೊಟ್ಟಿ ತಟ್ಟೆಗೆ ಒಡೆದು ಬಿಸಿ ಸಾರನ್ನು ಮೇಲೆ ಹಾಕಿ ಬಡಿಸಿ' }, timeMinutes: 1 },
    ]
  },
  {
    id: 4,
    name: { en: 'Ragi Mudde', kn: 'ರಾಗಿ ಮುದ್ದೆ' },
    time: '30 min',
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=600',
    video: 'https://videos.pexels.com/video-files/5765071/5765071-sd_640_360_25fps.mp4',
    category: 'veg',
    origin: 'Tumkur, Karnataka, India',
    description: {
      en: 'A traditional finger millet ball staple of Karnataka. Nutritious and filling, served with sambar or curry.',
      kn: 'ಕರ್ನಾಟಕದ ಸಾಂಪ್ರದಾಯಿಕ ರಾಗಿ ಮುದ್ದೆ. ಪೌಷ್ಟಿಕ ಮತ್ತು ಹೊಟ್ಟೆ ತುಂಬಿಸುವ, ಸಾಂಬಾರ್ ಅಥವಾ ಸಾರಿನೊಂದಿಗೆ ಬಡಿಸಲಾಗುತ್ತದೆ.'
    },
    ingredients: [
      { name: { en: 'Ragi Flour', kn: 'ರಾಗಿ ಹಿಟ್ಟು' }, ratio: 0.1, unit: 'kg' },
      { name: { en: 'Water', kn: 'ನೀರು' }, ratio: 3, unit: 'cups' },
    ],
    steps: [
      { instruction: { en: 'Boil 3 cups of water in a thick-bottomed vessel', kn: '3 ಕಪ್ ನೀರನ್ನು ದಪ್ಪ ಬುಡದ ಪಾತ್ರೆಯಲ್ಲಿ ಕುದಿಸಿ' }, timeMinutes: 5 },
      { instruction: { en: 'Reduce heat, slowly add ragi flour while stirring continuously', kn: 'ಉರಿ ಕಡಿಮೆ ಮಾಡಿ, ನಿರಂತರವಾಗಿ ತಿರುಗಿಸುತ್ತಾ ರಾಗಿ ಹಿಟ್ಟನ್ನು ನಿಧಾನವಾಗಿ ಸೇರಿಸಿ' }, timeMinutes: 5 },
      { instruction: { en: 'Cook and stir vigorously until the mixture forms a non-sticky dough', kn: 'ಅಂಟದ ಹಿಟ್ಟು ರೂಪಗೊಳ್ಳುವವರೆಗೆ ಬೇಯಿಸಿ ಜೋರಾಗಿ ತಿರುಗಿಸಿ' }, timeMinutes: 8 },
      { instruction: { en: 'Wet your hands, take portions and shape into round balls', kn: 'ಕೈಗಳನ್ನು ಒದ್ದೆ ಮಾಡಿ, ಭಾಗಗಳನ್ನು ತೆಗೆದುಕೊಂಡು ದುಂಡಗಿನ ಮುದ್ದೆಗಳನ್ನು ಮಾಡಿ' }, timeMinutes: 3 },
      { instruction: { en: 'Serve hot with saaru (rasam) or soppu saaru', kn: 'ಸಾರು ಅಥವಾ ಸೊಪ್ಪು ಸಾರಿನೊಂದಿಗೆ ಬಿಸಿಯಾಗಿ ಬಡಿಸಿ' }, timeMinutes: 0 },
    ],
    accompaniments: [
      {
        name: { en: 'Soppu Saaru (Greens Curry)', kn: 'ಸೊಪ್ಪು ಸಾರು' },
        ingredients: [
          { name: { en: 'Spinach/Greens', kn: 'ಸೊಪ್ಪು' }, ratio: 0.1, unit: 'kg' },
          { name: { en: 'Toor Dal', kn: 'ತೊಗರಿ ಬೇಳೆ' }, ratio: 0.03, unit: 'kg' },
          { name: { en: 'Onion', kn: 'ಈರುಳ್ಳಿ' }, ratio: 0.03, unit: 'kg' },
        ],
        steps: [
          { instruction: { en: 'Cook toor dal until soft and mash well', kn: 'ತೊಗರಿ ಬೇಳೆಯನ್ನು ಮೆದುವಾಗಿ ಬೇಯಿಸಿ ಚೆನ್ನಾಗಿ ಅರೆಯಿರಿ' }, timeMinutes: 15 },
          { instruction: { en: 'Cook chopped greens with onion, garlic and spices', kn: 'ಕತ್ತರಿಸಿದ ಸೊಪ್ಪನ್ನು ಈರುಳ್ಳಿ, ಬೆಳ್ಳುಳ್ಳಿ ಮತ್ತು ಮಸಾಲೆಗಳೊಂದಿಗೆ ಬೇಯಿಸಿ' }, timeMinutes: 10 },
          { instruction: { en: 'Add cooked dal, season and simmer for 5 minutes', kn: 'ಬೇಯಿಸಿದ ಬೇಳೆ ಸೇರಿಸಿ, ರುಚಿ ಮಾಡಿ 5 ನಿಮಿಷ ಕುದಿಸಿ' }, timeMinutes: 5 },
        ]
      }
    ]
  },
  {
    id: 5,
    name: { en: 'Neer Dosa', kn: 'ನೀರ್ ದೋಸೆ' },
    time: '25 min',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600',
    video: 'https://videos.pexels.com/video-files/5765071/5765071-sd_640_360_25fps.mp4',
    category: 'coastal',
    origin: 'Mangalore, Karnataka, India',
    description: {
      en: 'A paper-thin, lacy rice crepe from the Mangalore coast. "Neer" means water — the batter is very thin.',
      kn: 'ಮಂಗಳೂರು ಕರಾವಳಿಯ ಕಾಗದದಂತೆ ತೆಳುವಾದ ಅಕ್ಕಿ ಕ್ರೆಪ್. "ನೀರ್" ಎಂದರೆ ನೀರು.'
    },
    ingredients: [
      { name: { en: 'Rice', kn: 'ಅಕ್ಕಿ' }, ratio: 0.15, unit: 'kg' },
      { name: { en: 'Coconut', kn: 'ತೆಂಗಿನಕಾಯಿ' }, ratio: 0.03, unit: 'kg' },
      { name: { en: 'Water', kn: 'ನೀರು' }, ratio: 2, unit: 'cups' },
    ],
    steps: [
      { instruction: { en: 'Soak rice in water for 4-5 hours', kn: 'ಅಕ್ಕಿಯನ್ನು 4-5 ಗಂಟೆ ನೀರಿನಲ್ಲಿ ನೆನೆಸಿ' }, timeMinutes: 0 },
      { instruction: { en: 'Grind soaked rice with coconut and salt into a very thin batter', kn: 'ನೆನೆಸಿದ ಅಕ್ಕಿಯನ್ನು ತೆಂಗಿನಕಾಯಿ ಮತ್ತು ಉಪ್ಪಿನೊಂದಿಗೆ ತೆಳುವಾದ ಹಿಟ್ಟಾಗಿ ಅರೆಯಿರಿ' }, timeMinutes: 5 },
      { instruction: { en: 'Heat a non-stick pan, pour batter and swirl quickly', kn: 'ನಾನ್-ಸ್ಟಿಕ್ ಪ್ಯಾನ್ ಕಾಯಿಸಿ, ಹಿಟ್ಟು ಹಾಕಿ ಬೇಗ ತಿರುಗಿಸಿ' }, timeMinutes: 1 },
      { instruction: { en: 'Cover and cook for 1 minute until edges lift. Do not flip', kn: 'ಮುಚ್ಚಿ 1 ನಿಮಿಷ ಬೇಯಿಸಿ. ತಿರುಗಿಸಬೇಡಿ' }, timeMinutes: 1 },
      { instruction: { en: 'Fold gently and serve with coconut chutney or chicken curry', kn: 'ಮೆಲ್ಲಗೆ ಮಡಿಸಿ ತೆಂಗಿನ ಚಟ್ನಿ ಅಥವಾ ಕೋಳಿ ಸಾರಿನೊಂದಿಗೆ ಬಡಿಸಿ' }, timeMinutes: 0 },
    ],
    accompaniments: [
      {
        name: { en: 'Coconut Chutney', kn: 'ತೆಂಗಿನಕಾಯಿ ಚಟ್ನಿ' },
        ingredients: [
          { name: { en: 'Fresh Coconut', kn: 'ತಾಜಾ ತೆಂಗಿನಕಾಯಿ' }, ratio: 0.05, unit: 'kg' },
          { name: { en: 'Green Chili', kn: 'ಹಸಿ ಮೆಣಸಿನಕಾಯಿ' }, ratio: 0.005, unit: 'kg' },
        ],
        steps: [
          { instruction: { en: 'Grind fresh coconut with green chili, salt and water', kn: 'ತಾಜಾ ತೆಂಗಿನಕಾಯಿಯನ್ನು ಹಸಿ ಮೆಣಸಿನಕಾಯಿ, ಉಪ್ಪು ಮತ್ತು ನೀರಿನೊಂದಿಗೆ ಅರೆಯಿರಿ' }, timeMinutes: 3 },
          { instruction: { en: 'Temper with mustard seeds and curry leaves', kn: 'ಸಾಸಿವೆ ಮತ್ತು ಕರಿಬೇವಿನಿಂದ ಒಗ್ಗರಣೆ ಹಾಕಿ' }, timeMinutes: 2 },
        ]
      }
    ]
  },
  {
    id: 6,
    name: { en: 'Mysore Pak', kn: 'ಮೈಸೂರ್ ಪಾಕ್' },
    time: '40 min',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600',
    video: 'https://videos.pexels.com/video-files/5765071/5765071-sd_640_360_25fps.mp4',
    category: 'veg',
    origin: 'Mysore, Karnataka, India',
    description: {
      en: 'A legendary sweet from the Mysore Palace kitchens made with generous amounts of ghee, gram flour, and sugar.',
      kn: 'ಮೈಸೂರು ಅರಮನೆ ಅಡುಗೆಮನೆಯಿಂದ ಬಂದ ಪ್ರಸಿದ್ಧ ಸಿಹಿ ತಿಂಡಿ.'
    },
    ingredients: [
      { name: { en: 'Gram Flour (Besan)', kn: 'ಕಡಲೆ ಹಿಟ್ಟು (ಬೇಸನ್)' }, ratio: 0.1, unit: 'kg' },
      { name: { en: 'Sugar', kn: 'ಸಕ್ಕರೆ' }, ratio: 0.15, unit: 'kg' },
      { name: { en: 'Ghee', kn: 'ತುಪ್ಪ' }, ratio: 0.15, unit: 'kg' },
      { name: { en: 'Water', kn: 'ನೀರು' }, ratio: 1, unit: 'cups' },
    ],
    steps: [
      { instruction: { en: 'Sieve gram flour finely to remove any lumps', kn: 'ಕಡಲೆ ಹಿಟ್ಟನ್ನು ಗಂಟಿಲ್ಲದಂತೆ ಸೂಕ್ಷ್ಮವಾಗಿ ಜರಡಿ ಹಾಕಿ' }, timeMinutes: 2 },
      { instruction: { en: 'Make sugar syrup with sugar and water, bring to one-string consistency', kn: 'ಸಕ್ಕರೆ ಮತ್ತು ನೀರಿನೊಂದಿಗೆ ಪಾಕ ಮಾಡಿ, ಒಂದು ಎಳೆ ಪಾಕಕ್ಕೆ ತನ್ನಿ' }, timeMinutes: 10 },
      { instruction: { en: 'Slowly add gram flour to the syrup while stirring', kn: 'ತಿರುಗಿಸುತ್ತಾ ಪಾಕಕ್ಕೆ ನಿಧಾನವಾಗಿ ಕಡಲೆ ಹಿಟ್ಟು ಸೇರಿಸಿ' }, timeMinutes: 5 },
      { instruction: { en: 'Keep adding melted ghee spoon by spoon and cook on medium heat', kn: 'ಕರಗಿದ ತುಪ್ಪವನ್ನು ಚಮಚದಿಂದ ಸೇರಿಸುತ್ತಾ ಮಧ್ಯಮ ಉರಿಯಲ್ಲಿ ಬೇಯಿಸಿ' }, timeMinutes: 15 },
      { instruction: { en: 'When mixture leaves sides, pour into greased tray and let it set', kn: 'ಮಿಶ್ರಣ ಬದಿ ಬಿಡುತ್ತಿದ್ದಾಗ, ತುಪ್ಪ ಹಚ್ಚಿದ ಟ್ರೇಗೆ ಸುರಿದು ಹೊಂದಿಸಲು ಬಿಡಿ' }, timeMinutes: 5 },
      { instruction: { en: 'Once cooled, cut into square pieces and serve', kn: 'ತಣ್ಣಗಾದ ನಂತರ ಚೌಕಾಕಾರದ ತುಂಡುಗಳಾಗಿ ಕತ್ತರಿಸಿ ಬಡಿಸಿ' }, timeMinutes: 0 },
    ]
  },
  {
    id: 7,
    name: { en: 'Kane Fry', kn: 'ಕಣೆ ಫ್ರೈ' },
    time: '35 min',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600',
    video: 'https://videos.pexels.com/video-files/5765071/5765071-sd_640_360_25fps.mp4',
    category: 'nonveg',
    origin: 'Mangalore, Karnataka, India',
    description: {
      en: 'Crispy pan-fried ladyfish marinated in a spicy red masala, a beloved coastal Karnataka delicacy.',
      kn: 'ಖಾರ ಕೆಂಪು ಮಸಾಲೆಯಲ್ಲಿ ನೆನೆಸಿದ ಗರಿಗರಿಯಾದ ಕಣೆ ಮೀನು ಫ್ರೈ.'
    },
    ingredients: [
      { name: { en: 'Ladyfish (Kane)', kn: 'ಕಣೆ ಮೀನು' }, ratio: 0.2, unit: 'kg' },
      { name: { en: 'Red Chili Paste', kn: 'ಕೆಂಪು ಮೆಣಸಿನ ಪೇಸ್ಟ್' }, ratio: 0.03, unit: 'kg' },
      { name: { en: 'Garlic', kn: 'ಬೆಳ್ಳುಳ್ಳಿ' }, ratio: 0.01, unit: 'kg' },
      { name: { en: 'Oil', kn: 'ಎಣ್ಣೆ' }, ratio: 0.05, unit: 'kg' },
      { name: { en: 'Tamarind', kn: 'ಹುಣಸೆ' }, ratio: 0.01, unit: 'kg' },
    ],
    steps: [
      { instruction: { en: 'Clean the ladyfish, make slits on both sides', kn: 'ಕಣೆ ಮೀನನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಿ, ಎರಡೂ ಬದಿಗಳಲ್ಲಿ ಕೊಯ್ಯಿರಿ' }, timeMinutes: 5 },
      { instruction: { en: 'Grind red chilies, pepper, garlic, ginger, tamarind into a thick paste', kn: 'ಕೆಂಪು ಮೆಣಸಿನಕಾಯಿ, ಮೆಣಸು, ಬೆಳ್ಳುಳ್ಳಿ, ಶುಂಠಿ, ಹುಣಸೆಹಣ್ಣನ್ನು ದಪ್ಪ ಪೇಸ್ಟ್ ಆಗಿ ಅರೆಯಿರಿ' }, timeMinutes: 5 },
      { instruction: { en: 'Apply masala paste on the fish and marinate for 20 minutes', kn: 'ಮೀನಿಗೆ ಮಸಾಲೆ ಪೇಸ್ಟ್ ಹಚ್ಚಿ 20 ನಿಮಿಷ ನೆನೆಸಿ' }, timeMinutes: 20 },
      { instruction: { en: 'Heat oil, shallow fry the fish on medium heat until crispy on both sides', kn: 'ಎಣ್ಣೆ ಕಾಯಿಸಿ, ಎರಡೂ ಬದಿ ಗರಿಗರಿಯಾಗುವವರೆಗೆ ಹುರಿಯಿರಿ' }, timeMinutes: 8 },
      { instruction: { en: 'Serve hot with lemon wedge and onion rings', kn: 'ನಿಂಬೆ ಹೋಳು ಮತ್ತು ಈರುಳ್ಳಿ ಉಂಗುರಗಳೊಂದಿಗೆ ಬಿಸಿಯಾಗಿ ಬಡಿಸಿ' }, timeMinutes: 0 },
    ]
  },
  {
    id: 8,
    name: { en: 'Jolada Rotti', kn: 'ಜೋಳದ ರೊಟ್ಟಿ' },
    time: '20 min',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600',
    video: 'https://videos.pexels.com/video-files/5765071/5765071-sd_640_360_25fps.mp4',
    category: 'veg',
    origin: 'Dharwad, Karnataka, India',
    description: {
      en: 'A hearty sorghum flatbread from North Karnataka, traditionally cooked on a wood fire and served with ennegai.',
      kn: 'ಉತ್ತರ ಕರ್ನಾಟಕದ ಜೋಳದ ರೊಟ್ಟಿ, ಎಣ್ಣೆಗಾಯಿಯೊಂದಿಗೆ ಬಡಿಸಲಾಗುತ್ತದೆ.'
    },
    ingredients: [
      { name: { en: 'Jowar (Sorghum) Flour', kn: 'ಜೋಳದ ಹಿಟ್ಟು' }, ratio: 0.15, unit: 'kg' },
      { name: { en: 'Water', kn: 'ನೀರು' }, ratio: 1, unit: 'cups' },
      { name: { en: 'Ghee', kn: 'ತುಪ್ಪ' }, ratio: 0.02, unit: 'kg' },
    ],
    steps: [
      { instruction: { en: 'Take jowar flour, add warm water gradually and knead into soft dough', kn: 'ಜೋಳದ ಹಿಟ್ಟು ತೆಗೆದುಕೊಂಡು, ಬೆಚ್ಚಗಿನ ನೀರು ಸೇರಿಸಿ ಮೃದುವಾದ ಹಿಟ್ಟನ್ನು ಕಲಸಿ' }, timeMinutes: 5 },
      { instruction: { en: 'Divide dough into balls and pat each flat on banana leaf', kn: 'ಹಿಟ್ಟನ್ನು ಉಂಡೆಗಳಾಗಿ ಮಾಡಿ ಬಾಳೆ ಎಲೆಯ ಮೇಲೆ ಚಪ್ಪಟೆಯಾಗಿ ತಟ್ಟಿ' }, timeMinutes: 3 },
      { instruction: { en: 'Heat a tava, place the rotti and cook on medium heat', kn: 'ತವಾ ಕಾಯಿಸಿ, ರೊಟ್ಟಿ ಇಟ್ಟು ಮಧ್ಯಮ ಉರಿಯಲ್ಲಿ ಬೇಯಿಸಿ' }, timeMinutes: 3 },
      { instruction: { en: 'Flip and cook the other side, apply ghee', kn: 'ತಿರುಗಿಸಿ ಇನ್ನೊಂದು ಬದಿ ಬೇಯಿಸಿ, ತುಪ್ಪ ಹಚ್ಚಿ' }, timeMinutes: 3 },
      { instruction: { en: 'Serve hot with ennegai, chutney powder, and white butter', kn: 'ಎಣ್ಣೆಗಾಯಿ, ಚಟ್ನಿ ಪುಡಿ ಮತ್ತು ಬೆಣ್ಣೆಯೊಂದಿಗೆ ಬಿಸಿಯಾಗಿ ಬಡಿಸಿ' }, timeMinutes: 0 },
    ],
    accompaniments: [
      {
        name: { en: 'Ennegai (Stuffed Brinjal)', kn: 'ಎಣ್ಣೆಗಾಯಿ' },
        ingredients: [
          { name: { en: 'Brinjal', kn: 'ಬದನೆಕಾಯಿ' }, ratio: 0.15, unit: 'kg' },
          { name: { en: 'Peanuts', kn: 'ಕಡಲೆಕಾಯಿ' }, ratio: 0.03, unit: 'kg' },
          { name: { en: 'Sesame Seeds', kn: 'ಎಳ್ಳು' }, ratio: 0.01, unit: 'kg' },
          { name: { en: 'Oil', kn: 'ಎಣ್ಣೆ' }, ratio: 0.03, unit: 'kg' },
        ],
        steps: [
          { instruction: { en: 'Roast peanuts, sesame, dry coconut and grind into masala', kn: 'ಕಡಲೆಕಾಯಿ, ಎಳ್ಳು, ಒಣ ತೆಂಗಿನಕಾಯಿ ಹುರಿದು ಮಸಾಲೆ ಅರೆಯಿರಿ' }, timeMinutes: 5 },
          { instruction: { en: 'Slit brinjals and stuff with masala paste', kn: 'ಬದನೆಕಾಯಿಯನ್ನು ಸೀಳಿ ಮಸಾಲೆ ಪೇಸ್ಟ್ ತುಂಬಿರಿ' }, timeMinutes: 5 },
          { instruction: { en: 'Cook stuffed brinjals in oil on low heat until tender', kn: 'ತುಂಬಿದ ಬದನೆಕಾಯಿಯನ್ನು ಎಣ್ಣೆಯಲ್ಲಿ ನಿಧಾನ ಉರಿಯಲ್ಲಿ ಮೆದುವಾಗುವವರೆಗೆ ಬೇಯಿಸಿ' }, timeMinutes: 15 },
        ]
      }
    ]
  },
];

export interface Place {
  id: number;
  name: { en: string; kn: string };
  description: { en: string; kn: string };
  video: string;
  image: string;
  location: string;
}

export const places: Place[] = [
  { id: 1, name: { en: 'Udupi', kn: 'ಉಡುಪಿ' }, description: { en: 'Birthplace of the iconic Masala Dosa and temple cuisine', kn: 'ಮಸಾಲೆ ದೋಸೆ ಮತ್ತು ದೇವಸ್ಥಾನ ಪಾಕಪದ್ಧತಿಯ ಜನ್ಮಸ್ಥಳ' }, video: 'https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600', location: 'Udupi, Karnataka, India' },
  { id: 2, name: { en: 'Mangalore', kn: 'ಮಂಗಳೂರು' }, description: { en: 'Coastal city famous for seafood and Bunt cuisine', kn: 'ಸಮುದ್ರ ಆಹಾರ ಮತ್ತು ಬಂಟ ಪಾಕಪದ್ಧತಿಗೆ ಹೆಸರಾದ ಕರಾವಳಿ ನಗರ' }, video: 'https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600', location: 'Mangalore, Karnataka, India' },
  { id: 3, name: { en: 'Mysore', kn: 'ಮೈಸೂರು' }, description: { en: 'Royal city known for Mysore Pak and palace cuisine', kn: 'ಮೈಸೂರ್ ಪಾಕ್ ಮತ್ತು ಅರಮನೆ ಪಾಕಪದ್ಧತಿಗೆ ಹೆಸರಾದ ರಾಜ ನಗರ' }, video: 'https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4', image: 'https://images.unsplash.com/photo-1600689516068-2aa1b7b4e6b4?w=600', location: 'Mysore, Karnataka, India' },
  { id: 4, name: { en: 'Dharwad', kn: 'ಧಾರವಾಡ' }, description: { en: 'Home of the legendary Dharwad Peda sweet', kn: 'ಪ್ರಸಿದ್ಧ ಧಾರವಾಡ ಪೇಡಾದ ತವರು' }, video: 'https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600', location: 'Dharwad, Karnataka, India' },
];

export interface DishHistory {
  id: number;
  name: { en: string; kn: string };
  story: { en: string; kn: string };
  image: string;
}

export const dishHistories: DishHistory[] = [
  { id: 1, name: { en: 'Masala Dosa', kn: 'ಮಸಾಲೆ ದೋಸೆ' }, story: { en: 'Originating from the temple town of Udupi in the 16th century, Masala Dosa was created as a nutritious offering for devotees.', kn: '16ನೇ ಶತಮಾನದಲ್ಲಿ ಉಡುಪಿ ದೇವಸ್ಥಾನ ಪಟ್ಟಣದಲ್ಲಿ ಹುಟ್ಟಿದ ಮಸಾಲೆ ದೋಸೆಯನ್ನು ಭಕ್ತರಿಗೆ ಪೌಷ್ಟಿಕ ನೈವೇದ್ಯವಾಗಿ ಸೃಷ್ಟಿಸಲಾಯಿತು.' }, image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=600' },
  { id: 2, name: { en: 'Bisi Bele Bath', kn: 'ಬಿಸಿ ಬೇಳೆ ಬಾತ್' }, story: { en: 'This beloved one-pot meal from the Mysore royal kitchens translates to "hot lentil rice."', kn: 'ಮೈಸೂರು ರಾಜ ಅಡುಗೆಮನೆಯಿಂದ ಬಂದ ಈ ಪ್ರಿಯ ಏಕಪಾತ್ರೆ ಊಟವು "ಬಿಸಿ ಬೇಳೆ ಅನ್ನ" ಎಂದು ಅನುವಾದಿಸುತ್ತದೆ.' }, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600' },
  { id: 3, name: { en: 'Mysore Pak', kn: 'ಮೈಸೂರ್ ಪಾಕ್' }, story: { en: 'Created by Kakasura Madappa in the kitchens of Mysore Palace for Krishna Raja Wadiyar IV.', kn: 'ಕೃಷ್ಣರಾಜ ಒಡೆಯರ IV ರಿಗಾಗಿ ಮೈಸೂರು ಅರಮನೆಯ ಅಡುಗೆಮನೆಯಲ್ಲಿ ಕಾಕಸುರ ಮಾದಪ್ಪ ಅವರು ಸೃಷ್ಟಿಸಿದರು.' }, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600' },
];
