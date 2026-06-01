import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BecomeHost from './pages/BecomeHost';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'become-host'

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Top Header */}
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />

      {/* Main Page Layout */}
      {currentPage === 'home' ? (
        <Home />
      ) : (
        <BecomeHost onBackToHome={() => setCurrentPage('home')} />
      )}

      {/* Footer Details */}
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;

