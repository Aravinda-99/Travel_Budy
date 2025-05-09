import React, { createContext, useState, useContext, useEffect } from 'react';
import { commentAPI } from '../services/api';

// Create a context
const PostsContext = createContext();

// Generate initial mock posts data
const generateInitialPosts = () => {
  return [
    {
      id: '14',
      title: 'Amazing Sunset in Santorini',
      description: 'Watched the most breathtaking sunset today in Oia, Santorini. The white buildings against the orange sky created such a magical atmosphere. Definitely a must-see if you ever visit Greece!',
      imageUrl: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1200',
      location: 'Oia, Santorini',
      createdAt: '2025-06-15T14:32:00Z',
      author: {
        name: 'Emily Chen',
        avatarUrl: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150',
        status: 'online'
      },
      likes: 234,
      comments: [
        {
          id: '101',
          text: "This looks absolutely incredible! I've been wanting to visit Santorini for years.",
          createdAt: '2025-06-15T15:12:00Z',
          author: {
            name: 'Mark Wilson',
            avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
          },
          likes: 8
        },
        {
          id: '102',
          text: 'The colors in this photo are stunning! What time of day was this taken?',
          createdAt: '2025-06-15T16:45:00Z',
          author: {
            name: 'Sarah Johnson',
            avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
          },
          likes: 3
        }
      ]
    },
    {
      id: '2',
      title: 'Traditional Temples of Kyoto',
      description: 'Spent the day exploring Kyoto\'s ancient temples. The architecture and gardens are so peaceful and beautiful. Highly recommend visiting during cherry blossom season!',
      imageUrl: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1200',
      location: 'Kyoto, Japan',
      createdAt: '2025-06-14T09:15:00Z',
      author: {
        name: 'David Wong',
        avatarUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
        status: 'offline'
      },
      likes: 187,
      comments: [
        {
          id: '201',
          text: 'I visited Kyoto last year and it was amazing! Which temple is this?',
          createdAt: '2025-06-14T10:22:00Z',
          author: {
            name: 'Lisa Zhang',
            avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
          },
          likes: 5
        }
      ]
    },
    {
      id: '3',
      title: 'Safari Adventures in Kenya',
      description: 'Just returned from an incredible safari in Maasai Mara. Seeing lions, elephants, and giraffes in their natural habitat was a life-changing experience!',
      imageUrl: 'https://images.pexels.com/photos/259418/pexels-photo-259418.jpeg?auto=compress&cs=tinysrgb&w=1200',
      location: 'Maasai Mara, Kenya',
      createdAt: '2025-06-12T18:05:00Z',
      author: {
        name: 'Michael Brown',
        avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        status: 'online'
      },
      likes: 312,
      comments: [
        {
          id: '301',
          text: 'This is going on my bucket list! What tour company did you use?',
          createdAt: '2025-06-12T19:17:00Z',
          author: {
            name: 'Jessica Miller',
            avatarUrl: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150'
          },
          likes: 2
        },
        {
          id: '302',
          text: 'Incredible shot! Did you have to wake up early to see the animals?',
          createdAt: '2025-06-13T08:34:00Z',
          author: {
            name: 'Tom Harris',
            avatarUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150'
          },
          likes: 1
        },
        {
          id: '303',
          text: 'I went there last summer and it was amazing! The sunsets are unbelievable.',
          createdAt: '2025-06-13T15:22:00Z',
          author: {
            name: 'Alex Thompson',
            avatarUrl: 'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=150'
          },
          likes: 0
        }
      ]
    },
    {
      id: '4',
      title: 'Hiking in the Swiss Alps',
      description: 'Just completed a 3-day hiking trip through the Swiss Alps. The views were absolutely breathtaking. It was challenging but completely worth it!',
      imageUrl: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1200',
      location: 'Interlaken, Switzerland',
      createdAt: '2025-06-10T12:48:00Z',
      author: {
        name: 'Anna Schmidt',
        avatarUrl: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150',
        status: 'offline'
      },
      likes: 156,
      comments: [
        {
          id: '401',
          text: 'The scenery is magnificent! What trail did you take?',
          createdAt: '2025-06-10T14:22:00Z',
          author: {
            name: 'Robert Jones',
            avatarUrl: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=150'
          },
          likes: 4
        }
      ]
    },
    {
      id: '5',
      title: 'Street Food in Bangkok',
      description: 'Explored the amazing street food scene in Bangkok today. From pad thai to mango sticky rice, every bite was an explosion of flavors!',
      imageUrl: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1200',
      location: 'Bangkok, Thailand',
      createdAt: '2025-06-08T20:15:00Z',
      author: {
        name: 'Ryan Kim',
        avatarUrl: 'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=150',
        status: 'online'
      },
      likes: 221,
      comments: [
        {
          id: '501',
          text: 'I miss Thai food so much! What was your favorite dish?',
          createdAt: '2025-06-08T21:37:00Z',
          author: {
            name: 'Maria Garcia',
            avatarUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150'
          },
          likes: 7
        },
        {
          id: '502',
          text: 'That looks delicious! Did you try the durian?',
          createdAt: '2025-06-09T08:14:00Z',
          author: {
            name: 'James Wilson',
            avatarUrl: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
          },
          likes: 2
        }
      ]
    }
  ];
};

// Provider component
export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState(generateInitialPosts());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all comments from the backend
  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        setLoading(true);
        const comments = await commentAPI.getAllComments();
        
        // Here you would integrate the comments with posts
        // This is a simplified example assuming the backend returns comment data 
        // that can be associated with posts
        
        // For now, we'll just log the comments
        console.log('Fetched comments:', comments);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('Failed to load comments');
      } finally {
        setLoading(false);
      }
    };
    
    // Uncomment when backend is ready
    // fetchAllComments();
  }, []);

  // Add a new post
  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  // Add a comment to a post
  const addComment = async (postId, commentText) => {
    try {
      // Create a new comment object for the backend
      const commentData = {
        content: commentText,
        author: 'You', // In a real app, this would be the current user
      };
      
      // Call the backend API to save the comment
      const response = await commentAPI.saveComment(commentData);
      console.log('Comment saved response:', response);
      
      // Fetch all comments to get the newly created comment with its ID
      const allComments = await commentAPI.getAllComments();
      
      // Find the newly added comment (usually the last one with matching content)
      const newComments = allComments.filter(c => c.content === commentText);
      const newComment = newComments.length > 0 
        ? newComments[newComments.length - 1] 
        : { id: Date.now(), content: commentText, author: 'You', createdAt: new Date().toISOString() };
      
      // Create a comment object for the UI
      const uiComment = {
        id: newComment.id,
        text: newComment.content,  // Frontend uses 'text', backend uses 'content'
        createdAt: newComment.createdAt || new Date().toISOString(),
        author: {
          name: newComment.author || 'You',
          avatarUrl: null // Will use default avatar
        },
        likes: 0
      };

      // Update posts with the new comment
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...(post.comments || []), uiComment]
          };
        }
        return post;
      }));
      
      return uiComment;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  // Toggle like on a post
  const toggleLike = (postId, isLiked) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked,
          likes: isLiked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  // Update a comment
  const updateComment = async (postId, commentId, newText) => {
    try {
      // Convert commentId to a number if it's a string
      const commentIdNum = typeof commentId === 'string' ? parseInt(commentId, 10) : commentId;
      
      // If the ID can't be converted to a number, handle it client-side only
      if (isNaN(commentIdNum)) {
        console.warn('Using client-side only update for non-numeric ID:', commentId);
        
        // Update the UI
        setPosts(posts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              comments: post.comments.map(comment => {
                if (comment.id === commentId) {
                  return {
                    ...comment,
                    text: newText,
                    edited: true
                  };
                }
                return comment;
              })
            };
          }
          return post;
        }));
        
        return;
      }
      
      // Find the comment to get its author
      let commentAuthor = 'You'; // Default value
      const post = posts.find(p => p.id === postId);
      if (post) {
        const comment = post.comments.find(c => c.id === commentId);
        if (comment && comment.author && comment.author.name) {
          commentAuthor = comment.author.name;
        }
      }

      // Update the UI first (optimistic update)
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map(comment => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  text: newText,
                  edited: true
                };
              }
              return comment;
            })
          };
        }
        return post;
      }));

      // Create the comment data for the backend
      const commentData = {
        id: commentIdNum,
        content: newText,
        author: commentAuthor
      };
      
      console.log('Sending update to backend:', commentData);
      
      // Call the backend API
      const updateResponse = await commentAPI.updateComment(commentData);
      console.log('Update response:', updateResponse);
      
    } catch (error) {
      console.error('Error updating comment:', error);
      
      // Revert the UI update if there was an error
      alert(`Failed to update comment in database: ${error.message}`);
      
      throw error;
    }
  };

  // Delete a comment
  const deleteComment = async (postId, commentId) => {
    try {
      // Convert commentId to a number if it's a string
      const commentIdNum = typeof commentId === 'string' ? parseInt(commentId, 10) : commentId;
      
      // If the ID can't be converted to a number, handle it client-side only
      if (isNaN(commentIdNum)) {
        console.warn('Using client-side only delete for non-numeric ID:', commentId);
        
        // Update the UI
        setPosts(posts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              comments: post.comments.filter(comment => comment.id !== commentId)
            };
          }
          return post;
        }));
        
        return;
      }
      
      // Update the UI first (optimistic delete)
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.filter(comment => comment.id !== commentId)
          };
        }
        return post;
      }));
      
      console.log('Sending delete to backend for ID:', commentIdNum);
      
      // Call the backend API
      const deleteResponse = await commentAPI.deleteComment(commentIdNum);
      console.log('Delete response:', deleteResponse);
      
    } catch (error) {
      console.error('Error deleting comment:', error);
      
      // Notify the user of the error, but don't revert the UI
      // since the comment might still be deleted in the database
      alert(`Error while deleting comment from database: ${error.message}`);
      
      throw error;
    }
  };

  // Provider value
  const value = {
    posts,
    loading,
    error,
    addPost,
    addComment,
    updateComment,
    deleteComment,
    toggleLike
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};

// Custom hook to use the posts context
export const usePosts = () => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};