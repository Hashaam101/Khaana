export interface Store {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  originalPrice: number;
  discountedPrice: number;
  pickupTime: string;
  pickupDay: string;
  distance: string;
  address: string;
  image: string;
  logo: string;
  logoColor: string;
  description: string;
  items: string[];
  isFavourite?: boolean;
}

export interface UserPreferences {
  city: string;
  priceRange: [number, number];
  allergies: string[];
  dietaryPreferences: string[];
  mealTypes: string[];
}

const PHOTO_BASE = "/Khaana-Photoshoot";

export const photos = {
  sushi: `${PHOTO_BASE}/1 - Casual Sushi Dinner.png`,
  desiDinner: `${PHOTO_BASE}/1.1 - Casual Desi Dinner.png`,
  bakery: `${PHOTO_BASE}/2 - Kitchen Bakery Unpacking.png`,
  desiUnpacking: `${PHOTO_BASE}/2.1 - Kitchen Desi Unpacking.png`,
  fatherDaughter: `${PHOTO_BASE}/3 - Father-Daughter Unboxing.png`,
  fatherDaughterDesi: `${PHOTO_BASE}/3.1 - Father-Daughter Unboxing Desi.png`,
};

export const cities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Peshawar",
  "Multan",
  "Quetta",
];

export const categories = [
  "All",
  "Desi",
  "Bakery",
  "BBQ",
  "Fast Food",
  "Biryani",
  "Chinese",
  "Sweets",
];

export const allergyOptions = [
  "Gluten",
  "Dairy",
  "Nuts",
  "Eggs",
  "Soy",
  "Shellfish",
  "Sesame",
  "Mustard",
];

export const dietaryOptions = [
  "Halal",
  "Vegetarian",
  "Vegan",
  "Low Carb",
  "High Protein",
];

export const stores: Store[] = [
  {
    id: "1",
    name: "Karachi Biryani House",
    category: "Biryani",
    rating: 4.7,
    reviewCount: 234,
    originalPrice: 850,
    discountedPrice: 350,
    pickupTime: "20:00 - 21:00",
    pickupDay: "Today",
    distance: "1.2 km",
    address: "Block 7, Clifton, Karachi",
    image: photos.desiDinner,
    logo: "K",
    logoColor: "#1B512D",
    description:
      "Save delicious leftover biryani, karahi, and other desi favourites from going to waste. Each surprise bag contains a generous portion of our signature dishes.",
    items: ["Chicken Biryani", "Raita", "Salad", "Naan"],
  },
  {
    id: "2",
    name: "Lahore Bakers",
    category: "Bakery",
    rating: 4.5,
    reviewCount: 189,
    originalPrice: 600,
    discountedPrice: 250,
    pickupTime: "19:00 - 20:00",
    pickupDay: "Today",
    distance: "0.8 km",
    address: "MM Alam Road, Gulberg, Lahore",
    image: photos.bakery,
    logo: "L",
    logoColor: "#8B4513",
    description:
      "Rescue fresh bakery items before they go unsold. Get a surprise mix of our famous breads, pastries, and cakes at a fraction of the price.",
    items: ["Croissants", "Puff Pastry", "Cake Slices", "Fresh Bread"],
  },
  {
    id: "3",
    name: "Tikka Express",
    category: "BBQ",
    rating: 4.3,
    reviewCount: 156,
    originalPrice: 1200,
    discountedPrice: 500,
    pickupTime: "21:00 - 22:00",
    pickupDay: "Today",
    distance: "2.1 km",
    address: "F-7 Markaz, Islamabad",
    image: photos.fatherDaughterDesi,
    logo: "T",
    logoColor: "#C62828",
    description:
      "Enjoy premium BBQ items at a great price. Our surprise bags include a mix of tikka, kebabs, and sides that are too good to throw away.",
    items: ["Chicken Tikka", "Seekh Kebab", "Naan", "Chutney"],
  },
  {
    id: "4",
    name: "Naan Stop",
    category: "Desi",
    rating: 4.6,
    reviewCount: 312,
    originalPrice: 700,
    discountedPrice: 300,
    pickupTime: "13:00 - 14:00",
    pickupDay: "Tomorrow",
    distance: "1.5 km",
    address: "Saddar, Rawalpindi",
    image: photos.desiUnpacking,
    logo: "N",
    logoColor: "#E65100",
    description:
      "Authentic desi home-style cooking saved from waste. Get a hearty surprise bag with dal, sabzi, rice, and fresh naan.",
    items: ["Dal Makhni", "Aloo Gobi", "Jeera Rice", "Tandoori Naan"],
  },
  {
    id: "5",
    name: "Roll Junction",
    category: "Fast Food",
    rating: 4.2,
    reviewCount: 98,
    originalPrice: 550,
    discountedPrice: 200,
    pickupTime: "22:00 - 23:00",
    pickupDay: "Today",
    distance: "3.0 km",
    address: "Burns Garden, Karachi",
    image: photos.sushi,
    logo: "R",
    logoColor: "#1565C0",
    description:
      "Grab leftover rolls, shawarmas, and wraps at amazing prices. Perfect for a late-night snack that saves food from the bin.",
    items: ["Chicken Roll", "Shawarma", "Fries", "Drink"],
  },
  {
    id: "6",
    name: "Mithai Palace",
    category: "Sweets",
    rating: 4.8,
    reviewCount: 421,
    originalPrice: 900,
    discountedPrice: 400,
    pickupTime: "18:00 - 19:00",
    pickupDay: "Tomorrow",
    distance: "0.5 km",
    address: "Liberty Market, Lahore",
    image: photos.fatherDaughter,
    logo: "M",
    logoColor: "#6A1B9A",
    description:
      "Premium Pakistani sweets and desserts at unbeatable prices. Our surprise bags are packed with gulab jamun, barfi, jalebi, and more.",
    items: ["Gulab Jamun", "Barfi", "Jalebi", "Ras Malai"],
  },
];
