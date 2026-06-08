import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, MapPin, Heart, ChevronLeft, ChevronRight, ChevronDown, 
  Check, ShieldCheck, Waves, Wind, Tent, PawPrint, Bike, Ship, 
  SlidersHorizontal, X, Search, Compass, Map, CheckCircle2, RotateCcw
} from 'lucide-react';
import adventureBg from '../assets/adventurebg.png';

// Mock Data for adventures matching the user's design
const INITIAL_ADVENTURES = [
  {
    id: 1,
    name: "Scuba Diving",
    location: "Paradise Beach, Puducherry",
    duration: "2.5 Hours",
    rating: 4.7,
    reviewsCount: 320,
    price: 2499,
    originalPrice: 2499,
    tag: "Best Seller",
    category: "Water Sports",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Paragliding Adventure",
    location: "Kottakuppam, Puducherry",
    duration: "15-20 mins",
    rating: 4.8,
    reviewsCount: 250,
    price: 3199,
    originalPrice: 3999,
    tag: "20% OFF",
    category: "Paragliding",
    image: "https://images.unsplash.com/photo-1599422315629-f43c131a6c72?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Kayaking in Backwaters",
    location: "Chunnambar, Puducherry",
    duration: "1 Hour",
    rating: 4.6,
    reviewsCount: 180,
    price: 899,
    originalPrice: 899,
    tag: "Popular",
    category: "Water Sports",
    image: "https://images.unsplash.com/photo-1545642111-bc04f13d66b5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Camping by the Lake",
    location: "Auroville, Puducherry",
    duration: "Overnight",
    rating: 4.9,
    reviewsCount: 110,
    price: 1799,
    originalPrice: 1799,
    tag: "New",
    category: "Camping",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Wildlife Safari",
    location: "Tamil Nadu Safari Park",
    duration: "3 Hours",
    rating: 4.6,
    reviewsCount: 210,
    price: 1299,
    originalPrice: 1299,
    tag: "Popular",
    category: "Wildlife Safari",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Mountain Biking",
    location: "Auroville, Puducherry",
    duration: "3 Hours",
    rating: 4.5,
    reviewsCount: 96,
    price: 1699,
    originalPrice: 1999,
    tag: "15% OFF",
    category: "Biking",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    name: "Banana Boat Ride",
    location: "Paradise Beach, Puducherry",
    duration: "20 mins",
    rating: 4.4,
    reviewsCount: 140,
    price: 599,
    originalPrice: 599,
    tag: null,
    category: "Water Sports",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "Rappelling",
    location: "Yercaud Hills",
    duration: "2 Hours",
    rating: 4.7,
    reviewsCount: 75,
    price: 2199,
    originalPrice: 2199,
    tag: null,
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=600&q=80"
  }
];

const CATEGORIES = [
  { name: "All Adventures" },
  { name: "Water Sports" },
  { name: "Trekking" },
  { name: "Paragliding" },
  { name: "Camping" },
  { name: "Wildlife Safari" },
  { name: "Biking" },
  { name: "Boating" },
  { name: "Scuba Diving" }
];

