import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, MapPin, Heart, ChevronDown, ChevronUp, Check, Search, 
  Grid, List, Compass, Clock, Navigation, Plus, Minus, ArrowRight, Locate, RotateCcw, Tag
} from 'lucide-react';
import adventureBg from '../assets/adventurebg.png';

// Mock Data for adventures matching the user's design screenshot
const INITIAL_ADVENTURES = [
  {
    id: 1,
    name: "Scuba Diving",
    location: "Havelock Island, Pondicherry",
    duration: "2-3 hours",
    rating: 4.7,
    reviewsCount: "3.3K",
    price: 2499,
    originalPrice: 2499,
    tag: "Best Seller",
    category: "Scuba Diving",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Paragliding Adventure",
    location: "Bir-Billing, Himachal Pradesh",
    duration: "15-30 mins",
    rating: 4.8,
    reviewsCount: "2.5K",
    price: 2899,
    originalPrice: 3399,
    tag: "15% OFF",
    category: "Paragliding",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Kayaking in Backwaters",
    location: "Kumarakom, Kerala",
    duration: "1-2 hours",
    rating: 4.6,
    reviewsCount: "1.8K",
    price: 999,
    originalPrice: 999,
    tag: "Popular",
    category: "Water Sports",
    image: "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Camping by the Lake",
    location: "Jaisalmer, Rajasthan",
    duration: "Overnight",
    rating: 4.9,
    reviewsCount: "718",
    price: 1799,
    originalPrice: 1799,
    tag: "New",
    category: "Camping",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Wildlife Safari",
    location: "Jim Corbett, Uttarakhand",
    duration: "3-4 hours",
    rating: 4.8,
    reviewsCount: "2.1K",
    price: 1799,
    originalPrice: 1799,
    tag: "Popular",
    category: "Wildlife Safari",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Mountain Biking",
    location: "Manali, Himachal Pradesh",
    duration: "3 hours",
    rating: 4.7,
    reviewsCount: "913",
    price: 1699,
    originalPrice: 1999,
    tag: "15% OFF",
    category: "Biking",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    name: "Baraka River Ride",
    location: "Sri Lanka, Kitulgala",
    duration: "2-3 hours",
    rating: 4.6,
    reviewsCount: "1.2K",
    price: 799,
    originalPrice: 799,
    tag: null,
    category: "Boating",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "Rappelling",
    location: "Wayanad, Kerala",
    duration: "2 hours",
    rating: 4.7,
    reviewsCount: "718",
    price: 2199,
    originalPrice: 2199,
    tag: null,
    category: "Trekking",
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
  const color = isSelected ? "#0B756B" : "#475569";
  
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
  // State variables for filter categories and values
  const [selectedCategory, setSelectedCategory] = useState('All Adventures');
  const [searchQuery, setSearchQuery] = useState('');
  const [mapSearch, setMapSearch] = useState('');
  const [searchAsMove, setSearchAsMove] = useState(true);
  const [sortBy, setSortBy] = useState('Popular');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [searchLocation, setSearchLocation] = useState('Puducherry, India');
  const [searchPrice, setSearchPrice] = useState('Any Price');
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // Sidebar state filters
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
  const [priceRange, setPriceRange] = useState(2099); // Defaults to ₹2099+ matching layout
  const [ratingFilter, setRatingFilter] = useState('All Ratings');
  const [wishlist, setWishlist] = useState({});
  const [hoveredAdventure, setHoveredAdventure] = useState(null);
  
  // UI state filters
  const [showAllActivitiesInSidebar, setShowAllActivitiesInSidebar] = useState(false);
  const [durationDropdownOpen, setDurationDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

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
        // If nothing is checked, fallback to All Activities
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
    setPriceRange(2099);
    setRatingFilter('All Ratings');
    setSearchQuery('');
    setMapSearch('');
    setSelectedCategory('All Adventures');
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Main Filtering Logic
  const filteredAdventures = INITIAL_ADVENTURES.filter(item => {
    // 1. Text Search Input Query (Map Search or Main Search)
    const activeSearch = mapSearch || searchQuery;
    if (activeSearch) {
      const q = activeSearch.toLowerCase();
      const matchText = item.name.toLowerCase().includes(q) || item.location.toLowerCase().includes(q);
      if (!matchText) return false;
    }

    // 2. Categories Pill Selection
    if (selectedCategory !== 'All Adventures') {
      if (item.category !== selectedCategory) {
        // loose match if category differs
        if (selectedCategory === 'Water Sports' && item.category !== 'Water Sports' && item.category !== 'Scuba Diving') return false;
        if (selectedCategory === 'Scuba Diving' && item.category !== 'Scuba Diving') return false;
        if (selectedCategory !== 'Water Sports' && selectedCategory !== 'Scuba Diving' && item.category !== selectedCategory) return false;
      }
    }

    // 3. Sidebar Activity Type Checkbox Filters
    if (!activitiesFilter['All Activities']) {
      const activeKeys = Object.keys(activitiesFilter).filter(k => activitiesFilter[k]);
      const matchesCheckbox = activeKeys.some(key => {
        if (key === 'Water Sports') return item.category === 'Water Sports' || item.category === 'Scuba Diving';
        return item.category === key;
      });
      if (!matchesCheckbox) return false;
    }

    // 4. Duration Filter
    if (durationFilter !== 'Any Duration') {
      if (durationFilter === '< 2 Hours' && item.duration.includes('mins')) return true;
      if (durationFilter === '< 2 Hours' && item.duration.includes('hour')) {
        const floatHrs = parseFloat(item.duration);
        if (floatHrs >= 2) return false;
      }
      if (durationFilter === '2-5 Hours' && item.duration.includes('hour')) {
        const floatHrs = parseFloat(item.duration);
        if (floatHrs < 2 || floatHrs > 5) return false;
      }
      if (durationFilter === 'Overnight' && !item.duration.toLowerCase().includes('overnight')) return false;
    }

    // 5. Price Slider (Up to current value. If slider is near max 2099, treat as all/any price)
    if (priceRange < 2099) {
      if (item.price > priceRange) return false;
    }

    // 6. Rating Filter
    if (ratingFilter !== 'All Ratings') {
      const minRating = parseFloat(ratingFilter);
      if (item.rating < minRating) return false;
    }

    return true;
  });

  // Sorting Logic
  const sortedAdventures = [...filteredAdventures].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    if (sortBy === 'Rating') return b.rating - a.rating;
    
    // Default Popular sorting parses numeric part of "3.3K" etc.
    const parseReviews = (str) => {
      if (str.endsWith('K')) return parseFloat(str) * 1000;
      return parseInt(str) || 0;
    };
    return parseReviews(b.reviewsCount) - parseReviews(a.reviewsCount);
  });

  // Close dropdowns on outside click helper
  useEffect(() => {
    const handleOutsideClick = () => {
      setDurationDropdownOpen(false);
      setSortDropdownOpen(false);
      setActiveDropdown(null);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }} className="bg-[#F8FAFC] min-h-screen text-[#0F172A] w-full">
      {/* Dynamic Range Slider Styles */}
      <style>{`
        .custom-slider::-webkit-slider-runnable-track {
          background: #E2E8F0;
          height: 6px;
          border-radius: 9999px;
        }
        .custom-slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #0B756B;
          border: 2px solid #FFFFFF;
          box-shadow: 0 2px 4px rgba(11, 117, 107, 0.3);
          cursor: pointer;
          margin-top: -6px;
          transition: all 0.15s ease;
        }
        .custom-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .custom-slider::-moz-range-track {
          background: #E2E8F0;
          height: 6px;
          border-radius: 9999px;
        }
        .custom-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #0B756B;
          border: 2px solid #FFFFFF;
          box-shadow: 0 2px 4px rgba(11, 117, 107, 0.3);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .custom-slider::-moz-range-thumb:hover {
          transform: scale(1.15);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* 1. HERO SECTION WITH ACCENT HEADER */}
      <section className="relative w-full h-[360px] sm:h-[380px] lg:h-[420px] flex items-center mb-6">
        {/* Background Image and clean container crop */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={adventureBg} 
            alt="Adventure Hero" 
            className="w-full h-full object-cover object-center select-none"
          />
          {/* Subtle light overlay for contrast against dark text */}
          <div className="absolute inset-0 bg-slate-900/5"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1760px] mx-auto w-full px-4 sm:px-8 lg:px-12 text-left mt-[-30px]">
          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12] text-[#0D233A] max-w-xl">
            Find Your Next <br />
            <span style={{ fontFamily: "'Caveat', 'Playball', cursive" }} className="text-[#0B756B] text-5xl sm:text-6xl lg:text-[72px] relative inline-block mt-1.5 font-normal tracking-wide">
              Adventure
              {/* Highlight sparkles rays doodle */}
              <svg className="absolute right-[-32px] top-[14px] w-6 h-6 text-[#0B756B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
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
                  <button className="text-[11.5px] font-bold text-[#0B756B] hover:underline cursor-pointer">Change</button>
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
                  className="text-[12px] font-medium text-slate-650 bg-transparent outline-none w-full placeholder-slate-400/80 mt-0.5"
                />
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block h-8 w-[1px] bg-slate-200/70"></div>

            {/* Dropdown 1: Activity Type */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === 'activity' ? null : 'activity');
              }}
              className="flex items-center gap-3 px-4 py-1.5 rounded-2xl hover:bg-slate-50/80 transition-colors flex-1 min-w-[130px] relative text-left group cursor-pointer"
            >
              <Compass className="h-5 w-5 text-slate-700 shrink-0 stroke-[1.8]" />
              <div className="flex flex-col w-full relative">
                <span className="text-[13px] font-bold text-slate-800 leading-tight">Activity Type</span>
                <div className="flex items-center w-full mt-0.5">
                  <span className="text-[12px] font-medium text-slate-650 truncate pr-4">
                    {selectedCategory}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400 stroke-[2.5] pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 mt-0.5" />
                </div>
              </div>

              {activeDropdown === 'activity' && (
                <div className="absolute top-[105%] left-0 w-full min-w-[220px] bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-45 mt-1 animate-fade-in text-left">
                  {CATEGORIES.map((opt) => {
                    const isSelected = selectedCategory === opt.name;
                    return (
                      <div
                        key={opt.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCategory(opt.name);
                          setActiveDropdown(null);
                        }}
                        className={`px-4 py-2 text-[12.5px] transition-colors cursor-pointer hover:bg-slate-50 hover:text-[#0B756B] font-bold ${
                          isSelected ? 'text-[#0B756B] bg-[#ECFDF5]/50 font-extrabold' : 'text-slate-700'
                        }`}
                      >
                        {opt.name}
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
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === 'duration' ? null : 'duration');
              }}
              className="flex items-center gap-3 px-4 py-1.5 rounded-2xl hover:bg-slate-50/80 transition-colors flex-1 min-w-[135px] relative text-left group cursor-pointer"
            >
              <Clock className="h-5 w-5 text-slate-700 shrink-0 stroke-[1.8]" />
              <div className="flex flex-col w-full relative">
                <span className="text-[13px] font-bold text-slate-800 leading-tight">Duration</span>
                <div className="flex items-center w-full mt-0.5">
                  <span className="text-[12px] font-medium text-slate-650 truncate pr-4">
                    {durationFilter}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400 stroke-[2.5] pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 mt-0.5" />
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
                        className={`px-4 py-2 text-[12.5px] transition-colors cursor-pointer hover:bg-slate-50 hover:text-[#0B756B] font-bold ${
                          isSelected ? 'text-[#0B756B] bg-[#ECFDF5]/50 font-extrabold' : 'text-slate-700'
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
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === 'price' ? null : 'price');
              }}
              className="flex items-center gap-3 px-4 py-1.5 rounded-2xl hover:bg-slate-50/80 transition-colors flex-1 min-w-[130px] relative text-left group cursor-pointer"
            >
              <Tag className="h-5 w-5 text-slate-700 shrink-0 stroke-[1.8]" />
              <div className="flex flex-col w-full relative">
                <span className="text-[13px] font-bold text-slate-800 leading-tight">Price Range</span>
                <div className="flex items-center w-full mt-0.5">
                  <span className="text-[12px] font-medium text-slate-650 truncate pr-4">
                    {searchPrice}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400 stroke-[2.5] pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 mt-0.5" />
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
                          if (opt === 'Any Price') setPriceRange(2099);
                          else if (opt === 'Under ₹1,000') setPriceRange(1000);
                          else if (opt === '₹1,000 - ₹3,000') setPriceRange(3000);
                          else if (opt === '₹3,000+') setPriceRange(2099);
                          setActiveDropdown(null);
                        }}
                        className={`px-4 py-2 text-[12.5px] transition-colors cursor-pointer hover:bg-slate-50 hover:text-[#0B756B] font-bold ${
                          isSelected ? 'text-[#0B756B] bg-[#ECFDF5]/50 font-extrabold' : 'text-slate-750'
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
              <button 
                onClick={handleResetFilters}
                className="bg-[#0B756B] hover:bg-[#095f57] text-white px-8 py-3 rounded-2xl font-bold text-[14px] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-teal-700/5 hover:scale-102 h-[46px]"
              >
                Search
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Main Grid Outer Container */}
      <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Double-Column Master Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          {/* LEFT CONTAINER (Pills, Filter Sidebar & Grid list of Adventures) - COL SPAN 9 */}
          <div className="xl:col-span-9 flex flex-col gap-6">
            
            {/* Horizontal Row of Category Pills */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 pt-1">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`flex flex-col items-center justify-center min-w-[108px] h-[92px] px-3 rounded-2xl border transition-all duration-300 ${
                      isSelected 
                        ? 'border-[#0B756B] bg-[#ECFDF5]/50 text-[#0B756B] shadow-sm font-bold scale-[1.02]' 
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-350 hover:bg-slate-50/50'
                    }`}
                  >
                    <span className="mb-2 transition-transform duration-300 group-hover:scale-105">
                      {getCategoryIcon(cat.name, isSelected)}
                    </span>
                    <span className="text-[11.5px] font-semibold leading-tight text-center truncate w-full">
                      {cat.name}
                    </span>
                  </button>
                );
              })}
              
              {/* Extra "More" Pill */}
              <button
                onClick={() => setSelectedCategory('All Adventures')}
                className="flex flex-col items-center justify-center min-w-[108px] h-[92px] px-3 rounded-2xl border border-slate-200 bg-white text-slate-700 hover:border-slate-350 hover:bg-slate-50/50 transition-all duration-300"
              >
                <span className="mb-2">
                  {getCategoryIcon('More', false)}
                </span>
                <span className="text-[11.5px] font-semibold leading-tight text-center">
                  More
                </span>
              </button>
            </div>

            {/* Sidebar + Listing Row Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* FILTER SIDEBAR (lg:col-span-3) */}
              <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 p-6 flex flex-col gap-5 shadow-sm">
                
                {/* Filters Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">Filters</h2>
                  <button 
                    onClick={handleResetFilters}
                    className="text-sm font-semibold text-[#0B756B] hover:text-[#095f57] hover:underline transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {/* 1. Activity Type Checklist */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between text-slate-800 cursor-pointer">
                    <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">Activity Type</span>
                    <ChevronUp className="h-4 w-4 text-slate-400" />
                  </div>

                  <div className="flex flex-col gap-2.5 mt-1">
                    {/* All Activities Option */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={activitiesFilter['All Activities']}
                          onChange={() => handleActivityCheckbox('All Activities')}
                          className="sr-only"
                        />
                        <div className={`w-[19px] h-[19px] border rounded-md transition-all duration-200 flex items-center justify-center ${
                          activitiesFilter['All Activities']
                            ? 'bg-[#0B756B] border-[#0B756B]' 
                            : 'border-slate-300 bg-white group-hover:border-[#0B756B]'
                        }`}>
                          {activitiesFilter['All Activities'] && <Check className="h-3.5 w-3.5 text-white stroke-[3]" />}
                        </div>
                      </div>
                      <span className={`text-[13.5px] ${activitiesFilter['All Activities'] ? 'font-semibold text-slate-900' : 'text-slate-650'}`}>
                        All Activities
                      </span>
                    </label>

                    {/* Individual Checkbox Listing */}
                    {Object.keys(activitiesFilter)
                      .filter(key => key !== 'All Activities')
                      .slice(0, showAllActivitiesInSidebar ? undefined : 5)
                      .map((key) => {
                        const isChecked = activitiesFilter[key];
                        return (
                          <label key={key} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleActivityCheckbox(key)}
                                className="sr-only"
                              />
                              <div className={`w-[19px] h-[19px] border rounded-md transition-all duration-200 flex items-center justify-center ${
                                isChecked
                                  ? 'bg-[#0B756B] border-[#0B756B]' 
                                  : 'border-slate-300 bg-white group-hover:border-[#0B756B]'
                              }`}>
                                {isChecked && <Check className="h-3.5 w-3.5 text-white stroke-[3]" />}
                              </div>
                            </div>
                            <span className={`text-[13.5px] ${isChecked ? 'font-semibold text-slate-900' : 'text-slate-650'}`}>
                              {key}
                            </span>
                          </label>
                        );
                      })}

                    {/* Toggle Show More/Less */}
                    <button 
                      onClick={() => setShowAllActivitiesInSidebar(!showAllActivitiesInSidebar)}
                      className="text-[13px] font-bold text-[#0B756B] hover:text-[#095f57] hover:underline flex items-center gap-1 mt-1 cursor-pointer"
                    >
                      <span>{showAllActivitiesInSidebar ? 'Show Less' : '+ More'}</span>
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-100"></div>

                {/* 2. Duration Dropdown Select */}
                <div className="flex flex-col gap-2 relative">
                  <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-1">Duration</span>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDurationDropdownOpen(!durationDropdownOpen);
                      setSortDropdownOpen(false);
                    }}
                    className="flex items-center justify-between border border-slate-200 bg-slate-50/50 hover:bg-slate-50 rounded-xl px-4 py-3 text-[13.5px] font-medium text-slate-700 w-full transition-colors"
                  >
                    <span>{durationFilter}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${durationDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Options */}
                  {durationDropdownOpen && (
                    <div className="absolute top-[102%] left-0 w-full bg-white border border-slate-100 rounded-xl shadow-xl py-1.5 z-30 animate-fade-in">
                      {['Any Duration', '< 2 Hours', '2-5 Hours', 'Overnight'].map((opt) => (
                        <div
                          key={opt}
                          onClick={() => {
                            setDurationFilter(opt);
                            setDurationDropdownOpen(false);
                          }}
                          className={`px-4 py-2.5 text-sm cursor-pointer transition-colors hover:bg-slate-50 ${
                            durationFilter === opt ? 'text-[#0B756B] bg-[#ECFDF5]/50 font-bold' : 'text-slate-700'
                          }`}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100"></div>

                {/* 3. Price Range Slider */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">Price Range</span>
                  
                  <div className="flex items-center justify-between text-[13.5px] font-bold text-slate-800">
                    <span>₹0</span>
                    <span>{priceRange >= 2099 ? '₹2,099+' : `₹${priceRange.toLocaleString()}`}</span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="2099"
                    step="50"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="custom-slider w-full h-1.5 rounded-lg appearance-none cursor-pointer outline-none bg-slate-200 mt-1"
                  />
                </div>

                <div className="border-t border-slate-100"></div>

                {/* 4. Rating Checklist */}
                <div className="flex flex-col gap-3">
                  <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">Rating</span>

                  <div className="flex flex-col gap-3 mt-1">
                    {/* All Ratings */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="rating"
                        checked={ratingFilter === 'All Ratings'}
                        onChange={() => setRatingFilter('All Ratings')}
                        className="sr-only"
                      />
                      <div className={`w-[18px] h-[18px] rounded-full border transition-all duration-200 flex items-center justify-center ${
                        ratingFilter === 'All Ratings'
                          ? 'border-[#0B756B]' 
                          : 'border-slate-350 bg-white group-hover:border-[#0B756B]'
                      }`}>
                        {ratingFilter === 'All Ratings' && (
                          <div className="w-[10px] h-[10px] rounded-full bg-[#0B756B]"></div>
                        )}
                      </div>
                      <span className={`text-[13.5px] ${ratingFilter === 'All Ratings' ? 'font-bold text-[#0B756B]' : 'text-slate-650'}`}>
                        All Ratings
                      </span>
                    </label>

                    {/* Ratings Levels matching screenshot visual bug precisely */}
                    {[
                      { rating: '4.5', activeCount: 1 },
                      { rating: '4.0', activeCount: 2 },
                      { rating: '3.5', activeCount: 3 }
                    ].map((lvl) => {
                      const labelText = `${lvl.rating} & above`;
                      const isSelected = ratingFilter === lvl.rating;
                      return (
                        <label key={lvl.rating} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="rating"
                            checked={isSelected}
                            onChange={() => setRatingFilter(lvl.rating)}
                            className="sr-only"
                          />
                          <div className={`w-[18px] h-[18px] rounded-full border transition-all duration-200 flex items-center justify-center ${
                            isSelected
                              ? 'border-[#0B756B]' 
                              : 'border-slate-350 bg-white group-hover:border-[#0B756B]'
                          }`}>
                            {isSelected && (
                              <div className="w-[10px] h-[10px] rounded-full bg-[#0B756B]"></div>
                            )}
                          </div>
                          
                          {/* Render Stars row precisely to mirror screenshot design */}
                          <div className="flex items-center gap-0.5 mr-1">
                            {[1, 2, 3, 4, 5].map((sIndex) => {
                              const isFilled = sIndex <= lvl.activeCount;
                              return (
                                <Star
                                  key={sIndex}
                                  className={`w-3.5 h-3.5 stroke-[1.8] ${
                                    isFilled 
                                      ? 'text-amber-450 fill-amber-400 stroke-amber-400' 
                                      : 'text-slate-300 stroke-slate-300'
                                  }`}
                                />
                              );
                            })}
                          </div>

                          <span className={`text-[13.5px] ${isSelected ? 'font-bold text-[#0B756B]' : 'text-slate-650'}`}>
                            {labelText}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Apply Filters Button */}
                <button 
                  onClick={handleResetFilters}
                  className="bg-[#0B756B] hover:bg-[#095f57] text-white py-3 rounded-2xl w-full font-bold text-[14px] shadow-md transition-colors mt-2 cursor-pointer"
                >
                  Apply Filters
                </button>
              </div>

              {/* ADVENTURES GRID VIEW (lg:col-span-9) */}
              <div className="lg:col-span-9 flex flex-col gap-5">
                
                {/* Grid Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-[17px] font-extrabold text-slate-800">
                    {sortedAdventures.length === INITIAL_ADVENTURES.length 
                      ? '128+ Adventures Found' 
                      : `${sortedAdventures.length} Adventure${sortedAdventures.length === 1 ? '' : 's'} Found`}
                  </h3>
                  
                  <div className="flex items-center gap-3">
                    {/* Sort Dropdown */}
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSortDropdownOpen(!sortDropdownOpen);
                          setDurationDropdownOpen(false);
                        }}
                        className="flex items-center gap-2 border border-slate-200 bg-white rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-slate-450 font-normal">Sort by:</span>
                        <span className="text-slate-800 font-bold">{sortBy}</span>
                        <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                      </button>

                      {sortDropdownOpen && (
                        <div className="absolute right-0 top-[102%] w-48 bg-white border border-slate-100 rounded-xl shadow-xl py-1.5 z-30 animate-fade-in text-left">
                          {['Popular', 'Price: Low to High', 'Price: High to Low', 'Rating'].map((opt) => (
                            <div
                              key={opt}
                              onClick={() => {
                                setSortBy(opt);
                                setSortDropdownOpen(false);
                              }}
                              className={`px-4 py-2 text-xs font-bold cursor-pointer transition-colors hover:bg-slate-50 ${
                                sortBy === opt ? 'text-[#0B756B] bg-[#ECFDF5]/50 font-extrabold' : 'text-slate-700'
                              }`}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Layout Toggles */}
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white p-0.5">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors ${
                          viewMode === 'grid' 
                            ? 'bg-[#0B756B] text-white shadow-sm' 
                            : 'text-slate-400 hover:text-slate-650'
                        }`}
                      >
                        <Grid className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-colors ${
                          viewMode === 'list' 
                            ? 'bg-[#0B756B] text-white shadow-sm' 
                            : 'text-slate-400 hover:text-slate-650'
                        }`}
                      >
                        <List className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Adventure Cards Grid Listing */}
                {sortedAdventures.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-slate-200 border-dashed py-16 px-6 text-center flex flex-col items-center justify-center">
                    <Compass className="h-12 w-12 text-slate-350 stroke-[1.5] mb-3" />
                    <h4 className="text-base font-bold text-slate-800">No Adventures Match Filters</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-[280px]">Try resetting filters or adjusting search keyword queries.</p>
                    <button 
                      onClick={handleResetFilters}
                      className="mt-4 px-5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className={`grid gap-4 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4' 
                      : 'grid-cols-1'
                  }`}>
                    {sortedAdventures.map((adv) => {
                      const isWishlisted = !!wishlist[adv.id];
                      return (
                        <div
                          key={adv.id}
                          onMouseEnter={() => setHoveredAdventure(adv.id)}
                          onMouseLeave={() => setHoveredAdventure(null)}
                          className={`bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex overflow-hidden group ${
                            viewMode === 'grid' ? 'flex-col' : 'flex-row'
                          } ${hoveredAdventure === adv.id ? 'scale-[1.01] border-[#0B756B]/30' : ''}`}
                        >
                          
                          {/* Image Box */}
                          <div className={`relative overflow-hidden ${
                            viewMode === 'grid' ? 'h-[170px] w-full' : 'h-[180px] w-[240px] shrink-0'
                          }`}>
                            <img
                              src={adv.image}
                              alt={adv.name}
                              className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                            />
                            
                            {/* Card badge overlays */}
                            {adv.tag && (
                              <div className={`absolute top-3 left-3 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm select-none ${
                                adv.tag === 'Best Seller' ? 'bg-[#2563EB] text-white' :
                                adv.tag.includes('OFF') ? 'bg-[#F97316] text-white' :
                                adv.tag === 'Popular' ? 'bg-[#10B981] text-white' :
                                'bg-[#8B5CF6] text-white'
                              }`}>
                                {adv.tag}
                              </div>
                            )}

                            {/* Wishlist Heart Overlay */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleWishlist(adv.id);
                              }}
                              className="absolute top-3 right-3 p-2 bg-white/70 hover:bg-white backdrop-blur-md border border-slate-100 rounded-full shadow-sm text-slate-600 hover:text-red-500 transition-all cursor-pointer"
                            >
                              <Heart 
                                className={`h-4.5 w-4.5 transition-all ${
                                  isWishlisted ? 'fill-red-500 text-red-500 scale-110' : 'text-white'
                                }`} 
                                strokeWidth={isWishlisted ? 0 : 2}
                                fill={isWishlisted ? '#ef4444' : 'none'}
                              />
                            </button>
                          </div>

                          {/* Details Body */}
                          <div className="p-4 flex flex-col flex-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B756B]/80 select-none">
                              {adv.category}
                            </span>
                            
                            <h4 className="text-[14.5px] font-extrabold text-slate-800 line-clamp-1 mt-0.5">
                              {adv.name}
                            </h4>

                            {/* Location */}
                            <div className="flex items-center gap-1.5 text-[11.5px] text-slate-500 font-medium mt-1">
                              <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0 stroke-[1.8]" />
                              <span className="truncate">{adv.location}</span>
                            </div>

                            {/* Info Row (Duration & Ratings) */}
                            <div className="flex items-center justify-between text-[11.5px] text-slate-500 border-t border-slate-100/80 pt-3 mt-3">
                              <div className="flex items-center gap-1.5 font-semibold text-slate-600">
                                <Clock className="h-3.5 w-3.5 text-slate-400 stroke-[1.8]" />
                                <span>{adv.duration}</span>
                              </div>
                              <div className="flex items-center gap-1 font-bold text-slate-700">
                                <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 stroke-amber-400" />
                                <span>{adv.rating}</span>
                                <span className="text-slate-400 font-medium text-[10.5px]">({adv.reviewsCount})</span>
                              </div>
                            </div>

                            {/* Price / Action Row */}
                            <div className="flex items-center justify-between mt-4 border-t border-slate-100/80 pt-3.5">
                              <div>
                                {adv.originalPrice !== adv.price ? (
                                  <div className="flex items-baseline gap-1.5">
                                    <span className="text-slate-400 line-through text-[12.5px] font-bold">
                                      ₹{adv.originalPrice.toLocaleString()}
                                    </span>
                                    <span className="text-slate-850 font-black text-[15.5px]">
                                      ₹{adv.price.toLocaleString()}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-[#0B756B] font-black text-[15.5px]">
                                    ₹{adv.price.toLocaleString()} <span className="text-slate-400 text-[10.5px] font-bold">/ person</span>
                                  </span>
                                )}
                              </div>
                              
                              <button className="text-[12px] font-black text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer">
                                View Details
                              </button>
                            </div>

                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            </div>

          </div>

          {/* RIGHT CONTAINER (Map Widget & Popular Adventures This Week) - COL SPAN 3 */}
          <div className="xl:col-span-3 flex flex-col gap-6 w-full lg:sticky lg:top-6">
            {/* Map Widget Box */}
            <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden relative shadow-sm h-[480px] w-full group">
              
              {/* Search as I move the map checkbox overlay */}
              <div 
                onClick={() => setSearchAsMove(!searchAsMove)}
                className="absolute top-4 left-4 z-10 bg-white rounded-xl shadow-md border border-slate-100 flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer transition-shadow hover:shadow-lg select-none"
              >
                <div className={`w-[19px] h-[19px] rounded-md flex items-center justify-center transition-colors duration-200 shrink-0 ${
                  searchAsMove ? 'bg-[#0B756B]' : 'border border-slate-300 bg-white'
                }`}>
                  {searchAsMove && <Check className="h-3.5 w-3.5 text-white stroke-[3.5]" />}
                </div>
                <span className="text-[12.5px] font-bold text-slate-800 tracking-tight">
                  Search as I move the map
                </span>
              </div>

              {/* Vector Mockup Map of Puducherry (rendered in clean, interactive SVG) */}
              <div className="w-full h-full relative z-0">
                <svg className="w-full h-full object-cover select-none" viewBox="0 0 400 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Sea area */}
                  <rect width="400" height="480" fill="#CBE5F8" />
                  
                  {/* Land Mass layout for Puducherry */}
                  <path 
                    d="M0,0 L295,0 C275,110 245,220 265,320 C275,370 215,430 195,480 L0,480 Z" 
                    fill="#F9F9F6" 
                    stroke="#E6E5DF" 
                    strokeWidth="2" 
                  />
                  
                  {/* Lakes / Backwaters */}
                  <path d="M 60,180 C 80,180 120,200 130,220 C 140,240 100,260 70,250 C 40,240 40,180 60,180 Z" fill="#CBE5F8" opacity="0.75" />
                  <path d="M 10,380 C 30,370 60,390 70,410 C 80,430 50,450 30,440 Z" fill="#CBE5F8" opacity="0.75" />

                  {/* Forest / Greenery patches */}
                  <path d="M 40,60 C 70,50 90,80 70,100 C 50,120 30,100 40,60 Z" fill="#EBF5EA" />
                  <path d="M 110,290 C 150,280 170,310 140,340 C 120,360 90,340 110,290 Z" fill="#EBF5EA" />
                  <rect x="190" y="90" width="35" height="50" rx="8" fill="#EBF5EA" />

                  {/* Main Roads network (yellow/orange roads matching screenshot) */}
                  <path d="M 120,0 C 135,110 115,220 130,320 C 140,390 105,480 105,480" stroke="#FFF" strokeWidth="4.5" strokeLinecap="round" />
                  <path d="M 120,0 C 135,110 115,220 130,320 C 140,390 105,480 105,480" stroke="#FBD7A3" strokeWidth="2.2" strokeLinecap="round" />
                  
                  <path d="M 0,110 C 110,120 210,90 272,105" stroke="#FFF" strokeWidth="3.5" />
                  <path d="M 0,110 C 110,120 210,90 272,105" stroke="#FBD7A3" strokeWidth="1.8" />
                  
                  <path d="M 0,230 C 110,230 190,250 250,240" stroke="#FFF" strokeWidth="3.5" />
                  <path d="M 0,230 C 110,230 190,250 250,240" stroke="#FBD7A3" strokeWidth="1.8" />

                  <path d="M 0,370 C 90,360 160,390 212,400" stroke="#FFF" strokeWidth="3.5" />
                  <path d="M 0,370 C 90,360 160,390 212,400" stroke="#FBD7A3" strokeWidth="1.8" />

                  {/* Centered label */}
                  <text x="160" y="222" fill="#475569" fontFamily="system-ui" fontWeight="600" fontSize="16" letterSpacing="0.2" opacity="0.9">Puducherry</text>
                </svg>

                {/* ABSOLUTE MAP AVATAR PIN MARKERS WITH GREEN HALOS (Matching screenshot coordinate layout) */}
                {/* 1. Biking Avatar Pin (ID: 6) - Left, Mid-height */}
                <div 
                  onClick={() => { setSelectedCategory('Biking'); setSearchQuery('Mountain Biking'); }}
                  style={{ top: '45%', left: '17%' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-10 flex items-center justify-center"
                >
                  <div className={`w-14 h-14 rounded-full bg-[#0B756B]/15 border border-[#0B756B]/25 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    hoveredAdventure === 6 ? 'scale-120 bg-[#0B756B]/25 border-[#0B756B]/40 ring-4 ring-[#ECFDF5]/80' : ''
                  }`}>
                    <div className="w-[44px] h-[44px] rounded-full border-[2.5px] border-white overflow-hidden shadow-sm bg-white">
                      <img src={INITIAL_ADVENTURES[5].image} alt="Biking" className="w-full h-full object-cover select-none" />
                    </div>
                  </div>
                </div>

                {/* 2. Paragliding Avatar Pin (ID: 2) - Top-left, Center */}
                <div 
                  onClick={() => { setSelectedCategory('Paragliding'); setSearchQuery('Paragliding Adventure'); }}
                  style={{ top: '37%', left: '32%' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-10 flex items-center justify-center"
                >
                  <div className={`w-14 h-14 rounded-full bg-[#0B756B]/15 border border-[#0B756B]/25 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    hoveredAdventure === 2 ? 'scale-120 bg-[#0B756B]/25 border-[#0B756B]/40 ring-4 ring-[#ECFDF5]/80' : ''
                  }`}>
                    <div className="w-[44px] h-[44px] rounded-full border-[2.5px] border-white overflow-hidden shadow-sm bg-white">
                      <img src={INITIAL_ADVENTURES[1].image} alt="Paragliding" className="w-full h-full object-cover select-none" />
                    </div>
                  </div>
                </div>

                {/* 3. Kayaking Avatar Pin (ID: 3) - Top-center, Right */}
                <div 
                  onClick={() => { setSelectedCategory('Water Sports'); setSearchQuery('Kayaking'); }}
                  style={{ top: '25%', left: '57%' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-10 flex items-center justify-center"
                >
                  <div className={`w-14 h-14 rounded-full bg-[#0B756B]/15 border border-[#0B756B]/25 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    hoveredAdventure === 3 ? 'scale-120 bg-[#0B756B]/25 border-[#0B756B]/40 ring-4 ring-[#ECFDF5]/80' : ''
                  }`}>
                    <div className="w-[44px] h-[44px] rounded-full border-[2.5px] border-white overflow-hidden shadow-sm bg-white">
                      <img src={INITIAL_ADVENTURES[2].image} alt="Kayak" className="w-full h-full object-cover select-none" />
                    </div>
                  </div>
                </div>

                {/* 4. Scuba Diving Pin (ID: 1) - Bottom-left, Center */}
                <div 
                  onClick={() => { setSelectedCategory('Scuba Diving'); setSearchQuery('Scuba Diving'); }}
                  style={{ top: '68%', left: '30%' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-10 flex items-center justify-center"
                >
                  <div className={`w-14 h-14 rounded-full bg-[#0B756B]/15 border border-[#0B756B]/25 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    hoveredAdventure === 1 ? 'scale-120 bg-[#0B756B]/25 border-[#0B756B]/40 ring-4 ring-[#ECFDF5]/80' : ''
                  }`}>
                    <div className="w-[44px] h-[44px] rounded-full border-[2.5px] border-white overflow-hidden shadow-sm bg-white">
                      <img src={INITIAL_ADVENTURES[0].image} alt="Scuba" className="w-full h-full object-cover select-none" />
                    </div>
                  </div>
                </div>

                {/* 5. Biking/Cycling Pin 2 (ID: 6) - Bottom-right, Center */}
                <div 
                  onClick={() => { setSelectedCategory('Biking'); setSearchQuery('Mountain Biking'); }}
                  style={{ top: '73%', left: '67%' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-10 flex items-center justify-center"
                >
                  <div className="w-14 h-14 rounded-full bg-[#0B756B]/15 border border-[#0B756B]/25 flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <div className="w-[44px] h-[44px] rounded-full border-[2.5px] border-white overflow-hidden shadow-sm bg-white">
                      <img src={INITIAL_ADVENTURES[5].image} alt="Biking 2" className="w-full h-full object-cover select-none" />
                    </div>
                  </div>
                </div>

                {/* GREEN CLUSTER MARKERS WITH TRANSLUCENT HALOS */}
                {/* Cluster 12 (Top) */}
                <div 
                  style={{ top: '20%', left: '36%' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#046A5E]/15 border border-[#046A5E]/20 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-[#046A5E] border-2 border-white shadow-md text-white text-[11px] font-black flex items-center justify-center">
                      12
                    </div>
                  </div>
                </div>

                {/* Cluster 8 (Far Right) */}
                <div 
                  style={{ top: '35%', left: '72%' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#046A5E]/15 border border-[#046A5E]/20 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-[#046A5E] border-2 border-white shadow-md text-white text-[11px] font-black flex items-center justify-center">
                      8
                    </div>
                  </div>
                </div>

                {/* Cluster 10 (Lower Coast) */}
                <div 
                  style={{ top: '64%', left: '53%' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#046A5E]/15 border border-[#046A5E]/20 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-[#046A5E] border-2 border-white shadow-md text-white text-[11px] font-black flex items-center justify-center">
                      10
                    </div>
                  </div>
                </div>

                {/* Cluster 7 (Bottom) */}
                <div 
                  style={{ top: '86%', left: '44%' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#046A5E]/15 border border-[#046A5E]/20 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-[#046A5E] border-2 border-white shadow-md text-white text-[11px] font-black flex items-center justify-center">
                      7
                    </div>
                  </div>
                </div>

              </div>

              {/* Map Floating Zoom / Locate Controls */}
              {/* Locate circular button */}
              <button 
                onClick={handleResetFilters}
                className="absolute bottom-[110px] right-4 z-10 w-11 h-11 rounded-xl bg-white hover:bg-slate-50 text-slate-800 shadow-md border border-slate-100 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <Locate className="h-5 w-5 text-slate-800 stroke-[2.2]" />
              </button>

              {/* Plus/Minus stacked controls */}
              <div className="absolute bottom-4 right-4 z-10 w-11 h-22 bg-white rounded-xl shadow-md border border-slate-150 flex flex-col overflow-hidden shrink-0">
                <button className="flex-1 w-full hover:bg-slate-50 border-b border-slate-100 text-slate-800 font-bold transition-colors flex items-center justify-center cursor-pointer">
                  <Plus className="h-5 w-5 stroke-[2.2]" />
                </button>
                <button className="flex-1 w-full hover:bg-slate-50 text-slate-800 font-bold transition-colors flex items-center justify-center cursor-pointer">
                  <Minus className="h-5 w-5 stroke-[2.2]" />
                </button>
              </div>

            </div>

            {/* Popular Adventures This Week Bottom Widget */}
            <div className="flex flex-col gap-4">
              
              {/* Header row */}
              <div className="flex items-center justify-between">
                <h4 className="text-[15px] font-black text-slate-800 tracking-tight">Popular Adventures This Week</h4>
                <button 
                  onClick={() => setSelectedCategory('All Adventures')}
                  className="text-[12px] font-black text-[#0B756B] hover:text-[#095f57] hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View All</span>
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </button>
              </div>

              {/* 4 horizontal compact cards */}
              <div className="grid grid-cols-4 gap-2.5 w-full">
                {[
                  { id: 2, name: 'Paragliding', image: INITIAL_ADVENTURES[1].image, cat: 'Paragliding' },
                  { id: 1, name: 'Scuba Diving', image: INITIAL_ADVENTURES[0].image, cat: 'Scuba Diving' },
                  { id: 5, name: 'Wildlife Safari', image: INITIAL_ADVENTURES[4].image, cat: 'Wildlife Safari' },
                  { id: 3, name: 'Kayaking', image: INITIAL_ADVENTURES[2].image, cat: 'Water Sports' }
                ].map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => {
                      setSelectedCategory(item.cat);
                      setSearchQuery(item.name);
                    }}
                    className="flex flex-col cursor-pointer group w-full"
                  >
                    <div className="h-[76px] w-full rounded-[18px] overflow-hidden shadow-sm bg-slate-100">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 select-none"
                      />
                    </div>
                    <span className="text-[11px] font-extrabold text-slate-700 leading-tight mt-2 line-clamp-1 group-hover:text-[#0B756B] transition-colors">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
