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
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="bg-red-50 p-6 rounded-xl shadow-sm border border-red-100">
          <div className="flex items-center space-x-3">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div className="text-xl font-medium text-red-800">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (itineraries.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
          <div className="flex items-center space-x-3">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div className="text-xl font-medium text-blue-800">No itineraries found.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
              Your Itineraries
            </span>
          </h1>
          <div className="text-sm text-gray-500 font-medium">
            {itineraries.length} {itineraries.length === 1 ? 'itinerary' : 'itineraries'} found
          </div>
        </div>
        
        {/* Delete Confirmation Modal */}
        {deleteConfirmation && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full border border-gray-100 animate-fade-in-down">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-red-100 p-2 rounded-full">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Confirm Deletion</h3>
              </div>
              <p className="text-gray-600 mb-6 pl-11">
                Are you sure you want to delete the itinerary "<span className="font-semibold">{deleteConfirmation.topic}</span>"? 
                This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => handleDeleteItinerary(deleteConfirmation.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Improved scrollable container for itinerary cards */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-1 gap-6 pb-4">
            {itineraries.map((itinerary) => (
              <div
                key={itinerary.tpid}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 w-full group"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {itinerary.topic}
                      </h2>
                      {itinerary.createdAt && (
                        <div className="text-xs text-gray-500 mt-1 font-medium">
                          Created on {formatDate(itinerary.createdAt)}
                        </div>
                      )}
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      Itinerary #{itinerary.tpid}
                    </div>
                  </div>
                  
                  <div className="mb-5 pl-3 border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                    <p className="text-gray-700 leading-relaxed">
                      {itinerary.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-end pt-4 border-t border-gray-100 space-x-2">
                    {/* Changed to icon-only buttons */}
                    <button
                      className="p-2 text-gray-500 rounded-full hover:bg-gray-100 transition-colors duration-200 group-hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={() => handleDeleteClick(itinerary)}
                      title="Delete itinerary"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                    <button
                      className="p-2 text-blue-600 rounded-full hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => handleEditClick(itinerary)}
                      title="Edit itinerary"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Add custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 #f1f5f9;
        }
      `}</style>
    </div>
  );
}

export default ItineraryCard;