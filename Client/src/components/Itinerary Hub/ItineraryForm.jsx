import React, { useState } from 'react';

const ItineraryForm = () => {
  const [formData, setFormData] = useState({
    travelTopic: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  };

  const headingStyle = {
    color: '#333',
    textAlign: 'center',
    marginBottom: '1rem'
  };

  const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  };

  const labelStyle = {
    fontWeight: '600',
    color: '#444'
  };

  const inputStyle = {
    padding: '0.8rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical'
  };

  const buttonStyle = {
    backgroundColor: '#4a90e2',
    color: 'white',
    padding: '1rem',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  const handleButtonHover = (e) => {
    e.target.style.backgroundColor = '#357abd';
  };

  const handleButtonLeave = (e) => {
    e.target.style.backgroundColor = '#4a90e2';
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headingStyle}>Create New Itinerary</h2>
        
        <div style={formGroupStyle}>
          <label htmlFor="travelTopic" style={labelStyle}>Travel Topic</label>
          <input
            type="text"
            id="travelTopic"
            name="travelTopic"
            value={formData.travelTopic}
            onChange={handleChange}
            placeholder="Enter your travel topic"
            required
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="description" style={labelStyle}>Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your travel plans"
            rows="4"
            required
            style={textareaStyle}
          />
        </div>

        <button 
          type="submit" 
          style={buttonStyle}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
        >
          Create Itinerary
        </button>
      </form>
    </div>
  );
};

export default ItineraryForm;
