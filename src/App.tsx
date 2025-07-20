import React from 'react';
import Header from './components/Header';
import MainSection from './components/MainSection';
import PromotionalBanner from './components/PromotionalBanner';

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main>
        <MainSection />
        <PromotionalBanner />
      </main>
    </div>
  );
}

export default App;