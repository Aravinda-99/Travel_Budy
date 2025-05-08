import React, { useState } from 'react';
import { FiStar, FiMapPin, FiExternalLink, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { FaWifi, FaSwimmingPool, FaParking, FaUtensils, FaTv, FaSnowflake } from 'react-icons/fa';

const HotelTable = ({ data = [], onEdit = () => {}, onDelete = () => {}, onAdd = () => {} }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const renderAmenities = (amenities) => {
    const iconMap = {
      'wifi': <FaWifi className="text-blue-500" />,
      'pool': <FaSwimmingPool className="text-teal-500" />,
      'parking': <FaParking className="text-gray-600" />,
      'restaurant': <FaUtensils className="text-red-500" />,
      'tv': <FaTv className="text-purple-500" />,
      'ac': <FaSnowflake className="text-blue-300" />
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
              <th className="p-4 font-medium">ID</th>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Location</th>
              <th className="p-4 font-medium">Price Range</th>
              <th className="p-4 font-medium">Rating</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.isArray(data) && data.map((item) => (
              <React.Fragment key={item.id}>
                <tr 
                  className={`hover:bg-gray-50 cursor-pointer transition-colors ${expandedRow === item.id ? 'bg-blue-50' : ''}`}
                  onClick={() => toggleExpand(item.id)}
                >
                  <td className="p-4 font-medium text-gray-900">{item.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <div className="w-10 h-10 rounded-md overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <span>{item.name}</span>
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
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); onEdit(item.id); }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        aria-label="Edit"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
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
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h3 className="font-medium text-gray-700 mb-2">Amenities</h3>
                          {item.amenities && (Array.isArray(item.amenities) ? item.amenities.length > 0 : item.amenities.size > 0) ? (
                            renderAmenities(item.amenities)
                          ) : <p className="text-gray-500">No amenities listed</p>}
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
                        <div>
                          <h3 className="font-medium text-gray-700 mb-2">Image Preview</h3>
                          {item.image ? (
                            <div className="w-full h-32 rounded-md overflow-hidden border border-gray-200">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : <p className="text-gray-500">No image available</p>}
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

      {(!Array.isArray(data) || data.length === 0) && (
        <div className="p-8 text-center text-gray-500">
          No data available. Click "Add New" to create your first entry.
        </div>
      )}
    </div>
  );
};

export default HotelTable;