const getCategoryIcon = (name, isSelected) => {
  const color = isSelected ? "#0e9488" : "#475569";
  
  switch (name) {
    case "All Adventures":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="7" height="7" rx="2.5" stroke={color} strokeWidth="2.5" />
          <rect x="13" y="4" width="7" height="7" rx="2.5" stroke={color} strokeWidth="2.5" />
          <rect x="4" y="13" width="7" height="7" rx="2.5" stroke={color} strokeWidth="2.5" />
          <rect x="13" y="13" width="7" height="7" rx="2.5" stroke={color} strokeWidth="2.5" />
        </svg>
      );
    case "Water Sports":
      return isSelected ? (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 22C8 22 10 25 16 25C22 25 24 22 28 22" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M10 20C12 20 18 20 22 20C24 20 24 18 22 17C20 16 12 16 10 16" fill={color} />
          <path d="M16 6V16" stroke={color} strokeWidth="2"/>
          <path d="M16 6C18 9 21 11 21 14H16V6Z" fill={color} />
          <path d="M16 8C14 10 12 11 12 14H16V8Z" fill={color} />
          <path d="M2 25C6 25 8 28 14 28C20 28 22 25 28 25C30 25 32 27 32 27" stroke={color} strokeWidth="3" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 22C8 22 10 25 16 25C22 25 24 22 28 22" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M10 20C12 20 18 20 22 20C24 20 24 18 22 17C20 16 12 16 10 16" fill="#f59e0b" />
          <path d="M16 6V16" stroke="#475569" strokeWidth="1.5"/>
          <path d="M16 6C18 9 21 11 21 14H16V6Z" fill="#3b82f6" />
          <path d="M16 8C14 10 12 11 12 14H16V8Z" fill="#ef4444" />
          <path d="M2 25C6 25 8 28 14 28C20 28 22 25 28 25C30 25 32 27 32 27" stroke="#0284c7" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      );
    case "Trekking":
      return isSelected ? (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="9" r="4" fill={color} />
          <path d="M2 26L12 12L22 26H2Z" fill={color} />
          <path d="M14 26L21 17L28 26H14Z" fill={color} opacity="0.8" />
          <path d="M4 28C10 28 14 24 18 24C22 24 26 27 30 27" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="11" cy="11" r="1.5" fill={color} />
          <path d="M11 13L10 18L7 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 15H13" stroke={color} strokeWidth="1.5" />
          <rect x="8" y="13" width="2" height="3.5" rx="0.5" fill={color} />
        </svg>
      ) : (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="9" r="4" fill="#f59e0b" />
          <path d="M2 26L12 12L22 26H2Z" fill="#15803d" />
          <path d="M14 26L21 17L28 26H14Z" fill="#22c55e" opacity="0.8" />
          <path d="M4 28C10 28 14 24 18 24C22 24 26 27 30 27" stroke="#854d0e" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="11" cy="11" r="1.5" fill="#f97316" />
          <path d="M11 13L10 18L7 21" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 15H13" stroke="#f97316" strokeWidth="1.5" />
          <rect x="8" y="13" width="2" height="3.5" rx="0.5" fill="#ef4444" />
        </svg>
      );
    case "Paragliding":
      return isSelected ? (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12C6 6 26 6 26 12C23 11 9 11 6 12Z" fill={color} />
          <path d="M8 11.8C11 9.5 21 9.5 24 11.8C21 10.5 11 10.5 8 11.8Z" fill={color} />
          <line x1="6" y1="12" x2="16" y2="24" stroke={color} strokeWidth="1.5" />
          <line x1="11" y1="12.2" x2="16" y2="24" stroke={color} strokeWidth="1" />
          <line x1="16" y1="12.3" x2="16" y2="24" stroke={color} strokeWidth="1" />
          <line x1="21" y1="12.2" x2="16" y2="24" stroke={color} strokeWidth="1" />
          <line x1="26" y1="12" x2="16" y2="24" stroke={color} strokeWidth="1.5" />
          <rect x="14.5" y="23.5" width="3" height="3" rx="1" fill={color} />
          <circle cx="16" cy="22" r="1.2" fill={color} />
        </svg>
      ) : (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12C6 6 26 6 26 12C23 11 9 11 6 12Z" fill="#ec4899" />
          <path d="M8 11.8C11 9.5 21 9.5 24 11.8C21 10.5 11 10.5 8 11.8Z" fill="#f43f5e" />
          <line x1="6" y1="12" x2="16" y2="24" stroke="#0ea5e9" strokeWidth="1.5" />
          <line x1="11" y1="12.2" x2="16" y2="24" stroke="#0ea5e9" strokeWidth="1" />
          <line x1="16" y1="12.3" x2="16" y2="24" stroke="#0ea5e9" strokeWidth="1" />
          <line x1="21" y1="12.2" x2="16" y2="24" stroke="#0ea5e9" strokeWidth="1" />
          <line x1="26" y1="12" x2="16" y2="24" stroke="#0ea5e9" strokeWidth="1.5" />
          <rect x="14.5" y="23.5" width="3" height="3" rx="1" fill="#0284c7" />
          <circle cx="16" cy="22" r="1.2" fill="#f97316" />
        </svg>
      );
    case "Camping":
      return isSelected ? (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 26L26 21H24L27 17H25L27.5 13H24.5L25.5 10H22.5L22 26Z" fill={color} />
          <polygon points="6,26 16,12 21,26" fill={color} />
          <polygon points="11,26 16,18 21,26" fill={color} />
          <line x1="16" y1="12" x2="16" y2="26" stroke={color} strokeWidth="1.5" />
          <path d="M2 27H30" stroke={color} strokeWidth="2.5" />
        </svg>
      ) : (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 26L26 21H24L27 17H25L27.5 13H24.5L25.5 10H22.5L22 26Z" fill="#16a34a" />
          <polygon points="6,26 16,12 21,26" fill="#f97316" />
          <polygon points="11,26 16,18 21,26" fill="#fbbf24" />
          <line x1="16" y1="12" x2="16" y2="26" stroke="#78350f" strokeWidth="1.5" />
          <path d="M2 27H30" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "Wildlife Safari":
      return isSelected ? (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="14" r="9" fill={color} />
          <circle cx="11" cy="9" r="3" fill={color} />
          <circle cx="21" cy="9" r="3" fill={color} />
          <circle cx="9" cy="15" r="3" fill={color} />
          <circle cx="23" cy="15" r="3" fill={color} />
          <circle cx="12" cy="20" r="3" fill={color} />
          <circle cx="20" cy="20" r="3" fill={color} />
          <circle cx="16" cy="15" r="6.5" fill={color} />
          <circle cx="11.5" cy="9.5" r="2.2" fill={color} />
          <circle cx="20.5" cy="9.5" r="2.2" fill={color} />
          <circle cx="14" cy="14" r="1.2" fill={color} />
          <circle cx="18" cy="14" r="1.2" fill={color} />
          <polygon points="15,16.5 17,16.5 16,17.5" fill={color} />
          <path d="M15.2 18.5C15.5 19 16 19 16 19C16 19 16.5 19 16.8 18.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="14" r="9" fill="#ea580c" />
          <circle cx="11" cy="9" r="3" fill="#ea580c" />
          <circle cx="21" cy="9" r="3" fill="#ea580c" />
          <circle cx="9" cy="15" r="3" fill="#ea580c" />
          <circle cx="23" cy="15" r="3" fill="#ea580c" />
          <circle cx="12" cy="20" r="3" fill="#ea580c" />
          <circle cx="20" cy="20" r="3" fill="#ea580c" />
          <circle cx="16" cy="15" r="6.5" fill="#facc15" />
          <circle cx="11.5" cy="9.5" r="2.2" fill="#facc15" />
          <circle cx="20.5" cy="9.5" r="2.2" fill="#facc15" />
          <circle cx="14" cy="14" r="1.2" fill="#1e293b" />
          <circle cx="18" cy="14" r="1.2" fill="#1e293b" />
          <polygon points="15,16.5 17,16.5 16,17.5" fill="#ea580c" />
          <path d="M15.2 18.5C15.5 19 16 19 16 19C16 19 16.5 19 16.8 18.5" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "Biking":
      return isSelected ? (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="21" r="5" stroke={color} strokeWidth="2.5" fill="none" />
          <circle cx="9" cy="21" r="1.5" fill={color} />
          <circle cx="23" cy="21" r="5" stroke={color} strokeWidth="2.5" fill="none" />
          <circle cx="23" cy="21" r="1.5" fill={color} />
          <path d="M9 21L15 13H22L23 21" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 21L15 13" stroke={color} strokeWidth="2.5" />
          <path d="M9 21L14 16" stroke={color} strokeWidth="2.5" />
          <path d="M22 13L21 9H23" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.5 11.5H16.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="21" r="5" stroke="#475569" strokeWidth="2.5" fill="none" />
          <circle cx="9" cy="21" r="1.5" fill="#475569" />
          <circle cx="23" cy="21" r="5" stroke="#475569" strokeWidth="2.5" fill="none" />
          <circle cx="23" cy="21" r="1.5" fill="#475569" />
          <path d="M9 21L15 13H22L23 21" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 21L15 13" stroke="#10b981" strokeWidth="2.5" />
          <path d="M9 21L14 16" stroke="#10b981" strokeWidth="2.5" />
          <path d="M22 13L21 9H23" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.5 11.5H16.5" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "Boating":
      return isSelected ? (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 19C10 19 22 19 26 19L24 23H8L6 19Z" fill={color} />
          <line x1="16" y1="6" x2="16" y2="19" stroke={color} strokeWidth="2" />
          <path d="M16 6C18 9 22 11 22 16H16V6Z" fill={color} />
          <path d="M16 8C14 10 11 12 11 16H16V8Z" fill={color} />
          <path d="M2 24.5C6 24.5 8 26.5 12 26.5C16 26.5 18 24.5 22 24.5C26 24.5 28 26.5 32 26.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M4 27.5C8 27.5 10 29.5 14 29.5C18 29.5 20 27.5 24 27.5C28 27.5 30 29.5 32 29.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 19C10 19 22 19 26 19L24 23H8L6 19Z" fill="#b45309" />
          <line x1="16" y1="6" x2="16" y2="19" stroke="#78350f" strokeWidth="2" />
          <path d="M16 6C18 9 22 11 22 16H16V6Z" fill="#0ea5e9" />
          <path d="M16 8C14 10 11 12 11 16H16V8Z" fill="#38bdf8" />
          <path d="M2 24.5C6 24.5 8 26.5 12 26.5C16 26.5 18 24.5 22 24.5C26 24.5 28 26.5 32 26.5" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M4 27.5C8 27.5 10 29.5 14 29.5C18 29.5 20 27.5 24 27.5C28 27.5 30 29.5 32 29.5" stroke="#0369a1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "Scuba Diving":
      return isSelected ? (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 8V23C22 25.5 20 27 17.5 27C15 27 14.5 25.5 14.5 25" stroke={color} strokeWidth="3.5" fill="none" />
          <path d="M22 8C22 8 23 6 25 6" stroke={color} strokeWidth="3" />
          <rect x="12.5" y="23.5" width="3" height="2" rx="0.5" fill={color} />
          <rect x="6" y="10" width="12" height="7" rx="3.5" stroke={color} strokeWidth="3" fill={color} opacity="0.3" />
          <path d="M11 15.5L12 17.5L13 15.5" stroke={color} strokeWidth="2" fill={color} />
          <path d="M6 13.5H3" stroke={color} strokeWidth="2" />
        </svg>
      ) : (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 8V23C22 25.5 20 27 17.5 27C15 27 14.5 25.5 14.5 25" stroke="#a855f7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M22 8C22 8 23 6 25 6" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
          <rect x="12.5" y="23.5" width="3" height="2" rx="0.5" fill="#a855f7" />
          <rect x="6" y="10" width="12" height="7" rx="3.5" stroke="#ec4899" strokeWidth="3" fill="#93c5fd" />
          <path d="M11 15.5L12 17.5L13 15.5" stroke="#ec4899" strokeWidth="2" strokeLinejoin="round" fill="#ec4899" />
          <path d="M6 13.5H3" stroke="#ec4899" strokeWidth="2" />
        </svg>
      );
    default:
      return (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="16" r="3.2" fill={color} />
          <circle cx="16" cy="16" r="3.2" fill={color} />
          <circle cx="24" cy="16" r="3.2" fill={color} />
        </svg>
      );
  }
};

export default function Adventures() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivityFilter, setSelectedActivityFilter] = useState('All Adventures');
  const [wishlist, setWishlist] = useState({});
  const [hoveredAdventure, setHoveredAdventure] = useState(null);
  const [sortBy, setSortBy] = useState('Popular');
  const [showAllActivitiesInSidebar, setShowAllActivitiesInSidebar] = useState(false);
  
  // Floating Search bar states
  const [searchType, setSearchType] = useState('All');
  const [searchDuration, setSearchDuration] = useState('Any Duration');
  const [searchPrice, setSearchPrice] = useState('Any Price');
  const [searchLocation, setSearchLocation] = useState('Puducherry, India');
  const scrollRef = useRef(null);

  // Sidebar filter states
  const [activitiesFilter, setActivitiesFilter] = useState({
    'All Activities': true,
    'Water Sports': false,
    'Trekking': false,
    'Paragliding': false,
    'Camping': false,
    'Wildlife Safari': false,
    'Biking': false,
    'Boating': false,
    'Scuba Diving': false
  });
  const [durationFilter, setDurationFilter] = useState('Any Duration');
  const [priceRange, setPriceRange] = useState(20000);
  const [ratingFilter, setRatingFilter] = useState('All Ratings');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync checklist behavior for Activity Type
  const handleActivityCheckbox = (key) => {
    if (key === 'All Activities') {
      setActivitiesFilter({
        'All Activities': true,
        'Water Sports': false,
        'Trekking': false,
        'Paragliding': false,
        'Camping': false,
        'Wildlife Safari': false,
        'Biking': false,
        'Boating': false,
        'Scuba Diving': false
      });
    } else {
      setActivitiesFilter(prev => {
        const updated = { ...prev, 'All Activities': false, [key]: !prev[key] };
        // If nothing is selected, revert to All Activities
        const anySelected = Object.keys(updated).some(k => k !== 'All Activities' && updated[k]);
        if (!anySelected) {
          updated['All Activities'] = true;
        }
        return updated;
      });
    }
  };

  const handleResetFilters = () => {
    setActivitiesFilter({
      'All Activities': true,
      'Water Sports': false,
      'Trekking': false,
      'Paragliding': false,
      'Camping': false,
      'Wildlife Safari': false,
      'Biking': false,
      'Boating': false,
      'Scuba Diving': false
    });
    setDurationFilter('Any Duration');
    setPriceRange(20000);
    setRatingFilter('All Ratings');
    setSearchQuery('');
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter and sort matching items
  const filteredAdventures = INITIAL_ADVENTURES.filter(item => {
    // 1. Text Search Input Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchText = item.name.toLowerCase().includes(q) || item.location.toLowerCase().includes(q);
      if (!matchText) return false;
    }

    // 2. Categories Pill Selection
    if (selectedActivityFilter !== 'All Adventures') {
      if (item.category !== selectedActivityFilter && !(selectedActivityFilter === 'Adventure' && (item.category === 'Adventure' || item.category === 'Paragliding'))) {
        // loose match for paragliding/adventure
        if (selectedActivityFilter === 'Scuba Diving' && item.name !== 'Scuba Diving') return false;
        if (selectedActivityFilter === 'Water Sports' && item.category !== 'Water Sports') return false;
        if (selectedActivityFilter !== 'Scuba Diving' && selectedActivityFilter !== 'Water Sports' && item.category !== selectedActivityFilter) return false;
      }
    }

    // 3. Sidebar Activity Type Checkbox Filters
    if (!activitiesFilter['All Activities']) {
      const activeKeys = Object.keys(activitiesFilter).filter(k => activitiesFilter[k]);
      const matchesCheckbox = activeKeys.some(key => {
        if (key === 'Water Sports') return item.category === 'Water Sports';
        if (key === 'Paragliding') return item.category === 'Paragliding' || item.name.includes('Paragliding');
        if (key === 'Camping') return item.category === 'Camping';
        if (key === 'Wildlife Safari') return item.category === 'Wildlife Safari' || item.name.includes('Wildlife');
        if (key === 'Biking') return item.category === 'Biking' || item.name.includes('Biking');
        if (key === 'Boating') return item.category === 'Boating' || item.name.includes('Boat');
        if (key === 'Scuba Diving') return item.name.includes('Scuba') || item.category === 'Scuba Diving';
        return item.category === key;
      });
      if (!matchesCheckbox) return false;
    }

    // 4. Duration Filter
    if (durationFilter !== 'Any Duration') {
      if (durationFilter === '< 2 Hours' && !item.duration.includes('mins') && parseFloat(item.duration) >= 2) return false;
      if (durationFilter === '2-5 Hours' && !item.duration.includes('Hour') && (item.duration.includes('mins') || parseFloat(item.duration) < 2 || parseFloat(item.duration) > 5)) return false;
      if (durationFilter === 'Overnight' && !item.duration.toLowerCase().includes('overnight')) return false;
    }

    // 5. Price Slider
    if (item.price > priceRange) return false;

    // 6. Rating Filter
    if (ratingFilter !== 'All Ratings') {
      const minRating = parseFloat(ratingFilter);
      if (item.rating < minRating) return false;
    }

    return true;
  });

  // Sorting
  const sortedAdventures = [...filteredAdventures].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    if (sortBy === 'Rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount; // Default Popular sorting
  });

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, sortedAdventures.length));
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }} className="bg-[#F8FAFC] min-h-screen text-[#0F172A]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Playball&display=swap');

        /* Style range slider thumbs */
        .price-range-input::-webkit-slider-thumb {
          pointer-events: auto;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #0F766E;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(15,118,110,0.3);
          cursor: pointer;
        }
        .price-range-input::-moz-range-thumb {
          pointer-events: auto;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #0F766E;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(15,118,110,0.3);
          cursor: pointer;
        }
        /* Custom scrollbar hiding utilities */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* 1. HERO SECTION WITH ACCENT HEADER */}
      <section className="relative w-full h-[360px] sm:h-[380px] lg:h-[420px] flex items-center bg-[#F1F5F9]/30">
        {/* Background Image and clean container crop */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={adventureBg} 
            alt="Adventure Hero" 
            className="w-full h-full object-cover object-center select-none"
          />
          {/* Subtle light overlay for contrast against dark text */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/25 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1760px] mx-auto w-full px-4 sm:px-8 lg:px-12 text-left mt-[-30px]">
          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12] text-[#0D233A] max-w-xl animate-fade-in">
            Find Your Next <br />
            <span style={{ fontFamily: "'Caveat', 'Playball', cursive" }} className="text-[#0e9488] text-5xl sm:text-6xl lg:text-[72px] relative inline-block mt-1.5 font-normal tracking-wide">
              Adventure
              {/* Highlight sparkles rays doodle */}
              <svg className="absolute right-[-32px] top-[14px] w-6 h-6 text-[#0e9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                <line x1="4" y1="12" x2="10" y2="12" />
                <line x1="6" y1="6" x2="11" y2="9" />
                <line x1="6" y1="18" x2="11" y2="15" />
              </svg>
            </span>
          </h1>
          <p className="mt-4 text-[14px] sm:text-[15.5px] font-bold text-slate-650 max-w-md leading-relaxed">
            Discover thrilling experiences and unforgettable adventures around you.
          </p>
        </div>

        {/* FLOATING SEARCH BAR OVERLAY CARD */}
        <div className="absolute bottom-[-36px] left-1/2 -translate-x-1/2 w-full max-w-[1760px] px-4 sm:px-8 lg:px-12 z-20">
          <div className="bg-white rounded-3xl border border-slate-200/85 pl-8 pr-3.5 py-3 shadow-lg shadow-slate-200/40 flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-0">
            
            {/* Location selector */}
            <div className="flex items-center gap-2 pl-2 pr-6 py-1 shrink-0 text-left">
              <MapPin className="h-5 w-5 text-slate-400 shrink-0 stroke-[2.2]" />
              <span className="text-[14.5px] font-black text-slate-800 tracking-tight">{searchLocation}</span>
              <button className="text-[13.5px] font-bold text-[#0e9488] hover:underline cursor-pointer ml-3 shrink-0">Change</button>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block h-8 w-[1px] bg-slate-200/80"></div>

            {/* Keyword Search Input */}
            <div className="flex items-center gap-2.5 px-6 py-1 flex-1 min-w-[220px] text-left">
              <Search className="h-5 w-5 text-slate-400 shrink-0 stroke-[2.2]" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search adventures, activities..."
                className="text-[13.5px] font-semibold text-slate-800 bg-transparent outline-none w-full placeholder-slate-400"
              />
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block h-8 w-[1px] bg-slate-200/80"></div>

            {/* Dropdown 1: Activity Type */}
            <div className="flex items-center justify-between gap-3 px-6 py-0.5 flex-1 min-w-[130px] relative cursor-pointer text-left">
              <div className="flex flex-col">
                <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wide leading-none">Activity Type</span>
                <select
                  value={selectedActivityFilter}
                  onChange={(e) => setSelectedActivityFilter(e.target.value)}
                  className="text-[13.5px] font-black text-[#0D233A] bg-transparent outline-none mt-1.5 appearance-none cursor-pointer pr-5"
                >
                  <option value="All Adventures">All</option>
                  <option value="Water Sports">Water Sports</option>
                  <option value="Trekking">Trekking</option>
                  <option value="Paragliding">Paragliding</option>
                  <option value="Camping">Camping</option>
                  <option value="Wildlife Safari">Wildlife Safari</option>
                  <option value="Biking">Biking</option>
                  <option value="Boating">Boating</option>
                  <option value="Scuba Diving">Scuba Diving</option>
                </select>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 stroke-[2.5] pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 mt-1.5" />
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block h-8 w-[1px] bg-slate-200/80"></div>

            {/* Dropdown 2: Duration */}
            <div className="flex items-center justify-between gap-3 px-6 py-0.5 flex-1 min-w-[135px] relative cursor-pointer text-left">
              <div className="flex flex-col">
                <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wide leading-none">Duration</span>
                <select
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className="text-[13.5px] font-black text-[#0D233A] bg-transparent outline-none mt-1.5 appearance-none cursor-pointer pr-5"
                >
                  <option value="Any Duration">Any Duration</option>
                  <option value="< 2 Hours">&lt; 2 Hours</option>
                  <option value="2-5 Hours">2 - 5 Hours</option>
                  <option value="Overnight">Any Duration</option>
                </select>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 stroke-[2.5] pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 mt-1.5" />
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block h-8 w-[1px] bg-slate-200/80"></div>

            {/* Dropdown 3: Price Range */}
            <div className="flex items-center justify-between gap-3 px-6 py-0.5 flex-1 min-w-[130px] relative cursor-pointer text-left">
              <div className="flex flex-col">
                <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wide leading-none">Price Range</span>
                <select
                  value={searchPrice}
                  onChange={(e) => {
                    setSearchPrice(e.target.value);
                    if (e.target.value === 'Any Price') setPriceRange(20000);
                    else if (e.target.value === 'Under ₹1,000') setPriceRange(1000);
                    else if (e.target.value === '₹1,000 - ₹3,000') setPriceRange(3000);
                    else if (e.target.value === '₹3,000+') setPriceRange(20000);
                  }}
                  className="text-[13.5px] font-black text-[#0D233A] bg-transparent outline-none mt-1.5 appearance-none cursor-pointer pr-5"
                >
                  <option value="Any Price">Any Price</option>
                  <option value="Under ₹1,000">Under ₹1,000</option>
                  <option value="₹1,000 - ₹3,000">₹1,000 - ₹3,000</option>
                  <option value="₹3,000+">₹3,000+</option>
                </select>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 stroke-[2.5] pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 mt-1.5" />
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block h-8 w-[1px] bg-slate-200/80"></div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pl-3 pr-2 lg:pr-0 shrink-0">
              <button className="bg-[#0F766E] hover:bg-[#0c625c] text-white px-7 py-3 rounded-2xl font-bold text-[14.5px] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-teal-700/5 hover:scale-102">
                Search
              </button>
              
              {/* Sliders settings button next to search */}
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="p-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-2xl cursor-pointer h-[46px] w-[46px] flex items-center justify-center transition-colors shadow-xs"
              >
                <SlidersHorizontal className="h-4.5 w-4.5 text-slate-500 stroke-[2.2]" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ACTIVITY QUICK LINK CATEGORIES BAR */}
      <section className="w-full bg-white pt-20 pb-8 border-b border-slate-100/85 relative">
        <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 relative group/nav">
          {/* Scroll Left Button */}
          <button 
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: -260, behavior: 'smooth' });
              }
            }}
            className="absolute left-1 sm:left-4 lg:left-6 top-[42%] -translate-y-1/2 z-10 bg-slate-900 hover:bg-black text-white w-5 h-11 rounded-lg flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 stroke-[3.5]" />
          </button>

          <div 
            ref={scrollRef}
            className="flex items-center justify-start gap-4 overflow-x-auto hide-scrollbar pb-2 select-none"
          >
            {CATEGORIES.map((cat, idx) => {
              const isSelected = selectedActivityFilter === cat.name;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedActivityFilter(cat.name);
                    // Also sync checkbox filter to make it intuitive
                    if (cat.name === 'All Adventures') {
                      handleActivityCheckbox('All Activities');
                    } else {
                      setActivitiesFilter({
                        'All Activities': false,
                        'Water Sports': cat.name === 'Water Sports',
                        'Trekking': cat.name === 'Trekking',
                        'Paragliding': cat.name === 'Paragliding',
                        'Camping': cat.name === 'Camping',
                        'Wildlife Safari': cat.name === 'Wildlife Safari',
                        'Biking': cat.name === 'Biking',
                        'Boating': cat.name === 'Boating',
                        'Scuba Diving': cat.name === 'Scuba Diving'
                      });
                    }
                  }}
                  className={`flex flex-col items-center justify-center gap-2.5 w-[125px] h-[92px] rounded-2xl border transition-all shrink-0 cursor-pointer ${
                    isSelected 
                      ? 'bg-[#0e9488]/[0.04] border-[#0e9488] text-[#0e9488] shadow-sm' 
                      : 'border-slate-200 bg-white text-[#0D233A] hover:border-slate-350 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-center h-[32px] w-[32px] shrink-0">
                    {getCategoryIcon(cat.name, isSelected)}
                  </div>
                  <span className="text-[12px] font-extrabold tracking-tight text-center px-1 leading-none">{cat.name}</span>
                </button>
              );
            })}
            <button className="flex flex-col items-center justify-center gap-2.5 w-[125px] h-[92px] rounded-2xl border border-slate-200 bg-white text-[#0D233A] hover:border-slate-350 hover:bg-slate-50/50 transition-all shrink-0 cursor-pointer">
              <div className="flex items-center justify-center h-[32px] w-[32px] shrink-0">
                {getCategoryIcon("More", false)}
              </div>
              <span className="text-[12px] font-extrabold tracking-tight text-center px-1 leading-none">More</span>
            </button>
          </div>

          {/* Scroll Right Button */}
          <button 
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: 260, behavior: 'smooth' });
              }
            }}
            className="absolute right-1 sm:right-4 lg:right-6 top-[42%] -translate-y-1/2 z-10 bg-slate-900 hover:bg-black text-white w-5 h-11 rounded-lg flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95"
          >
            <ChevronRight className="w-4 h-4 stroke-[3.5]" />
          </button>
        </div>
      </section>

      {/* 3. DOUBLE COLUMN LAYOUT (Filters, Main Results, Map Sidecar) */}
      <section className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* A. LEFT FILTER SIDEBAR */}
          <aside className={`fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-xs p-4 flex justify-end lg:static lg:z-0 lg:bg-transparent lg:backdrop-blur-none lg:p-0 transition-opacity duration-200 ${
            showMobileFilters ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto lg:block'
          } lg:col-span-3 xl:col-span-2.5`}>
            <div className={`bg-white rounded-3xl border border-slate-200 p-5 shadow-xl lg:shadow-xs w-full max-w-[340px] lg:max-w-none h-[92vh] lg:h-auto overflow-y-auto hide-scrollbar lg:overflow-visible transition-transform duration-300 transform ${
              showMobileFilters ? 'translate-x-0' : 'translate-x-8 lg:translate-x-0'
            } lg:transform-none`}>
              
              {/* Header Titles */}
              <div className="flex justify-between items-center pb-4.5 border-b border-slate-100">
                <span className="text-[15px] font-extrabold text-slate-900 uppercase tracking-wide">
                  Filters
                </span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleResetFilters}
                    className="text-[13px] font-bold text-[#0e9488] hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={() => setShowMobileFilters(false)}
                    className="lg:hidden p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

              {/* Activity Checkboxes */}
              <div className="py-5 border-b border-slate-100">
                <h4 className="text-[12.5px] font-black text-slate-400 uppercase tracking-wider mb-4">Activity Type</h4>
                <div className="space-y-3.5">
                  {Object.keys(activitiesFilter)
                    .filter((key) => showAllActivitiesInSidebar || (key !== 'Biking' && key !== 'Boating' && key !== 'Scuba Diving'))
                    .map((key) => (
                      <div 
                        key={key} 
                        onClick={() => handleActivityCheckbox(key)}
                        className="flex items-center gap-3 cursor-pointer group select-none"
                      >
                        <div 
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                            activitiesFilter[key] 
                              ? 'bg-[#0e9488] border-[#0e9488] text-white shadow-sm' 
                              : 'border-slate-350 group-hover:border-slate-400 bg-white'
                          }`}
                        >
                          {activitiesFilter[key] && (
                            <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                          )}
                        </div>
                        <span className={`text-[13.5px] font-semibold transition-colors leading-none ${
                          activitiesFilter[key] ? 'text-slate-900 font-extrabold' : 'text-slate-650 group-hover:text-slate-900'
                        }`}>
                          {key}
                        </span>
                      </div>
                    ))}
                  {!showAllActivitiesInSidebar && (
                    <button 
                      onClick={() => setShowAllActivitiesInSidebar(true)}
                      className="text-xs font-bold text-[#0e9488] hover:underline cursor-pointer flex items-center gap-1 pt-1.5"
                    >
                      + More
                    </button>
                  )}
                  {showAllActivitiesInSidebar && (
                    <button 
                      onClick={() => setShowAllActivitiesInSidebar(false)}
                      className="text-xs font-bold text-[#0e9488] hover:underline cursor-pointer flex items-center gap-1 pt-1.5"
                    >
                      - Show Less
                    </button>
                  )}
                </div>
              </div>

              {/* Duration filter */}
              <div className="py-5 border-b border-slate-100">
                <h4 className="text-[12.5px] font-black text-slate-400 uppercase tracking-wider mb-4">Duration</h4>
                <div className="relative">
                  <select
                    value={durationFilter}
                    onChange={(e) => setDurationFilter(e.target.value)}
                    className="appearance-none w-full bg-white border border-slate-200/80 hover:border-slate-350 text-slate-700 text-[13px] font-bold px-3.5 pr-9 py-2.5 rounded-xl outline-none focus:border-[#0e9488] cursor-pointer transition-colors"
                  >
                    <option value="Any Duration">Any Duration</option>
                    <option value="< 2 Hours">&lt; 2 Hours</option>
                    <option value="2-5 Hours">2 - 5 Hours</option>
                    <option value="Overnight">Overnight</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-455 pointer-events-none stroke-[2.2]" />
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="py-5 border-b border-slate-100">
                <h4 className="text-[12.5px] font-black text-slate-400 uppercase tracking-wider mb-4">Price Range</h4>
                <div className="flex justify-between items-center text-[13px] font-bold text-slate-800 mb-2.5">
                  <span>₹0</span>
                  <span>₹{priceRange === 20000 ? '20,000+' : priceRange.toLocaleString()}</span>
                </div>
                <div className="relative w-full h-5 flex items-center mb-1">
                  <div className="absolute left-0 right-0 h-1.5 bg-slate-150 rounded-full"></div>
                  <div 
                    className="absolute h-1.5 bg-[#0e9488] rounded-full"
                    style={{ left: '0%', right: `${100 - (priceRange / 20000) * 100}%` }}
                  ></div>
                  <input
                    type="range"
                    min="500"
                    max="20000"
                    step="500"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="absolute pointer-events-none appearance-none w-full h-1 bg-transparent outline-none left-0 z-20 price-range-input"
                  />
                </div>
              </div>

              {/* Guest Ratings filter */}
              <div className="py-5">
                <h4 className="text-[12.5px] font-black text-slate-400 uppercase tracking-wider mb-4">Rating</h4>
                <div className="space-y-3.5">
                  {[
                    { key: 'All Ratings', label: 'All Ratings' },
                    { key: '4.5', label: '4.5 & above', rating: 4.5 },
                    { key: '4.0', label: '4.0 & above', rating: 4.0 },
                    { key: '3.5', label: '3.5 & above', rating: 3.5 }
                  ].map((rate) => {
                    const isSelected = ratingFilter === rate.key;
                    return (
                      <div 
                        key={rate.key} 
                        onClick={() => setRatingFilter(rate.key)}
                        className="flex items-center gap-3 cursor-pointer group select-none"
                      >
                        <div 
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                            isSelected 
                              ? 'bg-[#0e9488] border-[#0e9488] text-white' 
                              : 'border-slate-350 group-hover:border-slate-450 bg-white'
                          }`}
                        >
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                          )}
                        </div>
                        {rate.rating ? (
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3.5 w-3.5 stroke-none ${
                                    i < Math.floor(rate.rating) 
                                      ? 'fill-amber-400 text-amber-400' 
                                      : rate.rating % 1 !== 0 && i === Math.floor(rate.rating)
                                      ? 'fill-amber-400 text-amber-400 opacity-60'
                                      : 'fill-slate-200 text-slate-200'
                                  }`} 
                                />
                              ))}
                            </div>
                            <span className="text-[13.5px] font-bold text-slate-650 leading-none">{rate.label}</span>
                          </div>
                        ) : (
                          <span className="text-[13.5px] font-bold text-slate-650 leading-none">{rate.label}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Apply Filters Button */}
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="w-full bg-[#0e9488] hover:bg-[#0c7a6e] text-white py-3.5 rounded-2xl font-bold text-[14px] shadow-sm hover:shadow transition-all mt-4 cursor-pointer text-center block"
              >
                Apply Filters
              </button>

            </div>
          </aside>

          {/* B. MAIN RESULTS GRID */}
          <main className="lg:col-span-6 xl:col-span-6.5 space-y-6">
            
            {/* Header controls count / sort */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {searchQuery || selectedActivityFilter !== 'All Adventures' ? `${sortedAdventures.length} Adventures Found` : "128+ Adventures Found"}
                </h2>
                <p className="text-[11.5px] font-bold text-slate-450 mt-1 uppercase tracking-wide">
                  Explore activities around Puducherry, India
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 justify-between sm:justify-end">
                <span className="text-[12px] font-bold text-slate-400 whitespace-nowrap">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 hover:border-slate-350 text-slate-700 text-[12px] font-bold px-3.5 pr-8 py-2 rounded-xl outline-none focus:border-[#0e9488] cursor-pointer transition-colors"
                  >
                    <option value="Popular">Popular</option>
                    <option value="Rating">Rating: High to Low</option>
                    <option value="Price: Low to High">Price: Low to High</option>
                    <option value="Price: High to Low">Price: High to Low</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-550 pointer-events-none stroke-[2.2]" />
                </div>
                
                {/* View switches */}
                <div className="flex items-center gap-1 bg-slate-50 rounded-xl p-1 border border-slate-200">
                  <button className="p-1.5 rounded-lg bg-[#0e9488] shadow-xs text-white cursor-pointer">
                    <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="3" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="3" width="7" height="7" rx="1.5" />
                      <rect x="3" y="14" width="7" height="7" rx="1.5" />
                      <rect x="14" y="14" width="7" height="7" rx="1.5" />
                    </svg>
                  </button>
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-650 cursor-pointer">
                    <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Grid display */}
            {sortedAdventures.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center">
                <Compass className="h-14 w-14 text-slate-300 stroke-[1.5] mb-4" />
                <h3 className="text-[17px] font-extrabold text-slate-800">No adventures match your filters</h3>
                <p className="text-slate-450 text-[13px] mt-1.5 max-w-sm leading-normal">
                  Try adjusting your checkboxes, moving the price range slider, or choosing another category above.
                </p>
                <button 
                  onClick={handleResetFilters}
                  className="mt-5 px-5 py-2.5 bg-teal-55 text-white font-extrabold text-[12.5px] rounded-xl hover:bg-[#0c625c] transition-all cursor-pointer shadow-sm shadow-teal-700/10"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {sortedAdventures.slice(0, visibleCount).map((adventure) => {
                  const isHovered = hoveredAdventure === adventure.id;
                  const isLiked = !!wishlist[adventure.id];
                  return (
                    <div
                      key={adventure.id}
                      onMouseEnter={() => setHoveredAdventure(adventure.id)}
                      onMouseLeave={() => setHoveredAdventure(null)}
                      className={`group bg-white rounded-3xl border overflow-hidden transition-all duration-300 ${
                        isHovered 
                          ? 'border-[#0e9488]/40 shadow-lg shadow-teal-700/5 -translate-y-1' 
                          : 'border-slate-200/90 shadow-xs'
                      }`}
                    >
                      {/* Image section with relative badges */}
                      <div className="relative w-full h-[180px] overflow-hidden">
                        <img 
                          src={adventure.image} 
                          alt={adventure.name} 
                          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                        />

                        {/* Top left badge */}
                        {adventure.tag && (
                          <div className={`absolute top-3.5 left-3.5 text-white text-[10px] font-extrabold px-2.5 py-1.5 rounded-lg uppercase tracking-wider shadow-sm z-10 ${
                            adventure.tag.includes('%') 
                              ? 'bg-orange-500' 
                              : adventure.tag === 'Best Seller' 
                              ? 'bg-blue-600' 
                              : adventure.tag === 'New'
                              ? 'bg-indigo-500'
                              : 'bg-emerald-500'
                          }`}>
                            {adventure.tag}
                          </div>
                        )}

                        {/* Heart icon top right */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(adventure.id);
                          }}
                          className="absolute top-3.5 right-3.5 h-9 w-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-slate-800 transition-colors shadow-sm z-10 cursor-pointer"
                        >
                          <Heart
                            className={`h-4.5 w-4.5 transition-all ${
                              isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-slate-650 hover:text-red-500'
                            }`}
                            strokeWidth={2.5}
                          />
                        </button>
                      </div>

                      {/* Info Details */}
                      <div className="p-5 flex flex-col justify-between items-stretch text-left">
                        <div>
                          {/* Title and Rating */}
                          <div className="flex justify-between items-start gap-3">
                            <h3 className="text-[16px] font-extrabold text-slate-900 group-hover:text-[#0e9488] transition-colors leading-tight">
                              {adventure.name}
                            </h3>
                            <div className="flex items-center gap-1 shrink-0">
                              <Star className="h-3.8 w-3.8 fill-amber-400 text-amber-400 stroke-none" />
                              <span className="text-[13px] font-extrabold text-slate-800">{adventure.rating}</span>
                              <span className="text-[11.5px] font-bold text-slate-450">({adventure.reviewsCount})</span>
                            </div>
                          </div>

                          {/* Location */}
                          <div className="flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-500 mt-2">
                            <MapPin className="h-4 w-4 text-slate-400 shrink-0 stroke-[2]" />
                            <span className="truncate">{adventure.location}</span>
                          </div>

                          {/* Duration & Cancellation tags */}
                          <div className="flex flex-wrap items-center gap-2 mt-4">
                            <span className="bg-slate-50 text-slate-600 border border-slate-100 rounded-lg px-2.5 py-1 text-[11px] font-bold flex items-center gap-1">
                              <svg className="w-3.5 h-3.5 text-slate-450" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              {adventure.duration}
                            </span>
                            <span className="bg-emerald-50 text-emerald-700 rounded-lg px-2.5 py-1 text-[11px] font-bold flex items-center gap-1">
                              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              Free Cancellation
                            </span>
                          </div>
                        </div>

                        {/* Price Details + Action Button */}
                        <div className="border-t border-slate-100 mt-5 pt-4.5 flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <div className="flex flex-col text-left">
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-[19px] font-black text-slate-900">
                                  ₹{adventure.price.toLocaleString()}
                                </span>
                                {adventure.originalPrice > adventure.price && (
                                  <span className="text-[12.5px] font-bold text-slate-400 line-through">
                                    ₹{adventure.originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">/person</span>
                            </div>

                            <button className="bg-[#0e9488] hover:bg-[#0c7a6e] text-white px-5 py-2.5 rounded-xl font-bold text-[13px] shadow-sm hover:shadow transition-all cursor-pointer active:scale-96">
                              Book Now
                            </button>
                          </div>

                          {/* Category Badge placed at the bottom, matching exact screenshot position */}
                          <div className="flex justify-start pt-2 border-t border-slate-100/60">
                            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                              adventure.category === 'Water Sports'
                                ? 'text-blue-600 bg-blue-50/70'
                                : adventure.category === 'Paragliding' || adventure.category === 'Adventure'
                                ? 'text-indigo-600 bg-indigo-50/70'
                                : adventure.category === 'Camping'
                                ? 'text-emerald-600 bg-emerald-50/70'
                                : adventure.category === 'Wildlife Safari'
                                ? 'text-amber-700 bg-amber-50/70'
                                : adventure.category === 'Biking'
                                ? 'text-teal-600 bg-teal-50/70'
                                : 'text-slate-650 bg-slate-50/70'
                            }`}>
                              {adventure.category}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

            {/* Load more button */}
            {sortedAdventures.length > visibleCount && (
              <button 
                onClick={loadMore}
                className="w-full bg-white border border-slate-200 text-slate-700 py-3.5 rounded-2xl text-[13px] font-extrabold hover:bg-slate-50 hover:border-slate-350 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                Load More Adventures
                <ChevronDown className="h-4 w-4 stroke-[2.5]" />
              </button>
            )}

          </main>

          {/* C. RIGHT COLUMN (Interactive styled map & Popular list) */}
          <aside className="lg:col-span-3 xl:col-span-3.5 space-y-7 lg:sticky lg:top-24 self-start">
            
            {/* Map Frame Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-4 flex flex-col items-stretch gap-4">
              
              {/* Checkbox "Search as I move the map" */}
              <div className="flex items-center gap-2.5 cursor-pointer select-none group px-1 text-left">
                <div className="w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all bg-[#0e9488] border-[#0e9488] text-white">
                  <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                </div>
                <span className="text-[13px] font-bold text-slate-750">
                  Search as I move the map
                </span>
              </div>

              {/* Map Holder */}
              <div className="w-full h-[320px] sm:h-[360px] rounded-2xl bg-slate-100 overflow-hidden relative border border-slate-200">
                <iframe
                  src="https://maps.google.com/maps?q=Pondicherry,India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full rounded-2xl border-0"
                  allowFullScreen=""
                  loading="lazy"
                  title="Puducherry Map"
                ></iframe>

                {/* Markers with adventure location overlays matching Puducherry */}
                {/* Marker 1: Top Zone (12 Adventures) */}
                <div className="absolute top-[28%] left-[55%] -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-[#0e9488] hover:bg-[#0c7a6e] border border-white text-white rounded-full font-extrabold text-[12px] px-2.5 py-1.5 shadow-md flex items-center justify-center cursor-pointer select-none transition-all hover:scale-108">
                    12
                  </div>
                </div>

                {/* Marker 2: Outer Zone (8 Adventures) */}
                <div className="absolute top-[38%] left-[78%] -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-[#0e9488] hover:bg-[#0c7a6e] border border-white text-white rounded-full font-extrabold text-[12px] px-2.5 py-1.5 shadow-md flex items-center justify-center cursor-pointer select-none transition-all hover:scale-108">
                    8
                  </div>
                </div>

                {/* Marker 3: Middle Zone (10 Adventures) */}
                <div className="absolute top-[58%] left-[64%] -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-[#0e9488] hover:bg-[#0c7a6e] border border-white text-white rounded-full font-extrabold text-[12px] px-2.5 py-1.5 shadow-md flex items-center justify-center cursor-pointer select-none transition-all hover:scale-108">
                    10
                  </div>
                </div>

                {/* Marker 4: Bottom Zone (7 Adventures) */}
                <div className="absolute top-[75%] left-[48%] -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-[#0e9488] hover:bg-[#0c7a6e] border border-white text-white rounded-full font-extrabold text-[12px] px-2.5 py-1.5 shadow-md flex items-center justify-center cursor-pointer select-none transition-all hover:scale-108">
                    7
                  </div>
                </div>

                {/* Small Hover Image Markers for visual flair */}
                {/* Paraglider card snippet */}
                <div className="absolute top-[44%] left-[45%] -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white p-1 rounded-full shadow-md border border-slate-100 flex items-center justify-center hover:scale-110 transition-transform">
                    <img 
                      src="https://images.unsplash.com/photo-1599422315629-f43c131a6c72?auto=format&fit=crop&w=40&h=40&q=80" 
                      className="w-7 h-7 rounded-full object-cover" 
                      alt="paragliding thumb" 
                    />
                  </div>
                </div>

                {/* Scuba snip */}
                <div className="absolute top-[65%] left-[82%] -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white p-1 rounded-full shadow-md border border-slate-100 flex items-center justify-center hover:scale-110 transition-transform">
                    <img 
                      src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=40&h=40&q=80" 
                      className="w-7 h-7 rounded-full object-cover" 
                      alt="scuba thumb" 
                    />
                  </div>
                </div>

                {/* Zoom overlay buttons */}
                <div className="absolute right-3.5 bottom-3.5 flex flex-col gap-1.5">
                  <button className="h-8.5 w-8.5 bg-white rounded-lg shadow-md border border-slate-100 flex items-center justify-center font-black text-slate-700 hover:bg-slate-50 cursor-pointer text-[17px] leading-none">+</button>
                  <button className="h-8.5 w-8.5 bg-white rounded-lg shadow-md border border-slate-100 flex items-center justify-center font-black text-slate-700 hover:bg-slate-50 cursor-pointer text-[17px] leading-none">-</button>
                </div>

              </div>
            </div>

            {/* Popular Adventures This Week Panel */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-5">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                <h3 className="text-[14.5px] font-extrabold text-slate-900">
                  Popular Adventures This Week
                </h3>
                <button 
                  onClick={() => setSelectedActivityFilter('All Adventures')}
                  className="text-[12px] font-bold text-[#0e9488] hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  View All →
                </button>
              </div>

              {/* Horizontal List of compact items */}
              <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-1">
                {[
                  {
                    name: "Paragliding",
                    price: 3199,
                    rating: 4.8,
                    image: "https://images.unsplash.com/photo-1599422315629-f43c131a6c72?auto=format&fit=crop&w=120&h=90&q=80"
                  },
                  {
                    name: "Scuba Diving",
                    price: 2499,
                    rating: 4.7,
                    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=120&h=90&q=80"
                  },
                  {
                    name: "Wildlife Safari",
                    price: 1299,
                    rating: 4.6,
                    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=120&h=90&q=80"
                  },
                  {
                    name: "Kayaking",
                    price: 899,
                    rating: 4.6,
                    image: "https://images.unsplash.com/photo-1545642111-bc04f13d66b5?auto=format&fit=crop&w=120&h=90&q=80"
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => {
                      setSearchQuery(item.name);
                    }}
                    className="flex flex-col items-stretch min-w-[130px] rounded-2xl border border-slate-150 overflow-hidden bg-slate-50/50 cursor-pointer hover:border-slate-300 transition-colors"
                  >
                    <div className="w-full h-[80px] overflow-hidden">
                      <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                    <div className="p-3 text-left">
                      <h4 className="text-[12.5px] font-extrabold text-slate-800 truncate leading-tight">{item.name}</h4>
                      <div className="flex items-center justify-between mt-2.5">
                        <span className="text-[12px] font-black text-slate-900">₹{item.price.toLocaleString()}</span>
                        <div className="flex items-center gap-0.5 text-amber-500 font-extrabold text-[11px]">
                          ★ <span>{item.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </section>

      {/* 4. FOOTER FEATURE ROW VALUE-PROP BADGES */}
      <section className="w-full bg-[#F1F5F9]/60 border-t border-slate-200/50 py-10">
        <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center text-left">
            
            {[
              {
                title: "Best Price Guarantee",
                description: "Get the best prices or we refund the difference"
              },
              {
                title: "Verified Instructors",
                description: "Experienced & certified professionals"
              },
              {
                title: "Safe & Secure",
                description: "Your safety is our top priority"
              },
              {
                title: "Free Cancellation",
                description: "Cancel up to 24 hours before"
              },
              {
                title: "Instant Confirmation",
                description: "Book now & get instant confirmation"
              }
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="h-10 w-10 shrink-0 bg-[#0e9488]/10 rounded-full flex items-center justify-center text-[#0e9488]">
                  <CheckCircle2 className="w-5.5 h-5.5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-extrabold text-slate-900 leading-none">
                    {feature.title}
                  </span>
                  <span className="text-[11.5px] font-semibold text-slate-450 mt-1.5 leading-normal">
                    {feature.description}
                  </span>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

    </div>
  );
}
