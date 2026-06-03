import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BecomeHost from './pages/BecomeHost';
import Footer from './components/Footer';
import StaysResults from './pages/StaysResults';
import MyBookings from './pages/MyBookings';
import RentHome from './rent/RentHome';
import RentResults from './rent/RentResults';
import RentDetail from './rent/RentDetail';
import './App.css';

// ─── Search transition overlay ──────────────────────────────────────────────
function SearchTransitionOverlay({ visible, onDone, transitionType }) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onDone, 900);
    return () => clearTimeout(t);
  }, [visible, onDone]);

  if (!visible) return null;

  return (
    <div className="search-transition-overlay">
      <div className="search-ripple" />
      <div className="search-ripple search-ripple-2" />
      <div className="search-ripple search-ripple-3" />
      <div className="search-transition-text">
        {transitionType === 'rentals' ? (
          <svg className="search-spinner-icon" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7.5" cy="12.5" r="4.5" fill="rgba(255,255,255,0.15)" />
            <path d="M12 12.5h9" />
            <path d="M16 12.5v3.5" />
            <path d="M19 12.5v3.5" />
          </svg>
        ) : (
          <svg className="search-spinner-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 22C9 28 27 28 29 22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M9.5 23L5.5 20L5 25" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M26.5 23L30.5 20L31 25" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 5C13.5 5 10 8.5 10 13C10 19.5 18 27 18 27C18 27 26 19.5 26 13C26 8.5 22.5 5 18 5Z" fill="rgba(255,255,255,0.15)" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="18" cy="13" r="2.8" fill="#fff" />
          </svg>
        )}
        <span>{transitionType === 'rentals' ? 'Preparing Pondicherry fleet list…' : 'Finding the best stays…'}</span>
      </div>
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchParams, setSearchParams] = useState({
    searchQuery: 'Pondicherry, India',
    checkIn: '2025-06-21',
    checkOut: '2025-06-25',
    guests: '3 Adults, 1 Child, 1 Room'
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingParams, setPendingParams] = useState(null);
  // key to re-trigger StaysResults entry animation on every new search
  const [resultsKey, setResultsKey] = useState(0);

  // Rental states
  const [rentalSearchParams, setRentalSearchParams] = useState({
    location: 'Pondicherry, India',
    pickUpDate: '2025-06-21',
    dropOffDate: '2025-06-25',
    vehicleType: 'All'
  });
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [transitionType, setTransitionType] = useState('stays'); // 'stays' | 'rentals'
  const [pendingRentalParams, setPendingRentalParams] = useState(null);

  // Sync browser back/forward buttons
  useEffect(() => {
    if (!window.history.state) {
      window.history.replaceState({ page: 'home' }, '', '');
    }

    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToPage = (pageName, params = null) => {
    if (pageName === 'rent-home' && params) {
      setRentalSearchParams(prev => ({ ...prev, ...params }));
    }
    if (pageName === currentPage) return;
    setCurrentPage(pageName);
    window.history.pushState({ page: pageName }, '', `#${pageName}`);
  };

  const handleSearch = (params) => {
    setTransitionType('stays');
    setPendingParams(params);
    setIsTransitioning(true);
  };

  const handleTransitionDone = () => {
    setIsTransitioning(false);
    if (transitionType === 'stays') {
      setSearchParams(pendingParams);
      setResultsKey(k => k + 1);
      setCurrentPage('stays-results');
      window.history.pushState({ page: 'stays-results' }, '', '#stays-results');
    } else {
      setRentalSearchParams(pendingRentalParams);
      setCurrentPage('rent-results');
      window.history.pushState({ page: 'rent-results' }, '', '#rent-results');
    }
  };

  // Rental callbacks
  const handleRentalSearch = (params) => {
    setTransitionType('rentals');
    setPendingRentalParams(params);
    setIsTransitioning(true);
  };

  const handleRentalSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    navigateToPage('rent-detail');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SearchTransitionOverlay visible={isTransitioning} onDone={handleTransitionDone} transitionType={transitionType} />

      {/* Sticky Top Header */}
      <Navbar onNavigate={navigateToPage} currentPage={currentPage} />

      {/* Main Page Layout */}
      {currentPage === 'home' ? (
        <Home onSearch={handleSearch} onNavigate={navigateToPage} />
      ) : currentPage === 'stays-results' ? (
        <StaysResults key={resultsKey} searchParams={searchParams} onSearch={handleSearch} />
      ) : currentPage === 'my-bookings' ? (
        <MyBookings onNavigate={navigateToPage} />
      ) : currentPage === 'rent-home' ? (
        <RentHome onSearch={handleRentalSearch} onSelectVehicle={handleRentalSelect} />
      ) : currentPage === 'rent-results' ? (
        <RentResults searchParams={rentalSearchParams} onBack={() => navigateToPage('rent-home')} onSelectVehicle={handleRentalSelect} onSearch={handleRentalSearch} />
      ) : currentPage === 'rent-detail' ? (
        <RentDetail vehicle={selectedVehicle} searchParams={rentalSearchParams} onBack={() => navigateToPage('rent-results')} onNavigate={navigateToPage} />
      ) : (
        <BecomeHost onBackToHome={() => navigateToPage('home')} />
      )}

      {/* Footer Details */}
      <Footer onNavigate={navigateToPage} />

      <style>{`
        /* ── Overlay ─────────────────────────────── */
        .search-transition-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse at center, #0e9488 0%, #0F766E 55%, #0c625c 100%);
          animation: overlayIn 0.22s cubic-bezier(0.22,1,0.36,1) forwards;
          overflow: hidden;
        }

        @keyframes overlayIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* ── Ripple rings ────────────────────────── */
        .search-ripple {
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.25);
          animation: rippleOut 1.1s cubic-bezier(0.22,1,0.36,1) infinite;
        }
        .search-ripple-2 { animation-delay: 0.28s; }
        .search-ripple-3 { animation-delay: 0.56s; }

        @keyframes rippleOut {
          0%   { transform: scale(0.6); opacity: 0.7; }
          100% { transform: scale(4.5); opacity: 0; }
        }

        /* ── Centre text + logo ──────────────────── */
        .search-transition-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          color: #fff;
          font-family: 'Plus Jakarta Sans', 'Outfit', sans-serif;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.2px;
          position: relative;
          z-index: 2;
          animation: textPop 0.45s 0.1s cubic-bezier(0.34,1.56,0.64,1) both;
        }

        .search-spinner-icon {
          width: 56px;
          height: 56px;
          animation: spinBounce 1.4s cubic-bezier(0.45,0.05,0.55,0.95) infinite;
          filter: drop-shadow(0 4px 16px rgba(0,0,0,0.18));
        }

        @keyframes spinBounce {
          0%,100% { transform: translateY(0) rotate(0deg); }
          25%      { transform: translateY(-8px) rotate(-6deg); }
          75%      { transform: translateY(4px) rotate(4deg); }
        }

        @keyframes textPop {
          from { opacity: 0; transform: scale(0.8) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* ── StaysResults & RentResults page entry ─────────────── */
        .stays-page-enter, .rent-page-enter {
          animation: pageSlideUp 0.52s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes pageSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;



