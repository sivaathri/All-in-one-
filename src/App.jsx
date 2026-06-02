import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BecomeHost from './pages/BecomeHost';
import Footer from './components/Footer';
import StaysResults from './pages/StaysResults';
import './App.css';

// ─── Search transition overlay ──────────────────────────────────────────────
function SearchTransitionOverlay({ visible, onDone }) {
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
        <svg className="search-spinner-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 22C9 28 27 28 29 22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M9.5 23L5.5 20L5 25" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M26.5 23L30.5 20L31 25" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 5C13.5 5 10 8.5 10 13C10 19.5 18 27 18 27C18 27 26 19.5 26 13C26 8.5 22.5 5 18 5Z" fill="rgba(255,255,255,0.15)" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="18" cy="13" r="2.8" fill="#fff" />
        </svg>
        <span>Finding the best stays…</span>
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

  const handleSearch = (params) => {
    setPendingParams(params);
    setIsTransitioning(true);
  };

  const handleTransitionDone = () => {
    setIsTransitioning(false);
    setSearchParams(pendingParams);
    setResultsKey(k => k + 1);
    setCurrentPage('stays-results');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SearchTransitionOverlay visible={isTransitioning} onDone={handleTransitionDone} />

      {/* Sticky Top Header */}
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />

      {/* Main Page Layout */}
      {currentPage === 'home' ? (
        <Home onSearch={handleSearch} />
      ) : currentPage === 'stays-results' ? (
        <StaysResults key={resultsKey} searchParams={searchParams} onSearch={handleSearch} />
      ) : (
        <BecomeHost onBackToHome={() => setCurrentPage('home')} />
      )}

      {/* Footer Details */}
      <Footer onNavigate={setCurrentPage} />

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

        /* ── StaysResults page entry ─────────────── */
        .stays-page-enter {
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



