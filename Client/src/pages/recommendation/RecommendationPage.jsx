import React, { useState } from 'react';
import HotelForm from './recommendationComponent/HotelForm.jsx';
import HotelList from './recommendationComponent/HotelList.jsx';
import PageHeader from './recommendationComponent/PageHeader.jsx';

const RecommendationPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl pt-20">
      <PageHeader onOpenForm={() => setIsFormOpen(true)} />
      
      {isFormOpen ? (
        <div className="mt-8 animate-fade-in">
          <HotelForm 
            onSubmit={() => setIsFormOpen(false)} 
            onCancel={() => setIsFormOpen(false)} 
          />
        </div>
      ) : (
        <div className="mt-8">
          <HotelList />
        </div>
      )}
    </div>
  );
};

export default RecommendationPage;