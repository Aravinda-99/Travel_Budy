import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const PopularDestinations = () => {
  const destinations = [
    {
      name: 'Bali, Indonesia',
      posts: 4538,
      image: 'https://images.pexels.com/photos/1694621/pexels-photo-1694621.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'Santorini, Greece',
      posts: 3245,
      image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'Kyoto, Japan',
      posts: 2856,
      image: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'Barcelona, Spain',
      posts: 2453,
      image: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'New York, USA',
      posts: 2134,
      image: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-3 border-b border-gray-200">
        <h3 className="font-medium text-gray-800">Popular Destinations</h3>
      </div>
      
      <div className="p-3">
        <div className="space-y-3">
          {destinations.map((destination, index) => (
            <Link 
              key={index}
              to={`/destinations/${encodeURIComponent(destination.name)}`}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-1">
                  <MapPin size={12} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {destination.name}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{destination.posts.toLocaleString()} posts</p>
              </div>
            </Link>
          ))}
        </div>
        
        <Link 
          to="/destinations" 
          className="block text-center text-sm text-primary-600 hover:text-primary-700 font-medium mt-3 py-1.5"
        >
          View All Destinations
        </Link>
      </div>
    </div>
  );
};

export default PopularDestinations;