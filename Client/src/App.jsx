import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import FeedPage from './pages/FeedPage';
import Footer from './components/layout/Footer';
import ItineraryPage from './pages/ItineraryPage';
import { PostsProvider } from './context/PostsContext';
import RecommendationPage from './pages/recommendation/RecommendationPage.jsx'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <PostsProvider>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/itineraryhub" element={<ItineraryPage />} />
            <Route path="/RecommendationPage" element={<RecommendationPage />} />
          </Routes>
        </main>
        <Footer />
      </PostsProvider>
    </div>
  );
}

export default App;