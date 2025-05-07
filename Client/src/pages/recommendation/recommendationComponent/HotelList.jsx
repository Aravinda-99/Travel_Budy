import React from 'react';
import HotelCard from './HotelCard';

const HotelList = ({ hotels }) => {
  return (
    <div>
      {hotels.length === 0 ? (
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