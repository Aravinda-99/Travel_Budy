import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ItineraryCard() {
  // State for all itineraries
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for editing a single itinerary
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    topic: '',
    description: ''
  });

  // Fetch all itineraries when component mounts
  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8093/api/v1/tpost/post/get-all');
      setItineraries(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching itineraries:', err);
      setError('Failed to load itineraries. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (itinerary) => {
    setFormData({
      topic: itinerary.topic,
      description: itinerary.description
    });
    setEditingId(itinerary.tPid);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8093/api/v1/tpost/post/update', {
        TPid: editingId,
        ...formData
      });
      setIsEditing(false);
      fetchItineraries(); // Refresh the list after update
    } catch (err) {
      console.error('Error updating itinerary:', err);
      alert('Failed to update itinerary. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
  };

  // Format date from backend
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };

  // Edit form component
  const EditForm = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6"
      style={{ maxWidth: '500px', width: '100%' }}>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Update Itinerary</h2>
      
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="flex space-x-3 justify-end">
          <button
            type="button"
            onClick={handleCancelEdit}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading itineraries...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  // Empty state
  if (itineraries.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">No itineraries found.</div>
      </div>
    );
  }

  // Editing state
  if (isEditing) {
    return <EditForm />;
  }

  // Display all itineraries as cards
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Your Itineraries</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {itineraries.map((itinerary) => (
          <div
            key={itinerary.tPid}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
            style={{ maxWidth: '500px', width: '100%' }}
          >
            <div className="p-6">
              {/* Header with Title */}
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                  {itinerary.topic}
                </h2>
                {itinerary.createdAt && (
                  <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-lg shadow-sm">
                    {formatDate(itinerary.createdAt)}
                  </span>
                )}
              </div>

              {/* Description with accent border */}
              <div className="mb-5 pl-3 border-l-4 border-blue-500">
                <p className="text-gray-600 leading-relaxed">
                  {itinerary.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-1 text-sm"
                  onClick={() => handleEditClick(itinerary)}
                >
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItineraryCard;