import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import UserAvatar from '../shared/UserAvatar';

const FeaturedPosts = ({ posts }) => {
  // Take the first 3 posts for featured section
  const featuredPosts = posts.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Posts
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Dive into captivating travel stories from our community. 
              Get inspired for your next adventure through these amazing experiences.
            </p>
          </div>
          <Link to="/feed" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mt-4 md:mt-0">
            View all posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="card overflow-hidden hover-lift"
            >
              {/* Post image */}
              <div className="h-48 md:h-56 lg:h-64 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Post content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <UserAvatar src={post.author.avatarUrl} size="sm" />
                  <div>
                    <span className="text-sm font-medium text-gray-900">{post.author.name}</span>
                    <div className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()} · {post.location}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 line-clamp-2 mb-4">
                  {post.description}
                </p>
                
                <Link 
                  to={`/feed/post/${post.id}`} 
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                >
                  Read more
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;