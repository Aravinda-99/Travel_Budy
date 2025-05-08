import React, { useState, useEffect } from 'react';
import { FiStar, FiMapPin, FiExternalLink, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { FaWifi, FaSwimmingPool, FaParking, FaUtensils, FaTv, FaSnowflake, FaSpa, FaDumbbell, FaGlassMartiniAlt, FaConciergeBell, FaPlane, FaCoffee, FaPaw, FaUmbrellaBeach } from 'react-icons/fa';
import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8093',
  headers: {
    'Content-Type': 'application/json',
  },
});

const HotelTable = ({ onAdd }) => {
  const [hotels, setHotels] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hotels on component mount
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

  const handleEdit = async (id) => {
    try {
      const hotelToEdit = hotels.find(hotel => hotel.id === id);
      if (hotelToEdit) {
        // You can implement your edit logic here
        // For example, open a modal or navigate to edit page
        console.log('Edit hotel:', hotelToEdit);
      }
    } catch (error) {
      setError('Error preparing hotel for edit');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/api/v1/hotel/delete-hotel/${id}`);
      if (response.data.code === 200) {
        // Remove the deleted hotel from the state
        setHotels(hotels.filter(hotel => hotel.id !== id));
      } else {
        setError('Failed to delete hotel');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error deleting hotel');
    }
  };

  const handleUpdate = async (hotelData) => {
    try {
      const response = await api.put('/api/v1/hotel/update', hotelData);
      if (response.data.code === 200) {
        // Update the hotel in the state
        setHotels(hotels.map(hotel => 
          hotel.id === hotelData.id ? { ...hotel, ...hotelData } : hotel
        ));
      } else {
        setError('Failed to update hotel');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating hotel');
    }
  };

  const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const renderAmenities = (amenities) => {
    const iconMap = {
      'wifi': <FaWifi className="text-blue-500" />,
      'pool': <FaSwimmingPool className="text-teal-500" />,
      'spa': <FaSpa className="text-pink-500" />,
      'gym': <FaDumbbell className="text-purple-500" />,
      'restaurant': <FaUtensils className="text-red-500" />,
      'bar': <FaGlassMartiniAlt className="text-yellow-500" />,
      'room service': <FaConciergeBell className="text-indigo-500" />,
      'parking': <FaParking className="text-gray-600" />,
      'airport shuttle': <FaPlane className="text-blue-400" />,
      'breakfast': <FaCoffee className="text-orange-500" />,
      'pet friendly': <FaPaw className="text-green-500" />,
      'beach access': <FaUmbrellaBeach className="text-yellow-400" />
    };

    // Convert Set to Array if needed
    const amenitiesArray = Array.isArray(amenities) ? amenities : Array.from(amenities || []);

    return (
      <div className="flex flex-wrap gap-2">
        {amenitiesArray.map((amenity, index) => (
          <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
            {iconMap[amenity.toLowerCase()] || <FiPlus size={12} />}
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderRating = (rating) => {
    const stars = [];
    const ratingValue = typeof rating === 'number' ? rating : 0;
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={i <= ratingValue ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          size={16}
        />
      );
    }
    return <div className="flex">{stars}</div>;
  };

  const renderPriceRange = (priceRange) => {
    const priceMap = {
      'BUDGET': 1,
      'MID_RANGE': 2,
      'LUXURY': 3
    };

    const dots = priceMap[priceRange] || 0;

    return (
      <div className="flex gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${i < dots ? 'bg-green-500' : 'bg-gray-200'}`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
        <p>{error}</p>
        <button 
          onClick={fetchHotels}
          className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Hotel List</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus size={18} />
          Add New
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>
              <th className="p-4 font-medium">Hotel</th>
              <th className="p-4 font-medium">Location</th>
              <th className="p-4 font-medium">Price Range</th>
              <th className="p-4 font-medium">Rating</th>
              <th className="p-4 font-medium">Amenities</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.isArray(hotels) && hotels.map((item) => (
              <React.Fragment key={item.id}>
                <tr 
                  className={`hover:bg-gray-50 cursor-pointer transition-colors ${expandedRow === item.id ? 'bg-blue-50' : ''}`}
                  onClick={() => toggleExpand(item.id)}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <div className="w-12 h-12 rounded-md overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <a
                          href={item.affiliateBookingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Book Now <FiExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <FiMapPin size={14} />
                      <span>{item.city}, {item.country}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {renderPriceRange(item.priceRange)}
                  </td>
                  <td className="p-4">{renderRating(item.userRating)}</td>
                  <td className="p-4">
                    <div className="max-w-xs">
                      {item.amenities && (Array.isArray(item.amenities) ? item.amenities.length > 0 : item.amenities.size > 0) ? (
                        renderAmenities(item.amenities)
                      ) : <p className="text-gray-500 text-sm">No amenities</p>}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleEdit(item.id); }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        aria-label="Edit"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        aria-label="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRow === item.id && (
                  <tr className="bg-blue-50">
                    <td colSpan="6" className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-medium text-gray-700 mb-2">Image Preview</h3>
                          {item.image ? (
                            <div className="w-full h-48 rounded-md overflow-hidden border border-gray-200">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : <p className="text-gray-500">No image available</p>}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-700 mb-2">Booking Link</h3>
                          {item.affiliateBookingLink ? (
                            <a
                              href={item.affiliateBookingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                            >
                              Visit booking page <FiExternalLink size={14} />
                            </a>
                          ) : <p className="text-gray-500">No link provided</p>}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {(!Array.isArray(hotels) || hotels.length === 0) && (
        <div className="p-8 text-center text-gray-500">
          No data available. Click "Add New" to create your first entry.
        </div>
      )}
    </div>
  );
};

export default HotelTable;