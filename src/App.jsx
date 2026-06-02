import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BecomeHost from './pages/BecomeHost';
import Footer from './components/Footer';
import StaysResults from './pages/StaysResults';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'become-host', or 'stays-results'
  const [searchParams, setSearchParams] = useState({
    searchQuery: 'Pondicherry, India',
    checkIn: '2025-06-21',
    checkOut: '2025-06-25',
    guests: '3 Adults, 1 Child, 1 Room'
  });

  const handleSearch = (params) => {
    setSearchParams(params);
    setCurrentPage('stays-results');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Top Header */}
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />

      {/* Main Page Layout */}
      {currentPage === 'home' ? (
        <Home onSearch={handleSearch} />
      ) : currentPage === 'stays-results' ? (
        <StaysResults searchParams={searchParams} onSearch={handleSearch} />
      ) : (
        <BecomeHost onBackToHome={() => setCurrentPage('home')} />
      )}

      {/* Footer Details */}
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;



