import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedDestinations from '../components/home/FeaturedDestinations';
import FeaturedPosts from '../components/home/FeaturedPosts';
import JoinCommunity from '../components/home/JoinCommunity';
import { usePosts } from '../context/PostsContext';

const HomePage = () => {
  const { posts } = usePosts();
  
  return (
    <div className="pt-16">
      <Hero />
      <FeaturedDestinations />
      <FeaturedPosts posts={posts} />
      <JoinCommunity />
    </div>
  );
};

export default HomePage;