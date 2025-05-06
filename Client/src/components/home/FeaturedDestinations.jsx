import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

const destinations = [
  {
    id: 1,
    title: 'Santorini, Greece',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800',
    posts: 3240,
  },
  {
    id: 2,
    title: 'Kyoto, Japan',
    image: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=800',
    posts: 2198,
  },
  {
    id: 3,
    title: 'Machu Picchu, Peru',
    image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800',
    posts: 1876,
  },
  {
    id: 4,
    title: 'Venice, Italy',
    image: 'https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg?auto=compress&cs=tinysrgb&w=800',
    posts: 2532,
  },
];

const FeaturedDestinations = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Destinations
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Discover the most popular destinations from our global community of travelers. 
              From breathtaking landscapes to vibrant cities.
            </p>
          </div>
          <Link to="/destinations" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mt-4 md:mt-0">
            View all destinations
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link 
                to={`/destinations/${destination.id}`} 
                className="block h-full group"
              >
                <div className="relative rounded-xl overflow-hidden h-64 hover-lift card">
                  {/* Image */}
                  <img 
                    src={destination.image} 
                    alt={destination.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-1 text-white/90 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{destination.title}</span>
                    </div>
                    <p className="text-xs text-white/80">
                      {destination.posts.toLocaleString()} posts
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;