import React, { useState } from 'react';
import UserAvatar from '../shared/UserAvatar';
import { motion } from 'framer-motion';
import { Heart, Edit, Trash2, X, Check } from 'lucide-react';
import { usePosts } from '../../context/PostsContext';

const CommentSection = ({ comments, postId }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
      className="border-t border-gray-100 px-4 py-3 bg-gray-50"
    >
      <h4 className="text-sm font-medium text-gray-700 mb-3">Comments</h4>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <Comment key={comment.id || index} comment={comment} postId={postId} />
        ))}
      </div>
    </motion.div>
  );
};

const Comment = ({ comment, postId }) => {
  const { updateComment, deleteComment } = usePosts();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [showOptions, setShowOptions] = useState(false);

  const formattedDate = new Date(comment.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const handleEdit = () => {
    setIsEditing(true);
    setShowOptions(false);
  };

  const handleDelete = () => {
    deleteComment(postId, comment.id);
  };

  const handleSave = () => {
    if (editedText.trim()) {
      updateComment(postId, comment.id, editedText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedText(comment.text);
    setIsEditing(false);
  };

  // Check if the current user is the author (simple check based on name)
  // In a real app, you would check user IDs
  const isAuthor = comment.author.name === 'You';

  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0">
        <UserAvatar src={comment.author.avatarUrl} size="sm" />
      </div>
      <div className="flex-grow">
        <div className="bg-white rounded-lg p-3 shadow-sm relative">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-sm text-gray-900">
              {comment.author.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{formattedDate}</span>
              {isAuthor && !isEditing && (
                <div className="relative">
                  <button 
                    onClick={() => setShowOptions(!showOptions)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                  
                  {showOptions && (
                    <div className="absolute right-0 top-6 bg-white shadow-md rounded-md py-1 z-10 w-28">
                      <button 
                        onClick={handleEdit}
                        className="w-full text-left px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Edit size={14} />
                        Edit
                      </button>
                      <button 
                        onClick={handleDelete}
                        className="w-full text-left px-3 py-1 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {isEditing ? (
            <div className="mt-1">
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-primary-500"
                rows={2}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button 
                  onClick={handleCancel}
                  className="text-xs px-2 py-1 flex items-center gap-1 text-gray-600 hover:text-gray-800"
                >
                  <X size={12} />
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="text-xs px-2 py-1 bg-primary-500 text-white rounded-md flex items-center gap-1 hover:bg-primary-600"
                >
                  <Check size={12} />
                  Save
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 text-sm">
              {comment.text}
              {comment.edited && <span className="text-xs text-gray-400 ml-1">(edited)</span>}
            </p>
          )}
        </div>
        
        {!isEditing && (
          <div className="flex items-center gap-4 mt-1 ml-1">
            <button className="text-xs text-gray-500 hover:text-gray-700">Reply</button>
            <button className="text-xs flex items-center gap-1 text-gray-500 hover:text-secondary-500">
              <Heart size={12} /> 
              <span>{comment.likes || 0}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;