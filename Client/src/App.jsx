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
import SignUp from './pages/Register/SignupForm.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute';

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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Protected Routes */}
            <Route 
              path="/feed" 
              element={
                <ProtectedRoute>
                  <FeedPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/itineraryhub" 
              element={
                <ProtectedRoute>
                  <ItineraryPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/RecommendationPage" 
              element={
                <ProtectedRoute>
                  <RecommendationPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/UserProfilePage" 
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </PostsProvider>
      {/* <button 
        onClick={() => setShowTestTool(!showTestTool)} 
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {showTestTool ? 'Hide' : 'Show'} Comment API Test Tool
      </button> */}
      
      {/* {showTestTool && (
        <div className="mb-8">
          <TestCommentApi />
        </div>
      )} */}
    </div>
  );
}

export default App;