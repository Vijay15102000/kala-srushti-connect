export interface Recipe {
  id: number;
  name: { en: string; kn: string };
  time: string;
  image: string;
  video: string;
  category: 'veg' | 'nonveg' | 'coastal';
}

export const recipes: Recipe[] = [
  { id: 1, name: { en: 'Masala Dosa', kn: 'ಮಸಾಲೆ ದೋಸೆ' }, time: '45 min', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=600', video: 'https://videos.pexels.com/video-files/5765071/5765071-sd_640_360_25fps.mp4', category: 'veg' },
  { id: 2, name: { en: 'Bisi Bele Bath', kn: 'ಬಿಸಿ ಬೇಳೆ ಬಾತ್' }, time: '60 min', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600', video: 'https://videos.pexels.com/video-files/5765071/5765071-sd_640_360_25fps.mp4', category: 'veg' },
  { id: 3, name: { en: 'Kori Rotti', kn: 'ಕೋರಿ ರೊಟ್ಟಿ' }, time: '50 min', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600', video: 'https://videos.pexels.com/video-files/5765071/5765071-sd_640_360_25fps.mp4', category: 'coastal' },
  { id: 4, name: { en: 'Ragi Mudde', kn: 'ರಾಗಿ ಮುದ್ದೆ' }, time: '30 min', image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=600', video: 'https://videos.pexels.com/video-files/5765071/5765071-sd_640_360_25fps.mp4', category: 'veg' },
  { id: 5, name: { en: 'Neer Dosa', kn: 'ನೀರ್ ದೋಸೆ' }, time: '25 min', image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600', video: 'https://videos.pexels.com/video-files/5765071/5765071-sd_640_360_25fps.mp4', category: 'coastal' },
  { id: 6, name: { en: 'Mysore Pak', kn: 'ಮೈಸೂರ್ ಪಾಕ್' }, time: '40 min', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600', video: 'https://videos.pexels.com/video-files/5765071/5765071-sd_640_360_25fps.mp4', category: 'veg' },
  { id: 7, name: { en: 'Kane Fry', kn: 'ಕಣೆ ಫ್ರೈ' }, time: '35 min', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600', video: 'https://videos.pexels.com/video-files/5765071/5765071-sd_640_360_25fps.mp4', category: 'nonveg' },
  { id: 8, name: { en: 'Jolada Rotti', kn: 'ಜೋಳದ ರೊಟ್ಟಿ' }, time: '20 min', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600', video: 'https://videos.pexels.com/video-files/5765071/5765071-sd_640_360_25fps.mp4', category: 'veg' },
];

export interface Place {
  id: number;
  name: { en: string; kn: string };
  description: { en: string; kn: string };
  video: string;
  image: string;
}

export const places: Place[] = [
  { id: 1, name: { en: 'Udupi', kn: 'ಉಡುಪಿ' }, description: { en: 'Birthplace of the iconic Masala Dosa and temple cuisine', kn: 'ಮಸಾಲೆ ದೋಸೆ ಮತ್ತು ದೇವಸ್ಥಾನ ಪಾಕಪದ್ಧತಿಯ ಜನ್ಮಸ್ಥಳ' }, video: 'https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600' },
  { id: 2, name: { en: 'Mangalore', kn: 'ಮಂಗಳೂರು' }, description: { en: 'Coastal city famous for seafood and Bunt cuisine', kn: 'ಸಮುದ್ರ ಆಹಾರ ಮತ್ತು ಬಂಟ ಪಾಕಪದ್ಧತಿಗೆ ಹೆಸರಾದ ಕರಾವಳಿ ನಗರ' }, video: 'https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600' },
  { id: 3, name: { en: 'Mysore', kn: 'ಮೈಸೂರು' }, description: { en: 'Royal city known for Mysore Pak and palace cuisine', kn: 'ಮೈಸೂರ್ ಪಾಕ್ ಮತ್ತು ಅರಮನೆ ಪಾಕಪದ್ಧತಿಗೆ ಹೆಸರಾದ ರಾಜ ನಗರ' }, video: 'https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4', image: 'https://images.unsplash.com/photo-1600689516068-2aa1b7b4e6b4?w=600' },
  { id: 4, name: { en: 'Dharwad', kn: 'ಧಾರವಾಡ' }, description: { en: 'Home of the legendary Dharwad Peda sweet', kn: 'ಪ್ರಸಿದ್ಧ ಧಾರವಾಡ ಪೇಡಾದ ತವರು' }, video: 'https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600' },
];

export interface DishHistory {
  id: number;
  name: { en: string; kn: string };
  story: { en: string; kn: string };
  image: string;
}

export const dishHistories: DishHistory[] = [
  { id: 1, name: { en: 'Masala Dosa', kn: 'ಮಸಾಲೆ ದೋಸೆ' }, story: { en: 'Originating from the temple town of Udupi in the 16th century, Masala Dosa was created as a nutritious offering for devotees. The fermented rice and lentil batter was an ingenious solution for preserving food in the tropical climate, while the potato filling added substance to the meal.', kn: '16ನೇ ಶತಮಾನದಲ್ಲಿ ಉಡುಪಿ ದೇವಸ್ಥಾನ ಪಟ್ಟಣದಲ್ಲಿ ಹುಟ್ಟಿದ ಮಸಾಲೆ ದೋಸೆಯನ್ನು ಭಕ್ತರಿಗೆ ಪೌಷ್ಟಿಕ ನೈವೇದ್ಯವಾಗಿ ಸೃಷ್ಟಿಸಲಾಯಿತು.' }, image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=600' },
  { id: 2, name: { en: 'Bisi Bele Bath', kn: 'ಬಿಸಿ ಬೇಳೆ ಬಾತ್' }, story: { en: 'This beloved one-pot meal from the Mysore royal kitchens translates to "hot lentil rice." The dish combines rice, lentils, vegetables, and a special spice powder into a comforting meal that has sustained generations of Kannadigas. Each household guards its own spice blend recipe.', kn: 'ಮೈಸೂರು ರಾಜ ಅಡುಗೆಮನೆಯಿಂದ ಬಂದ ಈ ಪ್ರಿಯ ಏಕಪಾತ್ರೆ ಊಟವು "ಬಿಸಿ ಬೇಳೆ ಅನ್ನ" ಎಂದು ಅನುವಾದಿಸುತ್ತದೆ.' }, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600' },
  { id: 3, name: { en: 'Mysore Pak', kn: 'ಮೈಸೂರ್ ಪಾಕ್' }, story: { en: 'Created by Kakasura Madappa in the kitchens of Mysore Palace for Krishna Raja Wadiyar IV, Mysore Pak was a happy accident. When the king asked the name of this new sweet made with ghee, gram flour, and sugar, the nervous cook simply said "Mysuru Paka" — a sweet from Mysore.', kn: 'ಕೃಷ್ಣರಾಜ ಒಡೆಯರ IV ರಿಗಾಗಿ ಮೈಸೂರು ಅರಮನೆಯ ಅಡುಗೆಮನೆಯಲ್ಲಿ ಕಾಕಸುರ ಮಾದಪ್ಪ ಅವರು ಸೃಷ್ಟಿಸಿದ ಮೈಸೂರ್ ಪಾಕ್ ಒಂದು ಸಂತೋಷದ ಅಪಘಾತವಾಗಿತ್ತು.' }, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600' },
];
