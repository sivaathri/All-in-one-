import { useState, useMemo, useEffect, useRef } from 'react';
import { 
  MapPin, Search, ChevronDown, SlidersHorizontal, Star, Heart, 
  X, Clock, Utensils, ThumbsUp, CheckCircle, Calendar, Users, HeartHandshake, Compass, Plus, Minus,
  Share2, Phone, Play, ChevronLeft, ChevronRight, Check
} from 'lucide-react';
import foodBannerImg from '../assets/food_spots_banner.png';
import mapImg from '../assets/puducherry_map.png';

// Expanded Restaurant Database (35 Detailed Food Spots)
const RESTAURANT_DATA = [
  {
    id: 1,
    title: 'Baker Street Cafe',
    location: 'White Town, Puducherry',
    distance: '0.5 km',
    rating: 4.6,
    reviews: '1.2k',
    price: 300,
    pricePeriod: 'for two',
    cuisine: 'Cafe, Continental, Italian',
    badge: '20% OFF',
    pills: ['Pure Veg', 'Free Delivery'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
    description: 'An iconic French bakery and gourmet cafe in Pondicherry. Renowned for its buttery croissants, quiches, eclairs, cheese, and fresh baguettes.',
    hours: '7:00 AM - 9:30 PM',
    features: ['AC Dining', 'Kid Friendly', 'Takeaway available', 'All Day Breakfast'],
    mapX: '55%',
    mapY: '35%',
    menu: [
      { name: 'Butter Croissant', price: 95, category: 'Starters', veg: true, desc: 'Flaky and rich buttery pastry baked fresh daily.' },
      { name: 'Chocolate Eclair', price: 120, category: 'Desserts', veg: true, desc: 'Choux pastry filled with chocolate custard, glazed with ganache.' }
    ],
    reviewsList: [
      { user: 'Pierre D.', rating: 4.5, date: 'May 20, 2026', comment: 'Authentic croissants! Excellent butter laminate. Worth a visit.' }
    ]
  },
  {
    id: 2,
    title: 'Coromandel Cafe',
    location: 'Beach Road, Puducherry',
    distance: '1.2 km',
    rating: 4.4,
    reviews: '950',
    price: 400,
    pricePeriod: 'for two',
    cuisine: 'Seafood, Asian, Indian',
    badge: '10% OFF',
    pills: ['Popular', 'Free Delivery'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    description: 'A charming French-colonial style café serving European classics, seafood curries, and house-made desserts in a whimsical pink villa.',
    hours: '8:30 AM - 10:30 PM',
    features: ['Outdoor Seating', 'AC Dining', 'Free Wifi', 'Valet Parking'],
    mapX: '72%',
    mapY: '23%',
    menu: [
      { name: 'Pink Benedict', price: 380, category: 'Starters', veg: false, desc: 'Poached eggs on house brioche with beetroot hollandaise.' }
    ],
    reviewsList: [
      { user: 'Maya S.', rating: 5, date: 'May 12, 2026', comment: 'Absolutely magical ambiance! The coastal food was amazing.' }
    ]
  },
  {
    id: 3,
    title: 'Le Dupleix Restaurant',
    location: 'Dumas Street, Puducherry',
    distance: '1.5 km',
    rating: 4.7,
    reviews: '830',
    price: 1500,
    pricePeriod: 'for two',
    cuisine: 'French, Continental, European',
    badge: '',
    pills: ['Fine Dining', 'Free Delivery'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    description: 'Authentic French fine dining inside a restored historical heritage villa. Known for its curated wine selection and colonial recipes.',
    hours: '12:00 PM - 11:00 PM',
    features: ['AC Dining', 'Wine Bar', 'Valet Parking'],
    mapX: '48%',
    mapY: '45%',
    menu: [
      { name: 'Coq au Vin', price: 680, category: 'Main Course', veg: false, desc: 'Chicken braised slowly in red Burgundy wine, lardons, and mushrooms.' }
    ],
    reviewsList: [
      { user: 'Jean-Luc G.', rating: 5, date: 'June 01, 2026', comment: 'Felt like being back in France. Great heritage vibe.' }
    ]
  },
  {
    id: 4,
    title: 'Villa Shanti',
    location: 'Auroville Road, Puducherry',
    distance: '2.3 km',
    rating: 4.5,
    reviews: '740',
    price: 350,
    pricePeriod: 'for two',
    cuisine: 'Multi Cuisine',
    badge: '',
    pills: ['Pure Veg'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    description: 'Villa Shanti offers a peaceful courtyard dining setting and an eclectic mix of Indian and Continental cuisine made with fresh ingredients.',
    hours: '12:00 PM - 11:00 PM',
    features: ['Courtyard Seating', 'AC Dining', 'Cocktail Bar'],
    mapX: '81%',
    mapY: '60%',
    menu: [
      { name: 'Tandoori Stuffed Mushrooms', price: 340, category: 'Starters', veg: true, desc: 'Stuffed with cheese and spices, cooked in a clay oven.' }
    ],
    reviewsList: [
      { user: 'Arun V.', rating: 5, date: 'June 03, 2026', comment: 'Courtyard is beautiful. Must-visit in White Town.' }
    ]
  },
  {
    id: 5,
    title: 'Cafe Xtasi',
    location: 'Bussy Street, Puducherry',
    distance: '1.8 km',
    rating: 4.3,
    reviews: '520',
    price: 250,
    pricePeriod: 'for two',
    cuisine: 'Cafe, Fast Food, Beverages',
    badge: '15% OFF',
    pills: ['Budget Friendly'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    description: 'A lively hangout spot offering wood-fired pizzas, mocktails, burgers, and delicious finger foods at budget prices.',
    hours: '11:00 AM - 11:00 PM',
    features: ['AC Dining', 'Free Wifi', 'Music'],
    mapX: '32%',
    mapY: '73%',
    menu: [
      { name: 'Margherita Woodfire Pizza', price: 290, category: 'Main Course', veg: true, desc: 'Traditional thin-crust cheese pizza cooked in woodfire oven.' }
    ],
    reviewsList: [
      { user: 'Rohit K.', rating: 4, date: 'May 10, 2026', comment: 'Crispy pizzas and super value for money.' }
    ]
  },
  {
    id: 6,
    title: 'Just Parathas',
    location: 'MG Road, Puducherry',
    distance: '2.0 km',
    rating: 4.2,
    reviews: '310',
    price: 200,
    pricePeriod: 'for two',
    cuisine: 'North Indian, Chinese',
    badge: '',
    pills: ['Quick Bites'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    description: 'Famous for its enormous variety of stuffed parathas served with butter, pickle, and curd. Quick and filling vegetarian food.',
    hours: '10:00 AM - 10:00 PM',
    features: ['Quick Service', 'Vegetarian Friendly'],
    mapX: '28%',
    mapY: '28%',
    menu: [
      { name: 'Aloo Cheese Paratha', price: 90, category: 'Main Course', veg: true, desc: 'Stuffed wheat bread with spiced mashed potatoes and melted cheese.' }
    ],
    reviewsList: [
      { user: 'Amit S.', rating: 4, date: 'Apr 18, 2026', comment: 'Yummy parathas! Extremely filling.' }
    ]
  },
  {
    id: 7,
    title: 'Pizza Republic',
    location: 'Mission Street, Puducherry',
    distance: '1.1 km',
    rating: 4.4,
    reviews: '610',
    price: 500,
    pricePeriod: 'for two',
    cuisine: 'Pizza, Italian, Fast Food',
    badge: '',
    pills: ['Free Delivery'],
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    description: 'Customize your own pizza base, sauce, and toppings. Fast, fresh, and baked to perfection in record time.',
    hours: '11:00 AM - 11:30 PM',
    features: ['AC Dining', 'Create Your Own Pizza'],
    mapX: '65%',
    mapY: '49%',
    menu: [
      { name: 'Custom Paneer Pizza', price: 350, category: 'Main Course', veg: true, desc: 'Sourdough base, pesto sauce, organic cottage cheese and bell peppers.' }
    ],
    reviewsList: [
      { user: 'Sam P.', rating: 5, date: 'June 01, 2026', comment: 'Customizing toppings is very fun! Pizzas are hot and tasty.' }
    ]
  },
  {
    id: 8,
    title: 'Bay of Buddha',
    location: 'Rock Beach, Puducherry',
    distance: '1.0 km',
    rating: 4.6,
    reviews: '480',
    price: 600,
    pricePeriod: 'for two',
    cuisine: 'Asian, Tibetan, Thai',
    badge: '',
    pills: ['Popular'],
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    description: 'Rooftop pan-Asian restaurant offering dramatic sea views and authentic dim sums, sushis, and Thai curries.',
    hours: '6:30 PM - 11:00 PM',
    features: ['Rooftop Seating', 'Sea View', 'Bar'],
    mapX: '88%',
    mapY: '42%',
    menu: [
      { name: 'Thai Basil Chicken', price: 410, category: 'Main Course', veg: false, desc: 'Stir-fried minced chicken with holy basil, garlic, and chillies.' }
    ],
    reviewsList: [
      { user: 'Aditya R.', rating: 4.8, date: 'June 03, 2026', comment: 'Breathtaking beach views and top dim sums.' }
    ]
  },
  {
    id: 9,
    title: 'Dosa Corner',
    location: 'Nehru Street, Puducherry',
    distance: '2.4 km',
    rating: 4.1,
    reviews: '230',
    price: 150,
    pricePeriod: 'for two',
    cuisine: 'South Indian, Fast Food',
    badge: '',
    pills: ['Budget Friendly'],
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
    description: 'Crispiest paper roast dosas, idlis, and hot sambar. The perfect spot for a quick, traditional, and authentic South Indian breakfast.',
    hours: '7:00 AM - 10:30 PM',
    features: ['Quick Service', 'Vegetarian'],
    mapX: '20%',
    mapY: '60%',
    menu: [
      { name: 'Masala Dosa', price: 70, category: 'Main Course', veg: true, desc: 'Crispy crepe with spiced potato filling, served with coconut chutney.' }
    ],
    reviewsList: [
      { user: 'Meena V.', rating: 4.5, date: 'May 12, 2026', comment: 'Very economical and authentic taste. Sambar is amazing!' }
    ]
  },
  {
    id: 10,
    title: 'Burger Barn',
    location: 'Anna Salai, Puducherry',
    distance: '1.7 km',
    rating: 4.3,
    reviews: '410',
    price: 250,
    pricePeriod: 'for two',
    cuisine: 'Burgers, American, Fast Food',
    badge: '',
    pills: ['Quick Bites'],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    description: 'Juicy craft burgers, loaded fries, and thick milkshakes. A vintage American-themed fast food diner perfect for comfort food.',
    hours: '11:00 AM - 11:00 PM',
    features: ['AC Dining', 'Loaded Fries'],
    mapX: '38%',
    mapY: '18%',
    menu: [
      { name: 'Crispy Chicken Burger', price: 140, category: 'Main Course', veg: false, desc: 'Buttermilk fried chicken fillet, lettuce, mayo, toasted brioche.' }
    ],
    reviewsList: [
      { user: 'Sanjay S.', rating: 4, date: 'May 28, 2026', comment: 'Juicy burgers. Highly recommend the loaded cheese fries!' }
    ]
  },
  {
    id: 11,
    title: 'The French Window',
    location: 'Romain Rolland Street, Puducherry',
    distance: '1.3 km',
    rating: 4.5,
    reviews: '290',
    price: 350,
    pricePeriod: 'for two',
    cuisine: 'Desserts, Cafe, Continental',
    badge: '',
    pills: ['Cafe'],
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    description: 'A cozy artisan cafe specialized in gourmet pastries, sourdough sandwiches, waffles, and warm herbal teas.',
    hours: '8:00 AM - 9:00 PM',
    features: ['Cozy Seating', 'Free Wifi', 'Desserts Display'],
    mapX: '51%',
    mapY: '57%',
    menu: [
      { name: 'Sourdough Avocado Toast', price: 240, category: 'Starters', veg: true, desc: 'Crushed avocado, sea salt, pepper, olive oil on house sourdough.' }
    ],
    reviewsList: [
      { user: 'Carla T.', rating: 4.5, date: 'June 01, 2026', comment: 'Beautiful waffle selection and great coffee!' }
    ]
  },
  {
    id: 12,
    title: 'Sea Salt Restaurant',
    location: 'Serenity Beach Road, Puducherry',
    distance: '3.5 km',
    rating: 4.6,
    reviews: '340',
    price: 700,
    pricePeriod: 'for two',
    cuisine: 'Seafood, Coastal, Indian',
    badge: '',
    pills: ['Seafood'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    description: 'Enjoy delicious coastal recipes, fresh fish fry, and local style curries in an open-air beachfront setup.',
    hours: '11:00 AM - 11:00 PM',
    features: ['Beachfront', 'Outdoor Seating', 'Fresh Catch Display'],
    mapX: '84%',
    mapY: '80%',
    menu: [
      { name: 'Masala Fried Pomfret', price: 390, category: 'Main Course', veg: false, desc: 'Whole fish marinated in local coastal spices and shallow fried.' }
    ],
    reviewsList: [
      { user: 'Dinesh R.', rating: 5, date: 'May 30, 2026', comment: 'Excellent fish fry. Feet in the sand dining experience!' }
    ]
  },
  // Add 23 More Food Spots to reach 35 total spots (> 30 spots)
  {
    id: 13,
    title: 'Hotel Shadab',
    location: 'Heritage Town, Puducherry',
    distance: '1.9 km',
    rating: 4.4,
    reviews: '420',
    price: 400,
    pricePeriod: 'for two',
    cuisine: 'Indian',
    badge: '10% OFF',
    pills: ['Popular'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    description: 'Famous local restaurant specializing in authentic Mughlai dishes, mutton biryani, and traditional tandoori delights.',
    hours: '11:30 AM - 11:00 PM',
    features: ['AC Dining', 'Mughlai Special'],
    mapX: '25%',
    mapY: '45%',
    menu: [{ name: 'Mutton Biryani', price: 240, category: 'Main Course', veg: false, desc: 'Aromatic basmati rice cooked with tender mutton and select spices.' }],
    reviewsList: [{ user: 'Kabir S.', rating: 5, date: 'May 10, 2026', comment: 'Outstanding biryani! Best in Pondy.' }]
  },
  {
    id: 14,
    title: 'Tandoori Nights',
    location: 'White Town, Puducherry',
    distance: '0.8 km',
    rating: 4.3,
    reviews: '290',
    price: 600,
    pricePeriod: 'for two',
    cuisine: 'Indian',
    badge: '',
    pills: ['Popular'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    description: 'Cozy rooftop garden setup serving sizzling tandoori items, rich paneer butter masalas, and freshly baked butter naans.',
    hours: '6:00 PM - 11:00 PM',
    features: ['Outdoor Seating', 'Live Grill'],
    mapX: '45%',
    mapY: '52%',
    menu: [{ name: 'Paneer Tikka Sizzler', price: 280, category: 'Starters', veg: true, desc: 'Spiced cottage cheese cubes grilled in clay oven with bell peppers.' }],
    reviewsList: [{ user: 'Rakesh P.', rating: 4, date: 'May 14, 2026', comment: 'Tandoori chicken sizzler is a must-try here.' }]
  },
  {
    id: 15,
    title: 'Surguru Spot',
    location: 'Heritage Town, Puducherry',
    distance: '2.1 km',
    rating: 4.5,
    reviews: '380',
    price: 250,
    pricePeriod: 'for two',
    cuisine: 'Indian',
    badge: '',
    pills: ['Pure Veg'],
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
    description: 'Quick service sibling of Surguru, offering delicious podi dosas, filter coffee, and traditional South Indian thalis.',
    hours: '7:00 AM - 10:00 PM',
    features: ['Vegetarian', 'Quick Service'],
    mapX: '23%',
    mapY: '62%',
    menu: [{ name: 'Ghee Podi Idli', price: 95, category: 'Starters', veg: true, desc: 'Steamed rice cakes tossed in spicy lentil powder and hot ghee.' }],
    reviewsList: [{ user: 'Anand R.', rating: 4.5, date: 'June 02, 2026', comment: 'Filter coffee is robust and excellent.' }]
  },
  {
    id: 16,
    title: 'Cafe des Arts',
    location: 'White Town, Puducherry',
    distance: '0.6 km',
    rating: 4.5,
    reviews: '920',
    price: 800,
    pricePeriod: 'for two',
    cuisine: 'Cafe, French, Desserts',
    badge: '',
    pills: ['Popular'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
    description: 'Charming vintage cafe featuring yellow-colonial walls, a library corner, and delicious French toasted baguettes and pastries.',
    hours: '8:30 AM - 7:00 PM',
    features: ['Vintage Garden', 'Free Wifi', 'Book Library'],
    mapX: '52%',
    mapY: '38%',
    menu: [{ name: 'Nutella Crepe', price: 210, category: 'Desserts', veg: true, desc: 'Thin French wheat crepe loaded with rich hazelnut spread.' }],
    reviewsList: [{ user: 'Alice M.', rating: 5, date: 'May 20, 2026', comment: 'Stunning yellow house. Coffee and croissants are perfect.' }]
  },
  {
    id: 17,
    title: 'Bread & Chocolate',
    location: 'Auroville, India',
    distance: '5.2 km',
    rating: 4.7,
    reviews: '1.4k',
    price: 900,
    pricePeriod: 'for two',
    cuisine: 'Cafe, Bakeries',
    badge: 'Best Seller',
    pills: ['Organic'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    description: 'Auroville organic bakery cafe serving healthy sourdough bowls, vegan pastries, artisan chocolates, and pour-over coffees.',
    hours: '8:00 AM - 5:00 PM',
    features: ['Organic Sourcing', 'Vegan Friendly', 'Garden Dining'],
    mapX: '78%',
    mapY: '55%',
    menu: [{ name: 'Avocado Toast Sourdough', price: 290, category: 'Starters', veg: true, desc: 'Fresh local avocado mash on wood-fired sourdough toast.' }],
    reviewsList: [{ user: 'Gautam D.', rating: 5, date: 'June 01, 2026', comment: 'Sourdough is outstanding. Absolute favorite in Auroville.' }]
  },
  {
    id: 18,
    title: 'The Spot',
    location: 'White Town, Puducherry',
    distance: '0.9 km',
    rating: 4.3,
    reviews: '210',
    price: 1100,
    pricePeriod: 'for two',
    cuisine: 'Multi Cuisine',
    badge: '15% OFF',
    pills: ['Free Delivery'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    description: 'Casual multi-cuisine restaurant serving Indian, Chinese, and European fast food classics with nice cocktail choices.',
    hours: '12:00 PM - 11:00 PM',
    features: ['AC Dining', 'Alcohol Served'],
    mapX: '62%',
    mapY: '32%',
    menu: [{ name: 'Schezwan Chilli Fish', price: 380, category: 'Main Course', veg: false, desc: 'Wok tossed fish fillets in fiery Schezwan chilli sauce.' }],
    reviewsList: [{ user: 'Sanya H.', rating: 4, date: 'Apr 25, 2026', comment: 'Great ambience and helpful staff. Chilli fish was spicy!' }]
  },
  {
    id: 19,
    title: 'Well Cafe',
    location: 'Auroville, India',
    distance: '6.0 km',
    rating: 4.4,
    reviews: '340',
    price: 700,
    pricePeriod: 'for two',
    cuisine: 'Cafe, Mediterranean',
    badge: '',
    pills: ['Vegetarian Friendly'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    description: 'Tranquil forest cafe in Auroville specializing in organic Mediterranean falafel platters, hummus, and herbal teas.',
    hours: '9:00 AM - 6:00 PM',
    features: ['Forest Seating', 'Organic Ingredients'],
    mapX: '82%',
    mapY: '63%',
    menu: [{ name: 'Classic Falafel Hummus Platter', price: 280, category: 'Main Course', veg: true, desc: 'Crispy falafels, fresh hummus, pita bread, and pickled veggies.' }],
    reviewsList: [{ user: 'Dmitri V.', rating: 4.5, date: 'May 30, 2026', comment: 'Very peaceful setting in the woods. Hummus is authentic.' }]
  },
  {
    id: 20,
    title: 'Naturellement Garden Cafe',
    location: 'Auroville, India',
    distance: '6.3 km',
    rating: 4.6,
    reviews: '180',
    price: 600,
    pricePeriod: 'for two',
    cuisine: 'Cafe, Italian',
    badge: 'Must Try',
    pills: ['Pure Veg'],
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    description: 'Charming garden eatery run by a local community. Renowned for its homemade pasta, organic salads, jams, and syrups.',
    hours: '9:00 AM - 5:30 PM',
    features: ['Garden Dining', 'Organic Jams', 'Pure Veg'],
    mapX: '79%',
    mapY: '67%',
    menu: [{ name: 'Organic Basil Pesto Pasta', price: 290, category: 'Main Course', veg: true, desc: 'Fresh homemade pasta tossed in organic basil, walnuts, and cheese.' }],
    reviewsList: [{ user: 'Elsa B.', rating: 5, date: 'May 18, 2026', comment: 'The garden setting is gorgeous. Pasta tasted so fresh.' }]
  },
  {
    id: 21,
    title: 'Gelato Montecatini',
    location: 'White Town, Puducherry',
    distance: '0.4 km',
    rating: 4.8,
    reviews: '530',
    price: 300,
    pricePeriod: 'for two',
    cuisine: 'Desserts',
    badge: 'Top Rated',
    pills: ['Kid Friendly'],
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80',
    description: 'Premium Italian gelato shop featuring rich, creamy, and traditional gelato cups made with natural fruit pulps.',
    hours: '11:00 AM - 11:00 PM',
    features: ['AC Dining', 'Takeaway'],
    mapX: '53%',
    mapY: '59%',
    menu: [{ name: 'Belgian Chocolate Gelato', price: 110, category: 'Desserts', veg: true, desc: 'Rich and smooth Belgian chocolate gelato double scoop.' }],
    reviewsList: [{ user: 'Vikram J.', rating: 5, date: 'June 01, 2026', comment: 'Creamiest dark chocolate scoop in Pondicherry.' }]
  },
  {
    id: 22,
    title: 'Zuka Choco-la',
    location: 'Heritage Town, Puducherry',
    distance: '1.3 km',
    rating: 4.7,
    reviews: '710',
    price: 400,
    pricePeriod: 'for two',
    cuisine: 'Desserts',
    badge: '',
    pills: ['Popular'],
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    description: 'A paradise for chocolate lovers. Famous for its delicious hot chocolate spoon, handmade truffles, and chocolate displays.',
    hours: '9:00 AM - 10:00 PM',
    features: ['AC Dining', 'Chocolate Art Display'],
    mapX: '31%',
    mapY: '53%',
    menu: [{ name: 'Zuka hot chocolate spoon', price: 160, category: 'Desserts', veg: true, desc: 'Thick hot milk served with a chocolate spoon to melt and sip.' }],
    reviewsList: [{ user: 'Sarah L.', rating: 4.8, date: 'May 22, 2026', comment: 'The hot chocolate is literally liquid gold!' }]
  },
  {
    id: 23,
    title: 'Appachi Chettinad',
    location: 'Heritage Town, Puducherry',
    distance: '2.5 km',
    rating: 4.3,
    reviews: '420',
    price: 800,
    pricePeriod: 'for two',
    cuisine: 'Indian, Seafood',
    badge: '10% OFF',
    pills: ['Popular'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    description: 'Famous local restaurant located in an old traditional Tamil house serving hot and spicy Chettinad chicken and seafood.',
    hours: '12:00 PM - 10:30 PM',
    features: ['Traditional Setup', 'AC Dining'],
    mapX: '33%',
    mapY: '67%',
    menu: [{ name: 'Chettinad Chicken Masala', price: 340, category: 'Main Course', veg: false, desc: 'Spicy chicken cooked in dry roasted coconut and black pepper gravy.' }],
    reviewsList: [{ user: 'Manish P.', rating: 4, date: 'June 01, 2026', comment: 'Very spicy, authentic Chettinad flavors. Love it.' }]
  },
  {
    id: 24,
    title: 'Skygarden Rooftop',
    location: 'Heritage Town, Puducherry',
    distance: '2.2 km',
    rating: 4.2,
    reviews: '190',
    price: 1200,
    pricePeriod: 'for two',
    cuisine: 'Multi Cuisine',
    badge: '',
    pills: ['Free Delivery'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    description: 'Ambient rooftop bar and restaurant with views over Pondicherry, serving North Indian curries and Chinese snacks.',
    hours: '5:00 PM - 11:30 PM',
    features: ['Rooftop Seating', 'Live DJ', 'Cocktail Bar'],
    mapX: '27%',
    mapY: '71%',
    menu: [{ name: 'Tandoori Malai Broccoli', price: 290, category: 'Starters', veg: true, desc: 'Fresh broccoli florets marinated in cream and spices, baked in tandoor.' }],
    reviewsList: [{ user: 'Sneha G.', rating: 4, date: 'May 17, 2026', comment: 'Great music and very cooling breeze at night.' }]
  },
  {
    id: 25,
    title: "L'Aqua Bar",
    location: 'Rock Beach, Puducherry',
    distance: '0.9 km',
    rating: 4.5,
    reviews: '310',
    price: 2000,
    pricePeriod: 'for two',
    cuisine: 'Seafood, Barbecue',
    badge: '',
    pills: ['Sea View'],
    image: 'https://images.unsplash.com/photo-1574936145840-28808d77a0b6?auto=format&fit=crop&w=600&q=80',
    description: 'Upscale beachfront rooftop lounge specializing in grilled lobster, prawns, and premium wine cocktails.',
    hours: '5:00 PM - 11:00 PM',
    features: ['Sea View', 'Rooftop Bar', 'Valet Parking'],
    mapX: '85%',
    mapY: '46%',
    menu: [{ name: 'Grilled Garlic Lobster', price: 980, category: 'Main Course', veg: false, desc: 'Fresh beach lobster grilled with garlic butter and herbs.' }],
    reviewsList: [{ user: 'John D.', rating: 5, date: 'June 03, 2026', comment: 'Lobster was cooked beautifully. Stellar coastal sunset.' }]
  },
  {
    id: 26,
    title: 'Seagulls Restaurant',
    location: 'Beach Road, Puducherry',
    distance: '1.4 km',
    rating: 4.1,
    reviews: '280',
    price: 1000,
    pricePeriod: 'for two',
    cuisine: 'Seafood, Indian',
    badge: '',
    pills: ['Popular'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    description: 'Government-run seaside restaurant and bar, offering economical beer and fresh seafood curries with beach wind.',
    hours: '11:00 AM - 10:30 PM',
    features: ['Sea View', 'Outdoor Deck', 'Alcohol Served'],
    mapX: '74%',
    mapY: '27%',
    menu: [{ name: 'Pondy Masala Prawn Fry', price: 290, category: 'Starters', veg: false, desc: 'Spicy marinated prawns deep fried with curry leaves.' }],
    reviewsList: [{ user: 'Selvan T.', rating: 4, date: 'May 28, 2026', comment: 'Very cheap beer and nice views of the harbor.' }]
  },
  {
    id: 27,
    title: 'Carte Blanche',
    location: 'White Town, Puducherry',
    distance: '0.7 km',
    rating: 4.6,
    reviews: '450',
    price: 2200,
    pricePeriod: 'for two',
    cuisine: 'French, Fine Dining',
    badge: 'Top Rated',
    pills: ['Fine Dining'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    description: 'Creole and French gastronomy restaurant inside the courtyard of the boutique hotel L’Orient.',
    hours: '12:00 PM - 10:30 PM',
    features: ['Heritage Courtyard', 'Boutique Setup', 'AC Dining'],
    mapX: '49%',
    mapY: '48%',
    menu: [{ name: 'Creole Fish Curry', price: 540, category: 'Main Course', veg: false, desc: 'Pondy-French fusion fish curry cooked in spiced coconut milk.' }],
    reviewsList: [{ user: 'Yasmine L.', rating: 5, date: 'May 11, 2026', comment: 'The fusion Creole curry is fantastic. Courtyard is quiet.' }]
  },
  {
    id: 28,
    title: 'Escape Rooftop Cafe',
    location: 'MG Road, Puducherry',
    distance: '2.2 km',
    rating: 4.3,
    reviews: '170',
    price: 800,
    pricePeriod: 'for two',
    cuisine: 'Cafe, Fast Food',
    badge: '',
    pills: ['Popular'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    description: 'Rooftop cafe for students and young travelers, serving hot pastas, shakes, and French fries under nice lights.',
    hours: '3:00 PM - 11:00 PM',
    features: ['Rooftop Deck', 'Music', 'Board Games'],
    mapX: '29%',
    mapY: '31%',
    menu: [{ name: 'Alfredo Pasta Chicken', price: 260, category: 'Main Course', veg: false, desc: 'Creamy white cheese sauce pasta cooked with roasted chicken.' }],
    reviewsList: [{ user: 'Aman N.', rating: 4, date: 'May 05, 2026', comment: 'Very chill vibe. Friendly staff and good fries.' }]
  },
  {
    id: 29,
    title: "Domino's Pizza",
    location: 'Anna Salai, Puducherry',
    distance: '1.6 km',
    rating: 4.0,
    reviews: '310',
    price: 500,
    pricePeriod: 'for two',
    cuisine: 'Pizza, Fast Food',
    badge: '',
    pills: ['Free Delivery'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    description: 'Fast food delivery outlet offering classic thin crust pizzas, garlic bread, and chocolate lava cakes.',
    hours: '11:00 AM - 11:00 PM',
    features: ['AC Dining', 'Quick Delivery'],
    mapX: '39%',
    mapY: '21%',
    menu: [{ name: 'Peppy Paneer Pizza', price: 280, category: 'Main Course', veg: true, desc: 'Mozzarella cheese, spiced cottage cheese, capsicum, red paprika.' }],
    reviewsList: [{ user: 'Hitesh K.', rating: 4, date: 'Apr 30, 2026', comment: 'Quick delivery and standard cheese burst taste.' }]
  },
  {
    id: 30,
    title: 'Burger King',
    location: 'Mission Street, Puducherry',
    distance: '1.2 km',
    rating: 4.1,
    reviews: '460',
    price: 400,
    pricePeriod: 'for two',
    cuisine: 'Burgers, Fast Food',
    badge: '20% OFF',
    pills: ['Quick Bites'],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    description: 'Classic global burger chain serving Whoppers, crispy chicken burgers, potato wraps, and cold beverages.',
    hours: '10:00 AM - 11:00 PM',
    features: ['AC Dining', 'Kid Friendly'],
    mapX: '66%',
    mapY: '52%',
    menu: [{ name: 'Veg Whopper', price: 160, category: 'Main Course', veg: true, desc: 'Large burger loaded with crispy veg patty, tomatoes, cheese, mayo.' }],
    reviewsList: [{ user: 'Lara B.', rating: 4, date: 'May 10, 2026', comment: 'Always clean, and kids love the Whopper meals.' }]
  },
  {
    id: 31,
    title: 'Starbucks Coffee',
    location: 'Rock Beach, Puducherry',
    distance: '0.8 km',
    rating: 4.4,
    reviews: '610',
    price: 700,
    pricePeriod: 'for two',
    cuisine: 'Cafe, Continental',
    badge: '',
    pills: ['Popular'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
    description: 'Global cafe chain serving hot and cold coffees, croissants, cheesecakes, and quick sandwiches.',
    hours: '8:00 AM - 11:00 PM',
    features: ['Sea View Closeby', 'AC Dining', 'Free Wifi'],
    mapX: '87%',
    mapY: '40%',
    menu: [{ name: 'Java Chip Frappuccino', price: 290, category: 'Beverages', veg: true, desc: 'Tall size ice-blended chocolate chip coffee topped with cream.' }],
    reviewsList: [{ user: 'Nitesh M.', rating: 4, date: 'June 02, 2026', comment: 'Awesome place to sit and work. Standard Starbucks taste.' }]
  },
  {
    id: 32,
    title: 'Auroville Bakery',
    location: 'Auroville, India',
    distance: '4.8 km',
    rating: 4.6,
    reviews: '1.1k',
    price: 400,
    pricePeriod: 'for two',
    cuisine: 'French, Bakeries',
    badge: 'Best Seller',
    pills: ['Popular'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    description: 'One of the oldest bakeries in Auroville. Serving wood-fired wheat breads, sweet rolls, cheese baguettes, and fresh fruit tarts.',
    hours: '7:00 AM - 5:30 PM',
    features: ['Garden Patio', 'Takeaway Only', 'Organic Flour'],
    mapX: '77%',
    mapY: '51%',
    menu: [{ name: 'Chocolate Worsh Roll', price: 75, category: 'Desserts', veg: true, desc: 'Sweet bread roll stuffed with organic chocolate bits.' }],
    reviewsList: [{ user: 'Chantal L.', rating: 5, date: 'May 27, 2026', comment: 'Croissants sell out by 9:00 AM! Authentic rustic texture.' }]
  },
  {
    id: 33,
    title: 'Farm Fresh Pizza',
    location: 'Auroville, India',
    distance: '5.6 km',
    rating: 4.5,
    reviews: '310',
    price: 800,
    pricePeriod: 'for two',
    cuisine: 'Pizza, Italian',
    badge: '',
    pills: ['Pure Veg'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    description: 'Cozy pizzeria serving organic vegetarian pizzas loaded with farm-fresh tomatoes, zucchini, basil, and locally made mozzarella.',
    hours: '12:00 PM - 9:30 PM',
    features: ['Garden Dining', 'Farm Sourced Veggies', 'Vegetarian'],
    mapX: '83%',
    mapY: '59%',
    menu: [{ name: 'Zucchini Bell Pepper Pizza', price: 340, category: 'Main Course', veg: true, desc: 'Fresh farm zucchini, capsicums, red sauce, local farm cheese.' }],
    reviewsList: [{ user: 'Arjun F.', rating: 5, date: 'June 01, 2026', comment: 'Very fresh veggies! Crust is crispy and thin.' }]
  },
  {
    id: 34,
    title: 'Pondy Pasta Bar',
    location: 'White Town, Puducherry',
    distance: '0.9 km',
    rating: 4.3,
    reviews: '210',
    price: 700,
    pricePeriod: 'for two',
    cuisine: 'Italian, Cafe',
    badge: '',
    pills: ['Free Delivery'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    description: 'Artisanal pasta cafe where you can choose pasta shapes and match them with creamy alfredo, marinara, or walnut pestos.',
    hours: '11:00 AM - 10:00 PM',
    features: ['AC Dining', 'Create Your Own Pasta'],
    mapX: '54%',
    mapY: '36%',
    menu: [{ name: 'Penne Arrabiata', price: 270, category: 'Main Course', veg: true, desc: 'Penne pasta tossed in spicy garlic tomato marinara sauce.' }],
    reviewsList: [{ user: 'Vijay D.', rating: 4, date: 'May 12, 2026', comment: 'Arrabiata has a nice garlic kick. Highly recommend.' }]
  },
  {
    id: 35,
    title: 'The Burger Joint',
    location: 'Beach Road, Puducherry',
    distance: '1.3 km',
    rating: 4.2,
    reviews: '190',
    price: 500,
    pricePeriod: 'for two',
    cuisine: 'Burgers, American',
    badge: '10% OFF',
    pills: ['Popular'],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    description: 'Lively beachfront diner serving tall beef and chicken burgers, curly fries, onion rings, and chocolate shakes.',
    hours: '11:30 AM - 10:30 PM',
    features: ['AC Dining', 'Curly Fries Specialty'],
    mapX: '70%',
    mapY: '25%',
    menu: [{ name: 'Spicy Barbecue Chicken Burger', price: 220, category: 'Main Course', veg: false, desc: 'Double patty, sweet smoky barbecue sauce, cheese, jalapenos.' }],
    reviewsList: [{ user: 'Karthik N.', rating: 4.2, date: 'June 01, 2026', comment: 'The barbecue burger is juicy, and the curly fries are amazing.' }]
  }
];

const CUISINES = ['All', 'Cafe', 'French', 'Indian', 'Seafood', 'Italian', 'Desserts', 'Pizza', 'Burgers'];

// Custom Dropdown Component for a Premium styled Select box
function CustomDropdown({ label, value, options, onChange, widthClass = "w-[150px]" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div 
      ref={dropdownRef} 
      className={`relative flex flex-col justify-center items-start px-4 lg:px-5 py-1.5 w-full sm:w-[48%] lg:${widthClass} shrink-0 text-left select-none`}
    >
      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">{label}</span>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-between w-full mt-1.5 cursor-pointer h-5"
      >
        <span className="text-[13.5px] font-extrabold text-slate-800 truncate pr-4">
          {value}
        </span>
        <ChevronDown className={`h-4 w-4 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 transition-transform duration-200 pointer-events-none ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute left-0 top-[110%] mt-1 w-full lg:min-w-[185px] bg-white border border-slate-100 rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 origin-top text-left">
          <div className="max-h-[240px] overflow-y-auto no-scrollbar">
            {options.map((option) => {
              const isSelected = option === value;
              return (
                <div
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2 text-[12.5px] font-semibold cursor-pointer transition-colors flex items-center justify-between ${
                    isSelected 
                      ? 'bg-slate-50 text-[#0F766E] font-bold' 
                      : 'text-slate-600 hover:bg-slate-50/70 hover:text-slate-900'
                  }`}
                >
                  <span className="truncate">{option}</span>
                  {isSelected && <Check className="h-3.5 w-3.5 text-[#0F766E] shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FoodSpots() {
  // Filter States
  const [selectedLocation, setSelectedLocation] = useState('Pondicherry, India');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');
  const [selectedRating, setSelectedRating] = useState('All Ratings');
  
  // Custom states for 3-panel split search view
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  // Selected Map Restaurant (for floating card and right details panel)
  const [selectedRestaurant, setSelectedRestaurant] = useState(RESTAURANT_DATA[0]);
  // Detail Modal State
  const [detailModalRestaurant, setDetailModalRestaurant] = useState(null);
  const [detailTab, setDetailTab] = useState('Overview');
  
  // Table Booking States
  const [bookingDate, setBookingDate] = useState('2025-06-21');
  const [bookingTime, setBookingTime] = useState('7:30 PM');
  const [bookingGuests, setBookingGuests] = useState('2 Guests');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Wishlist State
  const [wishlist, setWishlist] = useState([]);
  
  // Map zoom level simulation
  const [zoomLevel, setZoomLevel] = useState(13);

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(wId => wId !== id) : [...prev, id]
    );
  };

  // Filter and Sort Calculations
  const filteredRestaurants = useMemo(() => {
    let list = [...RESTAURANT_DATA];

    // Filter by location
    if (selectedLocation) {
      const locKey = selectedLocation.toLowerCase().split(',')[0].trim();
      list = list.filter(r => r.location.toLowerCase().includes(locKey) || r.location.toLowerCase().includes('puducherry'));
    }

    // Filter by search query (title, description, cuisine)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      list = list.filter(r => 
        r.title.toLowerCase().includes(query) ||
        r.cuisine.toLowerCase().includes(query) ||
        r.location.toLowerCase().includes(query)
      );
    }

    // Filter by cuisine dropdown
    if (selectedCuisine !== 'All') {
      list = list.filter(r => r.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase()));
    }

    // Filter by rating dropdown
    if (selectedRating !== 'All Ratings') {
      const minRating = parseFloat(selectedRating.split('+')[0]);
      list = list.filter(r => r.rating >= minRating);
    }

    // Sorting
    if (sortBy === 'Price: Low to High') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Top Rated') {
      list.sort((a, b) => b.rating - a.rating);
    } // 'Popular' maintains default ranking order

    return list;
  }, [selectedLocation, searchQuery, selectedCuisine, selectedRating, sortBy]);

  // Leaflet Map Refs & States
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function initLeaflet() {
      // Load Leaflet CSS dynamically if not present
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      // Load Leaflet JS dynamically if not present
      if (!window.L) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.async = true;
        document.head.appendChild(script);
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      if (!isMounted) return;
      setLeafletLoaded(true);

      // Initialize map once after leaflet is loaded and the container div is mounted
      setTimeout(() => {
        if (!isMounted) return;
        if (mapContainerRef.current && !mapRef.current && window.L) {
          const mapInstance = window.L.map(mapContainerRef.current, {
            zoomControl: false,
            attributionControl: false
          }).setView([11.9400, 79.8150], 13);

          window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19
          }).addTo(mapInstance);

          mapInstance.on('zoomend', () => {
            if (isMounted) {
              setZoomLevel(mapInstance.getZoom());
            }
          });

          mapRef.current = mapInstance;
          // Trigger initial markers placement
          updateMarkers(mapInstance);
        }
      }, 50);
    }

    if (isSearchActive) {
      initLeaflet();
    }

    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        setLeafletLoaded(false);
      }
    };
  }, [isSearchActive]);

  // Marker updating logic
  const updateMarkers = (mapInstance = mapRef.current) => {
    if (!window.L || !mapInstance) return;

    // Clear old markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Coordinates bounding box mapping Puducherry percents to real coordinates
    const minLat = 11.9180;
    const maxLat = 11.9620;
    const minLng = 79.7850;
    const maxLng = 79.8450;

    let activeLat = null;
    let activeLng = null;

    filteredRestaurants.forEach((restaurant) => {
      const x = parseFloat(restaurant.mapX);
      const y = parseFloat(restaurant.mapY);

      const lng = minLng + (x / 100) * (maxLng - minLng);
      const lat = maxLat - (y / 100) * (maxLat - minLat);

      const isActive = selectedRestaurant?.id === restaurant.id;

      if (isActive) {
        activeLat = lat;
        activeLng = lng;
      }

      // Custom icon HTML
      const iconHtml = `
        <div class="flex flex-col items-center select-none" style="transform: translate(-50%, -50%);">
          <!-- Round dish photo pin -->
          <div class="h-11 w-11 rounded-full border-2 bg-white overflow-hidden shadow-lg transition-transform duration-300 ${
            isActive 
              ? 'border-[#EA580C] ring-4 ring-[#EA580C]/25 scale-110 z-30' 
              : 'border-white hover:border-[#EA580C]/40'
          }">
            <img src="${restaurant.image}" alt="" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <!-- Rating bubble label below pin -->
          <div class="mt-0.5 px-1.5 py-0.5 rounded-md text-[9px] font-black text-white shadow-md leading-none transition-colors ${
            isActive ? 'bg-[#EA580C]' : 'bg-[#0F766E]'
          }">
            ${restaurant.rating.toFixed(1)}
          </div>
          ${isActive ? '<div class="absolute -top-[10px] h-16 w-16 rounded-full border-2 border-dashed border-[#EA580C]/80 animate-spin shrink-0 pointer-events-none -z-10"></div>' : ''}
        </div>
      `;

      const customIcon = window.L.divIcon({
        html: iconHtml,
        className: 'custom-leaflet-marker',
        iconSize: [44, 60],
        iconAnchor: [22, 30]
      });

      const marker = window.L.marker([lat, lng], { icon: customIcon })
        .addTo(mapInstance)
        .on('click', () => {
          setSelectedRestaurant(restaurant);
        });

      markersRef.current.push(marker);
    });

    if (activeLat !== null && activeLng !== null) {
      mapInstance.setView([activeLat, activeLng], 16, { animate: true });
    } else {
      mapInstance.setView([11.9400, 79.8150], 13, { animate: true });
    }
  };

  // Keep markers in sync with filter and selection changes
  useEffect(() => {
    if (leafletLoaded && mapRef.current) {
      updateMarkers();
    }
  }, [leafletLoaded, filteredRestaurants, selectedRestaurant]);

  // Handle booking form submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const code = 'TV-FOOD-' + Math.floor(1000 + Math.random() * 9000);
    setBookingCode(code);
    setBookingConfirmed(true);
  };

  // Reset booking state when changing selected restaurant for modal
  useEffect(() => {
    if (detailModalRestaurant) {
      setBookingConfirmed(false);
      setBookingCode('');
      setDetailTab('About & Booking');
    }
  }, [detailModalRestaurant]);

  // Reset states when selecting active restaurant in right panel
  useEffect(() => {
    setIsAboutExpanded(false);
    setDetailTab('Overview');
  }, [selectedRestaurant]);

  // Select initial restaurant if list changes
  useEffect(() => {
    if (filteredRestaurants.length > 0) {
      if (!filteredRestaurants.includes(selectedRestaurant)) {
        setSelectedRestaurant(filteredRestaurants[0]);
      }
    } else {
      setSelectedRestaurant(null);
    }
  }, [filteredRestaurants, selectedRestaurant]);

  return (
    <div className="w-full bg-[#FAFBFD] min-h-screen pb-16 rent-page-enter">
      
      {/* ─── CONDITIONAL HEADER: DOCKED SEARCH BAR OR HERO BANNER ─── */}
      {isSearchActive ? (
        <div className="w-full bg-white border-b border-slate-200/90 py-3 px-6 sticky top-0 z-30 shadow-sm select-none">
          <div className="max-w-[1760px] mx-auto flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-0">
            
            {/* Back Button */}
            <button 
              onClick={() => setIsSearchActive(false)}
              className="h-9 w-9 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 flex items-center justify-center rounded-xl cursor-pointer text-slate-500 hover:text-slate-800 transition-colors mr-2.5 shrink-0"
              title="Go Back"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* 1. Location Pin & Change */}
            <div 
              onClick={() => setShowLocationModal(true)}
              className="flex items-center gap-3 pl-3 pr-4 py-1.5 w-full lg:w-auto shrink-0 justify-between lg:justify-start cursor-pointer hover:bg-slate-50 rounded-xl transition-colors"
              title="Click to change location"
            >
              <div className="flex items-center gap-2 text-left">
                <MapPin className="h-5 w-5 text-[#0F766E] shrink-0" />
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider leading-none">Location</span>
                  <span className="text-[13px] font-black text-slate-900 mt-1 block truncate leading-none">
                    {selectedLocation.split(',')[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block h-7 w-px bg-slate-200 shrink-0 self-center" />

            {/* 2. Text Search Input */}
            <div className="flex items-center gap-2.5 px-4 py-1.5 flex-grow w-full lg:w-auto">
              <Search className="h-4.5 w-4.5 text-slate-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Search for restaurants, cuisines..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-[13px] font-semibold text-slate-800 placeholder-slate-400 outline-none"
              />
            </div>

            {/* Divider */}
            <div className="hidden lg:block h-7 w-px bg-slate-200 shrink-0 self-center" />

            {/* 3. Cuisine Dropdown */}
            <CustomDropdown 
              label="Cuisine" 
              value={selectedCuisine} 
              options={CUISINES} 
              onChange={setSelectedCuisine} 
              widthClass="w-[140px]" 
            />

            {/* Divider */}
            <div className="hidden lg:block h-7 w-px bg-slate-200 shrink-0 self-center" />

            {/* 4. Sort By Dropdown */}
            <CustomDropdown 
              label="Sort By" 
              value={sortBy} 
              options={['Popular', 'Price: Low to High', 'Price: High to Low', 'Top Rated']} 
              onChange={setSortBy} 
              widthClass="w-[150px]" 
            />

            {/* Divider */}
            <div className="hidden lg:block h-7 w-px bg-slate-200 shrink-0 self-center" />

            {/* 5. Rating Dropdown */}
            <CustomDropdown 
              label="Rating" 
              value={selectedRating} 
              options={['All Ratings', '4.5+', '4.0+', '3.5+']} 
              onChange={setSelectedRating} 
              widthClass="w-[140px]" 
            />

            {/* 6. Buttons */}
            <div className="flex items-center gap-2 pl-3 w-full sm:w-[48%] lg:w-auto shrink-0 justify-end ml-auto">
              <button 
                onClick={() => setIsSearchActive(true)}
                className="bg-[#0F766E] hover:bg-[#0c625c] active:scale-98 text-white px-5 py-2 rounded-xl font-extrabold text-[13px] transition-all cursor-pointer shadow-md flex items-center gap-1.5 shrink-0"
              >
                <span>Filters</span>
                <SlidersHorizontal className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setIsSearchActive(false)}
                className="h-9 w-9 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 flex items-center justify-center rounded-xl cursor-pointer text-slate-500 hover:text-slate-800 transition-colors shrink-0"
                title="Exit Search Layout"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

          </div>
        </div>
      ) : (
        <div 
          className="w-full h-[220px] sm:h-[240px] relative bg-cover bg-center flex flex-col justify-center px-6 sm:px-16 md:px-24 text-left shadow-inner border-b border-slate-200"
          style={{ backgroundImage: `url(${foodBannerImg})` }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-slate-950/40 z-0 pointer-events-none" />

          <div className="relative z-10 max-w-3xl text-left select-none">
            <span className="text-white text-xs sm:text-sm font-semibold tracking-wide uppercase">
              Discover the Best
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-1 tracking-tight leading-none">
              Food Spots
              <span className="inline-block relative text-[#EA580C] italic font-serif ml-3 select-none">
                Near You!
                <svg className="absolute bottom-[-6px] left-0 w-full h-[5px]" viewBox="0 0 100 10" preserveAspectRatio="none" fill="none">
                  <path d="M0,5 Q50,0 100,5" stroke="#EA580C" strokeWidth="4.5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm font-medium mt-2 max-w-xl leading-relaxed">
              Explore top restaurants, cafes, and hidden gems around you.
            </p>
          </div>

          {/* ─── FLOATING SEARCH/FILTER BAR ─── */}
          <div className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1360px] bg-white rounded-[28px] shadow-[0_15px_40px_-15px_rgba(15,118,110,0.08),0_10px_20px_-10px_rgba(0,0,0,0.04)] border border-slate-100 p-2 md:p-2.5 z-20">
            <div className="flex flex-col lg:flex-row items-stretch gap-3 lg:gap-0">
              
              {/* 1. Location Pin & Change */}
              <div 
                onClick={() => setShowLocationModal(true)}
                className="flex items-center gap-3.5 pl-4 pr-5 py-2 w-full lg:w-auto shrink-0 justify-between lg:justify-start cursor-pointer hover:bg-slate-50 rounded-2xl transition-colors"
                title="Click to change location"
              >
                <div className="flex items-center gap-2.5 text-left">
                  <MapPin className="h-5.5 w-5.5 text-[#0F766E] shrink-0" />
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider leading-none">Location</span>
                    <span className="text-[13.5px] font-black text-slate-900 mt-1 block truncate leading-none">
                      {selectedLocation.split(',')[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden lg:block h-8 w-px bg-slate-200 shrink-0 self-center" />

              {/* 2. Text Search Input */}
              <div className="flex items-center gap-2.5 px-5 py-2 flex-grow w-full lg:w-auto">
                <Search className="h-5 w-5 text-slate-400 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search for restaurants, cuisines..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 outline-none"
                />
              </div>

              {/* Divider */}
              <div className="hidden lg:block h-8 w-px bg-slate-200 shrink-0 self-center" />

              {/* 3. Cuisine Dropdown */}
              <CustomDropdown 
                label="Cuisine" 
                value={selectedCuisine} 
                options={CUISINES} 
                onChange={setSelectedCuisine} 
                widthClass="w-[150px]" 
              />

              {/* Divider */}
              <div className="hidden lg:block h-8 w-px bg-slate-200 shrink-0 self-center" />

              {/* 4. Sort By Dropdown */}
              <CustomDropdown 
                label="Sort By" 
                value={sortBy} 
                options={['Popular', 'Price: Low to High', 'Price: High to Low', 'Top Rated']} 
                onChange={setSortBy} 
                widthClass="w-[160px]" 
              />

              {/* Divider */}
              <div className="hidden lg:block h-8 w-px bg-slate-200 shrink-0 self-center" />

              {/* 5. Rating Dropdown */}
              <CustomDropdown 
                label="Rating" 
                value={selectedRating} 
                options={['All Ratings', '4.5+', '4.0+', '3.5+']} 
                onChange={setSelectedRating} 
                widthClass="w-[150px]" 
              />

              {/* 6. Buttons */}
              <div className="flex items-center gap-2.5 pl-4 pr-2 w-full lg:w-auto shrink-0 justify-end ml-auto">
                <button 
                  onClick={() => setIsSearchActive(true)}
                  className="bg-[#0F766E] hover:bg-[#0c625c] active:scale-98 text-white px-7 py-3 rounded-2xl font-extrabold text-[14px] transition-all cursor-pointer shadow-md shadow-teal-800/10 flex-grow lg:flex-grow-0 text-center"
                >
                  Search
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

          {/* ─── MAIN CONTENT VIEW: 3-PANEL SPLIT OR ORIGINAL GRID/MAP ─── */}
      {isSearchActive ? (
        <div className="mx-auto max-w-[1850px] px-4 pt-4 pb-4 select-none">
          <div className="flex flex-col lg:flex-row items-stretch gap-4 h-[calc(100vh-170px)] min-h-[600px] overflow-hidden">
            
            {/* ==================== LEFT PANEL: VERTICAL RESTAURANT LIST (23% width) ==================== */}
            <div className="w-full lg:w-[23%] flex flex-col h-full bg-white border border-slate-200/80 rounded-[24px] p-4 shadow-3xs overflow-hidden text-left">
              {/* Header */}
              <div className="mb-4 shrink-0">
                <h2 className="text-[17px] font-black text-slate-800 tracking-tight leading-none">
                  {filteredRestaurants.length}+ Food Spots Found
                </h2>
                <p className="text-[11.5px] font-semibold text-slate-400 mt-1.5">
                  Near {selectedLocation.split(',')[0]}
                </p>
              </div>

              {/* Scrollable list */}
              <div className="flex-grow overflow-y-auto no-scrollbar space-y-2.5 pr-0.5 pb-4">
                {filteredRestaurants.slice(0, visibleCount).map((restaurant) => {
                  const isActive = selectedRestaurant?.id === restaurant.id;
                  return (
                    <div
                      key={restaurant.id}
                      onClick={() => {
                        setSelectedRestaurant(restaurant);
                      }}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isActive
                          ? 'border-[#0F766E] bg-teal-50/15 shadow-3xs'
                          : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/60'
                      }`}
                    >
                      {/* Image Thumbnail */}
                      <div className="relative h-[84px] w-[84px] rounded-lg shrink-0 overflow-hidden bg-slate-100 shadow-3xs">
                        <img 
                          src={restaurant.image} 
                          alt={restaurant.title} 
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        {/* Heart icon inside image bottom-right */}
                        <button
                          onClick={(e) => toggleWishlist(restaurant.id, e)}
                          className="absolute bottom-1 right-1 h-5.5 w-5.5 rounded-full bg-white/90 border border-slate-100 flex items-center justify-center shadow-3xs hover:scale-105 transition-all cursor-pointer z-10"
                        >
                          <Heart 
                            className={`h-3 w-3 ${
                              wishlist.includes(restaurant.id) 
                                ? 'fill-red-500 text-red-500' 
                                : 'text-slate-500'
                            }`} 
                          />
                        </button>
                      </div>

                      {/* Info Area */}
                      <div className="flex-grow min-w-0 flex flex-col justify-between h-[84px] py-0.5">
                        <div>
                          {/* Title & Rating */}
                          <div className="flex items-start justify-between gap-1.5">
                            <h4 className="text-[12.5px] font-black text-slate-800 tracking-tight leading-snug truncate">
                              {restaurant.title}
                            </h4>
                            <span className="text-[10px] font-extrabold text-white flex items-center gap-0.5 shrink-0 bg-emerald-600 px-1 py-0.25 rounded-md leading-none shadow-3xs">
                              {restaurant.rating.toFixed(1)} ★
                            </span>
                          </div>

                          {/* Address & Distance */}
                          <div className="text-[11px] font-semibold text-slate-400 mt-0.5 truncate flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-[#0F766E] shrink-0" />
                            <span>{restaurant.location.split(',')[0]} • {restaurant.distance}</span>
                          </div>

                          {/* Cuisine */}
                          <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                            {restaurant.cuisine}
                          </p>
                        </div>

                        {/* Badges/Pills */}
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex gap-1 overflow-hidden max-w-[80%]">
                            {restaurant.pills.slice(0, 2).map((p) => {
                              const isVeg = p === 'Pure Veg';
                              const isPop = p === 'Popular' || p === 'Fine Dining';
                              return (
                                <span 
                                  key={p} 
                                  className={`text-[8.5px] font-extrabold px-1.5 py-0.5 rounded ${
                                    isVeg 
                                      ? 'bg-emerald-50 text-emerald-650' 
                                      : isPop 
                                        ? 'bg-[#EA580C]/10 text-[#EA580C]' 
                                        : 'bg-slate-50 text-slate-500'
                                  }`}
                                >
                                  {p}
                                </span>
                              );
                            })}
                          </div>
                          
                          {/* Book Link */}
                          <span 
                            onClick={(e) => {
                              e.stopPropagation();
                              setDetailModalRestaurant(restaurant);
                            }}
                            className="text-[9.5px] font-black text-[#0F766E] hover:underline cursor-pointer shrink-0"
                          >
                            Book &rarr;
                          </span>
                        </div>

                      </div>

                    </div>
                  );
                })}

                {/* Visible Count Load More */}
                {filteredRestaurants.length > visibleCount && (
                  <div className="pt-2 text-center">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 10)}
                      className="text-[12px] font-black text-[#0F766E] hover:text-[#0c625c] hover:underline flex items-center gap-1 mx-auto cursor-pointer"
                    >
                      <span>Load More</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ==================== MIDDLE PANEL: INTERACTIVE MAP (48% width) ==================== */}
            <div className="w-full lg:w-[48%] flex flex-col h-full bg-white border border-slate-200/80 rounded-[24px] overflow-hidden shadow-3xs relative">
              {/* Leaflet Real Map Container */}
              <div ref={mapContainerRef} className="absolute inset-0 z-0 bg-slate-100" />

              {/* Floating Top Map Actions */}
              <div className="absolute top-4 right-4 z-20 flex gap-2">
                <button className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-extrabold text-slate-700 shadow-md hover:bg-slate-50 cursor-pointer">
                  <SlidersHorizontal className="h-4 w-4 text-[#0F766E]" />
                  <span>Filter</span>
                </button>
                <button className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-extrabold text-slate-700 shadow-md hover:bg-slate-50 cursor-pointer">
                  <Search className="h-4 w-4 text-slate-400" />
                  <span>Search this area</span>
                </button>
              </div>

              {/* Map Zoom / Controls bottom right */}
              <div className="absolute right-4 bottom-24 z-30 flex flex-col gap-2">
                <button 
                  onClick={() => {
                    setSelectedRestaurant(null);
                    if (mapRef.current) {
                      mapRef.current.setView([11.9400, 79.8150], 13, { animate: true });
                    }
                  }}
                  className="h-9 w-9 bg-white border border-slate-200 hover:bg-slate-50 flex items-center justify-center rounded-xl shadow-md cursor-pointer text-slate-600 active:scale-95 transition-all"
                  title="Recenter Map"
                >
                  <Compass className="h-4.5 w-4.5 text-slate-600" />
                </button>
                <div className="flex flex-col bg-white border border-slate-200 rounded-xl shadow-md overflow-hidden">
                  <button 
                    onClick={() => {
                      if (mapRef.current) {
                        mapRef.current.zoomIn();
                      }
                    }}
                    className="h-9 w-9 hover:bg-slate-50 flex items-center justify-center border-b border-slate-100 cursor-pointer text-slate-600 active:scale-95 transition-all"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => {
                      if (mapRef.current) {
                        mapRef.current.zoomOut();
                      }
                    }}
                    className="h-9 w-9 hover:bg-slate-50 flex items-center justify-center cursor-pointer text-slate-600 active:scale-95 transition-all"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* BOTTOM MAP OVERLAY: Explore by Cuisine Carousel */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-slate-150 shadow-lg text-left z-25 flex flex-col select-none">
                <span className="text-[12px] font-black text-slate-800 px-1 tracking-tight">Explore by Cuisine</span>
                
                <div className="flex items-center justify-between gap-2 mt-2 relative">
                  {/* Cuisines Grid */}
                  <div className="flex-grow overflow-x-auto no-scrollbar flex items-center gap-3 py-1">
                    {[
                      { name: 'Cafe', count: '24 Places', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=100&q=80' },
                      { name: 'Seafood', count: '18 Places', img: 'https://images.unsplash.com/photo-1534080391025-0979e8304b2b?auto=format&fit=crop&w=100&q=80' },
                      { name: 'Pure Veg', count: '20 Places', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80' },
                      { name: 'Italian', count: '15 Places', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=100&q=80' },
                      { name: 'Chinese', count: '12 Places', img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=100&q=80' },
                      { name: 'Desserts', count: '10 Places', img: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=100&q=80' }
                    ].map((cuisineNode) => {
                      const isSel = selectedCuisine.toLowerCase() === cuisineNode.name.toLowerCase();
                      return (
                        <div
                          key={cuisineNode.name}
                          onClick={() => setSelectedCuisine(isSel ? 'All' : cuisineNode.name)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border shrink-0 cursor-pointer transition-all ${
                            isSel 
                              ? 'border-[#0F766E] bg-teal-50/20' 
                              : 'border-slate-100 hover:border-slate-200 bg-slate-50/40 hover:bg-slate-50'
                          }`}
                        >
                          <img 
                            src={cuisineNode.img} 
                            alt={cuisineNode.name} 
                            className="h-8 w-8 rounded-full object-cover shadow-3xs"
                          />
                          <div>
                            <span className="text-[11.5px] font-extrabold text-slate-800 block leading-tight">{cuisineNode.name}</span>
                            <span className="text-[9px] font-bold text-slate-400 block leading-none">{cuisineNode.count}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Chevron navigation indicator */}
                  <div className="shrink-0 flex items-center justify-center h-8 w-8 bg-slate-100/80 border border-slate-150 rounded-full cursor-pointer hover:bg-slate-200 transition-colors">
                    <ChevronRight className="h-4.5 w-4.5 text-slate-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* ==================== RIGHT PANEL: SELECTED RESTAURANT DETAILS (29% width) ==================== */}
            <div className="w-full lg:w-[29%] flex flex-col h-full bg-white border border-slate-200/80 rounded-[24px] overflow-hidden shadow-3xs text-left">
              {selectedRestaurant ? (
                <div className="flex flex-col h-full overflow-hidden relative">
                  
                  {/* Cover Photo */}
                  <div className="relative h-[160px] w-full shrink-0 overflow-hidden bg-slate-200">
                    <img 
                      src={selectedRestaurant.image} 
                      alt={selectedRestaurant.title} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    
                    {/* Back Button for Mobile Viewports */}
                    <button 
                      onClick={() => setSelectedRestaurant(null)}
                      className="absolute top-3 left-3 z-10 h-7.5 w-7.5 rounded-full bg-white/90 border border-slate-100 flex items-center justify-center shadow-3xs hover:scale-105 active:scale-95 transition-all cursor-pointer lg:hidden"
                      title="Back to List"
                    >
                      <ChevronLeft className="h-4.5 w-4.5 text-slate-700" />
                    </button>
                    
                    {/* Floating Controls inside Image */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                      <button 
                        className="h-7.5 w-7.5 rounded-full bg-white/90 border border-slate-100 flex items-center justify-center shadow-3xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        title="Share Restaurant"
                      >
                        <Share2 className="h-3.5 w-3.5 text-slate-655" />
                      </button>
                      <button 
                        onClick={() => setSelectedRestaurant(null)}
                        className="h-7.5 w-7.5 rounded-full bg-white/90 border border-slate-100 flex items-center justify-center shadow-3xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        title="Close Detail Panel"
                      >
                        <X className="h-3.5 w-3.5 text-slate-655" />
                      </button>
                    </div>
                  </div>

                  {/* Header Details */}
                  <div className="p-4 border-b border-slate-100 shrink-0 select-none">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-[17px] font-black text-slate-850 tracking-tight leading-snug">
                          {selectedRestaurant.title}
                        </h3>
                        <p className="text-[11.5px] font-semibold text-slate-400 mt-0.5">
                          {selectedRestaurant.cuisine}
                        </p>
                      </div>
                      <span className="text-[11px] font-extrabold text-white flex items-center gap-0.5 bg-emerald-600 px-1.5 py-0.5 rounded-md leading-none shadow-3xs shrink-0 mt-0.5">
                        {selectedRestaurant.rating.toFixed(1)} ★
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 mt-2">
                      <MapPin className="h-3.5 w-3.5 text-[#0F766E] shrink-0" />
                      <span>{selectedRestaurant.location.split(',')[0]} • {selectedRestaurant.distance}</span>
                    </div>

                    {/* Pills */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {selectedRestaurant.pills.map((p) => {
                        const isVeg = p === 'Pure Veg';
                        const isPop = p === 'Popular' || p === 'Fine Dining';
                        return (
                          <span 
                            key={p} 
                            className={`text-[8.5px] font-black px-2 py-0.75 rounded-md ${
                              isVeg 
                                ? 'bg-emerald-50 text-emerald-650' 
                                : isPop 
                                  ? 'bg-[#EA580C]/10 text-[#EA580C]' 
                                  : 'bg-slate-50 text-slate-500'
                            }`}
                          >
                            {p}
                          </span>
                        );
                      })}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 mt-4">
                      <button className="bg-[#0F766E] hover:bg-[#0c625c] text-white flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-[12px] font-extrabold flex-1 text-center cursor-pointer shadow-3xs active:scale-98 transition-all">
                        <Compass className="h-4 w-4" />
                        <span>Directions</span>
                      </button>
                      <button className="border border-[#0F766E] hover:bg-teal-50/15 text-[#0F766E] flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-[12px] font-extrabold flex-1 text-center cursor-pointer active:scale-98 transition-all">
                        <Phone className="h-4 w-4" />
                        <span>Call</span>
                      </button>
                      <button 
                        onClick={(e) => toggleWishlist(selectedRestaurant.id, e)}
                        className={`border flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl text-[12px] font-extrabold cursor-pointer active:scale-98 transition-all ${
                          wishlist.includes(selectedRestaurant.id)
                            ? 'border-red-200 bg-red-50 text-red-500'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-555'
                        }`}
                        title="Save to Wishlist"
                      >
                        <Heart className={`h-4.5 w-4.5 ${wishlist.includes(selectedRestaurant.id) ? 'fill-red-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b border-slate-100 bg-slate-50/20 px-4 shrink-0 overflow-x-auto no-scrollbar">
                    {['Overview', 'Menu', 'Reviews', 'Photos', 'Videos'].map((tab) => {
                      const isActive = detailTab === tab;
                      return (
                        <button
                          key={tab}
                          onClick={() => setDetailTab(tab)}
                          className={`py-3 px-3.5 text-[12px] font-extrabold tracking-tight relative transition-all shrink-0 cursor-pointer ${
                            isActive ? 'text-[#0F766E]' : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          <span>{tab}</span>
                          {isActive && (
                            <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#0F766E]" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Tab Scroll Content */}
                  <div className="flex-grow overflow-y-auto no-scrollbar p-4 space-y-5">
                    
                    {/* TAB: OVERVIEW */}
                    {detailTab === 'Overview' && (
                      <div className="space-y-5 animate-modal-box">
                        
                        {/* Popular Dishes */}
                        <div>
                          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                            <span className="text-[12px] font-black text-slate-800 uppercase tracking-wider">Popular Dishes</span>
                            <span 
                              onClick={() => setDetailTab('Menu')}
                              className="text-[11px] font-black text-[#0F766E] hover:underline cursor-pointer"
                            >
                              View Full Menu
                            </span>
                          </div>
                          
                          {/* Dish Carousel */}
                          <div className="flex items-center gap-1.5 mt-2 relative">
                            <div className="flex-grow overflow-x-auto no-scrollbar flex gap-2.5 py-1">
                              {[
                                { name: 'Pasta Alfredo', price: 350, img: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=200&q=80' },
                                { name: 'Margherita Pizza', price: 420, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80' },
                                { name: 'Veg Sandwich', price: 250, img: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=200&q=80' },
                                { name: 'Chocolate Brownie', price: 180, img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=200&q=80' }
                              ].map((dish, i) => (
                                <div key={i} className="w-[110px] shrink-0 border border-slate-100 rounded-xl p-1.5 bg-slate-50/20 text-left shadow-3xs flex flex-col justify-between">
                                  <img 
                                    src={dish.img} 
                                    alt={dish.name} 
                                    className="h-16 w-full rounded-lg object-cover bg-slate-100"
                                  />
                                  <div className="mt-1.5">
                                    <span className="text-[10px] font-extrabold text-slate-800 block truncate leading-tight">{dish.name}</span>
                                    <span className="text-[10.5px] font-black text-[#0F766E] block mt-0.5 leading-none">₹{dish.price}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="shrink-0 flex items-center justify-center h-6 w-6 bg-slate-50 border border-slate-250 rounded-full cursor-pointer hover:bg-slate-100 shadow-3xs">
                              <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                            </div>
                          </div>
                        </div>

                        {/* About Description */}
                        <div className="border-t border-slate-100 pt-3">
                          <span className="text-[12px] font-black text-slate-800 uppercase tracking-wider block mb-1">About</span>
                          <p className={`text-[12px] text-slate-655 font-medium leading-relaxed ${isAboutExpanded ? '' : 'line-clamp-2'}`}>
                            {selectedRestaurant.description}
                          </p>
                          <button
                            onClick={() => setIsAboutExpanded(prev => !prev)}
                            className="text-[11.5px] font-black text-[#0F766E] hover:underline mt-1 cursor-pointer"
                          >
                            {isAboutExpanded ? 'Show Less ^' : 'Show More v'}
                          </button>
                        </div>

                        {/* Highlights Grid */}
                        <div className="border-t border-slate-100 pt-3">
                          <span className="text-[12px] font-black text-slate-800 uppercase tracking-wider block mb-2">Highlights</span>
                          <div className="grid grid-cols-2 gap-2">
                            {selectedRestaurant.features.slice(0, 4).map((feat, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-600">
                                <CheckCircle className="h-3.5 w-3.5 text-[#0F766E] shrink-0" />
                                <span className="truncate">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Watch on YouTube */}
                        <div className="border-t border-slate-100 pt-3">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2">
                            <span className="text-[12px] font-black text-slate-800 uppercase tracking-wider">Watch on YouTube</span>
                            <span className="text-[11px] font-black text-[#0F766E] hover:underline cursor-pointer">View All</span>
                          </div>
                          
                          <div className="space-y-2">
                            {[
                              { id: 1, title: `${selectedRestaurant.title} Full Tour & Review`, dur: '04:35', img: selectedRestaurant.image },
                              { id: 2, title: 'Top 5 Dishes You Must Try!', dur: '03:12', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=150&q=80' },
                              { id: 3, title: 'Ambience & Vibes Tour', dur: '05:20', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80' }
                            ].map((vid) => (
                              <div key={vid.id} className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-50 cursor-pointer">
                                {/* Thumbnail */}
                                <div className="relative h-11 w-20 rounded-md overflow-hidden shrink-0 bg-slate-100 shadow-3xs">
                                  <img src={vid.img} alt="" className="h-full w-full object-cover" />
                                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                                    <div className="h-5 w-5 rounded-full bg-white/90 flex items-center justify-center shadow">
                                      <Play className="h-2.5 w-2.5 fill-[#EA580C] text-[#EA580C] translate-x-0.25" />
                                    </div>
                                  </div>
                                  <span className="absolute bottom-0.5 right-0.5 bg-black/85 text-white text-[8px] font-bold px-1 rounded-sm">{vid.dur}</span>
                                </div>
                                {/* Details */}
                                <div className="min-w-0">
                                  <span className="text-[11.5px] font-extrabold text-slate-800 block truncate leading-tight">{vid.title}</span>
                                  <span className="text-[9.5px] font-bold text-slate-400 block mt-0.5">2 days ago</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Customer Reviews Summary */}
                        <div className="border-t border-slate-100 pt-3">
                          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 mb-3">
                            <span className="text-[12px] font-black text-slate-800 uppercase tracking-wider">Customer Reviews</span>
                            <span 
                              onClick={() => setDetailTab('Reviews')}
                              className="text-[11px] font-black text-[#0F766E] hover:underline cursor-pointer"
                            >
                              View All
                            </span>
                          </div>
                          
                          {/* Score & Distribution Row */}
                          <div className="flex gap-4 items-center bg-slate-50/50 p-2.5 border border-slate-100 rounded-xl select-none">
                            {/* Score card */}
                            <div className="text-center shrink-0 w-[80px]">
                              <span className="text-[26px] font-black text-slate-800 leading-none">{selectedRestaurant.rating.toFixed(1)}</span>
                              <div className="flex items-center justify-center gap-0.25 mt-1 text-amber-400">
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                <Star className="h-3 w-3 text-slate-200" />
                              </div>
                              <span className="text-[9.5px] font-bold text-slate-400 mt-1 block">({selectedRestaurant.reviews} reviews)</span>
                            </div>
                            
                            {/* Progress bars list */}
                            <div className="flex-grow space-y-1">
                              {[
                                { stars: 5, pct: '70%' },
                                { stars: 4, pct: '20%' },
                                { stars: 3, pct: '7%' },
                                { stars: 2, pct: '2%' },
                                { stars: 1, pct: '1%' }
                              ].map((bar) => (
                                <div key={bar.stars} className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                                  <span className="w-2.5 shrink-0 text-right">{bar.stars}</span>
                                  <div className="flex-grow h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-teal-700" style={{ width: bar.pct }} />
                                  </div>
                                  <span className="w-8 shrink-0 text-right font-medium text-slate-400">{bar.pct}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Priya Sharma review card */}
                          <div className="mt-3 border border-slate-100 rounded-xl p-3 bg-white shadow-3xs text-left">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-7 w-7 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-extrabold text-[11px] shadow-3xs animate-pulse">
                                  PS
                                </div>
                                <div>
                                  <span className="text-[11.5px] font-extrabold text-slate-800 block">Priya Sharma</span>
                                  <span className="text-[9px] font-bold text-slate-400 block leading-none">2 days ago</span>
                                </div>
                              </div>
                              <div className="flex items-center text-amber-400 shrink-0">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                  <Star key={idx} className="h-3 w-3 fill-amber-400 text-amber-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-[11.5px] text-slate-600 font-medium leading-relaxed mt-2.5">
                              "Amazing food and cozy ambience. Loved the white sauce pasta!"
                            </p>
                          </div>
                        </div>

                      </div>
                    )}

                    {/* TAB: MENU */}
                    {detailTab === 'Menu' && (
                      <div className="space-y-3.5 animate-modal-box">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                          <span className="text-[12px] font-black text-slate-800 uppercase tracking-wider">Digital Menu</span>
                          <button 
                            onClick={() => setDetailModalRestaurant(selectedRestaurant)}
                            className="bg-[#0F766E] hover:bg-[#0c625c] text-white py-1 px-2.5 rounded-md text-[10px] font-black shadow-3xs cursor-pointer active:scale-95 transition-all"
                          >
                            Reserve Table
                          </button>
                        </div>
                        <div className="space-y-2">
                          {selectedRestaurant.menu.map((dish, i) => (
                            <div key={i} className="flex gap-3 border border-slate-100 rounded-xl p-3 bg-slate-50/20 text-left">
                              <div className="flex-grow min-w-0">
                                 <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{dish.category}</span>
                                <h5 className="text-[12.5px] font-extrabold text-slate-800 mt-0.5 truncate pr-5">{dish.name}</h5>
                                <p className="text-[11px] text-slate-500 font-medium mt-1 leading-normal line-clamp-2">{dish.desc}</p>
                                <span className="text-[13px] font-black text-[#0F766E] block mt-2">₹{dish.price}</span>
                              </div>
                              <div className="shrink-0 flex flex-col justify-between items-end">
                                <div className={`h-4.5 w-4.5 border flex items-center justify-center rounded-sm ${dish.veg ? 'border-emerald-600' : 'border-red-600'}`}>
                                  <div className={`h-2.5 w-2.5 rounded-full ${dish.veg ? 'bg-emerald-600' : 'bg-red-500'}`}></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB: REVIEWS */}
                    {detailTab === 'Reviews' && (
                      <div className="space-y-4 animate-modal-box">
                        <span className="text-[12px] font-black text-slate-800 uppercase tracking-wider block pb-1 border-b border-slate-100">Customer Reviews</span>
                        <div className="space-y-3">
                          {selectedRestaurant.reviewsList.map((rev, i) => (
                            <div key={i} className="border border-slate-100 rounded-xl p-3 bg-slate-50/20 text-left">
                              <div className="flex items-center justify-between">
                                <span className="text-[12px] font-extrabold text-slate-800">{rev.user}</span>
                                <span className="text-[10px] text-slate-400 font-semibold">{rev.date}</span>
                              </div>
                              <div className="flex items-center gap-0.5 mt-1 text-amber-400">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                  <Star key={idx} className={`h-3 w-3 ${idx < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                                ))}
                              </div>
                              <p className="text-[11.5px] text-slate-600 font-medium leading-relaxed mt-2">
                                "{rev.comment}"
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB: PHOTOS */}
                    {detailTab === 'Photos' && (
                      <div className="space-y-4 animate-modal-box">
                        <span className="text-[12px] font-black text-slate-800 uppercase tracking-wider block pb-1 border-b border-slate-100">Photos Grid</span>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            selectedRestaurant.image,
                            'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=150&q=80',
                            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=150&q=80',
                            'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80',
                            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80',
                            'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=150&q=80'
                          ].map((photoUrl, idx) => (
                            <div key={idx} className="h-24 rounded-lg overflow-hidden bg-slate-100 shadow-3xs cursor-zoom-in group">
                              <img src={photoUrl} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB: VIDEOS */}
                    {detailTab === 'Videos' && (
                      <div className="space-y-4 animate-modal-box">
                        <span className="text-[12px] font-black text-slate-800 uppercase tracking-wider block pb-1 border-b border-slate-100">Review Videos</span>
                        <div className="space-y-2.5">
                          {[
                            { id: 1, title: `${selectedRestaurant.title} Full Tour & Review`, dur: '04:35', img: selectedRestaurant.image },
                            { id: 2, title: 'Top 5 Dishes You Must Try!', dur: '03:12', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=150&q=80' },
                            { id: 3, title: 'Ambience & Vibes Tour', dur: '05:20', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80' }
                          ].map((vid) => (
                            <div key={vid.id} className="border border-slate-100 rounded-xl p-2 bg-slate-50/20 text-left hover:bg-slate-50 cursor-pointer">
                              <div className="relative h-28 rounded-lg overflow-hidden bg-slate-100 shadow-3xs">
                                <img src={vid.img} alt="" className="h-full w-full object-cover" />
                                <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                                  <div className="h-8 w-8 rounded-full bg-white/95 flex items-center justify-center shadow-md">
                                    <Play className="h-3.5 w-3.5 fill-[#EA580C] text-[#EA580C] translate-x-0.5" />
                                  </div>
                                </div>
                                <span className="absolute bottom-1 right-1 bg-black/85 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">{vid.dur}</span>
                              </div>
                              <span className="text-[12.5px] font-extrabold text-slate-850 block mt-2 leading-snug">{vid.title}</span>
                              <span className="text-[10px] font-bold text-slate-400 block mt-0.5 font-sans">2 days ago • YouTube</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-6 text-center select-none">
                  <Utensils className="h-10 w-10 text-slate-300 animate-pulse" />
                  <span className="text-[13px] font-black text-slate-400 mt-2 block">No Food Spot Selected</span>
                  <p className="text-[11.5px] text-slate-400 mt-1 max-w-[200px]">Click any card or map pin to view full details.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-[1760px] px-4 pt-8 pb-4">
          <div className="mt-3">
            
            {/* ==================== LISTING GRID (Full Width) ==================== */}
            <section className="w-full text-left">
              
              {/* Header controls inside list */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-5 shrink-0">
                <h2 className="text-lg sm:text-[19px] font-black text-slate-800 tracking-tight leading-none">
                  {filteredRestaurants.length}+ Food Spots Found
                </h2>
                
                <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-3xs cursor-pointer">
                  <span className="text-[11px] font-semibold text-slate-400">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent border-none text-[11px] font-black text-slate-700 outline-none cursor-pointer pr-1"
                  >
                    <option value="Popular">Popular</option>
                    <option value="Price: Low to High">Price: Low to High</option>
                    <option value="Price: High to Low">Price: High to Low</option>
                    <option value="Top Rated">Top Rated</option>
                  </select>
                </div>
              </div>

              {/* Restaurant Cards Grid (Exact Design from Mockup) */}
              {filteredRestaurants.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-3 pb-16">
                  {filteredRestaurants.map((restaurant) => {
                    const isHovered = selectedRestaurant?.id === restaurant.id;
                    return (
                      <div
                        key={restaurant.id}
                        onClick={() => {
                          setSelectedRestaurant(restaurant);
                          setIsSearchActive(true);
                        }}
                        onMouseEnter={() => setSelectedRestaurant(restaurant)}
                        className={`group bg-white rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col relative overflow-hidden shadow-xs hover:shadow-md ${
                          isHovered 
                            ? 'border-[#0F766E] ring-1 ring-[#0F766E]/20' 
                            : 'border-slate-200/80'
                        }`}
                      >
                        {/* Photo Container */}
                        <div className="relative h-[115px] w-full overflow-hidden bg-slate-100">
                          <img 
                            src={restaurant.image} 
                            alt={restaurant.title} 
                            className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                            loading="lazy"
                          />
                          
                          {/* Discount Tag */}
                          {restaurant.badge && (
                            <span className="absolute top-2 left-2 text-[9px] font-black uppercase bg-red-655 text-white px-1.5 py-0.5 rounded-md shadow-xs tracking-wider animate-pulse">
                              {restaurant.badge}
                            </span>
                          )}

                          {/* Wishlist Heart */}
                          <button
                            onClick={(e) => toggleWishlist(restaurant.id, e)}
                            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur-xs border border-white/50 flex items-center justify-center shadow-3xs hover:scale-105 active:scale-95 transition-all cursor-pointer z-10"
                          >
                            <Heart 
                              className={`h-4.5 w-4.5 transition-colors ${
                                wishlist.includes(restaurant.id) 
                                  ? 'fill-red-500 text-red-500 stroke-red-500' 
                                  : 'text-slate-500'
                              }`} 
                              strokeWidth={2.2}
                            />
                          </button>
                        </div>

                        {/* Content Section */}
                        <div className="p-3 flex flex-col flex-grow text-left justify-between">
                          <div>
                            {/* Title & Rating */}
                            <div className="flex items-start justify-between gap-1.5">
                              <h4 className="text-[13px] font-black text-slate-850 tracking-tight leading-snug group-hover:text-[#0F766E] transition-colors line-clamp-1">
                                {restaurant.title}
                              </h4>
                              <span className="text-[10px] font-extrabold text-white flex items-center gap-0.5 shrink-0 bg-emerald-600 px-1 py-0.5 rounded-md leading-none shadow-3xs">
                                {restaurant.rating.toFixed(1)} ★
                              </span>
                            </div>
                            
                            {/* Location & Distance */}
                            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mt-1">
                              <span className="flex items-center gap-1 leading-none">
                                <MapPin className="h-3 w-3 text-[#0F766E]" />
                                {restaurant.location.split(',')[0]}
                              </span>
                              <span className="text-slate-500 text-[10px] font-bold">{restaurant.distance}</span>
                            </div>

                            {/* Cuisine */}
                            <p className="text-[10.5px] text-slate-400 font-semibold mt-1.5 line-clamp-1 leading-relaxed">
                              {restaurant.cuisine}
                            </p>

                            {/* Badge pills */}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {restaurant.pills.map((p) => {
                                const isVeg = p === 'Pure Veg';
                                const isPop = p === 'Popular' || p === 'Fine Dining';
                                return (
                                  <span 
                                    key={p} 
                                    className={`text-[8.5px] font-extrabold px-1.5 py-0.5 rounded-md ${
                                      isVeg 
                                        ? 'bg-emerald-50 text-emerald-650' 
                                        : isPop 
                                          ? 'bg-pink-50 text-pink-650' 
                                          : 'bg-slate-50 text-slate-600'
                                    }`}
                                  >
                                    {p}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          {/* Price Details at bottom */}
                          <div className="flex items-center justify-between border-t border-slate-100 pt-2 mt-3.5 text-[11px] font-bold text-slate-500">
                            <span>₹₹₹ • ₹{restaurant.price} {restaurant.pricePeriod}</span>
                            
                            <span 
                              onClick={(e) => {
                                e.stopPropagation();
                                setDetailModalRestaurant(restaurant);
                              }}
                              className="text-[10.5px] font-black text-[#0F766E] hover:underline cursor-pointer"
                            >
                              Book Table &rarr;
                            </span>
                          </div>

                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center bg-white border border-slate-200 rounded-3xl py-20 px-4 text-center">
                  <h3 className="text-[15px] font-black text-slate-800">No restaurants match your search</h3>
                  <button 
                    onClick={() => {
                      setSelectedCuisine('All');
                      setSortBy('Popular');
                      setSelectedRating('All Ratings');
                      setSearchQuery('');
                    }}
                    className="mt-6 bg-[#0F766E] text-white text-[12.5px] font-extrabold px-5 py-2.5 rounded-xl cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              )}

            </section>

          </div>
        </div>
      )}

      {/* ==================== LOCATION CHANGE MODAL ==================== */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-modal-backdrop">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-[420px] p-6 text-left relative animate-modal-box">
            
            {/* Close */}
            <button
              onClick={() => setShowLocationModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-50 p-1.5 transition-all cursor-pointer"
            >
              <X className="h-5 w-5 stroke-[2.5]" />
            </button>

            <h3 className="text-lg font-black text-slate-850 flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-[#0F766E]" />
              <span>Select Destination</span>
            </h3>

            <div className="flex flex-col gap-2">
              {['Puducherry, India', 'Auroville, India', 'Goa, India', 'Bangalore, India'].map((loc) => {
                const isSelected = selectedLocation === loc;
                return (
                  <button
                    key={loc}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setShowLocationModal(false);
                    }}
                    className={`w-full text-left rounded-xl px-4 py-3 text-[13px] font-bold transition-all cursor-pointer flex items-center justify-between border ${
                      isSelected 
                        ? 'border-[#0F766E] bg-teal-50/20 text-[#0F766E]' 
                        : 'border-slate-150 hover:bg-slate-50 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span>{loc}</span>
                    {isSelected && <CheckCircle className="h-4.5 w-4.5 text-[#0F766E]" />}
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      )}

      {/* ==================== RESTAURANT DETAIL MODAL ==================== */}
      {detailModalRestaurant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-modal-backdrop">
          <div className="bg-white rounded-[28px] border border-slate-150 shadow-2xl w-full max-w-[960px] max-h-[92vh] overflow-y-auto no-scrollbar flex flex-col text-left relative animate-modal-box">
            
            {/* Close Button */}
            <button
              onClick={() => setDetailModalRestaurant(null)}
              className="absolute top-5 right-5 z-40 text-slate-400 hover:text-slate-800 bg-white/95 border border-slate-150 rounded-full p-2 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
              aria-label="Close details"
            >
              <X className="h-5.5 w-5.5 stroke-[2.5]" />
            </button>

            {/* Top Large Photo */}
            <div className="relative h-[250px] sm:h-[300px] w-full shrink-0 overflow-hidden bg-slate-200">
              <img 
                src={detailModalRestaurant.image} 
                alt={detailModalRestaurant.title} 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              
              {/* Restaurant Header in image */}
              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <span className="text-[10px] font-extrabold uppercase bg-[#0F766E] px-2.5 py-1 rounded-md tracking-wider">
                  {detailModalRestaurant.cuisine.split(',')[0]} • {detailModalRestaurant.location.split(',')[0]}
                </span>
                <h3 className="text-2xl sm:text-4xl font-black mt-2 tracking-tight">
                  {detailModalRestaurant.title}
                </h3>
                <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-slate-200">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <strong>{detailModalRestaurant.rating.toFixed(1)}</strong> ({detailModalRestaurant.reviews} reviews)
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {detailModalRestaurant.hours}
                  </span>
                </div>
              </div>
            </div>

            {/* Custom Tabs */}
            <div className="flex border-b border-slate-150 bg-slate-50/50 px-6 pt-3 shrink-0">
              {['About & Booking', 'Menu', 'Reviews'].map((tab) => {
                const isActive = detailTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setDetailTab(tab)}
                    className={`py-3.5 px-4 text-[13px] font-extrabold tracking-tight relative transition-all cursor-pointer ${
                      isActive ? 'text-[#0F766E]' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span>{tab}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-[#0F766E]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content Body */}
            <div className="p-6 flex flex-col md:flex-row gap-8 overflow-y-auto max-h-[calc(92vh-380px)]">
              
              {/* TAB 1: ABOUT & BOOKING */}
              {detailTab === 'About & Booking' && (
                <>
                  {/* Left Column: Details */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-wider mb-2">About the Place</h4>
                      <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                        {detailModalRestaurant.description}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-4.5">
                      <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-wider mb-2.5">Key Facilities</h4>
                      <div className="grid grid-cols-2 gap-2.5">
                        {detailModalRestaurant.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-2 text-[12.5px] font-semibold text-slate-655">
                            <CheckCircle className="h-4.5 w-4.5 text-[#0F766E] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4.5">
                      <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-wider mb-2.5">Pricing details</h4>
                      <div className="flex items-center gap-4 bg-slate-50 border border-slate-150 rounded-xl p-3">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Average Cost</span>
                          <span className="text-[16px] font-black text-slate-800 mt-0.5 block">₹{detailModalRestaurant.price}</span>
                        </div>
                        <div className="h-8 border-l border-slate-200"></div>
                        <p className="text-[11.5px] text-slate-400 font-semibold leading-normal">
                          Average price computed for two people dining (alcohol excluded). Taxes extra.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Reservation Card */}
                  <div className="w-full md:w-[350px] shrink-0 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm h-fit">
                    {bookingConfirmed ? (
                      <div className="text-center py-6 flex flex-col items-center gap-3 animate-success-check">
                        <div className="h-14 w-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
                          <CheckCircle className="h-8 w-8" />
                        </div>
                        <div className="mt-2">
                          <h4 className="text-lg font-black text-slate-850">Table Reserved!</h4>
                          <p className="text-[11.5px] text-slate-400 font-semibold mt-1">A confirmation has been sent to your email.</p>
                        </div>
                        <div className="bg-slate-50 border border-dashed border-slate-250 rounded-xl py-3 px-6 w-full text-center mt-3 select-all">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Booking ID</span>
                          <strong className="text-[15px] font-extrabold text-slate-800 tracking-wider block mt-0.5">{bookingCode}</strong>
                        </div>
                        <div className="w-full bg-teal-50 border border-teal-100/55 rounded-xl p-3 text-left mt-2.5">
                          <div className="flex items-center gap-2.5 text-[11px] font-bold text-slate-700">
                            <Calendar className="h-4.5 w-4.5 text-[#0F766E]" />
                            <span>{bookingDate} at {bookingTime}</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-[11px] font-bold text-slate-700 mt-2">
                            <Users className="h-4.5 w-4.5 text-[#0F766E]" />
                            <span>{bookingGuests}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setBookingConfirmed(false)}
                          className="text-[11.5px] font-black text-[#0F766E] hover:underline cursor-pointer mt-4"
                        >
                          Book Another Table
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleBookingSubmit} className="space-y-4 text-left">
                        <h4 className="text-[13.5px] font-black text-slate-850 border-b border-slate-100 pb-2.5 flex items-center gap-2">
                          <Utensils className="h-4.5 w-4.5 text-[#0F766E]" />
                          <span>Reserve Table</span>
                        </h4>

                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider pl-0.5">Date</label>
                          <input
                            type="date"
                            required
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-[12.5px] font-semibold text-slate-800 outline-none focus:border-[#0F766E]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider pl-0.5">Time</label>
                            <select
                              value={bookingTime}
                              onChange={(e) => setBookingTime(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-[12.5px] font-semibold text-slate-800 outline-none focus:border-[#0F766E] cursor-pointer"
                            >
                              {['12:30 PM', '1:00 PM', '1:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'].map((t) => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider pl-0.5">Guests</label>
                            <select
                              value={bookingGuests}
                              onChange={(e) => setBookingGuests(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-[12.5px] font-semibold text-slate-800 outline-none focus:border-[#0F766E] cursor-pointer"
                            >
                              {['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6+ Guests'].map((g) => (
                                <option key={g} value={g}>{g}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="bg-teal-50/50 rounded-xl p-3 border border-teal-100/30 text-left">
                          <span className="text-[10px] font-extrabold text-[#0F766E] block uppercase tracking-wider">PROMO APPLIED</span>
                          <p className="text-[11px] text-slate-700 font-semibold mt-1">
                            Get complimentary chef's special dessert on arrival with this booking.
                          </p>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-[#0F766E] hover:bg-[#0c625c] active:scale-98 text-white py-3 rounded-xl text-[13px] font-black cursor-pointer shadow-md transition-all text-center block"
                        >
                          Confirm Free Reservation
                        </button>
                      </form>
                    )}
                  </div>
                </>
              )}

              {/* TAB 2: MENU */}
              {detailTab === 'Menu' && (
                <div className="w-full space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-wider">Digital Dining Menu</h4>
                    <span className="text-[11.5px] font-semibold text-slate-400">Prices are subject to seasonal taxes</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {detailModalRestaurant.menu.map((dish) => (
                      <div key={dish.name} className="flex gap-4 border border-slate-150 rounded-2xl p-4 bg-white relative">
                        
                        {/* Veg / Non veg icon */}
                        <div className="absolute top-4.5 right-4.5 shrink-0 flex items-center justify-center">
                          <div className={`h-4.5 w-4.5 border-2 flex items-center justify-center rounded-sm ${
                            dish.veg ? 'border-emerald-600' : 'border-red-650'
                          }`}>
                            <div className={`h-2.5 w-2.5 rounded-full ${
                              dish.veg ? 'bg-emerald-600' : 'bg-red-655'
                            }`}></div>
                          </div>
                        </div>

                        <div className="flex-grow text-left">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            {dish.category}
                          </span>
                          <h5 className="text-[14px] font-extrabold text-slate-800 mt-1 block pr-6">
                            {dish.name}
                          </h5>
                          <p className="text-[11.5px] text-slate-500 font-medium mt-1 leading-normal">
                            {dish.desc}
                          </p>
                          <span className="text-[14px] font-black text-[#0F766E] block mt-3.5">
                            ₹{dish.price}
                          </span>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: REVIEWS */}
              {detailTab === 'Reviews' && (
                <div className="w-full space-y-6 text-left">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-wider">Customer Feedback</h4>
                    <span className="text-[11.5px] font-bold text-slate-700 flex items-center gap-1 bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded-md">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {detailModalRestaurant.rating.toFixed(1)} / 5.0
                    </span>
                  </div>

                  <div className="space-y-4">
                    {detailModalRestaurant.reviewsList.map((rev, i) => (
                      <div key={i} className="border border-slate-150 rounded-2xl p-4 bg-slate-50/20 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] font-extrabold text-slate-800">{rev.user}</span>
                          <span className="text-[11.5px] text-slate-400 font-semibold">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5 mt-1.5 text-amber-400">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star 
                              key={idx} 
                              className={`h-3.5 w-3.5 ${idx < rev.rating ? 'fill-amber-400' : 'text-slate-200'}`} 
                              strokeWidth={0}
                            />
                          ))}
                        </div>
                        <p className="text-[12.5px] text-slate-600 font-medium leading-relaxed mt-2.5">
                          "{rev.comment}"
                        </p>
                        
                        <div className="mt-4 flex items-center gap-2">
                          <button className="flex items-center gap-1.5 text-[10.5px] font-bold text-slate-500 hover:text-slate-700 cursor-pointer">
                            <ThumbsUp className="h-3.5 w-3.5" />
                            <span>Helpful</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

      {/* Injected Animations */}
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(8px); }
        }
        @keyframes modalScaleIn {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-backdrop {
          animation: modalFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-modal-box {
          animation: modalScaleIn 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-success-check {
          animation: modalScaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

    </div>
  );
}
