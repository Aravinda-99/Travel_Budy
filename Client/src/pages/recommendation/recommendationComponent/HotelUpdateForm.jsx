import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, Star, Check } from 'lucide-react';
import { hotelAPI } from '../../../services/api';

const amenitiesOptions = [
  { value: 'WiFi', label: 'WiFi' },
  { value: 'Pool', label: 'Pool' },
  { value: 'Spa', label: 'Spa' },
  { value: 'Gym', label: 'Gym' },
  { value: 'Restaurant', label: 'Restaurant' },
  { value: 'Bar', label: 'Bar' },
  { value: 'Room Service', label: 'Room Service' },
  { value: 'Parking', label: 'Parking' },
  { value: 'Airport Shuttle', label: 'Airport Shuttle' },
  { value: 'Breakfast', label: 'Breakfast' },
  { value: 'Pet Friendly', label: 'Pet Friendly' },
  { value: 'Beach Access', label: 'Beach Access' }
];

const HotelUpdateForm = ({ hotelId, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    id: hotelId,
    name: '',
    city: '',
    country: '',
    priceRange: '',
    amenities: [],
    userRating: 5,
    affiliateBookingLink: '',
    image: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHotelData();
  }, [hotelId]);

  const fetchHotelData = async () => {
    try {
      const response = await hotelAPI.getHotelById(hotelId);
      if (response.code === 200) {
        const hotelData = response.data;
        setFormData({
          id: hotelData.id,
          name: hotelData.name || '',
          city: hotelData.city || '',
          country: hotelData.country || '',
          priceRange: hotelData.priceRange || '',
          amenities: Array.isArray(hotelData.amenities) ? hotelData.amenities : [],
          userRating: hotelData.userRating || 5,
          affiliateBookingLink: hotelData.affiliateBookingLink || '',
          image: hotelData.image || '',
        });
        setImagePreview(hotelData.image || '');
      } else {
        setErrors({ fetch: 'Failed to fetch hotel data' });
      }
    } catch (error) {
      console.error('Error fetching hotel:', error);
      setErrors({ fetch: 'Failed to fetch hotel data. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e) => {
    const { name } = e.target;
    const imageUrl = e.target.value;
    setFormData({
      ...formData,
      [name]: imageUrl,
    });

    if (imageUrl) {
      setImagePreview(imageUrl);
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    } else {
      setImagePreview('');
    }
  };

  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      userRating: rating,
    });
  };

  const toggleAmenity = (amenity) => {
    const currentAmenities = formData.amenities || [];
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity];

    setFormData({
      ...formData,
      amenities: newAmenities,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Hotel name is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.priceRange) newErrors.priceRange = 'Price range is required';
    if (!formData.image) newErrors.image = 'Image URL is required';
    if (!formData.affiliateBookingLink) newErrors.affiliateBookingLink = 'Booking link is required';
    if ((formData.amenities || []).length === 0) newErrors.amenities = 'Select at least one amenity';

    // Add URL length validation
    if (formData.affiliateBookingLink && formData.affiliateBookingLink.length > 255) {
      newErrors.affiliateBookingLink = 'Booking link must be less than 255 characters';
    }
    if (formData.image && formData.image.length > 255) {
      newErrors.image = 'Image URL must be less than 255 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const hotelData = {
        ...formData,
        userRating: Number(formData.userRating)
      };

      const response = await hotelAPI.updateHotel(hotelData);
      
      if (response.code === 200) {
        onUpdate(hotelData);
      } else {
        setErrors({ submit: 'Failed to update hotel. Please try again.' });
      }
    } catch (error) {
      console.error('Error updating hotel:', error);
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred while updating the hotel.';
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Update Hotel</h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {errors.fetch && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{errors.fetch}</p>
          <button
            onClick={fetchHotelData}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try Again
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Hotel Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City*
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.city ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country*
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.country ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
          </div>

          <div>
            <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
              Price Range*
            </label>
            <select
              id="priceRange"
              name="priceRange"
              value={formData.priceRange}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.priceRange ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select Price Range</option>
              <option value="BUDGET">Budget</option>
              <option value="MID_RANGE">Mid Range</option>
              <option value="LUXURY">Luxury</option>
            </select>
            {errors.priceRange && <p className="mt-1 text-sm text-red-500">{errors.priceRange}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => handleRatingChange(rating)}
                className={`p-2 rounded-full transition-colors ${
                  formData.userRating >= rating
                    ? 'text-yellow-400 hover:text-yellow-500'
                    : 'text-gray-300 hover:text-gray-400'
                }`}
              >
                <Star className="h-6 w-6 fill-current" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amenities*
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {amenitiesOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleAmenity(option.value)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                  formData.amenities.includes(option.value)
                    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Check
                  className={`h-4 w-4 ${
                    formData.amenities.includes(option.value) ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
          {errors.amenities && <p className="mt-1 text-sm text-red-500">{errors.amenities}</p>}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL*
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleImageChange}
                className={`w-full px-3 py-2 border ${
                  errors.image ? 'border-red-300' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
            </div>
            {imagePreview && (
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'placeholder-image-url';
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="affiliateBookingLink" className="block text-sm font-medium text-gray-700 mb-1">
            Booking Link*
          </label>
          <input
            type="text"
            id="affiliateBookingLink"
            name="affiliateBookingLink"
            value={formData.affiliateBookingLink}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.affiliateBookingLink ? 'border-red-300' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="https://booking-site.com/hotel"
          />
          {errors.affiliateBookingLink && (
            <p className="mt-1 text-sm text-red-500">{errors.affiliateBookingLink}</p>
          )}
        </div>

        {errors.submit && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{errors.submit}</p>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update Hotel'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelUpdateForm; 