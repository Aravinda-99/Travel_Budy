import React, { useState } from 'react';

const ItineraryUpdateForm = ({ initialData, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    duration: '',
    date: '',
    location: '',
    tags: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTagChange = (e) => {
    const value = e.target.value.trim();
    if (e.key === 'Enter' && value) {
      setFormData(prevState => ({
        ...prevState,
        tags: [...prevState.tags, value]
      }));
      e.target.value = ''; // Clear the input after adding tag
    }
  };

  const removeTag = (indexToRemove) => {
    setFormData(prevState => ({
      ...prevState,
      tags: prevState.tags.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData); // Pass the updated form data to the parent component
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

  const buttonContainerStyle = {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end'
  };

  const actionButtonStyle = {
    backgroundColor: '#4a90e2',
    color: 'white',
    padding: '0.8rem 1.2rem',
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

  const tagInputStyle = {
    ...inputStyle,
    marginBottom: '0.5rem'
  };

  const tagStyle = {
    display: 'inline-block',
    backgroundColor: '#f0f0f0',
    color: '#333',
    padding: '0.5rem 0.8rem',
    borderRadius: '5px',
    marginRight: '0.5rem',
    fontSize: '0.9rem',
    border: '1px solid #e0e0e0',
  };

  const removeTagButtonStyle = {
    marginLeft: '0.5rem',
    border: 'none',
    background: 'none',
    color: '#888',
    cursor: 'pointer',
    fontSize: '0.8rem',
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headingStyle}>Edit Itinerary</h2>

        <div style={formGroupStyle}>
          <label htmlFor="title" style={labelStyle}>Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
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
            rows="4"
            required
            style={textareaStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="duration" style={labelStyle}>Duration</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="date" style={labelStyle}>Date</label>
          <input
            type="text"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="location" style={labelStyle}>Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="tags" style={labelStyle}>Tags (Press Enter to add)</label>
          <input
            type="text"
            id="tags"
            onKeyDown={handleTagChange}
            placeholder="Add tags"
            style={tagInputStyle}
          />
          <div>
            {formData.tags.map((tag, index) => (
              <span key={index} style={tagStyle}>
                {tag}
                <button type="button" onClick={() => removeTag(index)} style={removeTagButtonStyle}>
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        <div style={buttonContainerStyle}>
          <button type="button" onClick={onCancel} style={{ ...actionButtonStyle, backgroundColor: '#f44336', ...handleButtonLeave }} onMouseEnter={(e) => e.target.style.backgroundColor = '#d32f2f'} onMouseLeave={(e) => e.target.style.backgroundColor = '#f44336'}>
            Cancel
          </button>
          <button
            type="submit"
            style={actionButtonStyle}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            Update Itinerary
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItineraryUpdateForm;