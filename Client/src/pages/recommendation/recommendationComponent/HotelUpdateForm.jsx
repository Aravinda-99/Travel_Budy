import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, Star, Check } from 'lucide-react';
import axios from 'axios';

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
      const response = await axios.get(`http://localhost:8093/api/v1/hotel/get-hotel/${hotelId}`);
      if (response.data.code === 200) {
        const hotelData = response.data.data;
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
      }
    } catch (error) {
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

      const response = await axios.put('http://localhost:8093/api/v1/hotel/update', hotelData);
      
      if (response.data.code === 200) {
        onUpdate(hotelData);
      } else {
        setErrors({ submit: 'Failed to update hotel. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'An error occurred while updating the hotel.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Edit Hotel Recommendation</h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {errors.fetch && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{errors.fetch}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 md:col-span-1">
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
              placeholder="e.g. Grand Hyatt"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                placeholder="e.g. Paris"
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
                placeholder="e.g. France"
              />
              {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
            </div>
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
              <option value="">Select price range</option>
              <option value="BUDGET">Budget</option>
              <option value="MID_RANGE">Mid Range</option>
              <option value="LUXURY">Luxury</option>
            </select>
            {errors.priceRange && <p className="mt-1 text-sm text-red-500">{errors.priceRange}</p>}
          </div>

          <div>
            <label htmlFor="affiliateBookingLink" className="block text-sm font-medium text-gray-700 mb-1">
              Booking Link*
            </label>
            <input
              type="url"
              id="affiliateBookingLink"
              name="affiliateBookingLink"
              value={formData.affiliateBookingLink}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.affiliateBookingLink ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="https://..."
            />
            {errors.affiliateBookingLink && <p className="mt-1 text-sm text-red-500">{errors.affiliateBookingLink}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating*
            </label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="focus:outline-none p-1"
                >
                  <Star
                    className={`h-7 w-7 ${
                      star <= (formData.userRating || 0)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    } transition-colors duration-150 hover:text-yellow-400`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 md:col-span-1">
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Hotel Image URL*
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleImageChange}
              className={`w-full px-3 py-2 border ${errors.image ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
          </div>

          <div className="h-40 bg-gray-50 rounded-md border border-gray-300 flex items-center justify-center overflow-hidden">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Hotel preview"
                className="w-full h-full object-cover"
                onError={() => setImagePreview('')}
              />
            ) : (
              <div className="text-center p-4 text-gray-400">
                <ImageIcon className="mx-auto h-10 w-10 mb-2" />
                <p>Enter image URL to see preview</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities*
            </label>
            <div className="grid grid-cols-2 gap-2">
              {amenitiesOptions.map(amenity => (
                <button
                  key={amenity.value}
                  type="button"
                  onClick={() => toggleAmenity(amenity.value)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm text-left transition-colors ${
                    (formData.amenities || []).includes(amenity.value)
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {(formData.amenities || []).includes(amenity.value) && (
                    <Check className="h-4 w-4 text-blue-600" />
                  )}
                  <span className={!((formData.amenities || []).includes(amenity.value)) ? "ml-6" : ""}>
                    {amenity.label}
                  </span>
                </button>
              ))}
            </div>
            {errors.amenities && <p className="mt-1 text-sm text-red-500">{errors.amenities}</p>}
          </div>
        </div>

        {errors.submit && (
          <div className="md:col-span-2">
            <p className="text-sm text-red-500">{errors.submit}</p>
          </div>
        )}

        <div className="md:col-span-2 pt-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
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