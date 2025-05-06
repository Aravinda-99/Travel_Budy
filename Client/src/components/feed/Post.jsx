import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MapPin, MoreHorizontal } from 'lucide-react';
import UserAvatar from '../shared/UserAvatar';
import CommentSection from './CommentSection';
import { motion } from 'framer-motion';

const Post = ({ post, onLike, onComment }) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  const toggleComments = () => {
    setIsCommentsOpen(!isCommentsOpen);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(post.id, comment);
      setComment('');
      // Keep comments open after submitting
      setIsCommentsOpen(true);
    }
  };

  const handleLikeClick = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount(prevCount => newLikedState ? prevCount + 1 : prevCount - 1);
    onLike(post.id, newLikedState);
  };

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card mb-6 overflow-hidden"
    >
      {/* Post header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserAvatar src={post.author.avatarUrl} status={post.author.status} />
          <div>
            <div className="font-medium text-gray-900">{post.author.name}</div>
            <div className="flex items-center text-gray-500 text-sm">
              <span>{formattedDate}</span>
              {post.location && (
                <>
                  <span className="mx-1">•</span>
                  <div className="flex items-center">
                    <MapPin size={12} className="mr-1" />
                    <span>{post.location}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700 rounded-full p-2 hover:bg-gray-100">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post content */}
      <div>
        {post.title && (
          <div className="px-4 pb-3">
            <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
          </div>
        )}
        
        {post.description && (
          <div className="px-4 pb-4">
            <p className="text-gray-700">{post.description}</p>
          </div>
        )}
        
        {post.imageUrl && (
          <div className="relative">
            <img 
              src={post.imageUrl} 
              alt={post.title || "Travel post"} 
              className="w-full max-h-[500px] object-cover"
            />
          </div>
        )}
      </div>

      {/* Post actions */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-6">
            <button 
              onClick={handleLikeClick}
              className={`flex items-center gap-2 ${isLiked ? 'text-secondary-500' : 'text-gray-600 hover:text-secondary-500'}`}
            >
              <Heart size={20} className={isLiked ? 'fill-secondary-500' : ''} />
              <span className="text-sm font-medium">{likeCount}</span>
            </button>
            
            <button 
              onClick={toggleComments}
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600"
            >
              <MessageCircle size={20} />
              <span className="text-sm font-medium">{post.comments?.length || 0}</span>
            </button>
            
            <button className="flex items-center gap-2 text-gray-600 hover:text-accent-500">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Comment form */}
        <form onSubmit={handleSubmitComment} className="flex gap-3">
          <UserAvatar size="sm" />
          <div className="flex-grow">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="input py-2 h-auto w-full"
            />
          </div>
        </form>
      </div>

      {/* Comments section */}
      {isCommentsOpen && post.comments && post.comments.length > 0 && (
        <CommentSection comments={post.comments} />
      )}
    </motion.article>
  );
};

export default Post;