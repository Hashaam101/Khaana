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
  lat: number;
  lng: number;
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

export const cityCoords: Record<string, [number, number]> = {
  Karachi: [24.8607, 67.0011],
  Lahore: [31.5204, 74.3587],
  Islamabad: [33.6844, 73.0479],
  Rawalpindi: [33.5651, 73.0169],
  Faisalabad: [31.4504, 73.135],
  Peshawar: [34.0151, 71.5249],
  Multan: [30.1575, 71.5249],
  Quetta: [30.1798, 66.975],
};

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

// Admin interfaces & mock data
export interface Order {
  id: string;
  customer: string;
  storeName: string;
  items: string[];
  total: number;
  status: "pending" | "confirmed" | "picked_up" | "delivered" | "cancelled";
  date: string;
}

export interface AdminStats {
  totalOrders: number;
  totalDeliveries: number;
  totalRevenue: number;
  totalCustomers: number;
  mealsSaved: number;
  activeStores: number;
  ordersThisWeek: number;
  revenueThisWeek: number;
  monthlyOrders: { month: string; orders: number; revenue: number }[];
  topStores: { name: string; orders: number; revenue: number }[];
}

export interface Storefront {
  id: string;
  name: string;
  category: string;
  owner: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  revenue: number;
  rating: number;
  status: "active" | "inactive" | "pending";
  joinedDate: string;
}

export const adminStats: AdminStats = {
  totalOrders: 1847,
  totalDeliveries: 1623,
  totalRevenue: 734500,
  totalCustomers: 892,
  mealsSaved: 1623,
  activeStores: 6,
  ordersThisWeek: 127,
  revenueThisWeek: 48300,
  monthlyOrders: [
    { month: "Nov", orders: 210, revenue: 84000 },
    { month: "Dec", orders: 285, revenue: 112500 },
    { month: "Jan", orders: 320, revenue: 128000 },
    { month: "Feb", orders: 298, revenue: 119200 },
    { month: "Mar", orders: 367, revenue: 146800 },
    { month: "Apr", orders: 367, revenue: 144000 },
  ],
  topStores: [
    { name: "Mithai Palace", orders: 421, revenue: 168400 },
    { name: "Naan Stop", orders: 312, revenue: 93600 },
    { name: "Karachi Biryani House", orders: 234, revenue: 81900 },
    { name: "Lahore Bakers", orders: 189, revenue: 47250 },
    { name: "Tikka Express", orders: 156, revenue: 78000 },
    { name: "Roll Junction", orders: 98, revenue: 19600 },
  ],
};

export const recentOrders: Order[] = [
  { id: "ORD-1847", customer: "Ahmed Khan", storeName: "Karachi Biryani House", items: ["Chicken Biryani", "Raita"], total: 350, status: "delivered", date: "2026-04-22" },
  { id: "ORD-1846", customer: "Fatima Ali", storeName: "Lahore Bakers", items: ["Croissants", "Cake Slices"], total: 250, status: "picked_up", date: "2026-04-22" },
  { id: "ORD-1845", customer: "Hassan Raza", storeName: "Tikka Express", items: ["Chicken Tikka", "Naan"], total: 500, status: "confirmed", date: "2026-04-22" },
  { id: "ORD-1844", customer: "Sara Malik", storeName: "Naan Stop", items: ["Dal Makhni", "Tandoori Naan"], total: 300, status: "pending", date: "2026-04-22" },
  { id: "ORD-1843", customer: "Usman Shah", storeName: "Mithai Palace", items: ["Gulab Jamun", "Barfi"], total: 400, status: "delivered", date: "2026-04-21" },
  { id: "ORD-1842", customer: "Ayesha Nawaz", storeName: "Roll Junction", items: ["Chicken Roll", "Fries"], total: 200, status: "cancelled", date: "2026-04-21" },
  { id: "ORD-1841", customer: "Bilal Ahmed", storeName: "Karachi Biryani House", items: ["Chicken Biryani", "Naan"], total: 350, status: "delivered", date: "2026-04-21" },
  { id: "ORD-1840", customer: "Zainab Iqbal", storeName: "Tikka Express", items: ["Seekh Kebab", "Chutney"], total: 500, status: "delivered", date: "2026-04-20" },
];

export const storefronts: Storefront[] = [
  { id: "1", name: "Karachi Biryani House", category: "Biryani", owner: "Imran Siddiqui", email: "imran@kbh.pk", phone: "+92 321 1234567", address: "Block 7, Clifton, Karachi", totalOrders: 234, revenue: 81900, rating: 4.7, status: "active", joinedDate: "2025-09-15" },
  { id: "2", name: "Lahore Bakers", category: "Bakery", owner: "Amina Butt", email: "amina@lahorebakers.pk", phone: "+92 300 9876543", address: "MM Alam Road, Gulberg, Lahore", totalOrders: 189, revenue: 47250, rating: 4.5, status: "active", joinedDate: "2025-10-01" },
  { id: "3", name: "Tikka Express", category: "BBQ", owner: "Farhan Qureshi", email: "farhan@tikkaexpress.pk", phone: "+92 333 4567890", address: "F-7 Markaz, Islamabad", totalOrders: 156, revenue: 78000, rating: 4.3, status: "active", joinedDate: "2025-10-20" },
  { id: "4", name: "Naan Stop", category: "Desi", owner: "Rashida Begum", email: "rashida@naanstop.pk", phone: "+92 312 3456789", address: "Saddar, Rawalpindi", totalOrders: 312, revenue: 93600, rating: 4.6, status: "active", joinedDate: "2025-08-10" },
  { id: "5", name: "Roll Junction", category: "Fast Food", owner: "Kamran Yousuf", email: "kamran@rolljunction.pk", phone: "+92 345 6789012", address: "Burns Garden, Karachi", totalOrders: 98, revenue: 19600, rating: 4.2, status: "inactive", joinedDate: "2025-11-05" },
  { id: "6", name: "Mithai Palace", category: "Sweets", owner: "Nasreen Akhtar", email: "nasreen@mithaipalace.pk", phone: "+92 301 2345678", address: "Liberty Market, Lahore", totalOrders: 421, revenue: 168400, rating: 4.8, status: "active", joinedDate: "2025-07-20" },
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
    lat: 33.7215,
    lng: 73.0433,
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
    lat: 33.7070,
    lng: 73.0551,
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
    lat: 33.7294,
    lng: 73.0685,
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
    lat: 33.5965,
    lng: 73.0479,
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
    lat: 33.6937,
    lng: 73.0300,
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
    lat: 33.7380,
    lng: 73.0844,
  },
];
