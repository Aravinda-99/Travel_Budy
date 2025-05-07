import React from 'react';
import { MapPin, Star, ExternalLink, Wifi, SwissFranc as Swim, Dumbbell, Utensils, Wine, Car, Coffee, Plane, BedDouble, Waves, Dog, Space as Spa } from 'lucide-react';

export const getAmenityIcon = (amenity) => {
  switch (amenity) {
    case 'WiFi':
      return Wifi;
    case 'Pool':
      return Swim;
    case 'Gym':
      return Dumbbell;
    case 'Restaurant':
      return Utensils;
    case 'Bar':
      return Wine;
    case 'Parking':
      return Car;
    case 'Breakfast':
      return Coffee;
    case 'Airport Shuttle':
      return Plane;
    case 'Room Service':
      return BedDouble;
    case 'Beach Access':
      return Waves;
    case 'Pet Friendly':
      return Dog;
    case 'Spa':
      return Spa;
    default:
      return Wifi;
  }
};

const HotelCard = ({ hotel }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-0 right-0 m-3">
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium text-blue-800">
            {hotel.priceRange}
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{hotel.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-gray-700 font-medium">{hotel.userRating}.0</span>
          </div>
        </div>

        <div className="flex items-center mt-2 text-gray-600">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm">{hotel.city}, {hotel.country}</span>
        </div>

        <div className="mt-3">
          <div className="flex flex-wrap gap-1 mb-4">
            {hotel.amenities.slice(0, 4).map((amenity) => {
              const AmenityIcon = getAmenityIcon(amenity);
              return (
                <div
                  key={amenity}
                  className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center"
                >
                  <AmenityIcon className="h-3 w-3 mr-1" />
                  <span>{amenity}</span>
                </div>
              );
            })}
            {hotel.amenities.length > 4 && (
              <div className="bg-gray-50 text-gray-600 px-2 py-1 rounded-full text-xs">
                +{hotel.amenities.length - 4} more
              </div>
            )}
          </div>
        </div>

        <a
          href={hotel.affiliateBookingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 w-full flex items-center justify-center px-4 py-2 btn-primary text-white rounded-md  transition-colors duration-300"
        >
          <span>Book Now</span>
          <ExternalLink className="h-4 w-4 ml-2" />
        </a>
      </div>
    </div>
  );
};

export default HotelCard;