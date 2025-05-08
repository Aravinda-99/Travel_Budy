import React, { useState, useEffect } from 'react';
import HotelCard from './HotelCard';
import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8093',
  headers: {
    'Content-Type': 'application/json',
  },
});

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/v1/hotel/get-all-hotel');
      if (response.data.code === 200) {
        setHotels(response.data.data);
      } else {
        setError('Failed to fetch hotels');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching hotels');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden p-5">
            <div className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                <div className="h-8 bg-gray-200 rounded-full w-20"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600">
          <p>{error}</p>
          <button 
            onClick={fetchHotels}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!hotels || hotels.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No recommendations yet. Be the first to add one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelList;