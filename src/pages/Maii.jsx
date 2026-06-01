import React, { useState, useRef, useEffect } from 'react';
import './Maii.css';

export default function Maii() {
  // Navigation State
  const [activeNav, setActiveNav] = useState('Home');

  // Search Bar States
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Pondicherry, India');
  const [checkIn, setCheckIn] = useState('2025-06-21');
  const [checkOut, setCheckOut] = useState('2025-06-25');
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  // Guests & Rooms details
  const [adults, setAdults] = useState(3);
  const [childrenCount, setChildrenCount] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [guestsDisplay, setGuestsDisplay] = useState('3 Adults, 1 Child, 1 Room');

  // Likes state (indices of liked cards)
  const [likedCards, setLikedCards] = useState({});

  const cardsWrapperRef = useRef(null);

  // Helper to format date display in the search bar
  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return 'Select date';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} (${days[date.getDay()]})`;
  };

  // Synchronize display text when guest state changes
  const applyGuests = () => {
    const adultsStr = `${adults} Adult${adults !== 1 ? 's' : ''}`;
    const childrenStr = childrenCount > 0 ? `, ${childrenCount} Child${childrenCount !== 1 ? 'ren' : ''}` : '';
    const roomsStr = `, ${rooms} Room${rooms !== 1 ? 's' : ''}`;
    setGuestsDisplay(`${adultsStr}${childrenStr}${roomsStr}`);
    setIsGuestsOpen(false);
  };

  // Toggle favorite like state
  const toggleLike = (cardId) => {
    setLikedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  // Scroll function for the slider
  const scrollSlider = (direction) => {
    if (cardsWrapperRef.current) {
      const scrollAmount = 300; // width of a card + gap approx
      cardsWrapperRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Navigation menu items
  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Stays', href: '#stays' },
    { name: 'Rentals', href: '#rentals', },
    { name: 'Food Spots', href: '#food-spots' },
    { name: 'Adventures', href: '#adventures' },
    { name: 'Taxi Booking', href: '#taxi-booking' },
    { name: 'Services', href: '#services', },
    { name: 'Tour Packages', href: '#tour-packages' }
  ];

  // Category list from maii.html
  const categories = [
    { name: 'Stays', icon: 'https://img.icons8.com/color/96/000000/city-buildings.png', href: '#stays' },
    { name: 'Bike Rental', icon: 'https://img.icons8.com/color/96/000000/bicycle.png', href: '#bike-rental' },
    { name: 'Car Rental', icon: 'https://img.icons8.com/color/96/000000/car--v1.png', href: '#car-rental' },
    { name: 'Food Spots', icon: 'https://img.icons8.com/color/96/000000/hamburger.png', href: '#food-spots' },
    { name: 'Adventures', icon: 'https://img.icons8.com/color/96/000000/parachute.png', href: '#adventures' },
    { name: 'Taxi Booking', icon: 'https://img.icons8.com/color/96/000000/taxi.png', href: '#taxi-booking' },
    { name: 'Puncture Service', icon: 'https://img.icons8.com/color/96/000000/wheel.png', href: '#puncture-service' },
    { name: 'Mechanic Service', icon: 'https://img.icons8.com/color/96/000000/maintenance.png', href: '#mechanic-service' },
    { name: 'Tour Packages', icon: 'https://img.icons8.com/color/96/000000/luggage.png', href: '#tour-packages' }
  ];

  // Trending items list from maii.html
  const trendingItems = [
    {
      id: 'resort',
      badge: 'Top Rated',
      badgeClass: 'badge-green',
      img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      title: 'Sea Breeze Resort',
      location: 'Pondicherry',
      rating: '4.6',
      reviews: '128 reviews',
      price: '₹2,499',
      unit: '/ night'
    },
    {
      id: 'bike',
      badge: 'Popular',
      badgeClass: 'badge-orange',
      img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      title: 'Royal Enfield Classic 350',
      location: 'Pondicherry',
      rating: '4.8',
      reviews: '96 reviews',
      price: '₹500',
      unit: '/ day'
    },
    {
      id: 'pizza',
      badge: 'Must Try',
      badgeClass: 'badge-purple',
      img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      title: 'Cafe Xtasi',
      location: 'Pondicherry',
      rating: '4.5',
      reviews: '230 reviews',
      price: '₹300',
      unit: 'for two'
    },
    {
      id: 'adventure',
      badge: 'Adventure',
      badgeClass: 'badge-blue',
      img: 'https://images.unsplash.com/photo-1520638515082-fdb9bc8259db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      title: 'Paragliding Experience',
      location: 'Auroville, Pondicherry',
      rating: '4.9',
      reviews: '75 reviews',
      price: '₹2,999',
      unit: '/ person'
    },
    {
      id: 'tour',
      badge: 'Best Seller',
      badgeClass: 'badge-darkgreen',
      img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      title: 'Pondicherry 3N/4D Tour',
      location: 'Pondicherry',
      rating: '4.7',
      reviews: '160 reviews',
      price: '₹8,999',
      unit: '/ person'
    }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`Searching for: "${searchQuery}" in "${location}" from ${checkIn} to ${checkOut} for: ${guestsDisplay}`);
  };

  return (
    <div className="maii-page">
      {/* Header / Navigation */}
      <header className="navbar">
        <div className="logo">
          <div className="logo-icon">
            <i className="fa-solid fa-location-dot"></i>
            <i className="fa-solid fa-check small-check"></i>
          </div>
          <div className="logo-text">
            <h1>TripVerse</h1>
            <p>Explore. Experience. Enjoy.</p>
          </div>
        </div>
        
        <nav className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={activeNav === link.name ? 'active' : ''}
              onClick={(e) => {
                setActiveNav(link.name);
                if (!link.hasDropdown) {
                  // normal click
                } else {
                  e.preventDefault();
                }
              }}
            >
              {link.name}
              {link.hasDropdown && <i className="fa-solid fa-chevron-down"></i>}
            </a>
          ))}
        </nav>
        
        <div className="nav-buttons">
          <a href="#" className="btn-text">Become a Host</a>
          <button className="btn btn-outline">Login</button>
          <button className="btn btn-primary">Register</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Your Journey<br /><span className="highlight">Starts Here</span></h1>
          <p className="hero-subtitle">Find the best stays, rentals, food, adventures<br />and more in one place.</p>
        </div>

        {/* Search Wrapper */}
        <div className="search-wrapper">
          <form className="search-bar" onSubmit={handleSearchSubmit}>
            {/* Search anything */}
            <div className="search-item">
              <i className="fa-solid fa-magnifying-glass"></i>
              <div className="search-text">
                <strong>Search for anything</strong>
                <input
                  type="text"
                  placeholder="Rooms, Bikes, Food, Adventures..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="search-divider"></div>
            
            {/* Location */}
            <div className="search-item">
              <i className="fa-solid fa-location-dot"></i>
              <div className="search-text">
                <strong>Location</strong>
                <input
                  type="text"
                  placeholder="Pondicherry, India"
                  className="search-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            
            <div className="search-divider"></div>
            
            {/* Check-in */}
            <div className="search-item" style={{ position: 'relative' }}>
              <i className="fa-regular fa-calendar"></i>
              <div className="search-text" style={{ cursor: 'pointer' }}>
                <strong>Check-in</strong>
                <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-muted)', marginTop: '2px', display: 'block' }}>
                  {formatDateDisplay(checkIn)}
                </span>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer'
                  }}
                />
              </div>
            </div>
            
            <div className="search-divider"></div>
            
            {/* Check-out */}
            <div className="search-item" style={{ position: 'relative' }}>
              <i className="fa-regular fa-calendar-check"></i>
              <div className="search-text" style={{ cursor: 'pointer' }}>
                <strong>Check-out</strong>
                <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-muted)', marginTop: '2px', display: 'block' }}>
                  {formatDateDisplay(checkOut)}
                </span>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer'
                  }}
                />
              </div>
            </div>
            
            <div className="search-divider"></div>
            
            {/* Guests & Rooms Dropdown */}
            <div className="search-item dropdown-item" onClick={() => setIsGuestsOpen(!isGuestsOpen)}>
              <i className="fa-regular fa-user"></i>
              <div className="search-text">
                <strong>Guests & Rooms</strong>
                <span>{guestsDisplay}</span>
              </div>
              <i className="fa-solid fa-chevron-down ms-auto dropdown-icon"></i>

              {/* Guest Selector Modal Dropdown */}
              {isGuestsOpen && (
                <div className="guests-dropdown-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="guests-row">
                    <span className="guests-label">Adults</span>
                    <div className="guests-control">
                      <button
                        type="button"
                        className="guests-btn"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                      >
                        -
                      </button>
                      <span className="guests-val">{adults}</span>
                      <button
                        type="button"
                        className="guests-btn"
                        onClick={() => setAdults(adults + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="guests-row">
                    <span className="guests-label">Children</span>
                    <div className="guests-control">
                      <button
                        type="button"
                        className="guests-btn"
                        onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                      >
                        -
                      </button>
                      <span className="guests-val">{childrenCount}</span>
                      <button
                        type="button"
                        className="guests-btn"
                        onClick={() => setChildrenCount(childrenCount + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="guests-row">
                    <span className="guests-label">Rooms</span>
                    <div className="guests-control">
                      <button
                        type="button"
                        className="guests-btn"
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                      >
                        -
                      </button>
                      <span className="guests-val">{rooms}</span>
                      <button
                        type="button"
                        className="guests-btn"
                        onClick={() => setRooms(rooms + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button type="button" className="guests-apply" onClick={applyGuests}>
                    Apply Settings
                  </button>
                </div>
              )}
            </div>
            
            <button type="submit" className="btn btn-primary search-btn">Search</button>
          </form>
        </div>

        {/* Trust Banner */}
   
      </section>

      {/* Categories */}
      <section className="categories">
        {categories.map((cat) => (
          <div key={cat.name} className="category-card" onClick={() => window.location.hash = cat.href}>
            <img src={cat.icon} alt={cat.name} className="category-icon" />
            <h3>{cat.name}</h3>
            <a href={cat.href} onClick={(e) => e.preventDefault()}>{activeNav === cat.name ? 'Explore' : 'Explore'}</a>
          </div>
        ))}
      </section>

      {/* Trending Section */}
      <section className="trending">
        <div className="section-header">
          <h2>Trending Near You</h2>
          <a href="#" className="view-all">View All <i className="fa-solid fa-arrow-right"></i></a>
        </div>
        
        <div className="slider-container">
          {/* Left arrow */}
          <button className="slider-arrow-left" onClick={() => scrollSlider('left')} aria-label="Scroll left">
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          {/* Cards wrapper */}
          <div className="cards-wrapper" ref={cardsWrapperRef}>
            {trendingItems.map((item) => (
              <div className="card" key={item.id}>
                <div className="card-img-wrapper">
                  <span className={`badge ${item.badgeClass}`}>{item.badge}</span>
                  <button
                    className={`heart-icon ${likedCards[item.id] ? 'liked' : ''}`}
                    onClick={() => toggleLike(item.id)}
                    aria-label="Add to favorites"
                  >
                    <i className={likedCards[item.id] ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
                  </button>
                  <img src={item.img} alt={item.title} />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-location">{item.location}</p>
                  <div className="card-rating">
                    <i className="fa-solid fa-star"></i> {item.rating} ({item.reviews})
                  </div>
                  <p className="card-price"><strong>{item.price}</strong> {item.unit}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right arrow */}
          <button className="slider-arrow" onClick={() => scrollSlider('right')} aria-label="Scroll right">
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </section>
    </div>
  );
}
