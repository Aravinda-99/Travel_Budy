import React, { useState } from 'react';
import ItineraryForm from '../components/Itinerary Hub/ItineraryForm';
import ItineraryCard from '../components/Itinerary Hub/ItineraryCard';
import ItinerarySideebar from '../components/Itinerary Hub/ItinerarySideebar';

const ItineraryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-8 pt-24 bg-gray-100 relative flex">
      {/* Sidebar Section */}
      <div className="w-full md:w-1/4 lg:w-1/5 pr-8">
        <ItinerarySideebar />
      </div>

      {/* Main Content Section */}
      <div className="flex-grow">
        {/* Itinerary Cards will go here */}
      
        <ItineraryCard />
        {/* Add more ItineraryCard components as needed */}
      </div>

      {/* Floating Add Button */}
      <button
        className="fixed bottom-8 right-8 w-[60px] h-[60px] rounded-full bg-blue-500 text-white border-none text-3xl flex items-center justify-center cursor-pointer shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-blue-600 z-40"
        onClick={handleAddClick}
      >
        +
      </button>

      {/* Modal for Adding Itinerary */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isModalOpen ? 'flex' : 'hidden'}`}
        onClick={handleCloseModal}
      >
        <div
          className="relative w-full max-w-[600px] m-8 z-50 bg-white rounded-lg shadow-xl p-6"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="absolute -top-4 right-0 bg-transparent border-none text-gray-600 text-3xl cursor-pointer p-2"
            onClick={handleCloseModal}
          >
            ✕
          </button>
          <h2 className="text-xl font-semibold mb-4">Create New Itinerary</h2>
          <ItineraryForm onClose={handleCloseModal} /> {/* Pass onClose to handle modal closing from the form */}
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;