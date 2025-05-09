import React, { useState, useEffect } from 'react';

const ItineraryUpdateForm = ({ initialData, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    tPid: initialData?.tPid,
    title: initialData?.title || '',
    description: initialData?.description || '',
    createdAt: initialData?.createdAt
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        tPid: initialData.tPid,
        title: initialData.title || '',
        description: initialData.description || '',
        createdAt: initialData.createdAt
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.tPid) {
      alert('Error: Missing Post ID');
      return;
    }
    onUpdate(formData);
  };

  return (
    <div className="max-w-2xl mx-auto my-8 p-8 bg-white rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Edit Itinerary</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-semibold text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-semibold text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
          />
        </div>

        <input type="hidden" name="tPid" value={formData.tPid} />
        <input type="hidden" name="createdAt" value={formData.createdAt} />

        <div className="flex justify-end gap-4 mt-2">
          <button 
            type="button" 
            onClick={onCancel}
            className="px-5 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
          >
            Update Itinerary
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItineraryUpdateForm;