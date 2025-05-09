import React, { useState, useEffect } from 'react';
import { commentAPI } from '../../services/api';

const TestCommentApi = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [editComment, setEditComment] = useState({ id: '', content: '' });
  const [deleteId, setDeleteId] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  // Load all comments
  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await commentAPI.getAllComments();
      console.log('All comments:', response);
      setComments(response);
      setApiResponse('Fetched comments successfully');
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError('Failed to fetch comments: ' + err.message);
      setApiResponse('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const commentData = {
        content: newComment,
        author: 'TestUser'
      };
      
      const response = await commentAPI.saveComment(commentData);
      console.log('Add comment response:', response);
      setApiResponse('Added comment: ' + JSON.stringify(response));
      
      // Refresh comments
      fetchComments();
      
      // Clear input
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Failed to add comment: ' + err.message);
      setApiResponse('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update a comment
  const handleUpdateComment = async (e) => {
    e.preventDefault();
    if (!editComment.id || !editComment.content.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      // Convert ID to number
      const id = parseInt(editComment.id, 10);
      
      if (isNaN(id)) {
        throw new Error('Invalid ID format');
      }
      
      const commentData = {
        id: id,
        content: editComment.content,
        author: 'TestUser' // You might want to keep the original author
      };
      
      const response = await commentAPI.updateComment(commentData);
      console.log('Update comment response:', response);
      setApiResponse('Updated comment: ' + JSON.stringify(response));
      
      // Refresh comments
      fetchComments();
      
      // Clear input
      setEditComment({ id: '', content: '' });
    } catch (err) {
      console.error('Error updating comment:', err);
      setError('Failed to update comment: ' + err.message);
      setApiResponse('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a comment
  const handleDeleteComment = async (e) => {
    e.preventDefault();
    if (!deleteId.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      // Convert ID to number
      const id = parseInt(deleteId, 10);
      
      if (isNaN(id)) {
        throw new Error('Invalid ID format');
      }
      
      const response = await commentAPI.deleteComment(id);
      console.log('Delete comment response:', response);
      setApiResponse('Deleted comment: ' + JSON.stringify(response));
      
      // Refresh comments
      fetchComments();
      
      // Clear input
      setDeleteId('');
    } catch (err) {
      console.error('Error deleting comment:', err);
      setError('Failed to delete comment: ' + err.message);
      setApiResponse('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Comment API Test</h1>
      
      {/* Response Display */}
      <div className="mb-4 p-2 bg-gray-100 rounded">
        <h2 className="font-semibold">API Response:</h2>
        <p className="mt-1 text-sm">{apiResponse || 'No response yet'}</p>
      </div>
      
      {/* Error Display */}
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Add Comment</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Enter comment text"
            className="flex-grow p-2 border rounded"
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading || !newComment.trim()}
          >
            Add
          </button>
        </div>
      </form>
      
      {/* Update Comment Form */}
      <form onSubmit={handleUpdateComment} className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Update Comment</h2>
        <div className="space-y-2">
          <div>
            <input
              type="text"
              value={editComment.id}
              onChange={(e) => setEditComment({...editComment, id: e.target.value})}
              placeholder="Comment ID"
              className="w-full p-2 border rounded"
              disabled={loading}
            />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={editComment.content}
              onChange={(e) => setEditComment({...editComment, content: e.target.value})}
              placeholder="New content"
              className="flex-grow p-2 border rounded"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
              disabled={loading || !editComment.id || !editComment.content.trim()}
            >
              Update
            </button>
          </div>
        </div>
      </form>
      
      {/* Delete Comment Form */}
      <form onSubmit={handleDeleteComment} className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Delete Comment</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            placeholder="Comment ID"
            className="flex-grow p-2 border rounded"
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded"
            disabled={loading || !deleteId.trim()}
          >
            Delete
          </button>
        </div>
      </form>
      
      {/* Comments List */}
      <div>
        <h2 className="text-lg font-semibold mb-2">All Comments</h2>
        <button 
          onClick={fetchComments} 
          className="mb-2 bg-gray-200 px-3 py-1 rounded text-sm"
          disabled={loading}
        >
          Refresh
        </button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-2">
            {comments.map(comment => (
              <li key={comment.id} className="p-2 border rounded">
                <p className="font-medium">{comment.author} (ID: {comment.id})</p>
                <p>{comment.content}</p>
                <p className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
            {comments.length === 0 && <p>No comments found.</p>}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TestCommentApi; 