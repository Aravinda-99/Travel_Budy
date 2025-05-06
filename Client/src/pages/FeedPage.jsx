import React from 'react';
import Post from '../components/feed/Post';
import CreatePostCard from '../components/feed/CreatePostCard';
import FeedSidebar from '../components/feed/FeedSidebar';
import PopularDestinations from '../components/feed/PopularDestinations';
import { usePosts } from '../context/PostsContext';

const FeedPage = () => {
  const { posts, addPost, addComment, toggleLike } = usePosts();

  return (
    <div className="bg-gray-100 min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - User Profile & Navigation */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-24">
              <FeedSidebar />
            </div>
          </div>
          
          {/* Main Feed */}
          <div className="lg:col-span-6 space-y-6">
            {/* Create Post Card */}
            <CreatePostCard onCreatePost={addPost} />
            
            {/* Posts Feed */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Latest Adventures</h1>
              {posts.map(post => (
                <Post 
                  key={post.id} 
                  post={post} 
                  onLike={toggleLike}
                  onComment={addComment}
                />
              ))}
            </div>
          </div>
          
          {/* Right Sidebar - Popular Destinations */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <PopularDestinations />
              
              {/* You can add more sidebar widgets here */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-medium text-gray-800 mb-3">Travel Buddy</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Connect with fellow travelers, share your experiences, and discover amazing destinations around the world.
                </p>
                <div className="text-xs text-gray-500">
                  © 2025 Travel Buddy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;