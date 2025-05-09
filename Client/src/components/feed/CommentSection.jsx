import React, { useState, useEffect } from 'react';
import UserAvatar from '../shared/UserAvatar';
import { motion } from 'framer-motion';
import { Heart, Edit, Trash2, X, Check } from 'lucide-react';
import { usePosts } from '../../context/PostsContext';
import { commentAPI } from '../../services/api';

const CommentSection = ({ comments: initialComments, postId }) => {
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { addComment, updateComment, deleteComment } = usePosts();

  useEffect(() => {
    setComments(initialComments || []);
  }, [initialComments]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Use the context function to add comment
      const addedComment = await addComment(postId, newComment);
      setComments([...comments, addedComment]);
      setNewComment('');
    } catch (err) {
      setError('Failed to add comment. Please try again.');
      console.error('Error adding comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <Comment 
            key={comment.id || index} 
            comment={comment} 
            postId={postId} 
            setComments={setComments}
            comments={comments}
            updateComment={updateComment}
            deleteComment={deleteComment}
          />
        ))}
      </div>

      {/* Add comment form */}
      <form onSubmit={handleSubmitComment} className="mt-4 flex gap-2">
        <UserAvatar size="sm" />
        <div className="flex-grow">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary-500"
            disabled={isSubmitting}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
        <button
          type="submit"
          className="bg-primary-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-600 disabled:opacity-50"
          disabled={isSubmitting || !newComment.trim()}
        >
          Post
        </button>
      </form>
    </motion.div>
  );
};

const Comment = ({ comment, postId, setComments, comments, updateComment, deleteComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [showOptions, setShowOptions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // Check if this is a temporary comment (not yet saved to backend)
  const isTemporaryComment = typeof comment.id === 'string' && 
                           (comment.id.startsWith('temp-') || 
                            comment.id.startsWith('client-'));

  const formattedDate = new Date(comment.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const handleEdit = () => {
    setIsEditing(true);
    setShowOptions(false);
    setUpdateSuccess(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    
    setIsSubmitting(true);
    setError(null);
    setDeleteSuccess(false);
    
    try {
      // Verify that we have a valid ID
      if (!comment.id) {
        throw new Error('Comment ID is missing');
      }
      
      // Log the ID for debugging
      console.log(`Attempting to delete comment with ID: ${comment.id} (type: ${typeof comment.id})`);
      
      // Use the context function to delete the comment
      await deleteComment(postId, comment.id);
      
      // If it reaches here, the operation was successful
      setDeleteSuccess(true);
    } catch (err) {
      console.error('Error deleting comment:', err);
      
      // Show more specific error message if possible
      if (err.message === 'Invalid comment ID format' || err.message === 'Comment ID is missing') {
        setError(`Failed to delete: ${err.message}`);
      } else if (err.response && err.response.status === 400) {
        setError(`Failed to delete comment: Bad request - ${err.response.data || ''}`);
      } else if (err.response && err.response.data) {
        setError(`Failed to delete comment: ${err.response.data}`);
      } else {
        setError(`Failed to delete comment: ${err.message || 'Unknown error'}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = async () => {
    if (!editedText.trim()) return;
    
    setIsSubmitting(true);
    setError(null);
    setUpdateSuccess(false);
    
    try {
      // Verify that we have a valid ID
      if (!comment.id) {
        throw new Error('Comment ID is missing');
      }
      
      // Log the ID for debugging
      console.log(`Attempting to update comment with ID: ${comment.id} (type: ${typeof comment.id})`);
      
      // Use the context function to update the comment
      await updateComment(postId, comment.id, editedText);
      
      // If it reaches here, the operation was successful
      setUpdateSuccess(true);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating comment:', err);
      
      // Show more specific error message if possible
      if (err.message === 'Invalid comment ID format' || err.message === 'Comment ID is missing') {
        setError(`Failed to update: ${err.message}`);
      } else if (err.response && err.response.status === 400) {
        setError(`Failed to update comment: Bad request - ${err.response.data || ''}`);
      } else if (err.response && err.response.data) {
        setError(`Failed to update comment: ${err.response.data}`);
      } else {
        setError(`Failed to update comment: ${err.message || 'Unknown error'}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEditedText(comment.text);
    setIsEditing(false);
    setError(null);
  };

  // Check if the current user is the author (simple check based on name)
  // In a real app, you would check user IDs
  const isAuthor = comment.author.name === 'You';

  // If comment was deleted, don't render anything
  if (deleteSuccess) {
    return null;
  }

  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0">
        <UserAvatar src={comment.author.avatarUrl} size="sm" />
      </div>
      <div className="flex-grow">
        <div className={`bg-white rounded-lg p-3 shadow-sm relative ${isTemporaryComment ? 'border-l-4 border-yellow-300' : ''} ${updateSuccess ? 'border-green-300 border' : ''}`}>
          {updateSuccess && (
            <div className="absolute top-0 right-0 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-bl">
              Updated
            </div>
          )}
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-sm text-gray-900">
              {comment.author.name}
              {isTemporaryComment && <span className="ml-2 text-xs text-yellow-600">(Pending)</span>}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {formattedDate}
                {comment.id && <span className="ml-1 text-gray-400">#{comment.id}</span>}
              </span>
              {isAuthor && !isEditing && (
                <div className="relative">
                  <button 
                    onClick={() => setShowOptions(!showOptions)}
                    className="text-gray-400 hover:text-gray-600"
                    disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              <div className="flex justify-end gap-2 mt-2">
                <button 
                  onClick={handleCancel}
                  className="text-xs px-2 py-1 flex items-center gap-1 text-gray-600 hover:text-gray-800"
                  disabled={isSubmitting}
                >
                  <X size={12} />
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="text-xs px-2 py-1 bg-primary-500 text-white rounded-md flex items-center gap-1 hover:bg-primary-600 disabled:opacity-50"
                  disabled={isSubmitting || !editedText.trim()}
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