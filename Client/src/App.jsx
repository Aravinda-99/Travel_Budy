import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import FeedPage from './pages/FeedPage';
import Footer from './components/layout/Footer';
import { PostsProvider } from './context/PostsContext';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <PostsProvider>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/feed" element={<FeedPage />} />
          </Routes>
        </main>
        <Footer />
      </PostsProvider>
    </div>
  );
}

export default App;