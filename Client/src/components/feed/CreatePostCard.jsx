import React, { useState } from 'react';
import { ImagePlus, MapPin, Smile, X } from 'lucide-react';
import UserAvatar from '../shared/UserAvatar';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8093/api';

const CreatePostCard = ({ onCreatePost }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setIsExpanded(false);
    setContent('');
    setTitle('');
    setLocation('');
    setImageUrl('');
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      // Create media data object matching backend DTO exactly
      const mediaData = {
        id: null,
        title: title.trim() || null,
        location: location.trim() || null,
        imageUrls: imageUrl ? [imageUrl] : [], // Send as simple array
        description: content,
        createdAt: new Date().toISOString()
      };

      // Send to backend
      await axios.post(`${API_BASE_URL}/media/save`, mediaData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Create local post object for UI
      const newPost = {
        id: Date.now().toString(),
        title: title.trim() || null,
        description: content,
        location: location.trim() || null,
        imageUrl: imageUrl,
        createdAt: new Date().toISOString(),
        author: {
          name: 'You',
          avatarUrl: null,
          status: 'online'
        },
        likes: 0,
        comments: []
      };
      
      onCreatePost(newPost);
      handleCancel();
    } catch (err) {
      setError('Failed to create post. Please try again.');
      console.error('Error creating post:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = () => {
    setImageUrl('');
  };

  return (
    <div className="card mb-6 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <UserAvatar status="online" />
          <h3 className="text-lg font-semibold text-gray-900">Create Post</h3>
        </div>

        {error && (
          <div className="mb-3 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Add a title to your post"
                  className="input mb-3 w-full"
                />
                
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={18} className="text-gray-500" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Add location"
                    className="input h-9 w-full"
                  />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <ImagePlus size={18} className="text-gray-500" />
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter image URL"
                    className="input h-9 w-full"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mb-3">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={handleFocus}
              placeholder="Share your travel experience..."
              rows={isExpanded ? 4 : 2}
              className="input w-full resize-none"
            />
          </div>

          {imageUrl && (
            <div className="relative mb-3 rounded-lg overflow-hidden">
              <img src={imageUrl} alt="Preview" className="w-full max-h-[300px] object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
              >
                <Smile size={20} />
              </button>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex gap-2"
                >
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-outline py-1.5 px-4"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!content.trim() || isSubmitting}
                    className="btn btn-primary py-1.5 px-4 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Posting...' : 'Post'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostCard;