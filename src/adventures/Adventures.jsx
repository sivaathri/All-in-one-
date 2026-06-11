import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, MapPin, Heart, ChevronLeft, ChevronRight, ChevronDown, 
  Check, ShieldCheck, Waves, Wind, Tent, PawPrint, Bike, Ship, 
  SlidersHorizontal, X, Search, Compass, Map, CheckCircle2, RotateCcw,
  Clock, Tag, Locate
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
  const [activeDropdown, setActiveDropdown] = useState(null);
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
      <section className="relative w-full h-[360px] sm:h-[380px] lg:h-[420px] flex items-center ">
        {/* Background Image and clean container crop */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={adventureBg} 
            alt="Adventure Hero" 
            className="w-full h-full object-cover object-center select-none"
          />
          {/* Subtle light overlay for contrast against dark text */}
          <div className="absolute inset-0 "></div>
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
        <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 w-full max-w-[1760px] px-4 sm:px-8 lg:px-12 z-20">
          {activeDropdown && (
            <div 
              className="fixed inset-0 z-30 cursor-default" 
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(null);
              }}
            />
          )}
          <div className="bg-white rounded-2xl border border-slate-200/90 pl-6 pr-4 py-2 shadow-xl shadow-slate-200/35 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2 lg:gap-0 h-auto lg:h-[76px] relative z-40">
            
            {/* Location selector */}
            <div className="flex items-center gap-3 px-4 py-1.5 rounded-2xl hover:bg-slate-50/80 transition-colors cursor-pointer text-left shrink-0">
              <MapPin className="h-5 w-5 text-slate-700 shrink-0 stroke-[1.8]" />
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-slate-800 leading-tight">Where Are You Going?</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[12px] font-semibold text-slate-500">{searchLocation}</span>
                  <button className="text-[11.5px] font-bold text-[#0e9488] hover:underline cursor-pointer">Change</button>
                </div>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block h-8 w-[1px] bg-slate-200/70"></div>

            {/* Keyword Search Input */}
            <div className="flex items-center gap-3 px-4 py-1.5 rounded-2xl hover:bg-slate-50/80 transition-colors flex-1 min-w-[200px] text-left">
              <Search className="h-5 w-5 text-slate-700 shrink-0 stroke-[1.8]" />
              <div className="flex flex-col w-full">
                <span className="text-[13px] font-bold text-slate-800 leading-tight">Search Activities</span>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search adventures, activities..."
                  className="text-[12px] font-medium text-slate-505 bg-transparent outline-none w-full placeholder-slate-400/80 mt-0.5"
                />
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block h-8 w-[1px] bg-slate-200/70"></div>

            {/* Dropdown 1: Activity Type */}
            <div 
              onClick={() => setActiveDropdown(activeDropdown === 'activity' ? null : 'activity')}
              className="flex items-center gap-3 px-4 py-1.5 rounded-2xl hover:bg-slate-50/80 transition-colors flex-1 min-w-[130px] relative text-left group cursor-pointer"
            >
              <Compass className="h-5 w-5 text-slate-700 shrink-0 stroke-[1.8]" />
              <div className="flex flex-col w-full relative">
                <span className="text-[13px] font-bold text-slate-800 leading-tight">Activity Type</span>
                <div className="flex items-center w-full mt-0.5">
                  <span className="text-[12px] font-medium text-slate-505 truncate pr-4">
                    {selectedActivityFilter === 'All Adventures' ? 'All' : selectedActivityFilter}
                  </span>
                  <ChevronDown className="h-3 w-3 text-slate-400 stroke-[2.5] pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 mt-0.5" />
                </div>
              </div>

              {activeDropdown === 'activity' && (
                <div className="absolute top-[105%] left-0 w-full min-w-[220px] bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-45 mt-1 animate-fade-in text-left">
                  {[
                    { value: "All Adventures", label: "All" },
                    { value: "Water Sports", label: "Water Sports" },
                    { value: "Trekking", label: "Trekking" },
                    { value: "Paragliding", label: "Paragliding" },
                    { value: "Camping", label: "Camping" },
                    { value: "Wildlife Safari", label: "Wildlife Safari" },
                    { value: "Biking", label: "Biking" },
                    { value: "Boating", label: "Boating" },
                    { value: "Scuba Diving", label: "Scuba Diving" }
                  ].map((opt) => {
                    const isSelected = selectedActivityFilter === opt.value;
                    return (
                      <div
                        key={opt.value}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedActivityFilter(opt.value);
                          setActiveDropdown(null);
                        }}
                        className={`px-4 py-2 text-[12.5px] transition-colors cursor-pointer hover:bg-slate-50 hover:text-[#0e9488] font-bold ${
                          isSelected ? 'text-[#0e9488] bg-[#0e9488]/5 font-extrabold' : 'text-slate-750'
                        }`}
                      >
                        {opt.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block h-8 w-[1px] bg-slate-200/70"></div>

            {/* Dropdown 2: Duration */}
            <div 
              onClick={() => setActiveDropdown(activeDropdown === 'duration' ? null : 'duration')}
              className="flex items-center gap-3 px-4 py-1.5 rounded-2xl hover:bg-slate-50/80 transition-colors flex-1 min-w-[135px] relative text-left group cursor-pointer"
            >
              <Clock className="h-5 w-5 text-slate-700 shrink-0 stroke-[1.8]" />
              <div className="flex flex-col w-full relative">
                <span className="text-[13px] font-bold text-slate-800 leading-tight">Duration</span>
                <div className="flex items-center w-full mt-0.5">
                  <span className="text-[12px] font-medium text-slate-550 truncate pr-4">
                    {durationFilter}
                  </span>
                  <ChevronDown className="h-3 w-3 text-slate-400 stroke-[2.5] pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 mt-0.5" />
                </div>
              </div>

              {activeDropdown === 'duration' && (
                <div className="absolute top-[105%] left-0 w-full min-w-[180px] bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-45 mt-1 animate-fade-in text-left">
                  {[
                    "Any Duration",
                    "< 2 Hours",
                    "2-5 Hours",
                    "Overnight"
                  ].map((opt) => {
                    const isSelected = durationFilter === opt;
                    return (
                      <div
                        key={opt}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDurationFilter(opt);
                          setActiveDropdown(null);
                        }}
                        className={`px-4 py-2 text-[12.5px] transition-colors cursor-pointer hover:bg-slate-50 hover:text-[#0e9488] font-bold ${
                          isSelected ? 'text-[#0e9488] bg-[#0e9488]/5 font-extrabold' : 'text-slate-750'
                        }`}
                      >
                        {opt}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block h-8 w-[1px] bg-slate-200/70"></div>

            {/* Dropdown 3: Price Range */}
            <div 
              onClick={() => setActiveDropdown(activeDropdown === 'price' ? null : 'price')}
              className="flex items-center gap-3 px-4 py-1.5 rounded-2xl hover:bg-slate-50/80 transition-colors flex-1 min-w-[130px] relative text-left group cursor-pointer"
            >
              <Tag className="h-5 w-5 text-slate-700 shrink-0 stroke-[1.8]" />
              <div className="flex flex-col w-full relative">
                <span className="text-[13px] font-bold text-slate-800 leading-tight">Price Range</span>
                <div className="flex items-center w-full mt-0.5">
                  <span className="text-[12px] font-medium text-slate-550 truncate pr-4">
                    {searchPrice}
                  </span>
                  <ChevronDown className="h-3 w-3 text-slate-400 stroke-[2.5] pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 mt-0.5" />
                </div>
              </div>

              {activeDropdown === 'price' && (
                <div className="absolute top-[105%] left-0 w-full min-w-[200px] bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-45 mt-1 animate-fade-in text-left">
                  {[
                    "Any Price",
                    "Under ₹1,000",
                    "₹1,000 - ₹3,000",
                    "₹3,000+"
                  ].map((opt) => {
                    const isSelected = searchPrice === opt;
                    return (
                      <div
                        key={opt}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchPrice(opt);
                          if (opt === 'Any Price') setPriceRange(20000);
                          else if (opt === 'Under ₹1,000') setPriceRange(1000);
                          else if (opt === '₹1,000 - ₹3,000') setPriceRange(3000);
                          else if (opt === '₹3,000+') setPriceRange(20000);
                          setActiveDropdown(null);
                        }}
                        className={`px-4 py-2 text-[12.5px] transition-colors cursor-pointer hover:bg-slate-50 hover:text-[#0e9488] font-bold ${
                          isSelected ? 'text-[#0e9488] bg-[#0e9488]/5 font-extrabold' : 'text-slate-750'
                        }`}
                      >
                        {opt}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block h-8 w-[1px] bg-slate-200/70"></div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pl-3 pr-2 lg:pr-0 shrink-0">
              <button className="bg-[#0B756B] hover:bg-[#095f57] text-white px-8 py-3 rounded-2xl font-bold text-[14px] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-teal-700/5 hover:scale-102 h-[46px]">
                Search
              </button>
              
              
            </div>

          </div>
        </div>
      </section>

    
    </div>
  );
}
