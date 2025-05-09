import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItineraryUpdateForm from './ItineraryUpdateForm';

function ItineraryCard() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItinerary, setEditingItinerary] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8093/api/v1/tpost/post/get-all');
      console.log('Fetched itineraries:', response.data);
      setItineraries(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching itineraries:', err);
      setError('Failed to load itineraries. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItinerary = async (updatedData) => {
    try {
      if (!updatedData.tPid) {
        throw new Error('Post ID is required for update');
      }

      const dataToSend = {
        tpid: updatedData.tPid,
        topic: updatedData.title,
        description: updatedData.description,
        createdAt: updatedData.createdAt
      };
      
      console.log('Sending update data:', dataToSend);
      
      const response = await axios.put(`http://localhost:8093/api/v1/tpost/post/update`, dataToSend);
      
      if (response.data) {
        console.log('Update response:', response.data);
        await fetchItineraries();
        setEditingItinerary(null);
        console.log('Itinerary updated successfully!');
      }
    } catch (error) {
      console.error('Error updating itinerary:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Failed to update itinerary. Please try again.');
    }
  };

  const handleDeleteItinerary = async (id) => {
    try {
      console.log('Deleting itinerary with ID:', id);
      const response = await axios.delete(`http://localhost:8093/api/v1/tpost/post/delete/${id}`);
      
      if (response.data) {
        console.log('Delete response:', response.data);
        await fetchItineraries();
        setDeleteConfirmation(null);
        console.log('Itinerary deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting itinerary:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Failed to delete itinerary. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingItinerary(null);
  };

  const handleDeleteClick = (itinerary) => {
    setDeleteConfirmation({
      id: itinerary.tpid,
      topic: itinerary.topic
    });
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

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

  const handleEditClick = (itinerary) => {
    console.log('Raw itinerary data:', itinerary);

    // Check if itinerary and tpid exist (changed to lowercase)
    if (!itinerary || typeof itinerary.tpid === 'undefined') {
      console.error('Invalid itinerary data:', itinerary);
      return;
    }

    // Create a new object with the required fields
    const editData = {
      tPid: itinerary.tpid, // Map lowercase tpid to uppercase tPid for the form
      title: itinerary.topic || '',
      description: itinerary.description || '',
      createdAt: itinerary.createdAt
    };

    console.log('Setting editing itinerary with data:', editData);
    setEditingItinerary(editData);
  };

  if (editingItinerary) {
    return (
      <ItineraryUpdateForm
        initialData={editingItinerary}
        onUpdate={handleUpdateItinerary}
        onCancel={handleCancelEdit}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading itineraries...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (itineraries.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">No itineraries found.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Your Itineraries</h1>
      
      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the itinerary "{deleteConfirmation.topic}"? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                onClick={() => handleDeleteItinerary(deleteConfirmation.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scrollable container for itinerary cards */}
      <div className="h-96 overflow-y-auto pr-2">
        <div className="flex flex-col space-y-6">
          {itineraries.map((itinerary) => (
            <div
              key={itinerary.tpid}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 w-full"
            >
              <div className="p-6">
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
                <div className="mb-5 pl-3 border-l-4 border-blue-500">
                  <p className="text-gray-600 leading-relaxed">
                    {itinerary.description}
                  </p>
                </div>
                <div className="flex items-center justify-end pt-4 border-t border-gray-100 space-x-3">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-1 text-sm"
                    onClick={() => handleDeleteClick(itinerary)}
                  >
                    <span>Delete</span>
                  </button>
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
    </div>
  );
}

export default ItineraryCard;