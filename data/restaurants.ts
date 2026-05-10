// ── Image imports ──────────────────────────────────────────────
const resto1 = require('../assets/images/restaurants/resto1.png');
const resto2 = require('../assets/images/restaurants/resto2.png');
const resto3 = require('../assets/images/restaurants/resto3.png');
const resto4 = require('../assets/images/restaurants/resto4.png');
const resto5 = require('../assets/images/restaurants/resto5.png');

const burgerImg = require('../assets/images/food/burger.png');
const pizzaImg = require('../assets/images/food/pizza.png');
const saladImg = require('../assets/images/food/salad.png');
const chickenImg = require('../assets/images/food/chicken.png');
const cakeImg = require('../assets/images/food/cake.png');
const pastaImg = require('../assets/images/food/pasta.png');

// ── Types ──────────────────────────────────────────────────────
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  distance: string;
  deliveryTime: string;
  image: any;
}

export interface FoodCategory {
  id: string;
  name: string;
  icon: string; // MaterialCommunityIcons name
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: any;
  restaurantId: string;
  categoryId: string;
}

// ── Data ───────────────────────────────────────────────────────
export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The African Grill',
    cuisine: 'African · Grill',
    rating: 4.8,
    distance: '0.5 km',
    deliveryTime: '15-25 min',
    image: resto1,
  },
  {
    id: '2',
    name: 'Mamma Mia Pizzeria',
    cuisine: 'Italian · Pizza',
    rating: 4.5,
    distance: '1.2 km',
    deliveryTime: '20-30 min',
    image: resto2,
  },
  {
    id: '3',
    name: 'Kigali Bites',
    cuisine: 'Local · Fast Food',
    rating: 4.7,
    distance: '0.8 km',
    deliveryTime: '10-20 min',
    image: resto3,
  },
  {
    id: '4',
    name: 'Pasta Palace',
    cuisine: 'Italian · Pasta',
    rating: 4.3,
    distance: '2.0 km',
    deliveryTime: '25-35 min',
    image: resto4,
  },
  {
    id: '5',
    name: 'Green Bowl',
    cuisine: 'Healthy · Salads',
    rating: 4.6,
    distance: '1.5 km',
    deliveryTime: '15-20 min',
    image: resto5,
  },
];

export const foodCategories: FoodCategory[] = [
  { id: 'all', name: 'All', icon: 'food' },
  { id: 'main', name: 'Main Dish', icon: 'food-variant' },
  { id: 'dessert', name: 'Dessert', icon: 'cupcake' },
  { id: 'drinks', name: 'Drinks', icon: 'cup' },
  { id: 'salad', name: 'Salads', icon: 'leaf' },
];

export const menuItems: MenuItem[] = [
  {
    id: 'm1',
    name: 'Classic Burger',
    description: 'Juicy beef patty with fresh lettuce, tomato & cheese',
    price: 4500,
    image: burgerImg,
    restaurantId: '1',
    categoryId: 'main',
  },
  {
    id: 'm2',
    name: 'Grilled Chicken',
    description: 'Herb-marinated chicken with roasted vegetables',
    price: 5500,
    image: chickenImg,
    restaurantId: '1',
    categoryId: 'main',
  },
  {
    id: 'm3',
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, basil & tomato sauce',
    price: 6000,
    image: pizzaImg,
    restaurantId: '2',
    categoryId: 'main',
  },
  {
    id: 'm4',
    name: 'Pasta Bolognese',
    description: 'Spaghetti with rich meat sauce & parmesan',
    price: 5000,
    image: pastaImg,
    restaurantId: '2',
    categoryId: 'main',
  },
  {
    id: 'm5',
    name: 'Fresh Garden Salad',
    description: 'Avocado, cherry tomatoes, greens & light dressing',
    price: 3500,
    image: saladImg,
    restaurantId: '1',
    categoryId: 'salad',
  },
  {
    id: 'm6',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center',
    price: 3000,
    image: cakeImg,
    restaurantId: '1',
    categoryId: 'dessert',
  },
  {
    id: 'm7',
    name: 'Caesar Salad',
    description: 'Romaine lettuce, croutons, parmesan & caesar dressing',
    price: 4000,
    image: saladImg,
    restaurantId: '3',
    categoryId: 'salad',
  },
  {
    id: 'm8',
    name: 'BBQ Chicken Wings',
    description: 'Crispy wings tossed in smoky BBQ sauce',
    price: 4800,
    image: chickenImg,
    restaurantId: '3',
    categoryId: 'main',
  },
  {
    id: 'm9',
    name: 'Tiramisu',
    description: 'Classic Italian coffee-flavored dessert',
    price: 3500,
    image: cakeImg,
    restaurantId: '2',
    categoryId: 'dessert',
  },
  {
    id: 'm10',
    name: 'Veggie Burger',
    description: 'Plant-based patty with avocado & special sauce',
    price: 4200,
    image: burgerImg,
    restaurantId: '5',
    categoryId: 'main',
  },
];
