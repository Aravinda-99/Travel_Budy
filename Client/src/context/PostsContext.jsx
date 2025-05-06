import React, { createContext, useState, useContext } from 'react';

// Create a context
const PostsContext = createContext();

// Generate initial mock posts data
const generateInitialPosts = () => {
  return [
    {
      id: '1',
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

  // Add a new post
  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  // Add a comment to a post
  const addComment = (postId, commentText) => {
    // Create a new comment object
    const newComment = {
      id: Date.now().toString(),
      text: commentText,
      createdAt: new Date().toISOString(),
      author: {
        name: 'You',
        avatarUrl: null // Will use default avatar
      },
      likes: 0
    };

    // Update posts with the new comment
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...(post.comments || []), newComment]
        };
      }
      return post;
    }));
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
  const updateComment = (postId, commentId, newText) => {
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
  };

  // Delete a comment
  const deleteComment = (postId, commentId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.filter(comment => comment.id !== commentId)
        };
      }
      return post;
    }));
  };

  // Provider value
  const value = {
    posts,
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