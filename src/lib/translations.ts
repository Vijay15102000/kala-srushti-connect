export type Language = 'en' | 'kn';

export const translations: Record<string, Record<Language, string>> = {
  // Navbar
  'nav.home': { en: 'Home', kn: 'ಮುಖಪುಟ' },
  'nav.recipes': { en: 'Recipes', kn: 'ಪಾಕವಿಧಾನಗಳು' },
  'nav.history': { en: 'History', kn: 'ಇತಿಹಾಸ' },
  'nav.places': { en: 'Places', kn: 'ಸ್ಥಳಗಳು' },
  'nav.login': { en: 'Login', kn: 'ಲಾಗಿನ್' },
  'nav.signup': { en: 'Sign Up', kn: 'ಸೈನ್ ಅಪ್' },
  'nav.langToggle': { en: 'ಕನ್ನಡಕ್ಕಾಗಿ ಇಲ್ಲಿ ಒತ್ತಿರಿ', kn: 'For English click here' },

  // Hero
  'hero.title': { en: 'KARNATAKA CULINARY MASTERPIECES', kn: 'ಕರ್ನಾಟಕ ಪಾಕ ಕಲಾಕೃತಿಗಳು' },
  'hero.subtitle': { en: 'Discover the rich flavors and ancient traditions of Karnataka\'s diverse cuisine', kn: 'ಕರ್ನಾಟಕದ ವೈವಿಧ್ಯಮಯ ಪಾಕಪದ್ಧತಿಯ ಶ್ರೀಮಂತ ರುಚಿಗಳು ಮತ್ತು ಪ್ರಾಚೀನ ಸಂಪ್ರದಾಯಗಳನ್ನು ಅನ್ವೇಷಿಸಿ' },

  // History
  'history.title': { en: 'Culinary History of Karnataka', kn: 'ಕರ್ನಾಟಕದ ಪಾಕಶಾಸ್ತ್ರ ಇತಿಹಾಸ' },
  'history.p1': {
    en: 'Karnataka\'s culinary heritage is a tapestry woven over millennia, reflecting the state\'s geographic diversity — from the lush Western Ghats to the arid Deccan plateau. The cuisine is broadly divided into North Karnataka, South Karnataka, and Coastal regions, each with its own distinct identity.',
    kn: 'ಕರ್ನಾಟಕದ ಪಾಕಶಾಸ್ತ್ರ ಪರಂಪರೆಯು ಸಹಸ್ರಮಾನಗಳಿಂದ ನೇಯ್ದ ವಸ್ತ್ರವಾಗಿದೆ, ಪಶ್ಚಿಮ ಘಟ್ಟಗಳಿಂದ ಡೆಕ್ಕನ್ ಪ್ರಸ್ಥಭೂಮಿಯವರೆಗೆ ರಾಜ್ಯದ ಭೌಗೋಳಿಕ ವೈವಿಧ್ಯತೆಯನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತದೆ.'
  },
  'history.p2': {
    en: 'Udupi cuisine, born in the temple kitchens of Sri Krishna Matha, is perhaps the most celebrated vegetarian tradition in India. The iconic Masala Dosa, Sambar, and Rasam that are now global favorites all trace their roots to this sacred culinary lineage. The concept of "Anna Santarpane" — feeding the masses — gave rise to systematic, large-scale vegetarian cooking.',
    kn: 'ಶ್ರೀ ಕೃಷ್ಣ ಮಠದ ದೇವಸ್ಥಾನದ ಅಡುಗೆಮನೆಗಳಲ್ಲಿ ಹುಟ್ಟಿದ ಉಡುಪಿ ಪಾಕಪದ್ಧತಿಯು ಭಾರತದ ಅತ್ಯಂತ ಪ್ರಸಿದ್ಧ ಸಸ್ಯಾಹಾರ ಸಂಪ್ರದಾಯವಾಗಿದೆ.'
  },
  'history.p3': {
    en: 'North Karnataka\'s robust cuisine features the legendary Jolada Rotti (sorghum flatbread), fiery Ennegai (stuffed brinjal), and the complex Dharwad Peda. The region\'s food is characterized by bold use of chili, garlic, and onions, with dishes slow-cooked to develop deep, complex flavors.',
    kn: 'ಉತ್ತರ ಕರ್ನಾಟಕದ ಬಲಿಷ್ಠ ಪಾಕಪದ್ಧತಿಯು ಜೋಳದ ರೊಟ್ಟಿ, ಎಣ್ಣೆಗಾಯಿ ಮತ್ತು ಧಾರವಾಡ ಪೇಡಾದಂತಹ ಖ್ಯಾತ ಭಕ್ಷ್ಯಗಳನ್ನು ಒಳಗೊಂಡಿದೆ.'
  },
  'history.p4': {
    en: 'The coastal belt, stretching from Mangalore to Karwar, offers a seafood paradise. Dishes like Kori Rotti (chicken curry with rice wafers), Kane Fry (ladyfish fry), and Neer Dosa showcase the brilliant use of coconut, kokum, and fresh catch from the Arabian Sea. The Bunt and GSB communities have contributed immensely to this coastal culinary legacy.',
    kn: 'ಮಂಗಳೂರಿನಿಂದ ಕಾರವಾರದವರೆಗೆ ಹರಡಿರುವ ಕರಾವಳಿ ಪ್ರದೇಶವು ಸಮುದ್ರ ಆಹಾರ ಸ್ವರ್ಗವಾಗಿದೆ. ಕೋರಿ ರೊಟ್ಟಿ, ಕಣೆ ಫ್ರೈ ಮತ್ತು ನೀರ್ ದೋಸೆ ಪ್ರಮುಖ ಭಕ್ಷ್ಯಗಳಾಗಿವೆ.'
  },

  // Scroll indicator
  'scroll.text': { en: 'Wanna Cook early without knowing more? Go below', kn: 'ಹೆಚ್ಚು ತಿಳಿಯದೆ ಬೇಗ ಅಡುಗೆ ಮಾಡಬೇಕೇ? ಕೆಳಗೆ ಹೋಗಿ' },

  // Recipes
  'recipes.title': { en: 'Traditional Recipes', kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಪಾಕವಿಧಾನಗಳು' },
  'recipes.search': { en: 'Search recipes...', kn: 'ಪಾಕವಿಧಾನಗಳನ್ನು ಹುಡುಕಿ...' },
  'recipes.filter.all': { en: 'All', kn: 'ಎಲ್ಲಾ' },
  'recipes.filter.veg': { en: 'Vegetarian', kn: 'ಸಸ್ಯಾಹಾರ' },
  'recipes.filter.nonveg': { en: 'Non-Veg', kn: 'ಮಾಂಸಾಹಾರ' },
  'recipes.filter.coastal': { en: 'Coastal', kn: 'ಕರಾವಳಿ' },

  // Places
  'places.title': { en: 'Culinary Destinations', kn: 'ಪಾಕಶಾಸ್ತ್ರ ತಾಣಗಳು' },

  // Auth
  'auth.login.title': { en: 'Welcome Back', kn: 'ಮರಳಿ ಸ್ವಾಗತ' },
  'auth.signup.title': { en: 'Create Account', kn: 'ಖಾತೆ ರಚಿಸಿ' },
  'auth.email': { en: 'Email', kn: 'ಇಮೇಲ್' },
  'auth.password': { en: 'Password', kn: 'ಗುಪ್ತಪದ' },
  'auth.confirmPassword': { en: 'Confirm Password', kn: 'ಗುಪ್ತಪದ ದೃಢೀಕರಿಸಿ' },
  'auth.submit': { en: 'Submit', kn: 'ಸಲ್ಲಿಸಿ' },

  // Dish History
  'dishHistory.title': { en: 'The Story Behind the Dishes', kn: 'ಭಕ್ಷ್ಯಗಳ ಹಿಂದಿನ ಕಥೆ' },

  // Footer
  'footer.text': { en: '© 2026 Karnataka Culinary. All rights reserved.', kn: '© 2026 ಕರ್ನಾಟಕ ಪಾಕಶಾಸ್ತ್ರ. ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.' },
};

export function t(key: string, lang: Language): string {
  return translations[key]?.[lang] ?? key;
}
