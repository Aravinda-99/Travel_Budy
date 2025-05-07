import React, { useState } from 'react';
import HotelForm from './recommendationComponent/HotelForm.jsx';
import HotelList from './recommendationComponent/HotelList.jsx';
import { initialHotels } from './recommendationComponent/initialHotels.jsx';
import PageHeader from './recommendationComponent/PageHeader.jsx';

const RecommendationPage = () => {
  const [hotels, setHotels] = useState(initialHotels);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddHotel = (hotel) => {
    setHotels([hotel, ...hotels]);
    setIsFormOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl pt-20">
      <PageHeader onOpenForm={() => setIsFormOpen(true)} />
      
      {isFormOpen ? (
        <div className="mt-8 animate-fade-in">
          <HotelForm onSubmit={handleAddHotel} onCancel={() => setIsFormOpen(false)} />
        </div>
      ) : (
        <div className="mt-8">
          <HotelList hotels={hotels} />
        </div>
      )}
    </div>
  );
};

export default RecommendationPage;