import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import FeedPage from './pages/FeedPage';
import Footer from './components/layout/Footer';
import ItineraryPage from './pages/ItineraryPage';
import { PostsProvider } from './context/PostsContext';
import RecommendationPage from './pages/recommendation/RecommendationPage.jsx'
import UserProfilePage from './pages/Profile/UserProfilePage.jsx'
import Login from './pages/Login/Login.jsx';

function App() {
  const [count, setCount] = useState(0);
  const [showTestTool, setShowTestTool] = useState(false);

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
            <Route path="/UserProfilePage" element={<UserProfilePage />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </PostsProvider>
      <button 
        onClick={() => setShowTestTool(!showTestTool)} 
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {showTestTool ? 'Hide' : 'Show'} Comment API Test Tool
      </button>
      
      {showTestTool && (
        <div className="mb-8">
          <TestCommentApi />
        </div>
      )}
    </div>
  );
}

export default App;