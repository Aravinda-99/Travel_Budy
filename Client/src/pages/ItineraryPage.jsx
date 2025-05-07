import React, { useState } from 'react';
import ItineraryForm from '../components/Itinerary Hub/ItineraryForm';

const ItineraryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pageStyle = {
    minHeight: '100vh',
    padding: '2rem',
    backgroundColor: '#f5f5f5',
    position: 'relative'
  };

  const addButtonStyle = {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    fontSize: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s ease, background-color 0.2s ease'
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: isModalOpen ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const modalContentStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '600px',
    margin: '2rem',
    zIndex: 1001
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '-40px',
    right: '0',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0.5rem'
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleButtonHover = (e) => {
    e.target.style.transform = 'scale(1.1)';
    e.target.style.backgroundColor = '#357abd';
  };

  const handleButtonLeave = (e) => {
    e.target.style.transform = 'scale(1)';
    e.target.style.backgroundColor = '#4a90e2';
  };

  return (
    <div style={pageStyle}>
      <button
        style={addButtonStyle}
        onClick={handleAddClick}
        onMouseEnter={handleButtonHover}
        onMouseLeave={handleButtonLeave}
      >
        +
      </button>

      <div style={modalOverlayStyle} onClick={handleCloseModal}>
        <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
          <button style={closeButtonStyle} onClick={handleCloseModal}>
            ✕
          </button>
          <ItineraryForm />
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;
