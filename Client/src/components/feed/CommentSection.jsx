import React from 'react';
import UserAvatar from '../shared/UserAvatar';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const CommentSection = ({ comments }) => {
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
          <Comment key={comment.id || index} comment={comment} />
        ))}
      </div>
    </motion.div>
  );
};

const Comment = ({ comment }) => {
  const formattedDate = new Date(comment.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0">
        <UserAvatar src={comment.author.avatarUrl} size="sm" />
      </div>
      <div className="flex-grow">
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-sm text-gray-900">
              {comment.author.name}
            </span>
            <span className="text-xs text-gray-500">{formattedDate}</span>
          </div>
          <p className="text-gray-700 text-sm">{comment.text}</p>
        </div>
        <div className="flex items-center gap-4 mt-1 ml-1">
          <button className="text-xs text-gray-500 hover:text-gray-700">Reply</button>
          <button className="text-xs flex items-center gap-1 text-gray-500 hover:text-secondary-500">
            <Heart size={12} /> 
            <span>{comment.likes || 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;