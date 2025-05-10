import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { itineraryAPI, authAPI } from '../../services/api';
import { toast } from 'react-toastify';

const ItineraryForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    createdAt: new Date().toISOString()
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!authAPI.isAuthenticated()) {
      toast.error('Please login to create an itinerary');
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      
      // Validate form data
      if (!formData.topic || !formData.description) {
        toast.error('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Create the post data matching the backend DTO
      const postData = {
        topic: formData.topic,
        description: formData.description,
        createdAt: new Date().toISOString()
      };

      // Send to backend using the API service
      const response = await itineraryAPI.createPost(postData);
      
      if (response && response.data) {
        toast.success('Itinerary created successfully!');
        
        // Clear form
        setFormData({
          topic: '',
          description: '',
          createdAt: new Date().toISOString()
        });

        // Redirect to itinerary list
        navigate('/itineraryhub');
      } else {
        throw new Error('Failed to create itinerary');
      }
    } catch (error) {
      console.error('Error creating itinerary:', error);
      if (error.response?.status === 403) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
      } else {
        toast.error(error.response?.data || 'Failed to create itinerary. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Itinerary</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter itinerary title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter itinerary description"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating...' : 'Create Itinerary'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItineraryForm;