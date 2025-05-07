import React from 'react';

function SmartDescriptionCard({
  title = "Paris Adventure",
  description = "Explore the city of love with this amazing 5-day itinerary covering all major attractions including the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.",
  duration = "5 days",
  date = "June 15-20, 2024",
  location = "Paris, France",
  tags = ["Travel", "Europe", "City Tour"]
}) {
  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
      style={{
        maxWidth: '500px', // Adjust this value as needed
        width: '100%',       // Ensure it scales within its container
      }}
    >
      <div className="p-6">
        {/* Header with Title and Duration Badge */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">{title}</h2>
          <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-lg shadow-sm">
            {duration}
          </span>
        </div>

        {/* Location and Date */}
        <div className="flex items-center text-sm text-gray-600 mb-5 space-x-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{location}</span>
          </div>

          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>{date}</span>
          </div>
        </div>

        {/* Description with accent border */}
        <div className="mb-5 pl-3 border-l-4 border-blue-500">
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Tags and Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-gray-50 text-gray-700 text-xs px-2 py-1 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                {tag}
              </span>
            ))}
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-1 text-sm">
            <span>Edit</span>
           
          </button>
        </div>
      </div>
    </div>
  );
}

export default SmartDescriptionCard;